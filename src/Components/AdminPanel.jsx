import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function getInitials(nameOrEmail) {
  if (!nameOrEmail) return "?";
  const parts = nameOrEmail.trim().split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return nameOrEmail.slice(0, 2).toUpperCase();
}

export default function AdminPanel() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(collection(db, "info"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setUsers(data);
      const me = data.find((u) => u.uid === currentUser.uid);
      setCurrentUserInfo(me || null);
    });
    return () => unsub();
  }, [currentUser]);

  const handleDelete = async (userDoc) => {
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

  if (!currentUser) {
    return <div className="p-6 text-gray-500">Բեռնվում է...</div>;
  }

  if (!currentUserInfo || currentUserInfo.role !== "admin") {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-700">Մուտքն արգելված է</div>
          <p className="text-sm text-gray-400 mt-1">Այս էջը հասանելի է միայն ադմինիստրատորին</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">Account-ների կառավարում</h1>
        <p className="text-sm text-gray-400 mb-6">{users.length} account ընդհանուր</p>

        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#00a896] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {getInitials(u.name || u.email)}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm text-gray-800 truncate">
                    {u.name || u.email}
                    {u.role === "admin" && (
                      <span className="ml-2 text-[10px] font-semibold text-[#00a896] bg-[#00a896]/10 px-1.5 py-0.5 rounded">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{u.email}</div>
                </div>
              </div>

              {u.uid !== currentUser.uid && (
                <>
                  {confirmTarget === u.id ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-500">Վստա՞հ ես</span>
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={loadingId === u.id}
                        className="text-xs font-medium text-white bg-[#e34234] hover:bg-[#d23528] px-3 py-1.5 rounded-md disabled:opacity-60"
                      >
                        {loadingId === u.id ? "Ջնջվում է..." : "Այո, ջնջել"}
                      </button>
                      <button
                        onClick={() => setConfirmTarget(null)}
                        className="text-xs text-gray-500 hover:text-gray-700 px-2"
                      >
                        Չեղարկել
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmTarget(u.id)}
                      className="text-xs font-medium text-[#e34234] border border-[#e34234]/30 hover:bg-[#e34234]/5 px-3 py-1.5 rounded-md shrink-0"
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
    </div>
  );
}