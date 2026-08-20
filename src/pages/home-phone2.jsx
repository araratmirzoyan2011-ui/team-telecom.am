import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import BannerCard from "../Components/hborder4.jsx";

function HomePhone2() {
    const navigate = useNavigate();

    return (
        <>
            {header()}
            {bgimg("https://www.telecomarmenia.am/images/menu/1/16509749702952.png")}
            
            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510708352906/45x45.png" text="TeamTV" onClickHandler={() => navigate('/team-tv')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511222304797/45x45.png" text="Payment services" onClickHandler={() => navigate('/PaymentService')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511222214647/45x45.png" text="Entertainment" onClickHandler={() => navigate('/Entertainment')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/1651122209593/45x45.png" text="Calls & security" onClickHandler={() => navigate('/calls-security')} />
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16510709622802/45x45.png" text="Home phone" onClickHandler={() => navigate('/home-phone2')} />
            </div>

            <h1 className="text-[40px] ml-[10%] font-bold text-[rgb(22,20,20)] mt-[60px] mb-[40px]">Home phone</h1>
            
            <div className="w-[80%] ml-[10%] mb-[150px] grid grid-cols-3 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                
                <BannerCard 
                    bgImage="https://tse4.mm.bing.net/th/id/OIP.NMjYcx25WBXIgnnS1k-ETwHaEV?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                    title="Call Waiting"
                    text="The service allows the subscriber to take another call during a telephone conversation. If another interlocutor calls the subscriber during a telephone conversation, a specific tone signal will ring. There are three types of call waiting: Continue conversation without receiving a new call Second call answering with current call interruption To conduct the conversation with two callers in succession"
                    buttonText="More details"
                    onButtonClick={() => console.log('Clicked')}
                    className="col-span-2 max-xl:col-span-full"
                />

                {hborder3(
                    "Call Forwarding", 
                    "You can forward incoming calls to the phone number at your location. There are three types of call forwarding: Immediate call forwarding - direct forwarding of all..."
                )}
                {hborder3(
                    "Speed-dial", 
                    "Digital exchange allows you to register 99 telephone numbers dialing just 2 digits instead of landline, mobile, long-distance and international telephone numbers..."
                )}
                {hborder3(
                    "Three-party communication", 
                    "You can carry on a conversation simultaneously with three subscribers. This service can be used for local, long-distance..."
                )}
                {hborder3(
                    "Outgoing calls barring", 
                    "The service allows blocking all outgoing calls"
                )}
                {hborder3(
                    "Alarm", 
                    "At an indicated hour a call rings, and you can hear music when picking up the hand-set There are three types of the alarm clock: One-time For Required Period Periodically"
                )}
                {hborder3(
                    "Do not Disturb", 
                    "Via the service incoming calls are blocked, and the calling side receives a corresponding voice message"
                )}
                {hborder3(
                    "Calling Line Identification", 
                    "With the \"Calling Line Identification\" service, you can see it's mobile or home phone number from which you receive the call on the screen of your phone"
                )}
                {hborder3(
                    "«Nice» numbers", 
                    "Choose the number you like most!"
                )}
            </div>

            <Footer />
        </>
    );
}

export default HomePhone2;