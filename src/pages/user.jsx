import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { header } from "../Components/header"
import { footer } from '../Components/footer.jsx';
function User() {
  const navigate = useNavigate();

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
      <div className="w-[60%] h-auto ml-[20%] flex flex-col items-center border border-gray-500 mt-[120px] mb-[60px]">
        <img src="https://i.pinimg.com/originals/65/1c/6d/651c6da502353948bdc929f02da2b8e0.jpg?nii=t" className="h-[350px] lg:h-[500px] md:h-[450px] sm:h-[400px]"/>
        <button
          onClick={handleLogout}
          className="text-red-500 text-[60px] bg-transparent border-none cursor-pointer"
        >
          Log out
        </button>
      </div>
      {footer()}
    </>
  )
}
export default User