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
      <div className="w-[40%] h-auto ml-[30%] grid grid-cols-[50%_50%] border border-gray-500 mt-[120px] mb-[60px]">
        <div className='flex flex-col items-center'>
          <img
            src={userInfo?.photoURL || DEFAULT_AVATAR}
            alt="Profile"
            className="h-[150px] mb-[20px] mt-[20px] w-[150] lg:h-[300px] w-[300] md:h-[250px] w-[250] sm:h-[200px] w-[200] rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col p-8">
          {isLoading ? (
            <p>Բեռնվում է...</p>
          ) : userInfo ? (
            <div className="space-y-3 mt-[40px]">
              <div>
                <span className="text-xs text-gray-500 block">Nickname</span>
                <span className="text-lg font-medium">{userInfo.name}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Email</span>
                <span className="text-lg font-medium">{userInfo.email}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">About</span>
                <span className="text-lg font-medium">{userInfo.about}</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={handleLogout}
                  className="text-red-500 w-[100px] h-[40px] text-[18px] bg-transparent border border-red-600 rounded-[10px] cursor-pointer hover:bg-red-50 transition-colors"
                >
                  Log out
                </button>

                <button
                  onClick={() => navigate("/card")}
                  className="flex items-center justify-center gap-2 text-white w-[110px] h-[40px] text-[18px] bg-red-600 border border-red-600 rounded-[10px] cursor-pointer hover:bg-red-700 transition-colors"
                >
                  <i className="fa-solid fa-basket-shopping text-sm"></i>
                  <span>Card</span>
                </button>
              </div>

            </div>
          ) : (
            <p>Տվյալներ չեն գտնվել</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
export default User;