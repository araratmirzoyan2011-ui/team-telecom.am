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

function oneToOneChatId(a, b) {
  return [a, b].sort().join("_");
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

function pairKey(a, b) {
  return [a, b].sort().join("_");
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

export function useCallManager(currentUser) {
  const [incomingCall, setIncomingCall] = useState(null); // 1:1 զանգող, ringing
  const [activeCall, setActiveCall] = useState(null); // 1:1 ընթացիկ զանգ
  const [activeGroupCall, setActiveGroupCall] = useState(null); // group ընթացիկ զանգ

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null); // 1:1 remote
  const [groupRemoteStreams, setGroupRemoteStreams] = useState({}); // { uid: MediaStream }

  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const peerConnectionRef = useRef(null); // 1:1
  const groupPeerConnectionsRef = useRef({}); // { uid: RTCPeerConnection }
  const unsubscribersRef = useRef([]);
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
  };

  const stopLocalStream = () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    setLocalStream(null);
  };
  const cleanup1to1 = useCallback((reason = "ended") => {
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
    setMuted(false);
    setCameraOff(false);
  }, []);

  // ---------- group cleanup ----------
  const cleanupGroup = useCallback(() => {
    Object.values(groupPeerConnectionsRef.current).forEach((pc) => pc?.close());
    groupPeerConnectionsRef.current = {};
    setActiveGroupCall(null);
    setGroupRemoteStreams({});
    stopLocalStream();
    clearUnsubs();
    setMuted(false);
    setCameraOff(false);
  }, []);
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

        // ICE candidate-ները կարող են Firestore-ից հասնել ԱՌԱՋ, քան pc-ն ունի
        // remoteDescription (answer-ը դեռ չի եկել) - այդ դեպքում addIceCandidate-ը
        // ձախողվում է լուռ։ Այդպիսի candidate-ները հերթագրում ենք ու ավելացնում
        // հենց remoteDescription-ը դրվի (տես flushPendingCandidates ներքևում)։
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
            alert("Զանգը մերժվեց");
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
        alert("Չհաջողվեց սկսել զանգը, ստուգիր camera/microphone-ի permission-ները");
        cleanup1to1("ended");
      }
    },
    [currentUser, cleanup1to1]
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
      // pc.setRemoteDescription(offer)-ը կատարվել է վերևում, ուստի callerCandidates-ը
      // հիմա անվտանգ է ուղիղ ավելացնել, բայց ամեն դեպքում buffer-ով ենք անում
      // consistency-ի համար։
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
      alert("Չհաջողվեց ընդունել զանգը, ստուգիր camera/microphone-ի permission-ները");
      cleanup1to1("ended");
    }
  }, [incomingCall, cleanup1to1]);

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

  // ================= GROUP CALL (mesh) =================
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

      // Նույն race condition-ը, ինչ 1:1 զանգում. their candidate-ները հասնում
      // են այն ինքն էլ, մինչև setRemoteDescription-ը կատարվի, ուստի հերթագրում
      // ենք, եթե remoteDescription-ը դեռ չկա։
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
    [currentUser]
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

        // Ստուգում ենք՝ արդեն կային մասնակիցներ, թե ես եմ առաջինը (call-ը հենց
        // հիմա է սկսվում) - որ history-ում գրենք "call started" միայն մեկ անգամ։
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
        alert("Չհաջողվեց միանալ զանգին, ստուգիր camera/microphone-ի permission-ները");
        cleanupGroup();
      }
    },
    [currentUser, connectToGroupPeer, cleanupGroup]
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

  // ---------- mute / camera toggle-ներ (ընդհանուր 1:1 և group-ի համար) ----------
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

  // component unmount-ի ժամանակ մաքրում
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

