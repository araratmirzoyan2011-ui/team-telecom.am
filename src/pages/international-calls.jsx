import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import BannerCard from "../Components/hborder4.jsx";
import { InteractiveMap } from '../Components/ChooseCountre.jsx';
function InternationalCalls() {
    const navigate = useNavigate();

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/16509766245214.png")}
            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16509747396609/45x45.png" text="Roaming" onClickHandler={() => navigate('/roaming')} />
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16511223765283/45x45.png" text="International calls" onClickHandler={() => navigate('/international-calls')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511221689972/45x45.png" text="Useful information" onClickHandler={() => navigate('/useful-information')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511222028662/45x45.png" text="Services" onClickHandler={() => navigate('/services')} />
            </div>
            
            <h1 className="text-[40px] ml-[10%] font-bold text-[rgb(22,20,20)] mt-[60px] mb-[40px]">International calls</h1>
            <InteractiveMap />
            
            <Footer />
        </>
    );
}

export default InternationalCalls;