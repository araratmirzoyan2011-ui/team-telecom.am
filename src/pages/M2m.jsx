
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from "../Components/hborder.jsx";
import { HBorder2 } from "../Components/hborder2.jsx";
import { hborder3 } from "../Components/hborder3.jsx";
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../firebase.js";
function M2M() {
    return (
        <>
        {header()}
        {bgimg("https://www.telecomarmenia.am/images/menu/1/1650978138844.png")}
       <div className="mt-[-50px] h-[120px] bg-neutral-100 flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%]">
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510702991504/45x45.png" text="SMS-info" />
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="Intellectual communications" />
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="Corporate Network" />
            <HBorder2 url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="M2M and monitoring"  onClickHandler={() => navigate('/M2m')}/>
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16511223989344/45x45.png" text="Hosting" />
            <HBorder url="https://www.telecomarmenia.am/files/icons/1/16510709622802/45x45.png" text="Cost control" />
        </div>
        <h1 className="text-[40px] ml-[10%] text-[rgb(22,20,20)] mt-[100px]">Corporate Network</h1>
        <div className="w-[80%] h-[300px] mt-[50px] ml-[10%] mb-[150px] grid grid-cols-3 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[800px]:h-[900px] max-[700px]:grid-cols-1">
            {hborder3("Monitoring +","Reliable infrastructure for transmiting data")}
            {hborder3("International Monitoring","Data sent/received throughout Armenia")}
        </div>
        <Footer />
        </>
    )
}
export default M2M