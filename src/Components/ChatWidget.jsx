import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db } from "../firebase.js";
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

// --- Օժանդակ ֆունկցիաներ ---

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

function callStatusLabel(msg) {
  const kind = msg.callType === "video" ? "Video զանգ" : "Զանգ";
  switch (msg.callStatus) {
    case "answered":
      return `${kind} • ${formatDuration(msg.durationSec || 0)}`;
    case "declined":
      return `Մերժված ${kind.toLowerCase()}`;
    case "no_answer":
      return `Չպատասխանված ${kind.toLowerCase()}`;
    case "started":
      return `${kind} սկսվեց`;
    case "ended":
      return `${kind} ավարտվեց`;
    default:
      return kind;
  }
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

// --- Հիմնական ChatWidget Բաղադրիչ ---

export function ChatWidget({ onStartCall, onJoinGroupCall, jumpTarget }) {
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

  // groups
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

  const appliedJumpTokenRef = useRef(null);
  useEffect(() => {
    if (!jumpTarget || jumpTarget.token === appliedJumpTokenRef.current) return;
    if (jumpTarget.type === "user") {
      const u = users.find((x) => x.uid === jumpTarget.id);
      if (u) {
        openConversation(u);
        appliedJumpTokenRef.current = jumpTarget.token;
      }
    } else if (jumpTarget.type === "group") {
      const g = groups.find((x) => x.id === jumpTarget.id);
      if (g) {
        openGroupConversation(g);
        appliedJumpTokenRef.current = jumpTarget.token;
      }
    }
  }, [jumpTarget, users, groups]);

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
      alert("Չհաջողվեց մուտք գործել microphone-ին");
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
        alert("Ձայնագրությունը չափազանց մեծ է։");
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
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMessage = async (msg) => {
    if (!currentUser || msg.senderId !== currentUser.uid) return;
    if (!window.confirm("Ջնջե՞լ այս հաղորդագրությունը։")) return;
    try {
      if (view === "groupConversation" && selectedGroup) {
        await deleteDoc(doc(db, "groups", selectedGroup.id, "messages", msg.id));
        return;
      }
      if (view === "conversation" && selectedUser) {
        const chatId = getChatId(currentUser.uid, selectedUser.uid);
        await deleteDoc(doc(db, "chats", chatId, "messages", msg.id));
      }
    } catch (err) {
      console.error("Message-ի ջնջման սխալ:", err);
    }
  };

  const renderMessageBubble = (msg, isMine, accentColor) => {
    if (msg.type === "call") {
      return (
        <div key={msg.id} className="w-full flex justify-center my-2">
          <div className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <i className={`fa-solid ${msg.callType === "video" ? "fa-video" : "fa-phone"}`}></i>
            <span>{callStatusLabel(msg)}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">{formatTime(msg.createdAt)}</span>
          </div>
        </div>
      );
    }

    return (
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
          <div className="flex items-center gap-1 mt-0.5 px-1">
            <span className="text-[10px] text-gray-400">{formatTime(msg.createdAt)}</span>
            {isMine && (
              <button
                onClick={() => deleteMessage(msg)}
                aria-label="Delete message"
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

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
                {users.length === 0 && <div className="p-5 text-gray-400 text-xs text-center">Ոչ մի user չկա</div>}
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
                  <div className="p-5 text-gray-400 text-xs text-center">Դեռ group չկա</div>
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
                      <div className="text-[11px] text-gray-400 truncate">{(g.members || []).length} մասնակից</div>
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
            <button onClick={backToList} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100">
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
          <div className="flex-1 overflow-y-auto min-h-0">
            {users.map((u) => {
              const checked = selectedMemberIds.has(u.uid);
              return (
                <div key={u.id} onClick={() => toggleMember(u.uid)} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-[#3b6ea5] border-[#3b6ea5]" : "border-gray-300"}`}>
                    {checked && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <Avatar name={u.name || u.email} uid={u.uid} size={32} />
                  <div className="text-xs text-gray-800">{u.name || u.email}</div>
                </div>
              );
            })}
          </div>
          <div className="px-4 py-3 border-t">
            <button onClick={createGroup} disabled={creatingGroup} className="w-full bg-[#3b6ea5] text-white text-xs py-2.5 rounded-full">
              {creatingGroup ? "Ստեղծվում է..." : "Ստեղծել group"}
            </button>
          </div>
        </>
      )}

      {(view === "conversation" && selectedUser) || (view === "groupConversation" && selectedGroup) ? (
        <>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-gray-100 shrink-0">
            <button onClick={backToList} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#083f58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {view === "groupConversation" ? (
              <>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-gray-800 truncate">{selectedGroup.name}</div>
                </div>
                <button onClick={() => onJoinGroupCall?.(selectedGroup, "audio")} className="text-[#3b6ea5] p-1"><i className="fa-solid fa-phone"></i></button>
                <button onClick={() => onJoinGroupCall?.(selectedGroup, "video")} className="text-[#3b6ea5] p-1"><i className="fa-solid fa-video"></i></button>
              </>
            ) : (
              <>
                <Avatar name={selectedUser.name || selectedUser.email} uid={selectedUser.uid} size={30} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-gray-800 truncate">{selectedUser.name || selectedUser.email}</div>
                </div>
                <button onClick={() => onStartCall?.(selectedUser, "audio")} className="text-[#00a896] p-1"><i className="fa-solid fa-phone"></i></button>
                <button onClick={() => onStartCall?.(selectedUser, "video")} className="text-[#00a896] p-1"><i className="fa-solid fa-video"></i></button>
              </>
            )}
          </div>

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
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs text-red-600 font-medium">{formatDuration(recordingTime)}</span>
                </div>
                <button onClick={cancelRecording} className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">✕</button>
                <button onClick={stopRecordingAndSend} className="w-8 h-8 bg-[#e34234] text-white rounded-full flex items-center justify-center">▶</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="flex-1 bg-gray-100 border-none rounded-full px-3 py-2 text-xs outline-none"
                  value={text}
                  disabled={isUploading}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                />
                <button onClick={startRecording} disabled={isUploading} className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center">🎤</button>
                <button onClick={sendMessage} disabled={isUploading} className="w-8 h-8 text-white rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>➤</button>
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}