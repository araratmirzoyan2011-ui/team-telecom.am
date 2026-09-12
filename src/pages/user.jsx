import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../firebase.js";
import { auth } from "../firebase.js";
import { header } from "../Components/header";
import Footer from '../Components/footer.jsx';
import { useCartStore } from '../Components/useCartStore';

const DEFAULT_AVATAR = "https://i.pinimg.com/originals/65/1c/6d/651c6da502353948bdc929f02da2b8e0.jpg?nii=t";

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#e7ebed] last:border-b-0">
      <div className="mt-0.5 w-8 h-8 rounded-full bg-[#083f58]/[0.06] flex items-center justify-center shrink-0">
        <i className={`fa-solid ${icon} text-[#083f58] text-xs`}></i>
      </div>
      <div className="min-w-0">
        <span className="text-[11px] text-gray-400 block leading-tight">{label}</span>
        <span className="text-sm font-medium text-[#12242c] break-words">{value || "—"}</span>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = useCartStore((state) => state.loadUserData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/page1");
        return;
      }

      try {
        await loadUserData();

        const q = query(collection(db, "info"), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setUserInfo({
            ...data,
            photoURL: data.photoURL || currentUser.photoURL || null,
          });
        } else {
          setUserInfo({
            name: currentUser.displayName || '',
            email: currentUser.email || '',
            about: '',
            photoURL: currentUser.photoURL || null,
          });
        }
      } catch (error) {
        console.error("Տվյալները բերելիս սխալ առաջացավ:", error.message);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, loadUserData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/page1");
    } catch (error) {
      console.error("Logout-ի սխալ:", error.message);
    }
  };

  return (
    <>
      {header()}

      <div className="w-full min-h-[70vh] bg-[#f5f7f8] flex items-start justify-center px-4 py-10 mt-[70px] mb-[40px]">
        <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-[0_1px_3px_rgba(8,63,88,0.08),0_8px_24px_rgba(8,63,88,0.08)] overflow-hidden">
          {/* Brand banner + avatar */}
          <div className="relative h-[86px] bg-gradient-to-r from-[#083f58] to-[#0c2a38]">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              {isLoading ? (
                <div className="w-[84px] h-[84px] rounded-full border-4 border-white bg-gray-200 animate-pulse" />
              ) : (
                <img
                  src={userInfo?.photoURL || DEFAULT_AVATAR}
                  alt="Profile"
                  className="w-[84px] h-[84px] rounded-full object-cover border-4 border-white"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

          <div className="pt-12 px-5 pb-5">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 py-6">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : userInfo ? (
              <>
                <div className="text-center mb-4">
                  <h1 className="text-base font-semibold text-[#12242c] break-words">
                    {userInfo.name || "Անանուն օգտատեր"}
                  </h1>
                  <span className="text-xs text-gray-400 break-words">{userInfo.email}</span>
                </div>

                <div className="mb-2">
                  <InfoRow icon="fa-user" label="Nickname" value={userInfo.name} />
                  <InfoRow icon="fa-envelope" label="Email" value={userInfo.email} />
                  <InfoRow icon="fa-circle-info" label="About" value={userInfo.about} />
                </div>

                <div className="flex flex-col-reverse xs:flex-row gap-2 mt-5">
                  <button
                    onClick={handleLogout}
                    className="flex-1 h-11 text-sm font-medium text-[#e34234] bg-transparent border border-[#e34234]/30 rounded-full hover:bg-[#e34234]/5 transition-colors"
                  >
                    Log out
                  </button>

                  <button
                    onClick={() => navigate("/card")}
                    className="flex-1 h-11 flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#00a896] rounded-full hover:bg-[#00907f] transition-colors"
                  >
                    <i className="fa-solid fa-basket-shopping text-xs"></i>
                    <span>Card</span>
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-sm text-gray-400 py-8">Տվյալներ չեն գտնվել</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default User;