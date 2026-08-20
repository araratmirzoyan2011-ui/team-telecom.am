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
            {bgimg("https://www.telecomarmenia.am/images/menu/1/17392720786572.png")}
            
            <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510708352906/45x45.png" text="TeamTV" onClickHandler={() => navigate('/team-tv')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511222304797/45x45.png" text="Payment services" onClickHandler={() => navigate('/PaymentService')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511222214647/45x45.png" text="Entertainment" onClickHandler={() => navigate('/Entertainment')} />
                <HBorder url="https://www.telecomarmenia.am/files/icons/1/1651122209593/45x45.png" text="Calls & security" onClickHandler={() => navigate('/calls-security')} />
                <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16510709622802/45x45.png" text="Home phone" onClickHandler={() => navigate('/home-phone2')} />
            </div>

            <h1 className="text-[40px] ml-[10%] font-bold text-[rgb(22,20,20)] mt-[60px] mb-[40px]">Calls & Security</h1>
            
            <div className="w-[80%] ml-[10%] mb-[150px] grid grid-cols-3 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                
                <BannerCard 
                    bgImage="https://media.istockphoto.com/id/479681726/photo/girl-with-mobile-phone.jpg?s=612x612&w=0&k=20&c=clLd2bwIS_3V1cqGy6q0Q0BKCRwvDvFfgqZ1Js7JKfg="
                    title="Call Forwarding"
                    text="The service allows you to transfer incoming calls to any other phone number of RA - mobile, landline or intercity."
                    buttonText="More details"
                    onButtonClick={() => console.log('Clicked')}
                    className="col-span-2 max-xl:col-span-full"
                />

                {hborder3(
                    "30 minutes to other mobile networks", 
                    "Minutes package for prepaid and postpaid subscribers."
                )}
                {hborder3(
                    "Bill detailing", 
                    "Get detailed information about your account"
                )}
                {hborder3(
                    "Mobile ID", 
                    "Payments and identification using mobile phone. Details here."
                )}
                {hborder3(
                    "Let's Talk", 
                    "Unlimited calls inside Team mobile network"
                )}
                {hborder3(
                    "Call Barring", 
                    "With the help of «Call Barring» service you can escape undesirable calls from your telephone, if someone else it uses besides you. You can block: all incoming calls all outgoing calls outgoing..."
                )}
                {hborder3(
                    "Calling Line Identification Presentation", 
                    "Calling Line Identification Presentation will allow you: to see number of calling party on phone display to set up individual melodies of calls for numbers in notebook to learn about last..."
                )}
                {hborder3(
                    "Calling Line Identification Restriction", 
                    "Calling Line Identification Restriction will keep your telephone number in secret during the conversation"
                )}
                {hborder3(
                    "Incognito", 
                    "The service allows hiding a phone number during a call, only from those subscribers from whom the caller wishes"
                )}
                {hborder3(
                    "Where are you?", 
                    "The service allows the users to obtain information about the current location of other Team subscribers, after receiving their consent to determine their location"
                )}
                {hborder3(
                    "Always Online", 
                    "If your phone was turned off or unavailable, you will receive an SMS message with the number of the caller. At the same time, the service will notify subscribers calling you by sending them an..."
                )}
                {hborder3(
                    "Voice Mail", 
                    "The calling party will be able to leave you a message, and you will hear it at any time that is convenient for you. Even if the calling party does not leave a message, you will know who called..."
                )}
            </div>

            <Footer />
        </>
    );
}

export default HomePhone2;