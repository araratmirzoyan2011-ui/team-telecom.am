import { useState,useEffect } from 'react'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../firebase.js";
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';
function Coverage() {
    return (
        <>
        {header()}
      <div className="mt-[150px]! ml-[10%] w-3/5 h-auto flex flex-col font-sans border-b border-gray-500 mb-10 max-[1100px]:w-[70%] max-[900px]:w-4/5">
        <h1 className="mb-[10px] text-[48px] text-[rgb(17,22,44)]">Coverage</h1>
        <p className="mt-[10px] text-[18px] text-[rgb(12,13,22)] max-[1280px]:text-2xl max-[1100px]:text-[22px] max-[800px]:text-xl">
            Detailed information about the localities provided with fixed communication, applied technologies and provided services as of 01.01.2026 is presented here.        
        </p>
        <p className="mt-[10px] text-[18px] text-[rgb(12,13,22)] max-[1280px]:text-2xl max-[1100px]:text-[22px] max-[800px]:text-xl">
          Detailed information on the localities provided with mobile network coverage, applied technologies and provided services, as well as on localities without coverage as of 01.01.2026 is presented here.
        </p>
        <p className="mt-[10px] text-[18px] text-[rgb(12,13,22)] max-[1280px]:text-2xl max-[1100px]:text-[22px] max-[800px]:text-xl">
           Detailed information on the availability of mobile communication technologies (provided services) applied on sections of interstate highways as of 01.01.2026 is here.
        </p>
        
        </div>
      <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
        {share()}
      </div>
     <Footer />
      </>
    )
}
export default Coverage