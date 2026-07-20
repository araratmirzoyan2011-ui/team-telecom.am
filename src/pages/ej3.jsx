import { useState,useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { db } from "../firebase.js";
import { Link } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import { footer } from '../Components/footer.jsx';
import { slider4 } from '../Components/slider4.jsx';
import { border4 } from '../Components/border4.jsx';
import { slider5 } from '../Components/slider5.jsx';
import { gic } from '../Components/gic.jsx';
import { border5 } from '../Components/border5.jsx';
import { border6 } from '../Components/border6.jsx';
function Shop() {
    const [news2, setNews] = useState([]);
    const [slides3, setSlides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const newsSnapshot = await getDocs(collection(db, "news2"));
            const newsData = newsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNews(newsData);

            const slidesSnapshot = await getDocs(collection(db, "slides3"));
            const slidesData = slidesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSlides(slidesData);
        };
        fetchData();
    }, []);

    return (
        <> 
        {header()}
        <div className="pt-[100px] w-full h-[500px] border-[#3d5a76]">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            style={{ width: "100%", height: "500px" }}
        >
            {slider4(slides3)}
        </Swiper>
        </div>

        <div className="mt-[140px] w-[90%] ml-[5%] h-[100px] flex flex-row flex-nowrap justify-around max-[900px]:h-[210px] max-[900px]:flex-wrap max-[900px]:w-1/2 max-[900px]:ml-[25%]">
            {border4("fa-solid fa-mobile-button", "Smartphones")}
            {border4("fa-solid fa-mobile-vibrate", "Numbers")}
            {border4("fa-solid fa-computer", "Devices")}
            {border4("fa-solid fa-keyboard", "Accessories")}
        </div>
        

        <div className="mt-0 w-[90%] h-[600px] px-5 box-border bg-white ml-[5%]">
  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={30}
    slidesPerGroup={1}
    navigation={true}
    pagination={{ clickable: true }}
    style={{ width: "100%", paddingBottom: "40px" }}
    breakpoints={{
      640: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    }}
  >
    {slider5(news2)}
  </Swiper>
</div>

        {gic()}

        <div className="w-[90%] h-[350px] ml-[6%] mt-[100px] flex">
            {border5("033130090", "50000")}
            {border5("033450700", "50000")}
            {border5("096440333", "48000")}
        </div>
        {gic()}

        <div className="mt-[100px] ml-[10%] w-4/5 h-[700px] flex flex-row flex-wrap justify-around">
            {border6(
                "Corporate Network", "Reliable information exchange system", "Buy",
                "bg-[#96d1db] w-[47%] max-[1100px]:w-[47%] max-[1000px]:flex-col max-[1000px]:items-center",
                "https://www.telecomarmenia.am/images/promo/1/16509756564861.png"
            )}
            {border6(
                "Delivery terms", "Delivery all over Armenia", "details",
                "bg-[#012e42] w-[47%] max-[1100px]:w-[47%] max-[1000px]:flex-col max-[1000px]:items-center",
                "https://www.telecomarmenia.am/images/promo/1/16509757089642.png"
            )}
            {border6(
                "Online credit", "What is this and how it works?", "details",
                "bg-[#9d9991] w-[56%] max-[1100px]:w-[47%] max-[1000px]:flex-col max-[1000px]:items-center",
                "https://www.telecomarmenia.am/images/promo/1/16509758156906.png"
            )}
            {border6(
                "Credit terms", "Best terms from Team", "details",
                "bg-[#689097] w-[38%] max-[1100px]:w-[47%] max-[1000px]:flex-col max-[1000px]:items-center",
                "https://www.telecomarmenia.am/images/promo/1/16509757444797.png"
            )}
        </div>

        {footer()}
        </>
    )
}
export default Shop