// ================= Video tile (local/remote stream-ը կապում է <video>-ին) =================
//
// Bug-ի fix. MediaStream-ի mej video track-y karox e avelacvel AUDIO track-its heto,
// bayc pc.ontrack-y HER angam@ pass anum e NuYN MediaStream object-y (e.streams[0]) -
// uti React-y state update-y "identical reference" hamarum e u re-render chi anum,
// isk hasVideo-y mnum e stale false, texy video-y erbekh chi cuyc talis, herti hascac
// linelov handerz. Nuynpes track.enabled-y popoxelis (toggleCamera) stream-i reference-y
// chi popoxvum, uti UI-y chi tehsni popoxutyun@.
//
// Fix. VideoTile-y himav hasVideo-y pahum e sepakan state-um u lsum e MediaStream-i
// "addtrack"/"removetrack" event-nery, isk yurakanchyur track-i "mute"/"unmute"/"ended"
// event-nery, vor hima nranq real jamanakov force anen re-render.
function VideoTile({ stream, muted = false, label, size = "large" }) {
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.srcObject = stream || null;
      if (stream) {
        // Ognagorcum enq bratic play() anel, vor Safari-i pes browser-ner,
        // vory chen "autoplay"-y karkacnal component mount-i vray, sarqvi
        // hnaravorutyan depqum sarqvi
        const playPromise = el.play();
        if (playPromise?.catch) playPromise.catch(() => {});
      }
    }

    if (!stream) {
      setHasVideo(false);
      return;
    }

    const recompute = () => {
      setHasVideo(stream.getVideoTracks().some((t) => t.enabled && t.readyState === "live"));
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

    return () => {
      stream.removeEventListener("addtrack", handleAddTrack);
      stream.removeEventListener("removetrack", handleRemoveTrack);
      trackListeners.forEach((track) => {
        track.removeEventListener("mute", recompute);
        track.removeEventListener("unmute", recompute);
        track.removeEventListener("ended", recompute);
      });
    };
  }, [stream]);

  return (
    <div
      className={`relative bg-[#0c2a38] rounded-xl overflow-hidden flex items-center justify-center ${
        size === "large" ? "w-full h-full" : "w-28 h-20"
      }`}
    >
      {hasVideo ? (
        <video ref={videoRef} autoPlay playsInline muted={muted} className="w-full h-full object-cover" />
      ) : (
        <>
          {/*
            Chi karox enq "hidden" (display:none) class-y ognagorcel ayստeg, vorovhetev
            Safari/WebKit-y (iOS-i bolor browser-nery) pause/suspend en anum media
            element-nery vorery display:none en - dra hamar audio-only zangi jamanak
            dzayny lsvats chi lini. Anti tex@ "tesanelu chapov" tex e hatkacnum, bayc
            popokhelov ayn tesanelutyunic durs (opacity:0 + 1px chap), vor audio-y
            sharunakum e decode-vel u hnchel.
          */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={muted}
            className="absolute w-px h-px opacity-0 pointer-events-none"
          />
          <div className="w-12 h-12 rounded-full bg-[#3b6ea5] flex items-center justify-center text-white text-lg font-semibold">
            {label ? label.slice(0, 2).toUpperCase() : "?"}
          </div>
        </>
      )}
      {label && (
        <span className="absolute bottom-1 left-1.5 text-[10px] text-white bg-black/40 px-1.5 py-0.5 rounded">
          {label}
        </span>
      )}
    </div>
  );
}

