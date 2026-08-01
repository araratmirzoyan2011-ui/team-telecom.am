import { useState,useEffect } from 'react'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../firebase.js";
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';
import { text } from '../Components/about-us-text.jsx';
function About() {
    return (
        <>
        {header()}
      <div className="mt-[150px]! ml-[10%] w-3/5 h-auto flex flex-col font-sans border-b border-gray-500 mb-10 max-[1100px]:w-[70%] max-[900px]:w-4/5">
        {text()}
      </div>
      <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
        {share()}
      </div>
     <Footer />
      </>
    )
}
export default About