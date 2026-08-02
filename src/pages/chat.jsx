import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

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

const AVATAR_COLORS = [
  "#00a896",
  "#e34234",
  "#3b6ea5",
  "#c98a2c",
  "#6a5acd",
  "#2c9e6f",
];
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

// Blob → base64 string (data URL)
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function Avatar({ name, uid, size = 40 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: getAvatarColor(uid),
      }}
    >
      {getInitials(name)}
    </div>
  );
}

// Firestore document-ի max size 1MB է. base64-ը հումքային չափից ~33% ավելի մեծ է,
// ուստի raw audio blob-ը սահմանափակում ենք ~700KB-ով (անվտանգության մարժայով)
const MAX_AUDIO_BYTES = 700 * 1024;

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Ձայնագրության state-ներ
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(collection(db, "info"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setUsers(data.filter((u) => u.uid !== currentUser.uid));

      const me = data.find((u) => u.uid === currentUser.uid);
      setCurrentUserInfo(me || null);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !selectedUser) {
      setMessages([]);
      return;
    }

    const chatId = getChatId(currentUser.uid, selectedUser.uid);

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  const sendMessage = async () => {
    if (text.trim() === "" || !currentUser || !selectedUser) return;

    const chatId = getChatId(currentUser.uid, selectedUser.uid);

    await addDoc(collection(db, "chats", chatId, "messages"), {
      type: "text",
      text,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || "Anonymous",
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  // Ձայնագրություն սկսել
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

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone-ի հասանելիության սխալ:", err);
      alert("Չհաջողվեց մուտք գործել microphone-ին, ստուգիր browser-ի permission-ները");
    }
  };

  // Ձայնագրություն կանգնեցնել և ուղարկել (base64-ով, ուղիղ Firestore)
  const stopRecordingAndSend = () => {
    if (!mediaRecorderRef.current) return;

    clearInterval(recordingIntervalRef.current);
    setIsRecording(false);
    const durationAtStop = recordingTime;

    mediaRecorderRef.current.onstop = async () => {
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());

      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

      if (audioBlob.size > MAX_AUDIO_BYTES) {
        alert(
          "Ձայնագրությունը չափազանց մեծ է (Firestore-ի սահմանաչափ). փորձիր ավելի կարճ ձայնագրություն, մի քանի վայրկյան։"
        );
        return;
      }

      await sendVoiceMessage(audioBlob, durationAtStop);
    };

    mediaRecorderRef.current.stop();
  };

  // Ձայնագրությունը չեղարկել
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
    if (!currentUser || !selectedUser) return;

    setIsUploading(true);
    try {
      const audioBase64 = await blobToBase64(audioBlob);
      const chatId = getChatId(currentUser.uid, selectedUser.uid);

      await addDoc(collection(db, "chats", chatId, "messages"), {
        type: "audio",
        audioData: audioBase64,
        duration,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || currentUser.email || "Anonymous",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Ձայնագրության ուղարկման սխալ:", err);
      alert("Չհաջողվեց ուղարկել ձայնագրությունը, փորձիր կրկին");
    } finally {
      setIsUploading(false);
    }
  };

  const isAdmin = currentUserInfo?.role === "admin";

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {/* Ձախ sidebar */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-800">Messages</h1>
            <p className="text-xs text-gray-400 mt-0.5">{users.length} contacts</p>
          </div>

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs font-medium text-[#00a896] border border-[#00a896]/30 hover:bg-[#00a896]/5 px-3 py-1.5 rounded-md transition-colors"
            >
              Admin
            </Link>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.length === 0 && (
            <div className="p-5 text-gray-400 text-sm text-center">Ոչ մի user չկա</div>
          )}
          {users.map((u) => {
            const isActive = selectedUser?.uid === u.uid;
            return (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`flex items-center gap-3 px-5 py-3 cursor-pointer border-l-2 transition-colors ${
                  isActive
                    ? "bg-[#00a896]/5 border-[#00a896]"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <Avatar name={u.name || u.email} uid={u.uid} />
                <div className="min-w-0">
                  <div className="font-medium text-sm text-gray-800 truncate">
                    {u.name || u.email}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{u.email}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Աջ մասը՝ chat */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedUser ? (
          <>
            <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
              <Avatar name={selectedUser.name || selectedUser.email} uid={selectedUser.uid} size={36} />
              <div>
                <div className="font-semibold text-sm text-gray-800">
                  {selectedUser.name || selectedUser.email}
                </div>
                <div className="text-xs text-gray-400">{selectedUser.email}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 min-h-0">
              {messages.map((msg) => {
                const isMine = msg.senderId === currentUser?.uid;
                return (
                  <div key={msg.id} className={`mb-4 flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[65%] flex flex-col ${isMine ? "items-end" : "items-start"}`}>
                      {msg.type === "audio" ? (
                        <div
                          className={`rounded-2xl px-3 py-2.5 shadow-sm flex items-center gap-2 ${
                            isMine
                              ? "bg-[#00a896] text-white rounded-br-md"
                              : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                          }`}
                        >
                          <audio
                            controls
                            src={msg.audioData}
                            className="h-8"
                            style={{ maxWidth: "220px" }}
                          />
                          {msg.duration != null && (
                            <span className="text-[11px] opacity-80 shrink-0">
                              {formatDuration(msg.duration)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                            isMine
                              ? "bg-[#00a896] text-white rounded-br-md"
                              : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                          }`}
                        >
                          {msg.text}
                        </div>
                      )}
                      <span className="text-[11px] text-gray-400 mt-1 px-1">
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 px-6 py-4 bg-white border-t border-gray-100">
              {isRecording ? (
                <>
                  <div className="flex-1 flex items-center gap-2 bg-red-50 rounded-full px-4 py-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                    <span className="text-sm text-red-600 font-medium">
                      Ձայնագրվում է... {formatDuration(recordingTime)}
                    </span>
                  </div>
                  <button
                    onClick={cancelRecording}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-colors shrink-0"
                    aria-label="Cancel"
                  >
                    ✕
                  </button>
                  <button
                    onClick={stopRecordingAndSend}
                    className="w-10 h-10 flex items-center justify-center bg-[#e34234] hover:bg-[#d23528] text-white rounded-full transition-colors shrink-0"
                    aria-label="Send voice message"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 20l18-8L3 4v6l12 2-12 2v6z" fill="currentColor" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Write a message..."
                    className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#00a896]"
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
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors shrink-0 disabled:opacity-60"
                    aria-label="Record voice message"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19 11a7 7 0 01-14 0M12 18v3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={isUploading}
                    className="w-10 h-10 flex items-center justify-center bg-[#e34234] hover:bg-[#d23528] text-white rounded-full transition-colors shrink-0 disabled:opacity-60"
                    aria-label="Send"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 20l18-8L3 4v6l12 2-12 2v6z" fill="currentColor" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-14 h-14 rounded-full bg-[#00a896]/10 flex items-center justify-center mb-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12c0 4.418-4.03 8-9 8-1.19 0-2.325-.204-3.365-.575L3 20l1.395-4.185C3.51 14.63 3 13.36 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  stroke="#00a896"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h2 className="text-gray-700 font-medium text-sm">Ընտրիր զրուցակից</h2>
            <p className="text-gray-400 text-xs mt-1">Ընտրիր user-ի ձախ ցուցակից, որ սկսես գրվել</p>
          </div>
        )}
      </div>
    </div>
  );
}