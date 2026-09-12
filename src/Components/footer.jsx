import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useCallManager, CallOverlay } from "./CallManager.jsx";
import { ChatWidget } from "./ChatWidget.jsx";
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
  limit,
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

  // ---- Nor message-neri notification-neri related state ----
  // amen notification = { key, type: "user"|"group", uid, groupId, name, groupName, preview, time, count }
  const [notifications, setNotifications] = useState([]);
  const [myGroups, setMyGroups] = useState([]); // [{id, name}]
  const [contactUids, setContactUids] = useState([]);
  const [jumpTarget, setJumpTarget] = useState(null); // konkret chat/group@ bacelu hamar
  const audioCtxRef = useRef(null);
  const showChatWidgetRef = useRef(false);

  const unreadTotal = notifications.reduce((sum, n) => sum + n.count, 0);

  const addNotification = (entry) => {
    setNotifications((prev) => {
      const idx = prev.findIndex((n) => n.key === entry.key);
      if (idx !== -1) {
        const updated = [...prev];
        const existing = updated[idx];
        updated.splice(idx, 1);
        return [{ ...existing, preview: entry.preview, time: entry.time, count: existing.count + 1 }, ...updated];
      }
      return [{ ...entry, count: 1 }, ...prev].slice(0, 20);
    });
  };

  const dismissNotification = (key) => {
    setNotifications((prev) => prev.filter((n) => n.key !== key));
  };

  const clearAllNotifications = () => setNotifications([]);

  const handleNotificationClick = (n) => {
    setJumpTarget(
      n.type === "user"
        ? { type: "user", id: n.uid, token: Date.now() }
        : { type: "group", id: n.groupId, token: Date.now() }
    );
    setShowChatWidget(true);
    setShowAdminWidget(false);
    dismissNotification(n.key);
  };

  const call = useCallManager(currentUser);

  // Kayq mtnelu handzn microphone u camera-i tuyltvutyun@ harcnel, vor
  // chat-i mej hetagayum record/call anelu jamanak arden permission-@ lini stacac
  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        // mez petq e mionak permission-@, voch te aktiv stream, uti anmijapes kangnecnum enq
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((err) => {
        // user-@ mersel e kam sarq chuni, sxal chenq cuyc talis, ughakiv log
        console.warn("Microphone/camera permission-i sxal:", err);
      });
  }, []);

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

  // showChatWidget-ի "vercin" arjeqy ref-i mej pahel, vor listener closure-y hin stateov chaishi
  useEffect(() => {
    showChatWidgetRef.current = showChatWidget;
  }, [showChatWidget]);

  // Notification dzayn (AudioContext-ov, ansephakan fayl chi petq)
  const playNotificationSound = () => {
    try {
      const ctx =
        audioCtxRef.current ||
        (audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(880, ctx.currentTime);
      g.gain.setValueAtTime(0.15, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error("Sound error:", e);
    }
  };

  // user-i andamakcuac group-neri id-@ u anun@, vor imanank group message-nery et pahin
  useEffect(() => {
    if (!isLoggedIn || !currentUser) return;
    const q = query(collection(db, "groups"), where("members", "array-contains", currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMyGroups(snapshot.docs.map((d) => ({ id: d.id, name: d.data().name || "Group" })));
    });
    return () => unsubscribe();
  }, [isLoggedIn, currentUser]);

  // bolor kontaktneri uid-nery (1:1 chat-neri hamar), vor imanank irenc chatId-nery
  useEffect(() => {
    if (!isLoggedIn || !currentUser) return;
    const unsubscribe = onSnapshot(collection(db, "info"), (snapshot) => {
      const uids = snapshot.docs
        .map((d) => d.data().uid)
        .filter((uid) => uid && uid !== currentUser.uid);
      setContactUids(uids);
    });
    return () => unsubscribe();
  }, [isLoggedIn, currentUser]);

  // Amen chat-i u amen group-i hamar arandzin listener (voch te collectionGroup,
  // vorovhetev membership-based rules-y chi tuyl talis "list" tipi collectionGroup query,
  // mionak konkret path-ov query-nery)
  useEffect(() => {
    if (!isLoggedIn || !currentUser) return;

    const mountTime = Date.now();
    const unsubscribers = [];

    const previewOf = (msg) => {
      if (msg.type === "audio") return "🎤 Ձայնային հաղորդագրություն";
      return msg.text || "";
    };

    // 1:1 chat-neri listener-ner
    contactUids.forEach((uid) => {
      const chatId = getChatId(currentUser.uid, uid);
      const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "desc"), limit(1));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type !== "added" || change.doc.metadata.hasPendingWrites) return;
            const msg = change.doc.data();
            if (msg.senderId === currentUser.uid) return; // im grac message chi hashvum
            const msgTime = msg.createdAt?.toMillis ? msg.createdAt.toMillis() : Date.now();
            if (msgTime < mountTime) return; // hin message-nery chenq hashvum
            if (showChatWidgetRef.current) return; // chat-y bac e, notification chi petq

            addNotification({
              key: `user_${uid}`,
              type: "user",
              uid,
              name: msg.senderName || "Օգտատեր",
              preview: previewOf(msg),
              time: msgTime,
            });
            playNotificationSound();
          });
        },
        (err) => console.error("Chat listener sxal:", err)
      );
      unsubscribers.push(unsub);
    });

    // group-neri listener-ner
    myGroups.forEach((g) => {
      const q = query(collection(db, "groups", g.id, "messages"), orderBy("createdAt", "desc"), limit(1));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type !== "added" || change.doc.metadata.hasPendingWrites) return;
            const msg = change.doc.data();
            if (msg.senderId === currentUser.uid) return; // im grac message chi hashvum
            const msgTime = msg.createdAt?.toMillis ? msg.createdAt.toMillis() : Date.now();
            if (msgTime < mountTime) return; // hin message-nery chenq hashvum
            if (showChatWidgetRef.current) return; // chat-y bac e, notification chi petq

            addNotification({
              key: `group_${g.id}`,
              type: "group",
              groupId: g.id,
              groupName: g.name,
              name: msg.senderName || "Օգտատեր",
              preview: previewOf(msg),
              time: msgTime,
            });
            playNotificationSound();
          });
        },
        (err) => console.error("Group listener sxal:", err)
      );
      unsubscribers.push(unsub);
    });

    return () => unsubscribers.forEach((unsub) => unsub());
  }, [isLoggedIn, currentUser, contactUids, myGroups]);

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
          setShowChatWidget((prev) => {
            const next = !prev;
            if (next) {
              clearAllNotifications();
              setJumpTarget(null);
            }
            return next;
          });
          setShowAdminWidget(false);
        }}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#083f58] text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-[#0c2a38] transition-colors"
      >
        {showChatWidget ? (
          <span className="text-xl leading-none">✕</span>
        ) : (
          <>
            <i className="fa-regular fa-comment"></i>
            {unreadTotal > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center bg-[#e34234] text-white text-[10px] font-bold rounded-full border-2 border-white">
                {unreadTotal > 9 ? "9+" : unreadTotal}
              </span>
            )}
          </>
        )}
      </button>

      {/* Notification popover - cuyc e talis KONKRET um-@ grel e, u tuyl e talis jnjel amen meky arandzin */}
      {isLoggedIn && !showChatWidget && notifications.length > 0 && (
        <div className="fixed bottom-24 right-6 z-50 w-[320px] max-w-[90vw] max-h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#083f58] text-white shrink-0">
            <span className="text-xs font-semibold">Նոր հաղորդագրություններ</span>
            <button
              onClick={clearAllNotifications}
              className="text-[10px] text-white/80 hover:text-white underline shrink-0"
            >
              Մաքրել բոլորը
            </button>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {notifications.map((n) => (
              <div
                key={n.key}
                onClick={() => handleNotificationClick(n)}
                className="flex items-start gap-2 px-3 py-2.5 hover:bg-gray-50 cursor-pointer"
              >
                {n.type === "group" ? (
                  <div
                    className="flex items-center justify-center rounded-full font-semibold text-white shrink-0"
                    style={{ width: 32, height: 32, fontSize: 12, backgroundColor: "#3b6ea5" }}
                  >
                    <i className="fa-solid fa-users text-xs"></i>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center rounded-full font-semibold text-white shrink-0"
                    style={{ width: 32, height: 32, fontSize: 12, backgroundColor: getAvatarColor(n.uid) }}
                  >
                    {getInitials(n.name)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-medium text-gray-800 truncate">
                      {n.type === "group" ? n.groupName : n.name}
                    </span>
                    {n.count > 1 && (
                      <span className="text-[9px] font-bold text-white bg-[#e34234] rounded-full px-1.5 py-0.5 shrink-0">
                        {n.count}
                      </span>
                    )}
                  </div>
                  {n.type === "group" && (
                    <span className="text-[10px] text-gray-400 truncate block">{n.name} ✍️</span>
                  )}
                  <span className="text-[11px] text-gray-500 truncate block">{n.preview}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNotification(n.key);
                  }}
                  aria-label="Dismiss notification"
                  className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-300 hover:text-gray-500 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
            <ChatWidget onStartCall={call.startCall} onJoinGroupCall={call.joinGroupCall} jumpTarget={jumpTarget} />
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