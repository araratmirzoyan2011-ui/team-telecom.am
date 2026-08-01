import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { header } from '../Components/header.jsx';
import { Astx } from '../Components/astx.jsx';
import { Nkar } from '../Components/ng.jsx';
import { Border } from '../Components/Appborder.jsx';
import Footer from '../Components/footer.jsx';
function TeamEnergy() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("ios");
    const inf = { title: "Team Energy", img1: "https://www.telecomarmenia.am/images/team_apps/1/17116228874075.png", img2: "https://www.telecomarmenia.am/images/team_apps/1/17116228874283.jpeg", img3: "https://www.telecomarmenia.am/images/team_apps/1/17116228874409.jpeg", img4: "https://www.telecomarmenia.am/images/team_apps/1/1711622887455.jpeg" };
    const inf2 = { title: "My Team", img1: "https://www.telecomarmenia.am/images/team_apps/1/16510708696227.png", onclick: "/MyTeam" };
    const inf3 = { title: "TeamPay", img1: "https://www.telecomarmenia.am/images/team_apps/1/17691688001842.png", onclick: "/TeamPay" };

    return (
        <>
            {header()}
            <div className='ml-[15%] w-[50%] h-[400px] flex flex-col mt-[200px] justify-between '>
                <h1 className='text-[48px]'>{inf.title}</h1>
                <div className='w-full h-[300px] grid grid-cols-[40%_60%] mt-[60px]'>
                    <img src={inf.img1} alt="" className='rounded-[10px]'/>
                    <div className='flex flex-col ml-[60px]'>
                        <Astx img="https://www.telecomarmenia.am/img/redesign/app_store.png" rate={3.8} />
                        <Astx img="https://www.telecomarmenia.am/img/redesign/google_play.png" rate={3.5} />
                    </div>
                </div>
            </div>
            <div className='ml-[15%] w-[50%] h-[600px] mt-[100px]'>
                <div className='flex gap-[40px] border-b border-gray-200'>
                    <h1
                        onClick={() => setActiveTab("ios")}
                        className={`pb-[12px] cursor-pointer text-[18px] ${
                            activeTab === "ios"
                                ? "border-b-2 border-cyan-400 text-black"
                                : "text-gray-400"
                        }`}
                    >
                        iOS
                    </h1>
                    <h1
                        onClick={() => setActiveTab("android")}
                        className={`pb-[12px] cursor-pointer text-[18px] ${
                            activeTab === "android"
                                ? "border-b-2 border-cyan-400 text-black"
                                : "text-gray-400"
                        }`}
                    >
                        Android
                    </h1>
                </div>

                <div className='h-[600px] mt-[40px]'>
                    {activeTab === "ios" ? (
                        <div className='flex h-[90%]'>
                            {Nkar(inf.img2)}
                            {Nkar(inf.img3)}
                            {Nkar(inf.img4)}
                        </div>
                    ) : (
                        <div className='flex h-[90%]'>
                            {Nkar(inf.img4)}
                            {Nkar(inf.img2)}
                            {Nkar(inf.img3)}
                        </div>
                    )}
                </div>
            </div>
            <div className='ml-[15%] w-[30%] h-[600px] mt-[100px] text-gray-500'>
                <p className='font-medium'>Team Energy հավելվածի միջոցով կարող եք գտնել մոտակա էլեկտրական լիցքավորման կայանը, հետևելով քայլերի հաջորդականությանը՝ հեշտությամբ լիցքավորել մեքենան և կատարել էլեկտրոնային վճարում նախընտրած տարբերակով։</p>
                <ul className='list-disc list-inside mt-[20px]'>
                    <li className='mt-[10px]'>Բոլոր տեսակի էլեկտրոմոբիլների լիցքավորում</li>
                    <li className='mt-[10px]'>Օգտագործման մեջ մատչելի</li>
                    <li className='mt-[10px]'>Կայաններ ՀՀ ամբողջ տարածքում</li>
                    <li className='mt-[10px]'>Նոր բարելավված AC և արագ լիցքավորող DC կայաններ</li>
                </ul>
            </div>
            <div className='ml-[15%] w-[30%] h-[600px] mt-[-150px] text-[48px] text-black-500'>
                <h1>Other applications</h1>
            </div>
            <div className='ml-[15%] w-[70%] mt-[-450px] grid grid-cols-2 gap-[60px] mb-[100px]'>
    {Border(inf2.img1, inf2.title, "My Team հավելվածի միջոցով Դուք կարող եք՝ Հաշվեկշռի և փաթեթների մնացորդների ստուգում Ավտոմատ վճարումների ակտիվացում Սակագնային փաթեթների փոփոխում Ծառայությունների ակտիվացում Էքսկլյուզիվ առաջարկներ Առցանց օգնություն Shake", () => navigate(inf2.onclick))}
    {Border(inf3.img1, inf3.title, "Էլեկտրոնային դրամապանակ ավելի քան 50 տեսակի վճարումների համար Հատուկ առաջարկեր և ակցիաներ", () => navigate(inf3.onclick))}
</div>
<Footer />
        </>
    );
}

export default TeamEnergy;