import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../firebase.js";
import { auth } from "../firebase.js";
import { header } from "../Components/header"
import Footer from '../Components/footer.jsx';

const DEFAULT_AVATAR = "https://i.pinimg.com/originals/65/1c/6d/651c6da502353948bdc929f02da2b8e0.jpg?nii=t";

function User() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/page1");
        return;
      }

      try {
        const q = query(collection(db, "info"), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          // եթե Firestore-ում photoURL չկա, բայց Auth-ում կա (օր. Google user), օգտագործում ենք այն
          setUserInfo({
            ...data,
            photoURL: data.photoURL || currentUser.photoURL || null,
          });
        } else {
          console.warn("info collection-ում այս user-ի տվյալներ չկան");
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
  }, [navigate]);

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

        <div className="flex flex-col  p-8">
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
              <button
                onClick={handleLogout}
                className="text-red-500 w-[100px] h-[40px] text-[24px] bg-transparent border border-red-600 rounded-[10px] cursor-pointer"
              >
                Log out
              </button>
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
export default User