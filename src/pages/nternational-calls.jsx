import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import BannerCard from "../Components/hborder4.jsx";

function Entertainment() {
    const navigate = useNavigate();

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/17392713413788.png")}
            
            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510708352906/45x45.png" text="TeamTV" onClickHandler={() => navigate('/team-tv')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511222304797/45x45.png" text="Payment services" onClickHandler={() => navigate('/PaymentService')} />
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16511222214647/45x45.png" text="Entertainment" onClickHandler={() => navigate('/Entertainment')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/1651122209593/45x45.png" text="Calls & security" onClickHandler={() => navigate('/calls-security')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510709622802/45x45.png" text="Home phone" onClickHandler={() => navigate('/home-phone')} />
            </div>

            <h1 className="text-[40px] ml-[10%] font-bold text-[rgb(22,20,20)] mt-[60px] mb-[40px]">Entertainment</h1>
            
            
            <Footer />
        </>
    );
}

export default Entertainment;