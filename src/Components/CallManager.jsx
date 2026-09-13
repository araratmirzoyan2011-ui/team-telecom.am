import { useState, useEffect, useRef, useCallback } from "react";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

// Flip to true while debugging to get per-track/per-connection console logs.
const DEBUG_CALLS = false;

// ---------------------------------------------------------------------------
// Small utilities
// ---------------------------------------------------------------------------

function oneToOneChatId(a, b) {
  return [a, b].sort().join("_");
}

function pairKey(a, b) {
  return [a, b].sort().join("_");
}

function formatDuration(totalSec) {
  const m = Math.floor(totalSec / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// How many grid columns to use for the group-call view, based on how many
// tiles need to fit (including yourself).
function gridColsClass(count) {
  if (count <= 1) return "grid-cols-1";
  if (count <= 4) return "grid-cols-2";
  if (count <= 9) return "grid-cols-3";
  return "grid-cols-4";
}

// Turns a getUserMedia() DOMException into a message someone can actually
// act on, instead of a generic "check permissions" alert.
function mediaErrorMessage(err) {
  switch (err?.name) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "Camera/microphone-ի հասանելիությունը արգելափակված է։ Թույլատրիր browser-ի կարգավորումներում։";
    case "NotFoundError":
    case "DevicesNotFoundError":
      return "Camera կամ microphone չի գտնվել այս սարքում։";
    case "NotReadableError":
    case "TrackStartError":
      return "Camera-ն կամ microphone-ն արդեն օգտագործվում է այլ ծրագրի կողմից։";
    case "OverconstrainedError":
      return "Camera-ի պարամետրերը չեն համապատասխանում սարքի հնարավորություններին։";
    default:
      return "Չհաջողվեց միանալ camera/microphone-ին։";
  }
}

const ICE_SERVERS = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
    ...(import.meta.env.VITE_TURN_URL
      ? [
          {
            urls: import.meta.env.VITE_TURN_URL,
            username: import.meta.env.VITE_TURN_USERNAME,
            credential: import.meta.env.VITE_TURN_CREDENTIAL,
          },
        ]
      : []),
  ],
};

// Watches a peer connection's ICE state. Flags the call as "degraded" the
// moment it drops, and calls onProlongedFailure if it hasn't recovered
// within FAILURE_GRACE_MS — that's the hook that lets a caller show a
// "reconnecting..." banner instead of a silently frozen black tile, and
// gracefully end/drop the connection instead of hanging forever.
const FAILURE_GRACE_MS = 8000;

function watchConnectionHealth(pc, label, { onDegradedChange, onProlongedFailure }) {
  let failureTimer = null;

  pc.oniceconnectionstatechange = () => {
    const state = pc.iceConnectionState;
    if (DEBUG_CALLS) console.log(`[ICE:${label}]`, state);

    if (state === "disconnected" || state === "failed") {
      onDegradedChange?.(true);
      if (!failureTimer) {
        failureTimer = setTimeout(() => {
          if (pc.iceConnectionState === "disconnected" || pc.iceConnectionState === "failed") {
            onProlongedFailure?.();
          }
        }, FAILURE_GRACE_MS);
      }
    } else if (state === "connected" || state === "completed") {
      if (failureTimer) {
        clearTimeout(failureTimer);
        failureTimer = null;
      }
      onDegradedChange?.(false);
    }
  };

  return () => {
    if (failureTimer) clearTimeout(failureTimer);
  };
}

