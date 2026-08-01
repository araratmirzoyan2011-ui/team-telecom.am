import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { header } from '../Components/header.jsx';
import { Astx } from '../Components/astx.jsx';
import { Nkar } from '../Components/ng.jsx';
import { Border } from '../Components/Appborder.jsx';
import Footer from '../Components/footer.jsx';
import "../CSS/shared.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
function TeamPay() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("ios");
    const inf2 = { title: "TeamTV", img1: "https://www.telecomarmenia.am/images/team_apps/1/17249416402556.png",  onclick: "/TeamTv"};
    const inf4 = { title: "My Team", img1: "https://www.telecomarmenia.am/images/team_apps/1/16510708696227.png",  onclick: "/MyTeam"};
    const inf = { title: "TeamPay", img1: "https://www.telecomarmenia.am/images/team_apps/1/17691688001842.png",img2:"https://www.telecomarmenia.am/images/team_apps/1/17479089597009.png",img3:"https://www.telecomarmenia.am/images/team_apps/1/1747908959726.png",img4:"https://www.telecomarmenia.am/images/team_apps/1/17479089597517.png",img5:"https://www.telecomarmenia.am/images/team_apps/1/17479089597727.png",img6:"https://www.telecomarmenia.am/images/team_apps/1/17479089597517.png" };
     const inf3 = { title: "Team Energy", img1: "https://www.telecomarmenia.am/images/team_apps/1/17116228874075.png", onclick: "/TeamEnergy" };

    return (
        <>
            {header()}
            <div className='ml-[15%] w-[50%] h-[400px] flex flex-col mt-[200px] justify-between '>
                <h1 className='text-[48px]'>{inf.title}</h1>
                <div className='w-full h-[300px] grid grid-cols-[40%_60%] mt-[60px]'>
                    <img src={inf.img1} alt="" className='rounded-[10px]'/>
                    <div className='flex flex-col ml-[60px]'>
                        <Astx img="https://www.telecomarmenia.am/img/redesign/app_store.png" rate={4.7} />
                        <Astx img="https://www.telecomarmenia.am/img/redesign/google_play.png" rate={3.7} />
                    </div>
                </div>
            </div>
            <div className='ml-[15%] w-[70%] h-[600px] mt-[100px]'>
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

                <div className='h-[600px] mt-[40px] '>
                    {activeTab === "ios" ? (
                        <div className='flex h-[90%] w-[100%]'>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={4}
                                slidesPerGroup={1}
                                navigation={true}
                                pagination={{ clickable: true }}
                                style={{ width: "100%", paddingBottom: "40px" }}
                                breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 20,
                                },
                                1000: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 30,
                                },
                                }}
                            >
                                <SwiperSlide>{Nkar(inf.img2)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img3)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img4)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img5)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img6)}</SwiperSlide>
                            </Swiper>
                        </div>
                    ) : (
                        <div className='flex h-[90%]'>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={4}
                                slidesPerGroup={1}
                                navigation={true}
                                pagination={{ clickable: true }}
                                style={{ width: "100%", paddingBottom: "40px" }}
                                breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 20,
                                },
                                1000: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 30,
                                },
                                }}
                            >
                                <SwiperSlide>{Nkar(inf.img2)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img3)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img4)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img5)}</SwiperSlide>
                                <SwiperSlide>{Nkar(inf.img6)}</SwiperSlide>
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
            <div className='ml-[15%] w-[35%] h-[600px] mt-[50px] text-gray-500'>
                <ul className='list-disc list-inside mt-[20px]'>
                    <li className='mt-[10px]'>Էլեկտրոնային դրամապանակ ավելի քան 50 տեսակի վճարումների համար</li>
                    <li className='mt-[10px]'>Հատուկ առաջարկեր և ակցիաներ</li>
                </ul>
            </div>
            <div className='ml-[15%] w-[30%] h-[600px] mt-[-350px] text-[48px] text-black-500'>
                <h1>Other applications</h1>
            </div>
            <div className='ml-[15%] w-[70%] mt-[-450px] grid grid-cols-2 gap-[60px] mb-[100px]'>
    {Border(inf2.img1, inf2.title, "Ժամանակակից TV միշտ քեզ հետ Ժամանակակից TV միշտ քեզ հետ Մինչև 200 ալիք Ավելի քան 5000 ֆիլմ տեսադարանում Դիտում 5 սարքավորումներով Մինչև 7 օր catch-upՀավելյալ ալիքների և փաթեթների գնումYouTube հեռուստացույցով EPG - Հաղորդումների էլեկտրոնային ցանկ", () => navigate(inf2.onclick))}
    {Border(inf3.img1, inf3.title, "Team Energy հավելվածի միջոցով կարող եք գտնել մոտակա էլեկտրական լիցքավորման կայանը, հետևելով քայլերի հաջորդականությանը՝ հեշտությամբ լիցքավորել մեքենան և կատարել էլեկտրոնային վճարում նախընտրած տարբերակով։ Բոլոր տեսակի էլեկտրոմոբիլների լիցքավորում Օգտագործման մեջ մատչելի Կայաններ ՀՀ ամբողջ տարածքում Նոր բարելավված AC և արագ լիցքավորող DC կայաններ", () => navigate(inf3.onclick))}</div>
<Footer />
        </>
    );
}

export default TeamPay;