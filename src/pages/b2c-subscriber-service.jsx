import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";

function SubService() {
    const navigate = useNavigate();

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/16509767646793.png")}

            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder 
                    url="https://www.telecomarmenia.am/files/icons/1/16510715800139/45x45.png" 
                    text="FAQ" 
                    onClickHandler={() => navigate('/faq')} 
                />
                <HBorder2 
                    url="https://www.telecomarmenia.am/files/icons/1/16510715205036/45x45.png" 
                    text="Device settings" 
                    onClickHandler={() => navigate('/device-settings')} 
                />
                <HBorder
                    url="https://www.telecomarmenia.am/files/icons/1/16510717960323/45x45.png" 
                    text="Subscriber service" 
                    onClickHandler={() => navigate('/b2c-subscriber-service')} 
                />
                <HBorder 
                    url="https://www.telecomarmenia.am/files/icons/1/16510713241559/45x45.png" 
                    text="USSD codes and useful numbers" 
                    onClickHandler={() => navigate('/ussd-and-numbers')} 
                />
            </div>

            <h1 className="text-[40px] ml-[10%] font-bold text-[rgb(22,20,20)] mt-[60px]">SUBSCRIBER SERVICE</h1>
            
            <div className="w-[80%] mt-[40px] ml-[10%] mb-[150px] grid grid-cols-3 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                {hborder3(
                    "Tariff plan change", 
                    "Choose the most convenient tariff plan for you"
                )}
                {hborder3(
                    "Payment validity period", 
                    ""
                )}
                {hborder3(
                    "Number Replacement", 
                    "You can change your number at any time"
                )}
                {hborder3(
                    "«Nice» number selection", 
                    "You can choose the number you like most!"
                )}
                {hborder3(
                    "Number Blocking", 
                    "Block telephone number free of charge if you have lost SIM-card or do not want to use your telephone temporarily"
                )}
                {hborder3(
                    "PIN/PUK Codes Restoration", 
                    "Restore your PIN/PUK codes in our Customer Care Offices"
                )}
                {hborder3(
                    "Number Restoration", 
                    "Number restoration for postpaid system subscribers"
                )}
                {hborder3(
                    "SMS", 
                    "Diversify communication with family and friends with text messages!"
                )}
                {hborder3(
                    "Telephone line installation", 
                    "To install a landline telephone in the office is very easy: Fill in the application form Wait for response Sign the contract"
                )}
            </div>

            <Footer />
        </>
    );
}

export default SubService;