async function logOneToOneCall({ peerUid, currentUser, callType, status, durationSec }) {
  try {
    const chatId = oneToOneChatId(currentUser.uid, peerUid);
    await addDoc(collection(db, "chats", chatId, "messages"), {
      type: "call",
      callType,
      callStatus: status,
      durationSec: durationSec || 0,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || "Anonymous",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Call-ի history գրելու սխալ:", err);
  }
}

async function logGroupCallEvent({ groupId, currentUser, callType, status }) {
  try {
    await addDoc(collection(db, "groups", groupId, "messages"), {
      type: "call",
      callType,
      callStatus: status,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || "Anonymous",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Group call-ի history գրելու սխալ:", err);
  }
}

// ---------------------------------------------------------------------------
// useCallManager — all signaling + WebRTC state
// ---------------------------------------------------------------------------

export function useCallManager(currentUser) {
  const [incomingCall, setIncomingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [activeGroupCall, setActiveGroupCall] = useState(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [groupRemoteStreams, setGroupRemoteStreams] = useState({});

  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  // In-UI replacements for alert(): a transient error banner, and a
  // "connection is degraded somewhere" flag the overlay can show a
  // reconnecting banner for.
  const [callError, setCallError] = useState(null);
  const [connectionQuality, setConnectionQuality] = useState("good"); // "good" | "degraded"

  const errorTimerRef = useRef(null);
  const showError = useCallback((msg) => {
    setCallError(msg);
    clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setCallError(null), 5000);
  }, []);

  const degradedSetRef = useRef(new Set());
  const markDegraded = useCallback((key, isDegraded) => {
    if (isDegraded) degradedSetRef.current.add(key);
    else degradedSetRef.current.delete(key);
    setConnectionQuality(degradedSetRef.current.size > 0 ? "degraded" : "good");
  }, []);
  const resetDegraded = useCallback(() => {
    degradedSetRef.current.clear();
    setConnectionQuality("good");
  }, []);

  const peerConnectionRef = useRef(null);
  const groupPeerConnectionsRef = useRef({});
  const unsubscribersRef = useRef([]);
  const healthWatchersRef = useRef([]); // cleanup fns from watchConnectionHealth
  const localStreamRef = useRef(null);
  const activeCallRef = useRef(null);
  const currentUserRef = useRef(null);

  useEffect(() => {
    activeCallRef.current = activeCall;
  }, [activeCall]);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const clearUnsubs = () => {
    unsubscribersRef.current.forEach((u) => u && u());
    unsubscribersRef.current = [];
    healthWatchersRef.current.forEach((u) => u && u());
    healthWatchersRef.current = [];
  };

  const stopLocalStream = () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    setLocalStream(null);
  };

  const cleanup1to1 = useCallback(
    (reason = "ended") => {
      const call = activeCallRef.current;
      const user = currentUserRef.current;

      if (call && user && call.role === "caller") {
        let status;
        let durationSec = 0;
        if (reason === "declined") {
          status = "declined";
        } else if (call.status === "connected") {
          status = "answered";
          durationSec = call.connectedAt ? Math.round((Date.now() - call.connectedAt) / 1000) : 0;
        } else {
          status = "no_answer";
        }
        logOneToOneCall({
          peerUid: call.peerUid,
          currentUser: user,
          callType: call.type,
          status,
          durationSec,
        });
      }

      peerConnectionRef.current?.close();
      peerConnectionRef.current = null;
      setActiveCall(null);
      setIncomingCall(null);
      setRemoteStream(null);
      stopLocalStream();
      clearUnsubs();
      resetDegraded();
      setMuted(false);
      setCameraOff(false);
    },
    [resetDegraded]
  );

  const cleanupGroup = useCallback(() => {
    Object.values(groupPeerConnectionsRef.current).forEach((pc) => pc?.close());
    groupPeerConnectionsRef.current = {};
    setActiveGroupCall(null);
    setGroupRemoteStreams({});
    stopLocalStream();
    clearUnsubs();
    resetDegraded();
    setMuted(false);
    setCameraOff(false);
  }, [resetDegraded]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "calls"),
      where("calleeId", "==", currentUser.uid),
      where("status", "==", "ringing")
    );
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (docs.length > 0 && !activeCall && !activeGroupCall) {
        setIncomingCall(docs[0]);
      }
    });
    return () => unsub();
  }, [currentUser, activeCall, activeGroupCall]);

  const startCall = useCallback(
    async (calleeUser, type) => {
      if (!currentUser) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: type === "video",
        });
        localStreamRef.current = stream;
        setLocalStream(stream);

        const callDocRef = await addDoc(collection(db, "calls"), {
          callerId: currentUser.uid,
          callerName: currentUser.displayName || currentUser.email || "Anonymous",
          calleeId: calleeUser.uid,
          calleeName: calleeUser.name || calleeUser.email || "Anonymous",
          type,
          status: "ringing",
          createdAt: serverTimestamp(),
        });

        const pc = new RTCPeerConnection(ICE_SERVERS);
        peerConnectionRef.current = pc;
        stream.getTracks().forEach((t) => pc.addTrack(t, stream));
        pc.ontrack = (e) => setRemoteStream(e.streams[0]);
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            addDoc(collection(db, "calls", callDocRef.id, "callerCandidates"), e.candidate.toJSON());
          }
        };

        const stopHealthWatch = watchConnectionHealth(pc, `caller:${callDocRef.id}`, {
          onDegradedChange: (isDegraded) => markDegraded(callDocRef.id, isDegraded),
          onProlongedFailure: () => {
            showError("Կապը ընդհատվեց։");
            cleanup1to1("ended");
          },
        });
        healthWatchersRef.current.push(stopHealthWatch);

        let pendingCandidates = [];
        const addOrQueueCandidate = (data) => {
          if (pc.remoteDescription) {
            pc.addIceCandidate(new RTCIceCandidate(data)).catch(console.error);
          } else {
            pendingCandidates.push(data);
          }
        };
        const flushPendingCandidates = () => {
          pendingCandidates.forEach((data) =>
            pc.addIceCandidate(new RTCIceCandidate(data)).catch(console.error)
          );
          pendingCandidates = [];
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await updateDoc(callDocRef, { offer: { type: offer.type, sdp: offer.sdp } });

        setActiveCall({
          id: callDocRef.id,
          peerUid: calleeUser.uid,
          peerName: calleeUser.name || calleeUser.email,
          type,
          role: "caller",
          status: "ringing",
        });

        const unsubDoc = onSnapshot(doc(db, "calls", callDocRef.id), async (snap) => {
          const data = snap.data();
          if (!data) return;
          if (data.answer && pc.currentRemoteDescription == null) {
            await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
            flushPendingCandidates();
            setActiveCall((prev) => (prev ? { ...prev, status: "connected", connectedAt: Date.now() } : prev));
          }
          if (data.status === "declined") {
            showError("Զանգը մերժվեց։");
            cleanup1to1("declined");
          }
          if (data.status === "ended") {
            cleanup1to1("ended");
          }
        });

        const unsubCandidates = onSnapshot(
          collection(db, "calls", callDocRef.id, "calleeCandidates"),
          (snap) => {
            snap.docChanges().forEach((change) => {
              if (change.type === "added") {
                addOrQueueCandidate(change.doc.data());
              }
            });
          }
        );

        unsubscribersRef.current.push(unsubDoc, unsubCandidates);
      } catch (err) {
        console.error("Զանգի սկսելու սխալ:", err);
        showError(mediaErrorMessage(err));
        cleanup1to1("ended");
      }
    },
    [currentUser, cleanup1to1, markDegraded, showError]
  );

  const acceptCall = useCallback(async () => {
    if (!incomingCall) return;
    const { id, offer, type, callerName, callerId } = incomingCall;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      });
      localStreamRef.current = stream;
      setLocalStream(stream);

      const pc = new RTCPeerConnection(ICE_SERVERS);
      peerConnectionRef.current = pc;
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));
      pc.ontrack = (e) => setRemoteStream(e.streams[0]);
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          addDoc(collection(db, "calls", id, "calleeCandidates"), e.candidate.toJSON());
        }
      };

      const stopHealthWatch = watchConnectionHealth(pc, `callee:${id}`, {
        onDegradedChange: (isDegraded) => markDegraded(id, isDegraded),
        onProlongedFailure: () => {
          showError("Կապը ընդհատվեց։");
          cleanup1to1("ended");
        },
      });
      healthWatchersRef.current.push(stopHealthWatch);

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await updateDoc(doc(db, "calls", id), {
        answer: { type: answer.type, sdp: answer.sdp },
        status: "accepted",
      });

      setActiveCall({
        id,
        peerUid: callerId,
        peerName: callerName,
        type,
        role: "callee",
        status: "connected",
        connectedAt: Date.now(),
      });
      setIncomingCall(null);

      const unsubDoc = onSnapshot(doc(db, "calls", id), (snap) => {
        const data = snap.data();
        if (data?.status === "ended") cleanup1to1("ended");
      });

      const unsubCandidates = onSnapshot(collection(db, "calls", id, "callerCandidates"), (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "added") {
            pc.addIceCandidate(new RTCIceCandidate(change.doc.data())).catch(console.error);
          }
        });
      });
      unsubscribersRef.current.push(unsubDoc, unsubCandidates);
    } catch (err) {
      console.error("Զանգն ընդունելու սխալ:", err);
      showError(mediaErrorMessage(err));
      cleanup1to1("ended");
    }
  }, [incomingCall, cleanup1to1, markDegraded, showError]);

  const declineCall = useCallback(async () => {
    if (!incomingCall) return;
    try {
      await updateDoc(doc(db, "calls", incomingCall.id), { status: "declined" });
    } catch (err) {
      console.error(err);
    }
    setIncomingCall(null);
  }, [incomingCall]);

  const endCall = useCallback(async () => {
    if (activeCall) {
      try {
        await updateDoc(doc(db, "calls", activeCall.id), { status: "ended" });
      } catch (err) {
        console.error(err);
      }
    }
    cleanup1to1();
  }, [activeCall, cleanup1to1]);

  const connectToGroupPeer = useCallback(
    (groupId, otherUid, stream) => {
      const amOfferer = currentUser.uid < otherUid;
      const key = pairKey(currentUser.uid, otherUid);
      const signalDocRef = doc(db, "groups", groupId, "callSignals", key);

      const pc = new RTCPeerConnection(ICE_SERVERS);
      groupPeerConnectionsRef.current[otherUid] = pc;
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));
      pc.ontrack = (e) => {
        setGroupRemoteStreams((prev) => ({ ...prev, [otherUid]: e.streams[0] }));
      };

      // A prolonged failure on a group peer only drops that one
      // participant's tile — it doesn't end the call for everyone else.
      const stopHealthWatch = watchConnectionHealth(pc, `group:${groupId}:${otherUid}`, {
        onDegradedChange: (isDegraded) => markDegraded(`${groupId}:${otherUid}`, isDegraded),
        onProlongedFailure: () => {
          pc.close();
          delete groupPeerConnectionsRef.current[otherUid];
          setGroupRemoteStreams((prev) => {
            const next = { ...prev };
            delete next[otherUid];
            return next;
          });
          markDegraded(`${groupId}:${otherUid}`, false);
        },
      });
      healthWatchersRef.current.push(stopHealthWatch);

      const myCandidates = collection(
        db, "groups", groupId, "callSignals", key,
        amOfferer ? "offererCandidates" : "answererCandidates"
      );
      const theirCandidates = collection(
        db, "groups", groupId, "callSignals", key,
        amOfferer ? "answererCandidates" : "offererCandidates"
      );

      pc.onicecandidate = (e) => {
        if (e.candidate) addDoc(myCandidates, e.candidate.toJSON());
      };

      let pendingCandidates = [];
      const addOrQueueCandidate = (data) => {
        if (pc.remoteDescription) {
          pc.addIceCandidate(new RTCIceCandidate(data)).catch(console.error);
        } else {
          pendingCandidates.push(data);
        }
      };
      const flushPendingCandidates = () => {
        pendingCandidates.forEach((data) =>
          pc.addIceCandidate(new RTCIceCandidate(data)).catch(console.error)
        );
        pendingCandidates = [];
      };

      const unsubTheirCandidates = onSnapshot(theirCandidates, (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "added") {
            addOrQueueCandidate(change.doc.data());
          }
        });
      });
      unsubscribersRef.current.push(unsubTheirCandidates);

      if (amOfferer) {
        (async () => {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          await setDoc(
            signalDocRef,
            { offererUid: currentUser.uid, offer: { type: offer.type, sdp: offer.sdp } },
            { merge: true }
          );
        })();
        const unsubSignal = onSnapshot(signalDocRef, async (snap) => {
          const data = snap.data();
          if (data?.answer && pc.currentRemoteDescription == null) {
            await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
            flushPendingCandidates();
          }
        });
        unsubscribersRef.current.push(unsubSignal);
      } else {
        const unsubSignal = onSnapshot(signalDocRef, async (snap) => {
          const data = snap.data();
          if (data?.offer && data.offererUid !== currentUser.uid && pc.currentRemoteDescription == null) {
            await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
            flushPendingCandidates();
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            await setDoc(signalDocRef, { answer: { type: answer.type, sdp: answer.sdp } }, { merge: true });
          }
        });
        unsubscribersRef.current.push(unsubSignal);
      }
    },
    [currentUser, markDegraded]
  );

  const joinGroupCall = useCallback(
    async (group, type) => {
      if (!currentUser) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: type === "video",
        });
        localStreamRef.current = stream;
        setLocalStream(stream);
        groupPeerConnectionsRef.current = {};
        setGroupRemoteStreams({});

        const existingParticipantsSnap = await getDocs(
          collection(db, "groups", group.id, "callParticipants")
        );
        const isFirstToJoin = existingParticipantsSnap.empty;

        await setDoc(doc(db, "groups", group.id, "callParticipants", currentUser.uid), {
          name: currentUser.displayName || currentUser.email || "Anonymous",
          type,
          joinedAt: serverTimestamp(),
        });

        if (isFirstToJoin) {
          logGroupCallEvent({ groupId: group.id, currentUser, callType: type, status: "started" });
        }

        setActiveGroupCall({ groupId: group.id, groupName: group.name, type });

        const unsubParticipants = onSnapshot(
          collection(db, "groups", group.id, "callParticipants"),
          (snap) => {
            const currentUids = snap.docs.map((d) => d.id);

            Object.keys(groupPeerConnectionsRef.current).forEach((uid) => {
              if (!currentUids.includes(uid)) {
                groupPeerConnectionsRef.current[uid]?.close();
                delete groupPeerConnectionsRef.current[uid];
                setGroupRemoteStreams((prev) => {
                  const next = { ...prev };
                  delete next[uid];
                  return next;
                });
              }
            });

            snap.docs.forEach((d) => {
              const uid = d.id;
              if (uid === currentUser.uid) return;
              if (groupPeerConnectionsRef.current[uid]) return;
              connectToGroupPeer(group.id, uid, stream);
            });
          }
        );
        unsubscribersRef.current.push(unsubParticipants);
      } catch (err) {
        console.error("Group call-ին միանալու սխալ:", err);
        showError(mediaErrorMessage(err));
        cleanupGroup();
      }
    },
    [currentUser, connectToGroupPeer, cleanupGroup, showError]
  );

  const leaveGroupCall = useCallback(async () => {
    if (activeGroupCall && currentUser) {
      try {
        await deleteDoc(doc(db, "groups", activeGroupCall.groupId, "callParticipants", currentUser.uid));
        const remainingSnap = await getDocs(
          collection(db, "groups", activeGroupCall.groupId, "callParticipants")
        );
        if (remainingSnap.empty) {
          logGroupCallEvent({
            groupId: activeGroupCall.groupId,
            currentUser,
            callType: activeGroupCall.type,
            status: "ended",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    cleanupGroup();
  }, [activeGroupCall, currentUser, cleanupGroup]);

  const toggleMute = useCallback(() => {
    if (!localStreamRef.current) return;
    const next = !muted;
    localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !next));
    setMuted(next);
  }, [muted]);

  const toggleCamera = useCallback(() => {
    if (!localStreamRef.current) return;
    const next = !cameraOff;
    localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = !next));
    setCameraOff(next);
  }, [cameraOff]);

  useEffect(() => {
    return () => {
      peerConnectionRef.current?.close();
      Object.values(groupPeerConnectionsRef.current).forEach((pc) => pc?.close());
      stopLocalStream();
      clearUnsubs();
    };
  }, []);

  return {
    incomingCall,
    activeCall,
    activeGroupCall,
    localStream,
    remoteStream,
    groupRemoteStreams,
    muted,
    cameraOff,
    callError,
    connectionQuality,
    startCall,
    acceptCall,
    declineCall,
    endCall,
    joinGroupCall,
    leaveGroupCall,
    toggleMute,
    toggleCamera,
  };
}

