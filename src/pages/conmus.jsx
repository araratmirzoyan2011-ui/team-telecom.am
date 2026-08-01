import { useState,useEffect } from 'react'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../firebase.js";
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';
function Connections() {
    return(
        <>
        {header()}
      <div className="mt-[150px]! ml-[10%] w-3/5 h-[150px] flex flex-col font-sans border-b border-gray-500 mb-10">
        <h1 className="mb-10 text-[48px] text-[rgb(17,22,44)]">Connections museum</h1>
      </div>
      <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
        {share()}
      </div>
      <Footer />
        </>
    )
}
export default Connections