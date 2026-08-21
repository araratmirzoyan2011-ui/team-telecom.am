
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
function Combo() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Prepaid");
    // Mobile.jsx-ի սկզբում, imports-ից հետո

const mobileSectionsData = [
  {
    glname: "Be Free Unlimit",
    name: "Be Free Unlimit",
    files: [
      { gb: "Անսահմանափակ", min: 200, chanell: 30, Amd: 3500 },
      { gb: "Անսահմանափակ", min: 2000, chanell: 60, Amd: 5000 },
      { gb: "Անսահմանափակ", min: 3000, chanell: 110, Amd: 8000 },
    ],
  },
  {
    glname: "Be Free",
    name: "Be Free",
    files: [
      { gb: 20, min: 750, chanell: 20, Amd: 2500 },
      { gb: 25, min: 1000, chanell: 30, Amd: 3200 },
    ],
  },
  {
    glname: "Be Free Regional",
    name: "Be Free Regional",
    files: [
      { gb: 10, min: 750, chanell: 20, Amd: 2000 },
    ],
  },
  {
    glname: "Be Free for COSMO/COMBO",
    name: "Be Free for COSMO/COMBO",
    files: [
      { gb: 25, min: 1000, chanell: 30, Amd: 1600 },
    ],
  },
];
    return (
        <>
        {header()}
        {bgimg("https://www.telecomarmenia.am/images/menu/1/17494509147356.jpeg")}
       <div className="mt-[-50px] h-[120px] bg-neutral-100 flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%]">
            <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/1651070448779/45x45.png" text="Mobile" onClickHandler={() => navigate('/Mobile')} />
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="Internet and TV - COSMO"  onClickHandler={() => navigate('/Internet-and-Tv')} />
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="Internet and TV - COMBO"  onClickHandler={() => navigate('/forSmartphones')}/>
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510709622802/45x45.png" text="Home phone"  onClickHandler={() => navigate('/home-phone')}/>
        </div>
                      
        <Footer />
        </>
    )
}
export default Combo