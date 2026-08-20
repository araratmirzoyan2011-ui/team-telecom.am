import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";

function ForSmartphone() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Prepaid");
    
    const [openSections, setOpenSections] = useState({
        unlimited: false,
        giga: false,
        mega: false,
        package3gb: false,
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/16881410294975.jpeg" )}

            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder2
                    url="https://www.telecomarmenia.am/files/icons/1/1651070448779/45x45.png"
                    text="For smartphones"
                    onClickHandler={() => navigate('/Mobile')}
                />
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png"
                    text="For home - COSMO"
                    onClickHandler={() => navigate('/Internet-and-Tv')}
                />
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png"
                    text="For home - COMBO"
                    onClickHandler={() => navigate('/forSmartphones')}
                />
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/16511223895748/45x45.png"
                    text="For PC & Tablet"
                    onClickHandler={() => navigate('/home-phone')}
                />
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/17569729574067/45x45.png"
                    text=""
                    onClickHandler={() => navigate('/home-phone')}
                />
            </div>

            <div className='ml-[10%] w-[80%] mb-[100px] mt-[60px]'>
                <div className='flex gap-[40px] border-b border-gray-200 mb-8'>
                    <h1
                        onClick={() => setActiveTab("Prepaid")}
                        className={`pb-[12px] cursor-pointer text-[18px] font-semibold transition-colors duration-200 ${
                            activeTab === "Prepaid"
                                ? "border-b-2 border-cyan-400 text-black"
                                : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        Prepaid
                    </h1>
                    <h1
                        onClick={() => setActiveTab("Postpaid")}
                        className={`pb-[12px] cursor-pointer text-[18px] font-semibold transition-colors duration-200 ${
                            activeTab === "Postpaid"
                                ? "border-b-2 border-cyan-400 text-black"
                                : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        Postpaid
                    </h1>
                </div>

                <h1 className="text-[36px] font-bold text-[rgb(22,20,20)] mb-8">
                    For smartphones
                </h1>

                <div className="flex flex-col gap-4">
                    <div className="border-b border-gray-200 pb-4">
                        <div 
                            onClick={() => toggleSection('unlimited')}
                            className="flex justify-between items-center cursor-pointer py-3 select-none hover:text-cyan-600 transition-colors"
                        >
                            <h2 className="text-[22px] font-bold text-[rgb(22,20,20)]">Unlimited applications</h2>
                            <span className={`transform transition-transform duration-300 ${openSections.unlimited ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        {openSections.unlimited && (
                                        <div className="w-full mt-[30px]  mb-[150px] grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                                            {hborder3("Video Unlimit", "Activate and enjoy unlimited videos!")}
                                            {hborder3("Music Unlimit", "Activate and enjoy unlimited music!")}
                                            {hborder3("Social Unlimit", "Activate and enjoy unlimited social networks!")}
                                            {hborder3("Messenger Unlimit", "Activate and enjoy unlimited messengers!")}
                                        </div>
                        )}
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                        <div 
                            onClick={() => toggleSection('giga')}
                            className="flex justify-between items-center cursor-pointer py-3 select-none hover:text-cyan-600 transition-colors"
                        >
                            <h2 className="text-[22px] font-bold text-[rgb(22,20,20)]">Giga</h2>
                            <span className={`transform transition-transform duration-300 ${openSections.giga ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        {openSections.giga && (
                            <div className="w-full mt-[30px]  mb-[150px] grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                                {hborder3("Giga 1+1GB", "High speed internet package for smartphone")}
                                {hborder3("Giga 2+1GB", "High speed internet package for smartphone")}
                                {hborder3("Giga 5+1GB", "High speed internet package for smartphone")}
                                {hborder3("Giga 10 GB", "High speed internet package for smartphone")}
                                {hborder3("Giga 15 GB", "High speed internet package for smartphone")}
                            </div>
                            
                        )}
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                        <div 
                            onClick={() => toggleSection('mega')}
                            className="flex justify-between items-center cursor-pointer py-3 select-none hover:text-cyan-600 transition-colors"
                        >
                            <h2 className="text-[22px] font-bold text-[rgb(22,20,20)]">Mega</h2>
                            <span className={`transform transition-transform duration-300 ${openSections.mega ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        {openSections.mega && (
                            <div className="w-full mt-[30px]  mb-[150px] grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                                {hborder3("Mega 300+", "Daily Internet for a smartphone: the balance is no longer reset.")}
                                {hborder3("Mega 500+", "Daily Internet for a smartphone: the balance is no longer reset.")}
                                {hborder3("Mega 300", "Daily Internet for a smartphone.")}
                                {hborder3("Mega 500", "Daily Internet for a smartphone.")}
                            </div>
                        )}
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                        <div 
                            onClick={() => toggleSection('package3gb')}
                            className="flex justify-between items-center cursor-pointer py-3 select-none hover:text-cyan-600 transition-colors"
                        >
                            <h2 className="text-[22px] font-bold text-[rgb(22,20,20)]">Package "3GB" = 500֏</h2>
                            <span className={`transform transition-transform duration-300 ${openSections.package3gb ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        {openSections.package3gb && (
                            <div className="w-full mt-[30px]  mb-[150px] grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                                {hborder3(`"3GB"`, 'Internet package for "Smart" and "Be Free" prepaid tariff plans')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ForSmartphone;