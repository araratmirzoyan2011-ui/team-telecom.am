
import { useState,useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { border7 } from '../Components/border7.jsx';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { sl3 } from '../Components/slider3.jsx';
import { border2 } from '../Components/border2.jsx';
import { gic } from '../Components/gic.jsx';
import { border3 } from '../Components/border3.jsx';
import { l } from '../Components/busma4.jsx';
import { m5 } from '../Components/busmas51.jsx';
function Busines(){
    const [count, setCount] = useState(0)
    const [slides2, setSlides] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
    const fetchSlides = async () => {
      const snapshot = await getDocs(collection(db, "slides2"));

      const slidesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSlides(slidesData);
    };

    fetchSlides();
  }, []);
    return(
       <> 
      {header()}
      <div id="main">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={0}
    slidesPerView={1}
    navigation={true}
    pagination={{ clickable: true }}
    autoplay={{ delay: 4000, disableOnInteraction: false }}
    style={{ width: "100%", height: "500px" }}>
    {sl3(slides2)}
  </Swiper>
</div>
<h1 className="mt-[100px] ml-[10%] text-[40px]">Mobile Tariffs</h1>
<div className="w-[90%] h-[450px] ml-[5%] flex flex-row mt-[100px] bg-white">
  {border2("SMART BUSINESS", "Create Your Tariff", "Join")}
  {border7(3700, "40GB", 1500, 60, 1500)}
  {border7(5200, "Unlimited", 3500, 110, 3500)}
  {border7(8200, "Unlimited", 6000, 110, 6000)}
</div>
  {gic()}
      <div className="mt-[100px] ml-[10%] w-4/5 h-[700px] flex flex-row flex-wrap justify-around max-[1100px]:mt-10">
  {border3("Corporate Network", "Reliable information exchange system", "https://www.telecomarmenia.am/images/promo/1/16509737068164.png", () => navigate('/Corporate'))}
  {border3("Mobile ID", "Payments and identification using mobile phone", "https://www.telecomarmenia.am/images/promo/1/16509737228197.png", () => navigate('/Mobile-id'))}
  {border3("M2M solutions", "Reliable data transfer", "https://www.telecomarmenia.am/images/promo/1/16509737385483.png", () => navigate('/M2m'))}
  {border3("SMS-info", "Bulk messaging serviceV", "https://www.telecomarmenia.am/images/promo/1/16509737509423.png", () => navigate('/SMS'))}
</div>
      {l()}
      {m5()}
      <Footer />
    </>
    
    )   
}
export default Busines
