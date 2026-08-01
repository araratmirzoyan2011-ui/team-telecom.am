import { useEffect, useState } from "react";
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

// Երկու uid-ից եզակի ու կայուն chatId ենք կազմում
function getChatId(uid1, uid2) {
  return [uid1, uid2].sort().join("_");
}

// Initials avatar-ի համար
function getInitials(nameOrEmail) {
  if (!nameOrEmail) return "?";
  const trimmed = nameOrEmail.trim();
  const parts = trimmed.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

// Uid-ից deterministic գույն, որ նույն user-ը միշտ նույն avatar գույնն ունենա
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

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

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
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.uid !== currentUser.uid);

      setUsers(data);
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
      text,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || "Anonymous",
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {/* Ձախ sidebar */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
        <div className="px-5 py-5 border-b border-gray-100">
          <h1 className="text-base font-semibold text-gray-800">Messages</h1>
          <p className="text-xs text-gray-400 mt-0.5">{users.length} contacts</p>
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
      <div className="flex-1 flex flex-col">
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

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {messages.map((msg) => {
                const isMine = msg.senderId === currentUser?.uid;
                return (
                  <div key={msg.id} className={`mb-4 flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[65%] flex flex-col ${isMine ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                          isMine
                            ? "bg-[#00a896] text-white rounded-br-md"
                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[11px] text-gray-400 mt-1 px-1">
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 px-6 py-4 bg-white border-t border-gray-100">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#00a896]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 flex items-center justify-center bg-[#e34234] hover:bg-[#d23528] text-white rounded-full transition-colors shrink-0"
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2v6z" fill="currentColor" />
                </svg>
              </button>
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