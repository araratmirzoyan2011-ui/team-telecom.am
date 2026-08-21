
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { db } from "../firebase.js";
import { Link, useNavigate } from 'react-router-dom';
import { Select } from '../Components/m3.jsx';
import Pl from '../Components/mobinp.jsx';
import { useState, useEffect } from 'react';
import { N2 } from '../Components/style2.jsx';
function HomeCombo() {

    return (
        <>
        {header()}
        {bgimg("https://www.telecomarmenia.am/images/sliders_block_slides/1/17494570057719.png")}
         <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/17788403748713.jpeg"
          h1='Connect Internet and TV online'
          p="Send an ONLINE REQUEST and we will connect Your COMBO service package within 5 working days. Connectivity and setup of the Wi-FI device are FREE all over the country."
          col="text-white"
        />
      </div>
        <Footer />
        </>
    )
}
export default HomeCombo