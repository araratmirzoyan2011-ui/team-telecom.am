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
            
            <div className="w-[80%] ml-[10%] mb-[150px] grid grid-cols-3 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                <BannerCard 
                    bgImage="https://www.telecomarmenia.am/images/menu/1/165106349279.png"
                    title="SMS Premium"
                    text="By sending a short message to the corresponding short number, you will have the opportunity to: - get all sorts of helpful information - use entertaining services - take part in different contests, panel games, draw games and voting, conducted by TV-channels, radio stations and other mass media"
                    buttonText="More details"
                    onButtonClick={() => console.log('Clicked')}
                    className="col-span-2 max-xl:col-span-full"
                />

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
                )}{hborder3(
                    "Book Portal", 
                    "The service gives an opportunity to read and listen on-line books of various genres, which are placed at book.telecomarmenia.am portal, as well as to download a book per..."
                )}
                {hborder3(
                    "Dating portal", 
                    "New acquaintances, interesting interlocutors and interactive communication are waiting for you at the absolutely new Dating portal"
                )}
                {hborder3(
                    "Kids Portal", 
                    "The service presents kids.telecomarmenia.am portal, where books, films, tutorial programs, cartoons, games for kids and their parents..."
                )}
                {hborder3(
                    "Humor Club", 
                    "«Humor Club» entertainment portal with the services “Alibi” and “Bluff” will help you create surprise for your friends, play tricks with your loved ones, or just cheer them up"
                )}
                {hborder3(
                    "FunBox", 
                    "You can use the following services: Acquaintances: create your own profile, change / delete it if you wish, and follow other users' profiles Player: listen to the..."
                )}
                {hborder3(
                    "Laughcall", 
                    "The “Laughcall” service allows you to make calls within Team mobile network, changing your voice in online mode. You are offered the following voice versions: Baby..."
                )}
            </div>

            <Footer />
        </>
    );
}

export default Entertainment;