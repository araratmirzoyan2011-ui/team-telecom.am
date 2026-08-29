import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useCallManager, CallOverlay } from "./CallManager.jsx";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function getChatId(uid1, uid2) {
  return [uid1, uid2].sort().join("_");
}

function getInitials(nameOrEmail) {
  if (!nameOrEmail) return "?";
  const trimmed = nameOrEmail.trim();
  const parts = trimmed.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = ["#00a896", "#e34234", "#3b6ea5", "#c98a2c", "#6a5acd", "#2c9e6f"];
function getAvatarColor(uid) {
  if (!uid) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTime(timestamp) {
  if (!timestamp?.toDate) return "";
  return timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function Avatar({ name, uid, size = 36 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.38, backgroundColor: getAvatarColor(uid) }}
    >
      {getInitials(name)}
    </div>
  );
}

const MAX_AUDIO_BYTES = 700 * 1024;

function ChatWidget({ onStartCall, onJoinGroupCall }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [groupCallParticipants, setGroupCallParticipants] = useState([]);

  // list view state
  const [activeTab, setActiveTab] = useState("contacts"); // "contacts" | "groups"
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  // 1:1 conversation state
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // group conversation state
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMessages, setGroupMessages] = useState([]);

  // new group creation state
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState(new Set());
  const [creatingGroup, setCreatingGroup] = useState(false);

  const [text, setText] = useState("");
  const [view, setView] = useState("list"); // "list" | "conversation" | "groupConversation" | "newGroup"

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const messagesEndRef = useRef(null);

  const authInst = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(authInst, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, [authInst]);

  // contacts
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(collection(db, "info"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setUsers(data.filter((u) => u.uid !== currentUser.uid));
    });
    return () => unsubscribe();
  }, [currentUser]);

  // groups the user belongs to
  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "groups"), where("members", "array-contains", currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setGroups(data);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // 1:1 messages
  useEffect(() => {
    if (!currentUser || !selectedUser) {
      setMessages([]);
      return;
    }
    const chatId = getChatId(currentUser.uid, selectedUser.uid);
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(data);
    });
    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  // group messages
  useEffect(() => {
    if (!currentUser || !selectedGroup) {
      setGroupMessages([]);
      return;
    }
    const q = query(
      collection(db, "groups", selectedGroup.id, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setGroupMessages(data);
    });
    return () => unsubscribe();
  }, [currentUser, selectedGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, groupMessages]);

  // ընթացիկ group-ի call-ի մասնակիցները, որ ցույց տանք "call in progress" banner
  useEffect(() => {
    if (!selectedGroup || view !== "groupConversation") {
      setGroupCallParticipants([]);
      return;
    }
    const unsubscribe = onSnapshot(
      collection(db, "groups", selectedGroup.id, "callParticipants"),
      (snapshot) => {
        setGroupCallParticipants(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    );
    return () => unsubscribe();
  }, [selectedGroup, view]);

  const openConversation = (u) => {
    setSelectedUser(u);
    setView("conversation");
  };

  const openGroupConversation = (g) => {
    setSelectedGroup(g);
    setView("groupConversation");
  };

  const backToList = () => {
    setView("list");
    setSelectedUser(null);
    setSelectedGroup(null);
  };

  const openNewGroup = () => {
    setNewGroupName("");
    setSelectedMemberIds(new Set());
    setView("newGroup");
  };

  const toggleMember = (uid) => {
    setSelectedMemberIds((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  };

  const createGroup = async () => {
    if (!currentUser) return;
    if (newGroupName.trim() === "") {
      alert("Գրիր group-ի անունը");
      return;
    }
    if (selectedMemberIds.size === 0) {
      alert("Ընտրիր գոնե մեկ մասնակից");
      return;
    }
    setCreatingGroup(true);
    try {
      const memberUids = [currentUser.uid, ...Array.from(selectedMemberIds)];
      const docRef = await addDoc(collection(db, "groups"), {
        name: newGroupName.trim(),
        members: memberUids,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setSelectedGroup({ id: docRef.id, name: newGroupName.trim(), members: memberUids });
      setView("groupConversation");
    } catch (err) {
      console.error("Group-ի ստեղծման սխալ:", err);
      alert("Չհաջողվեց ստեղծել group-ը, փորձիր կրկին");
    } finally {
      setCreatingGroup(false);
    }
  };

  const sendMessage = async () => {
    if (text.trim() === "" || !currentUser) return;

    if (view === "groupConversation" && selectedGroup) {
      await addDoc(collection(db, "groups", selectedGroup.id, "messages"), {
        type: "text",
        text,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || currentUser.email || "Anonymous",
        createdAt: serverTimestamp(),
      });
      setText("");
      return;
    }

    if (view === "conversation" && selectedUser) {
      const chatId = getChatId(currentUser.uid, selectedUser.uid);
      await addDoc(collection(db, "chats", chatId, "messages"), {
        type: "text",
        text,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || currentUser.email || "Anonymous",
        createdAt: serverTimestamp(),
      });
      setText("");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
    } catch (err) {
      console.error("Microphone-ի հասանելիության սխալ:", err);
      alert("Չհաջողվեց մուտք գործել microphone-ին, ստուգիր browser-ի permission-ները");
    }
  };

  const stopRecordingAndSend = () => {
    if (!mediaRecorderRef.current) return;
    clearInterval(recordingIntervalRef.current);
    setIsRecording(false);
    const durationAtStop = recordingTime;

    mediaRecorderRef.current.onstop = async () => {
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

      if (audioBlob.size > MAX_AUDIO_BYTES) {
        alert("Ձայնագրությունը չափազանց մեծ է (Firestore-ի սահմանաչափ). փորձիր ավելի կարճ ձայնագրություն։");
        return;
      }
      await sendVoiceMessage(audioBlob, durationAtStop);
    };
    mediaRecorderRef.current.stop();
  };

  const cancelRecording = () => {
    if (!mediaRecorderRef.current) return;
    clearInterval(recordingIntervalRef.current);
    setIsRecording(false);
    mediaRecorderRef.current.onstop = () => {
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorderRef.current.stop();
    audioChunksRef.current = [];
  };

  const sendVoiceMessage = async (audioBlob, duration) => {
    if (!currentUser) return;
    setIsUploading(true);
    try {
      const audioBase64 = await blobToBase64(audioBlob);

      if (view === "groupConversation" && selectedGroup) {
        await addDoc(collection(db, "groups", selectedGroup.id, "messages"), {
          type: "audio",
          audioData: audioBase64,
          duration,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || currentUser.email || "Anonymous",
          createdAt: serverTimestamp(),
        });
        return;
      }

      if (view === "conversation" && selectedUser) {
        const chatId = getChatId(currentUser.uid, selectedUser.uid);
        await addDoc(collection(db, "chats", chatId, "messages"), {
          type: "audio",
          audioData: audioBase64,
          duration,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || currentUser.email || "Anonymous",
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Ձայնագրության ուղարկման սխալ:", err);
      alert("Չհաջողվեց ուղարկել ձայնագրությունը, փորձիր կրկին");
    } finally {
      setIsUploading(false);
    }
  };

  const renderMessageBubble = (msg, isMine, accentColor) => (
    <div key={msg.id} className={`mb-3 flex ${isMine ? "justify-end" : "justify-start"}`}>
      {!isMine && view === "groupConversation" && (
        <div className="mr-2 mt-1">
          <Avatar name={msg.senderName} uid={msg.senderId} size={26} />
        </div>
      )}
      <div className={`max-w-[75%] flex flex-col ${isMine ? "items-end" : "items-start"}`}>
        {!isMine && view === "groupConversation" && (
          <span className="text-[10px] text-gray-400 mb-0.5 px-1">{msg.senderName}</span>
        )}
        {msg.type === "audio" ? (
          <div
            className={`rounded-2xl px-2.5 py-2 shadow-sm flex items-center gap-1.5 ${
              isMine ? `text-white rounded-br-md` : "bg-gray-100 text-gray-800 rounded-bl-md"
            }`}
            style={isMine ? { backgroundColor: accentColor } : undefined}
          >
            <audio controls src={msg.audioData} className="h-7" style={{ maxWidth: "150px" }} />
            {msg.duration != null && (
              <span className="text-[10px] opacity-80 shrink-0">{formatDuration(msg.duration)}</span>
            )}
          </div>
        ) : (
          <div
            className={`rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm break-words ${
              isMine ? "text-white rounded-br-md" : "bg-gray-100 text-gray-800 rounded-bl-md"
            }`}
            style={isMine ? { backgroundColor: accentColor } : undefined}
          >
            {msg.text}
          </div>
        )}
        <span className="text-[10px] text-gray-400 mt-0.5 px-1">{formatTime(msg.createdAt)}</span>
      </div>
    </div>
  );

  const accentColor = view === "groupConversation" ? "#3b6ea5" : "#00a896";

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {view === "list" && (
        <>
          <div className="px-4 pt-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-semibold text-gray-800">Messages</h1>
              {activeTab === "groups" && (
                <button
                  onClick={openNewGroup}
                  className="text-[11px] font-medium text-white bg-[#3b6ea5] hover:bg-[#325d8a] px-2.5 py-1 rounded-full flex items-center gap-1"
                >
                  <span className="text-sm leading-none">+</span> New group
                </button>
              )}
            </div>
            <div className="flex gap-4 mt-2.5">
              <button
                onClick={() => setActiveTab("contacts")}
                className={`text-xs pb-2 border-b-2 transition-colors ${
                  activeTab === "contacts"
                    ? "border-[#00a896] text-[#00a896] font-medium"
                    : "border-transparent text-gray-400"
                }`}
              >
                Contacts
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`text-xs pb-2 border-b-2 transition-colors ${
                  activeTab === "groups"
                    ? "border-[#3b6ea5] text-[#3b6ea5] font-medium"
                    : "border-transparent text-gray-400"
                }`}
              >
                Groups
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {activeTab === "contacts" && (
              <>
                {users.length === 0 && (
                  <div className="p-5 text-gray-400 text-xs text-center">Ոչ մի user չկա</div>
                )}
                {users.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => openConversation(u)}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer border-l-2 border-transparent hover:bg-gray-50 transition-colors"
                  >
                    <Avatar name={u.name || u.email} uid={u.uid} />
                    <div className="min-w-0">
                      <div className="font-medium text-xs text-gray-800 truncate">{u.name || u.email}</div>
                      <div className="text-[11px] text-gray-400 truncate">{u.email}</div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "groups" && (
              <>
                {groups.length === 0 && (
                  <div className="p-5 text-gray-400 text-xs text-center">
                    Դեռ group չկա, սեղմիր «+ New group»՝ ստեղծելու համար
                  </div>
                )}
                {groups.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => openGroupConversation(g)}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer border-l-2 border-transparent hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="flex items-center justify-center rounded-full font-semibold text-white shrink-0"
                      style={{ width: 36, height: 36, fontSize: 14, backgroundColor: "#3b6ea5" }}
                    >
                      <i className="fa-solid fa-users text-sm"></i>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-xs text-gray-800 truncate">{g.name}</div>
                      <div className="text-[11px] text-gray-400 truncate">
                        {(g.members || []).length} մասնակից
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}

      {view === "newGroup" && (
        <>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-gray-100 shrink-0">
            <button
              onClick={backToList}
              aria-label="Back"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#083f58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-xs font-semibold text-gray-800">Ստեղծել group</span>
          </div>

          <div className="px-4 py-3 border-b border-gray-100 shrink-0">
            <input
              type="text"
              placeholder="Group-ի անունը..."
              className="w-full bg-gray-100 border-none rounded-full px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-[#3b6ea5]"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>

          <div className="px-4 py-2 text-[11px] text-gray-400 shrink-0">
            Ընտրիր մասնակիցներին ({selectedMemberIds.size} ընտրված)
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {users.length === 0 && (
              <div className="p-5 text-gray-400 text-xs text-center">Ոչ մի user չկա</div>
            )}
            {users.map((u) => {
              const checked = selectedMemberIds.has(u.uid);
              return (
                <div
                  key={u.id}
                  onClick={() => toggleMember(u.uid)}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      checked ? "bg-[#3b6ea5] border-[#3b6ea5]" : "border-gray-300"
                    }`}
                  >
                    {checked && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <Avatar name={u.name || u.email} uid={u.uid} size={32} />
                  <div className="min-w-0">
                    <div className="font-medium text-xs text-gray-800 truncate">{u.name || u.email}</div>
                    <div className="text-[11px] text-gray-400 truncate">{u.email}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-gray-100 shrink-0">
            <button
              onClick={createGroup}
              disabled={creatingGroup}
              className="w-full bg-[#3b6ea5] hover:bg-[#325d8a] text-white text-xs font-medium py-2.5 rounded-full transition-colors disabled:opacity-60"
            >
              {creatingGroup ? "Ստեղծվում է..." : "Ստեղծել group"}
            </button>
          </div>
        </>
      )}

      {(view === "conversation" && selectedUser) || (view === "groupConversation" && selectedGroup) ? (
        <>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-gray-100 shrink-0">
            <button
              onClick={backToList}
              aria-label="Back"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#083f58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {view === "groupConversation" ? (
              <>
                <div
                  className="flex items-center justify-center rounded-full font-semibold text-white shrink-0"
                  style={{ width: 30, height: 30, fontSize: 12, backgroundColor: "#3b6ea5" }}
                >
                  <i className="fa-solid fa-users text-xs"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-gray-800 truncate">{selectedGroup.name}</div>
                  <div className="text-[10px] text-gray-400 truncate">
                    {(selectedGroup.members || []).length} մասնակից
                  </div>
                </div>
                <button
                  onClick={() => onJoinGroupCall?.(selectedGroup, "audio")}
                  aria-label="Group audio call"
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0 text-[#3b6ea5]"
                >
                  <i className="fa-solid fa-phone text-xs"></i>
                </button>
                <button
                  onClick={() => onJoinGroupCall?.(selectedGroup, "video")}
                  aria-label="Group video call"
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0 text-[#3b6ea5]"
                >
                  <i className="fa-solid fa-video text-xs"></i>
                </button>
              </>
            ) : (
              <>
                <Avatar name={selectedUser.name || selectedUser.email} uid={selectedUser.uid} size={30} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-gray-800 truncate">
                    {selectedUser.name || selectedUser.email}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">{selectedUser.email}</div>
                </div>
                <button
                  onClick={() => onStartCall?.(selectedUser, "audio")}
                  aria-label="Audio call"
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0 text-[#00a896]"
                >
                  <i className="fa-solid fa-phone text-xs"></i>
                </button>
                <button
                  onClick={() => onStartCall?.(selectedUser, "video")}
                  aria-label="Video call"
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0 text-[#00a896]"
                >
                  <i className="fa-solid fa-video text-xs"></i>
                </button>
              </>
            )}
          </div>

          {view === "groupConversation" && groupCallParticipants.length > 0 && (
            <div className="flex items-center justify-between px-3 py-2 bg-[#3b6ea5]/10 border-b border-gray-100 shrink-0">
              <span className="text-[11px] text-[#3b6ea5] font-medium">
                <i className="fa-solid fa-circle text-[6px] mr-1 align-middle animate-pulse"></i>
                Զանգ ընթացքի մեջ է ({groupCallParticipants.length})
              </span>
              <button
                onClick={() => onJoinGroupCall?.(selectedGroup, "video")}
                className="text-[11px] font-medium text-white bg-[#3b6ea5] hover:bg-[#325d8a] px-2.5 py-1 rounded-full"
              >
                Միանալ
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-3 py-3 min-h-0">
            {(view === "groupConversation" ? groupMessages : messages).map((msg) =>
              renderMessageBubble(msg, msg.senderId === currentUser?.uid, accentColor)
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-gray-100 shrink-0">
            {isRecording ? (
              <>
                <div className="flex-1 flex items-center gap-2 bg-red-50 rounded-full px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span className="text-xs text-red-600 font-medium">{formatDuration(recordingTime)}</span>
                </div>
                <button
                  onClick={cancelRecording}
                  aria-label="Cancel"
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-colors shrink-0"
                >
                  ✕
                </button>
                <button
                  onClick={stopRecordingAndSend}
                  aria-label="Send voice message"
                  className="w-8 h-8 flex items-center justify-center bg-[#e34234] hover:bg-[#d23528] text-white rounded-full transition-colors shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20l18-8L3 4v6l12 2-12 2v6z" fill="currentColor" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="flex-1 bg-gray-100 border-none rounded-full px-3 py-2 text-xs outline-none focus:ring-1"
                  style={{ "--tw-ring-color": accentColor }}
                  value={text}
                  disabled={isUploading}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <button
                  onClick={startRecording}
                  disabled={isUploading}
                  aria-label="Record voice message"
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors shrink-0 disabled:opacity-60"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M19 11a7 7 0 01-14 0M12 18v3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <button
                  onClick={sendMessage}
                  disabled={isUploading}
                  aria-label="Send"
                  className="w-8 h-8 flex items-center justify-center text-white rounded-full transition-colors shrink-0 disabled:opacity-60"
                  style={{ backgroundColor: accentColor }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20l18-8L3 4v6l12 2-12 2v6z" fill="currentColor" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

// ----------------- Widget-ի համար հարմարեցված AdminPanel -----------------
function AdminPanelWidget() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const authInst = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(authInst, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, [authInst]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(collection(db, "info"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAllUsers(data);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleDeleteUser = async (userDoc) => {
    setLoadingId(userDoc.id);
    try {
      await deleteDoc(doc(db, "info", userDoc.id));
    } catch (err) {
      console.error("Ջնջման սխալ:", err);
      alert("Չհաջողվեց ջնջել, փորձիր կրկին");
    } finally {
      setLoadingId(null);
      setConfirmTarget(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-gray-100 shrink-0">
        <h1 className="text-sm font-semibold text-gray-800">Account-ների կառավարում</h1>
        <p className="text-[11px] text-gray-400">{allUsers.length} account ընդհանուր</p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-100">
        {allUsers.map((u) => (
          <div key={u.id} className="flex items-center justify-between px-4 py-3 gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={u.name || u.email} uid={u.uid} size={32} />
              <div className="min-w-0">
                <div className="font-medium text-xs text-gray-800 truncate flex items-center gap-1.5">
                  <span className="truncate">{u.name || u.email}</span>
                  {u.role === "admin" && (
                    <span className="text-[9px] font-semibold text-[#00a896] bg-[#00a896]/10 px-1.5 py-0.5 rounded shrink-0">
                      ADMIN
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-400 truncate">{u.email}</div>
              </div>
            </div>

            {u.uid !== currentUser?.uid && (
              <>
                {confirmTarget === u.id ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleDeleteUser(u)}
                      disabled={loadingId === u.id}
                      className="text-[10px] font-medium text-white bg-[#e34234] hover:bg-[#d23528] px-2 py-1 rounded-md disabled:opacity-60"
                    >
                      {loadingId === u.id ? "..." : "Այո"}
                    </button>
                    <button
                      onClick={() => setConfirmTarget(null)}
                      className="text-[10px] text-gray-500 hover:text-gray-700 px-1.5"
                    >
                      Չեղ.
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmTarget(u.id)}
                    className="text-[10px] font-medium text-[#e34234] border border-[#e34234]/30 hover:bg-[#e34234]/5 px-2 py-1 rounded-md shrink-0"
                  >
                    Ջնջել
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------- Footer -----------------------------
export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showAdminWidget, setShowAdminWidget] = useState(false);

  const call = useCallManager(currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user);
      if (!user) setIsAdmin(false);
    });
    return () => unsubscribe();
  }, []);

  // Role-ի ստուգում, որ իմանանք admin button ցույց տալ, թե ոչ
  useEffect(() => {
    if (!isLoggedIn) return;
    const unsubscribe = onSnapshot(collection(db, "info"), (snapshot) => {
      const currentUid = auth.currentUser?.uid;
      const me = snapshot.docs.map((d) => d.data()).find((u) => u.uid === currentUid);
      setIsAdmin(me?.role === "admin");
    });
    return () => unsubscribe();
  }, [isLoggedIn]);

  return (
    <>
      <footer className="flex flex-row justify-around w-full h-[600px] bg-[#083f58] text-white max-[1100px]:h-[700px] max-[900px]:h-[850px] max-[877px]:h-[940px] max-[801px]:mt-[30px] max-[801px]:h-[500px] max-[801px]:justify-center">
        <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
          <div
            className="ml-[5%] w-[200px] h-[60px] bg-contain bg-no-repeat"
            style={{ backgroundImage: "url(https://www.telecomarmenia.am/img/logo-light.svg?v=1)" }}
          ></div>
          <div className="flex mt-[30px] ml-[5%] text-xl">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
          <div className="flex mt-[30px] ml-[5%] text-xl">
            <i className="fa-solid fa-phone"></i>
            <p>100</p>
          </div>
          <div className="flex mt-[30px] ml-[5%] text-xl">
            <i className="fa-regular fa-envelope"></i>
            <p>info@telecomarmenia.am</p>
          </div>
          <div className="ml-5 mt-[60px] flex text-white">
            <img
              src="https://www.telecomarmenia.am/img/redesign/qr.svg"
              alt=""
              className="w-[100px] h-[100px]"
            />
            <div className="ml-[10px] flex flex-col">
              <img src="https://www.telecomarmenia.am/img/redesign/app_store.png" alt="" />
              <img
                src="https://www.telecomarmenia.am/img/redesign/google_play.png"
                alt=""
                className="mt-[5px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-start max-[900px]:flex-wrap max-[801px]:hidden">
          <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
            <img
              src="https://www.telecomarmenia.am/files/icons/1/16511388037707/45x45.png"
              alt=""
              className="w-[60px] h-[60px]"
            />
            <h1 className="mt-5 text-xl max-[1000px]:mt-5 max-[1000px]:text-lg">About Company</h1>
            <Link to="/about-us" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">About us</Link>
            <Link to="/conmus" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Connections museum</Link>
            <Link to="/news" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">News</Link>
            <Link to="/carrer" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Career in Telecom Armenia</Link>
            <Link to="/res" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Results and reporting</Link>
            <Link to="/CorEthCon" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Corporate Ethics and Compliance</Link>
            <Link to="/sus" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Sustainable Development</Link>
            <Link to="/Tosh" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">To shareholders</Link>
          </div>

          <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
            <img
              src="https://www.telecomarmenia.am/files/icons/1/16511387478667/45x45.png"
              alt=""
              className="w-[60px] h-[60px]"
            />
            <h1 className="mt-5 text-xl max-[1000px]:mt-5 max-[1000px]:text-lg">Information</h1>
            <Link to="/TermandCon" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Terms and conditions</Link>
            <Link to="/Security" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Security</Link>
            <Link to="/paymanner" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">E-shop terms</Link>
            <Link to="/Creditterm" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Credit terms</Link>
            <Link to="/deliveryTerm" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Delivery terms</Link>
            <Link to="/ServiceCenters" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Sales and service centers</Link>
            <Link to="/Coverage" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Coverage</Link>
            <Link to="/MobNetwork" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Mobile network coverage areas</Link>
            <Link to="/InternetArias" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Team internet available areas</Link>
            <Link to="/UsfullDoc" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Useful documents</Link>
            <Link to="/Parthners" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Partners and suppliers</Link>
            <Link to="/Privacy-Policy" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Privacy policy</Link>
            <Link to="/region-code" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">RA regions' codes</Link>
          </div>

          <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
            <img
              src="https://www.telecomarmenia.am/files/icons/1/16511387748123/45x45.png"
              alt=""
              className="w-[60px] h-[60px]"
            />
            <h1 className="mt-5 text-xl max-[1000px]:mt-5 max-[1000px]:text-lg">Team applications</h1>
            <Link to="/TeamTv" className="block text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">TeamTV</Link>
            <Link to="/MyTeam" className="block text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">My Team</Link>
            <Link to="/TeamPay" className="block text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">TeamPay</Link>
            <Link to="/TeamEnergy" className="block text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Team Energy</Link>
          </div>
        </div>
      </footer>

      {/* Chat icon - mek koch ak, chat-i ishum ka Contacts u Groups tab-ery */}
      <button
        onClick={() => {
          if (!isLoggedIn) {
            alert("Չաթը բացելու համար անհրաժեշտ է գրանցվել/մուտք գործել");
            return;
          }
          setShowChatWidget((prev) => !prev);
          setShowAdminWidget(false);
        }}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#083f58] text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-[#0c2a38] transition-colors"
      >
        {showChatWidget ? (
          <span className="text-xl leading-none">✕</span>
        ) : (
          <i className="fa-regular fa-comment"></i>
        )}
      </button>

      {isLoggedIn && showChatWidget && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[92vw] h-[560px] max-h-[75vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">
          <div className="flex items-center justify-between px-4 py-3 bg-[#083f58] text-white shrink-0">
            <span className="text-sm font-semibold">Messages</span>
            <button
              onClick={() => setShowChatWidget(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <ChatWidget onStartCall={call.startCall} onJoinGroupCall={call.joinGroupCall} />
          </div>
        </div>
      )}

      <CallOverlay call={call} />

      {isLoggedIn && isAdmin && (
        <>
          <button
            onClick={() => {
              setShowAdminWidget((prev) => !prev);
              setShowChatWidget(false);
            }}
            aria-label="Open admin panel"
            className="fixed bottom-6 right-24 z-50 w-14 h-14 bg-[#e34234] text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-[#d23528] transition-colors"
          >
            {showAdminWidget ? (
              <span className="text-xl leading-none">✕</span>
            ) : (
              <i className="fa-solid fa-user-shield"></i>
            )}
          </button>

          {showAdminWidget && (
            <div className="fixed bottom-24 right-24 z-50 w-[380px] max-w-[92vw] h-[560px] max-h-[75vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 max-[500px]:right-6">
              <div className="flex items-center justify-between px-4 py-3 bg-[#e34234] text-white shrink-0">
                <span className="text-sm font-semibold">Admin Panel</span>
                <button
                  onClick={() => setShowAdminWidget(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close admin panel"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <AdminPanelWidget />
              </div>
            </div>
          )}
        </>
      )}

      <div className="text-white w-full h-10 bg-[#0c2a38] flex justify-center items-center">
        <p>© 2026 Telecom Armenia OJSC. All rights reserved. Developed by Team Solutions CJSC.</p>
      </div>
    </>
  );
}