// ---------------------------------------------------------------------------
// useAudioLevel — drives the "speaking" ring around a tile's avatar
// ---------------------------------------------------------------------------

function useAudioLevel(stream, enabled = true) {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!enabled || !stream || stream.getAudioTracks().length === 0) {
      setLevel(0);
      return;
    }

    let audioCtx;
    let analyser;
    let source;
    let rafId;
    let dataArray;
    let lastUpdate = 0;
    let cancelled = false;

    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
    } catch {
      // AudioContext unavailable/blocked — just skip the speaking indicator.
      return;
    }

    const tick = (t) => {
      if (cancelled) return;
      analyser.getByteTimeDomainData(dataArray);
      let sumSquares = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const v = (dataArray[i] - 128) / 128;
        sumSquares += v * v;
      }
      const rms = Math.sqrt(sumSquares / dataArray.length);
      if (t - lastUpdate > 100) {
        setLevel(rms);
        lastUpdate = t;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      try {
        source.disconnect();
        analyser.disconnect();
        audioCtx.close();
      } catch {
        // ignore teardown errors
      }
    };
  }, [stream, enabled]);

  return level;
}

// ---------------------------------------------------------------------------
// VideoTile — a single participant's video/avatar tile
// ---------------------------------------------------------------------------
//
// FIXED vs the previous version: this always renders exactly one <video>
// element (never a structurally different branch depending on hasVideo), so
// React never remounts it — meaning srcObject never silently gets wiped out
// when a track goes live. srcObject is only reassigned when it actually
// changes, and AbortError from play() (caused by a superseding load, common
// under React StrictMode's double-invoked effects in dev) is treated as
// benign instead of logged as a failure.

