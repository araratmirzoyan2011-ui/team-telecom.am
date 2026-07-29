import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../firebase.js";
import { auth } from "../firebase.js";
import { header } from "../Components/header"
import { footer } from '../Components/footer.jsx';

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
          setUserInfo(data);
        } else {
          console.warn("info collection-ում այս user-ի տվյալներ չկան");
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
      <div className="w-[70%] h-auto ml-[15%] grid grid-cols-[50%_50%] border border-gray-500 mt-[120px] mb-[60px]">
        <div className='flex flex-col items-center'>
          <img src="https://i.pinimg.com/originals/65/1c/6d/651c6da502353948bdc929f02da2b8e0.jpg?nii=t" className="h-[300px] lg:h-[450px] md:h-[400px] sm:h-[350px]"/>
          <button
            onClick={handleLogout}
            className="text-red-500 text-[60px] bg-transparent border-none cursor-pointer"
          >
            Log out
          </button>
        </div>

        <div className="flex flex-col justify-center p-8">
          {isLoading ? (
            <p>Բեռնվում է...</p>
          ) : userInfo ? (
            <div className="space-y-3">
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
            </div>
          ) : (
            <p>Տվյալներ չեն գտնվել</p>
          )}
        </div>
      </div>
      {footer()}
    </>
  )
}
export default User