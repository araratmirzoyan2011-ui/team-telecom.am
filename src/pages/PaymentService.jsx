import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../firebase.js";

function Payment() {
    const navigate = useNavigate();

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/165106349279.png")}
            
            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510708352906/45x45.png" text="TeamTV" onClickHandler={() => navigate('/team-tv')} />
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16511222304797/45x45.png" text="Payment services" onClickHandler={() => navigate('/PaymentService')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511222214647/45x45.png" text="Entertainment" onClickHandler={() => navigate('/entertainment')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/1651122209593/45x45.png" text="Calls & security" onClickHandler={() => navigate('/calls-security')} />
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16510709622802/45x45.png" text="Home phone" onClickHandler={() => navigate('/home-phone')} />
            </div>

            <h1 className="text-[40px] ml-[10%] font-bold text-[rgb(22,20,20)] mt-[60px]">Top up & 0 balance</h1>
            
            <div className="w-[80%] mt-[40px] ml-[10%] mb-[150px] grid grid-cols-3 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                {hborder3(
                    "Balance transfer", 
                    "The service allows Team mobile network prepaid system subscribers to transfer money from own balance to the balance of another Team subscriber"
                )}
                {hborder3(
                    "Call Me", 
                    "The service allows Team prepaid and postpaid system subscribers to send a request to call back. The subscriber whom you ask to call you back will receive an..."
                )}
                {hborder3(
                    "Trusted Payment", 
                    "In case you balance is close to zero, and there is no possibility at the moment to top-up, use the \"Trusted payment\". We will temporarily top-up for you upon your..."
                )}
                {hborder3(
                    "Recharge my balance", 
                    "The service «Recharge my balance» gives an opportunity to mobile prepaid and postpaid subscribers of Team to send a request on money transfer to the balance..."
                )}
            </div>

            <Footer />
        </>
    );
}

export default Payment;