import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import { Link, useNavigate } from 'react-router-dom';
import { Select } from '../Components/m3.jsx';
import Pl from '../Components/mobinp.jsx';
import { useState, useEffect } from 'react';

function Parthner() {
    const navigate = useNavigate();

    const mobileSectionsData = [
        {
            glname: "Qualifications",
            name: "",
            files: [
                
            ],
        },
        {
            glname: "Supplier competitive selection",
            name: "",
            files: [
                
            ],
        },
        {
            glname: "Potential partners",
            name: "Be Free Regional",
            files: [
                
            ],
        },
       
    ];

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/15795288295411.jpeg")}
            <div className="mt-[-50px] h-[120px] bg-neutral-100 flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%]">
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16510812743247/45x45.png" text="Procurements" />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510812388485/45x45.png" text="Sales" />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510719725688/45x45.png" text="Parthners" />
                
            </div>
            <h1 className='ml-[15%] mt-[100px] text-[48px]'>Procurements</h1>
            <div className='ml-[15%] w-[50%] mb-[100px] mt-[20px]'>
                <div className='h-[90%]'>
                    <Select sectionsData={mobileSectionsData} title="Mobile" />
                    
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Parthner