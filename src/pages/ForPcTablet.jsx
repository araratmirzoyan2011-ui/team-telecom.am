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

function PcTablet() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Prepaid");
    
    const [openSections, setOpenSections] = useState({
        drive: false,
        internetToday: false,
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
            {bgimg("https://www.telecomarmenia.am/images/menu/1/16509764002637.png" )}

            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/1651070448779/45x45.png"
                    text="For smartphones"
                    onClickHandler={() => navigate('/forSmartphones')}
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
                <HBorder2
                    url="https://www.telecomarmenia.am/files/icons/1/16511223895748/45x45.png"
                    text="For PC & Tablet"
                    onClickHandler={() => navigate('/ForPcTablet')}
                />
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/17569729574067/45x45.png"
                    text="Team 5G"
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
                    For PC & Tablet
                </h1>

                <div className="flex flex-col gap-4">
                    {/* Drive - Երևում է և՛ Prepaid, և՛ Postpaid ժամանակ */}
                    <div className="border-b border-gray-200 pb-4">
                        <div 
                            onClick={() => toggleSection('drive')}
                            className="flex justify-between items-center cursor-pointer py-3 select-none hover:text-cyan-600 transition-colors"
                        >
                            <h2 className="text-[22px] font-bold text-[rgb(22,20,20)]">Drive</h2>
                            <span className={`transform transition-transform duration-300 ${openSections.drive ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        {openSections.drive && (
    <div className="w-full mt-[30px] mb-[150px] grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
        {hborder3("Drive Maxi + (100 GB)", "High-speed Internet for PC, WiFi/USB modems")}
        {hborder3("Drive Maxi (80 GB)", "High-speed Internet for PC, WiFi/USB modems")}
        {hborder3("Drive Midi (50 GB)", "High-speed Internet for PC, WiFi/USB modems")}
        {hborder3("Drive Mini (20 GB)", "High-speed Internet for PC, WiFi/USB modems")}
    </div>
)}
                    </div>

                    {/* Internet Today - Երևում է ՄԻԱՅՆ Prepaid-ի ժամանակ */}
                    {activeTab === "Prepaid" && (
                        <div className="border-b border-gray-200 pb-4">
                            <div 
                                onClick={() => toggleSection('internetToday')}
                                className="flex justify-between items-center cursor-pointer py-3 select-none hover:text-cyan-600 transition-colors"
                            >
                                <h2 className="text-[22px] font-bold text-[rgb(22,20,20)]">Internet Today</h2>
                                <span className={`transform transition-transform duration-300 ${openSections.internetToday ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </div>
                            {openSections.internetToday && (
                                <div className="w-full mt-[30px] mb-[150px] grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                                    {hborder3("Internet Today", "Daily high-speed Internet from tablet and PC")}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <span className="text-gray-500 text-[14px]">Archived tariff </span>
                    <a href="#plans" className="text-cyan-500 hover:underline text-[14px]">plans</a>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PcTablet;