export function VideoTile({ stream, muted = false, label, size = "large", showSpeakingRing = true }) {
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);
  const level = useAudioLevel(stream, showSpeakingRing);
  const isSpeaking = level > 0.045;

  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      if (el.srcObject !== (stream || null)) {
        el.srcObject = stream || null;
      }
      if (stream) {
        const playPromise = el.play();
        if (playPromise?.catch) {
          playPromise.catch((err) => {
            if (err?.name === "AbortError") return; // superseded by a newer play() — harmless
            console.error(`[VideoTile:${label || "?"}] play() blocked:`, err);
          });
        }
      }
    }

    if (!stream) {
      setHasVideo(false);
      return;
    }

    const recompute = () => {
      const tracks = stream.getVideoTracks();
      if (DEBUG_CALLS) {
        tracks.forEach((t) =>
          console.log(
            `[VideoTile:${label || "?"}] enabled=${t.enabled} readyState=${t.readyState} muted(webrtc)=${t.muted}`,
            t.getSettings()
          )
        );
      }
      const hasLiveVideo = tracks.some((t) => t.enabled && t.readyState === "live" && !t.muted);
      setHasVideo(hasLiveVideo);
    };

    recompute();

    const trackListeners = [];
    const attachTrackListeners = (track) => {
      track.addEventListener("mute", recompute);
      track.addEventListener("unmute", recompute);
      track.addEventListener("ended", recompute);
      trackListeners.push(track);
    };
    stream.getTracks().forEach(attachTrackListeners);

    const handleAddTrack = (e) => {
      attachTrackListeners(e.track);
      recompute();
    };
    const handleRemoveTrack = () => recompute();

    stream.addEventListener("addtrack", handleAddTrack);
    stream.addEventListener("removetrack", handleRemoveTrack);

    const videoEl = videoRef.current;
    const handleLoadedMetadata = () => recompute();
    if (videoEl) videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      stream.removeEventListener("addtrack", handleAddTrack);
      stream.removeEventListener("removetrack", handleRemoveTrack);
      if (videoEl) videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      trackListeners.forEach((track) => {
        track.removeEventListener("mute", recompute);
        track.removeEventListener("unmute", recompute);
        track.removeEventListener("ended", recompute);
      });
    };
  }, [stream, label]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden flex items-center justify-center bg-[#0F2B3A] transition-shadow duration-150 ${
        size === "large" ? "w-full h-full" : "w-28 h-20"
      } ${isSpeaking ? "ring-2 ring-[#4FD1A5]/70" : "ring-1 ring-white/5"}`}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className={hasVideo ? "w-full h-full object-cover" : "absolute w-px h-px opacity-0 pointer-events-none"}
      />
      {!hasVideo && (
        <div
          className={`rounded-full bg-gradient-to-br from-[#3E7CB1] to-[#1B4B75] flex items-center justify-center text-white font-semibold ${
            size === "large" ? "w-16 h-16 text-xl" : "w-10 h-10 text-sm"
          }`}
        >
          {label ? label.slice(0, 2).toUpperCase() : "?"}
        </div>
      )}
      {label && (
        <span className="absolute bottom-1.5 left-2 text-[11px] text-white/90 bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {label}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CallOverlay — incoming / active 1:1 / active group call UI
// ---------------------------------------------------------------------------

function useElapsed(connectedAt) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!connectedAt) {
      setElapsed(0);
      return;
    }
    const tick = () => setElapsed(Math.floor((Date.now() - connectedAt) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [connectedAt]);
  return elapsed;
}

function ControlButton({ onClick, active, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors ${
        active ? "bg-white/25" : "bg-white/10 hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

export function CallOverlay({ call = {} }) {
  const {
    incomingCall,
    activeCall,
    activeGroupCall,
    localStream,
    remoteStream,
    groupRemoteStreams,
    muted,
    cameraOff,
    callError,
    connectionQuality,
    acceptCall,
    declineCall,
    endCall,
    leaveGroupCall,
    toggleMute,
    toggleCamera,
  } = call;

  const elapsed = useElapsed(activeCall?.connectedAt);

  const errorBanner = callError ? (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] bg-[#3A1416] border border-[#E14F4A]/40 text-[#FFD9D6] text-sm px-4 py-2 rounded-xl shadow-lg max-w-sm text-center">
      {callError}
    </div>
  ) : null;

  const reconnectingBanner =
    connectionQuality === "degraded" && (activeCall || activeGroupCall) ? (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] bg-[#3A2E0F] border border-amber-400/40 text-amber-200 text-sm px-4 py-2 rounded-xl shadow-lg">
        Կապն անկայուն է, փորձում ենք վերականգնել…
      </div>
    ) : null;

  if (incomingCall && !activeCall && !activeGroupCall) {
    return (
      <>
        {errorBanner}
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F2B3A] rounded-3xl w-full max-w-xs p-7 text-center shadow-2xl border border-white/5">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full bg-[#3E7CB1]/30 animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#3E7CB1] to-[#1B4B75] flex items-center justify-center text-white text-2xl font-semibold">
                {(incomingCall.callerName || "?").slice(0, 2).toUpperCase()}
              </div>
            </div>
            <h2 className="mt-4 text-base font-semibold text-white">{incomingCall.callerName}</h2>
            <p className="text-xs text-[#8FADB8] mt-1">
              {incomingCall.type === "video" ? "Վիդեոզանգ…" : "Զանգում է…"}
            </p>
            <div className="flex justify-center gap-5 mt-6">
              <button
                onClick={declineCall}
                title="Մերժել"
                aria-label="Մերժել"
                className="w-14 h-14 rounded-full bg-[#E14F4A] hover:bg-[#c93f3b] text-white flex items-center justify-center shadow-lg transition-colors"
              >
                <i className="fa-solid fa-phone-slash"></i>
              </button>
              <button
                onClick={acceptCall}
                title="Ընդունել"
                aria-label="Ընդունել"
                className="w-14 h-14 rounded-full bg-[#34B27A] hover:bg-[#2a9868] text-white flex items-center justify-center shadow-lg transition-colors"
              >
                <i className="fa-solid fa-phone"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (activeCall) {
    const isVideo = activeCall.type === "video";
    return (
      <>
        {errorBanner}
        {reconnectingBanner}
        <div className="fixed inset-0 z-[9999] bg-[#08161F] flex flex-col">
          <div className="flex items-center gap-2 px-5 py-4 text-white shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                connectionQuality === "degraded" ? "bg-amber-400" : "bg-[#34B27A]"
              }`}
            />
            <span className="text-sm font-medium">{activeCall.peerName}</span>
            <span className="text-xs text-[#8FADB8]">
              {activeCall.status === "ringing" ? "Զանգում ենք…" : formatDuration(elapsed)}
            </span>
          </div>

          <div className="flex-1 relative px-4 pb-2">
            {isVideo ? (
              <>
                <VideoTile stream={remoteStream} label={activeCall.peerName} size="large" />
                <div className="absolute bottom-4 right-4 w-28 h-20 rounded-xl overflow-hidden border border-white/15 shadow-lg">
                  <VideoTile stream={localStream} muted label="Դու" size="small" showSpeakingRing={false} />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <VideoTile stream={remoteStream} label={activeCall.peerName} size="large" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 px-4 py-6 shrink-0">
            <ControlButton onClick={toggleMute} active={muted} title={muted ? "Միացնել ձայնը" : "Անջատել ձայնը"}>
              <i className={`fa-solid ${muted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
            </ControlButton>
            {isVideo && (
              <ControlButton
                onClick={toggleCamera}
                active={cameraOff}
                title={cameraOff ? "Միացնել տեսախցիկը" : "Անջատել տեսախցիկը"}
              >
                <i className={`fa-solid ${cameraOff ? "fa-video-slash" : "fa-video"}`}></i>
              </ControlButton>
            )}
            <button
              onClick={endCall}
              title="Ավարտել"
              aria-label="Ավարտել"
              className="w-14 h-14 rounded-full bg-[#E14F4A] hover:bg-[#c93f3b] text-white flex items-center justify-center shadow-lg transition-colors"
            >
              <i className="fa-solid fa-phone-slash"></i>
            </button>
          </div>
        </div>
      </>
    );
  }

  if (activeGroupCall) {
    const isVideo = activeGroupCall.type === "video";
    const remoteEntries = Object.entries(groupRemoteStreams);
    const total = remoteEntries.length + 1;
    return (
      <>
        {errorBanner}
        {reconnectingBanner}
        <div className="fixed inset-0 z-[9999] bg-[#08161F] flex flex-col">
          <div className="flex items-center gap-2 px-5 py-4 text-white shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                connectionQuality === "degraded" ? "bg-amber-400" : "bg-[#34B27A]"
              }`}
            />
            <span className="text-sm font-medium">{activeGroupCall.groupName}</span>
            <span className="text-xs text-[#8FADB8]">{total} մասնակից</span>
          </div>

          <div className={`flex-1 p-3 grid ${gridColsClass(total)} gap-2 auto-rows-fr overflow-y-auto`}>
            <VideoTile stream={localStream} muted label="Դու" size="large" showSpeakingRing={false} />
            {remoteEntries.map(([uid, stream]) => (
              <VideoTile key={uid} stream={stream} label={uid.slice(0, 6)} size="large" />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 px-4 py-6 shrink-0">
            <ControlButton onClick={toggleMute} active={muted} title={muted ? "Միացնել ձայնը" : "Անջատել ձայնը"}>
              <i className={`fa-solid ${muted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
            </ControlButton>
            {isVideo && (
              <ControlButton
                onClick={toggleCamera}
                active={cameraOff}
                title={cameraOff ? "Միացնել տեսախցիկը" : "Անջատել տեսախցիկը"}
              >
                <i className={`fa-solid ${cameraOff ? "fa-video-slash" : "fa-video"}`}></i>
              </ControlButton>
            )}
            <button
              onClick={leaveGroupCall}
              title="Դուրս գալ"
              aria-label="Դուրս գալ"
              className="w-14 h-14 rounded-full bg-[#E14F4A] hover:bg-[#c93f3b] text-white flex items-center justify-center shadow-lg transition-colors"
            >
              <i className="fa-solid fa-phone-slash"></i>
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
}