// ================= Overlay UI =================
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
    acceptCall,
    declineCall,
    endCall,
    leaveGroupCall,
    toggleMute,
    toggleCamera,
  } = call;

  // --- Incoming call ringing modal ---
  if (incomingCall && !activeCall && !activeGroupCall) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-xs p-6 text-center shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#3b6ea5] flex items-center justify-center text-white text-2xl font-semibold animate-pulse">
            {(incomingCall.callerName || "?").slice(0, 2).toUpperCase()}
          </div>
          <h2 className="mt-3 text-sm font-semibold text-gray-800">{incomingCall.callerName}</h2>
          <p className="text-xs text-gray-400 mt-1">
            {incomingCall.type === "video" ? "Video call..." : "Զանգում է..."}
          </p>
          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={declineCall}
              aria-label="Decline"
              className="w-12 h-12 rounded-full bg-[#e34234] hover:bg-[#d23528] text-white flex items-center justify-center shadow-lg"
            >
              <i className="fa-solid fa-phone-slash"></i>
            </button>
            <button
              onClick={acceptCall}
              aria-label="Accept"
              className="w-12 h-12 rounded-full bg-[#2c9e6f] hover:bg-[#26875f] text-white flex items-center justify-center shadow-lg"
            >
              <i className="fa-solid fa-phone"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Active 1:1 call ---
  if (activeCall) {
    const isVideo = activeCall.type === "video";
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0c2a38] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 text-white shrink-0">
          <span className="text-sm font-medium">
            {activeCall.peerName} — {activeCall.status === "ringing" ? "Զանգում ենք..." : "Կապակցված"}
          </span>
        </div>

        <div className="flex-1 relative p-4">
          {isVideo ? (
            <>
              <VideoTile stream={remoteStream} label={activeCall.peerName} size="large" />
              <div className="absolute bottom-6 right-6 w-28 h-20 rounded-xl overflow-hidden border-2 border-white/30">
                <VideoTile stream={localStream} muted label="Դու" size="small" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-24 h-24 rounded-full bg-[#3b6ea5] flex items-center justify-center text-white text-3xl font-semibold">
                {(activeCall.peerName || "?").slice(0, 2).toUpperCase()}
              </div>
              <span className="text-white text-sm">{activeCall.peerName}</span>
              {/* audio-only remote stream-ը պետք է հնչի, ուստի hidden video tag audio-ով */}
              <VideoTile stream={remoteStream} label="" size="small" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 px-4 py-5 shrink-0">
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
              muted ? "bg-white/20" : "bg-white/10"
            }`}
          >
            <i className={`fa-solid ${muted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
          </button>
          {isVideo && (
            <button
              onClick={toggleCamera}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                cameraOff ? "bg-white/20" : "bg-white/10"
              }`}
            >
              <i className={`fa-solid ${cameraOff ? "fa-video-slash" : "fa-video"}`}></i>
            </button>
          )}
          <button
            onClick={endCall}
            className="w-14 h-14 rounded-full bg-[#e34234] hover:bg-[#d23528] text-white flex items-center justify-center shadow-lg"
          >
            <i className="fa-solid fa-phone-slash"></i>
          </button>
        </div>
      </div>
    );
  }

  // --- Active group call ---
  if (activeGroupCall) {
    const isVideo = activeGroupCall.type === "video";
    const remoteEntries = Object.entries(groupRemoteStreams);
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0c2a38] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 text-white shrink-0">
          <span className="text-sm font-medium">
            {activeGroupCall.groupName} — {remoteEntries.length + 1} մասնակից
          </span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-2 gap-2 auto-rows-fr overflow-y-auto">
          <VideoTile stream={localStream} muted label="Դու" size="large" />
          {remoteEntries.map(([uid, stream]) => (
            <VideoTile key={uid} stream={stream} label={uid.slice(0, 6)} size="large" />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 px-4 py-5 shrink-0">
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
              muted ? "bg-white/20" : "bg-white/10"
            }`}
          >
            <i className={`fa-solid ${muted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
          </button>
          {isVideo && (
            <button
              onClick={toggleCamera}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                cameraOff ? "bg-white/20" : "bg-white/10"
              }`}
            >
              <i className={`fa-solid ${cameraOff ? "fa-video-slash" : "fa-video"}`}></i>
            </button>
          )}
          <button
            onClick={leaveGroupCall}
            className="w-14 h-14 rounded-full bg-[#e34234] hover:bg-[#d23528] text-white flex items-center justify-center shadow-lg"
          >
            <i className="fa-solid fa-phone-slash"></i>
          </button>
        </div>
      </div>
    );
  }

  return null;
}