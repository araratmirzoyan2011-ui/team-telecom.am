
import { header } from '../Components/header.jsx';
import { footer } from '../Components/footer.jsx';
import { border } from '../Components/news-border.jsx';
import { border2 } from '../Components/news-border2.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { border8 } from '../Components/border8.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { border9 } from "../Components/border9.jsx";
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../firebase.js";
function Carrer(){
    return (
        <>
        {header()}
        {bgimg("https://www.telecomarmenia.am/images/menu/1/15789192063747.jpeg")}
        <h1 className="text-[40px] ml-[10%] text-[rgb(22,20,20)] mt-[150px]">News</h1>
        <div className="mt-10 ml-[10%] w-[80%] h-10 border-b border-gray-500 flex">
            {border2("News")}
            {border("Announcements")}
            {border("All")}
        </div>
        <div className="mt-10 ml-[10%] w-1/5 h-auto flex max-[1340px]:flex-col">
            {kalendar("2026.07.02", "2026.07.02")}
            {border8("Search")}
        </div>
        <div className="ml-[10%] mt-5">
            {border9(
                "18 June",
                "Sales & Service Specialist, Echmiatsin",
                "Team Telecom Armenia is looking for  Sales & Service Specialist in Echmiatsin city Position Title : Sales & Service Specialist, Echmiatsin Structural unit: Commercial directorate Key Responsibilities:   · Provide"
            )}
        </div>
        <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
            {share()}
        </div>
        {footer()}
        </>
    )
}
export default Carrer