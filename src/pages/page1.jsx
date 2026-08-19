import { useState,useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import "../CSS/shared.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link,useNavigate  } from 'react-router-dom';
import { db } from "../firebase.js";
import Border1 from '../Components/border1.jsx';
import { slider1 } from '../Components/slider1.jsx';
import { header } from '../Components/header.jsx';
import { sli2 } from '../Components/slider2.jsx';
// import { footer } from '../Components/footer.jsx';
import Footer from '../Components/footer.jsx';
import { f1 } from '../Components/p1m5.jsx';
import { gic } from '../Components/gic.jsx';
import Bb1 from '../Components/bb1.jsx';
function Main() {
  const navigate = useNavigate();  
    const [count, setCount] = useState(0)
    const [news, setNews] = useState([]);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const newsSnapshot = await getDocs(collection(db, "news"));
            const newsData = newsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));
            setNews(newsData);

            const slidesSnapshot = await getDocs(collection(db, "slides"));
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
      style={{ width: "100%", height: "500px",}}
    >
      {slider1(slides)}
        
    </Swiper>
      </div>
     
      <div className="mb-60 ml-[10%] w-4/5 h-[700px] flex flex-row flex-wrap justify-around">
  <Border1
    inf1="Mobile"
    className='mt-40 mb-10'
    bgImage="https://www.telecomarmenia.am/images/promo/1/16509682370213.png"
    sizeClass="w-[47%] h-[300px] max-[1100px]:w-[47%] max-[1100px]:h-[200px]"
    onClickHandler={() => navigate('/Mobile')}
  />
  <Border1
    inf1="Fixed"
        className='mt-40 mb-10'
    bgImage="https://www.telecomarmenia.am/images/promo/1/1650969068409.png"
    sizeClass="w-[47%] h-[300px] max-[1100px]:w-[47%] max-[1100px]:h-[200px]"
    onClickHandler={() => navigate('/home-phone')}
  />
  <Border1
    inf1="Applications"
        className='mb-10'
    bgImage="https://www.telecomarmenia.am/images/promo/1/16509690498367.png"
    sizeClass="w-[56%] h-[300px] max-[1100px]:w-[47%] max-[1100px]:h-[200px]"
    onClickHandler={() => navigate('/Applications')}
  />
  <Border1
    inf1="Internet and TV"
    className='mb-10'
    bgImage="https://www.telecomarmenia.am/images/promo/1/16510462295535.png"
    sizeClass="w-[38%] h-[300px] max-[1100px]:w-[47%] max-[1100px]:h-[200px]"
    onClickHandler={() => navigate('/Internet-and-Tv')}
  />
</div>

      <div className="text-white w-full h-[300px] bg-[#083f58] flex flex-col justify-around items-center font-sans">
  <h1 className="text-[64px] max-[900px]:text-[44px]">Become Team subscriber</h1>
  <p className="text-xl">Join us with your number and use all advantages of Team.</p>
  <div className="w-[200px] h-10 rounded-[60px] bg-[rgb(232,69,69)] flex justify-center items-center">
    <p className="text-xl">Join</p>
  </div>
</div>

<div className="mt-[60px] text-2xl w-full text-center">
  <h1>Newsfeed</h1>
</div>

      <div className="mt-[60px] w-full px-5 box-border h-[600px] bg-white max-[1000px]:w-[500px]">
  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={30}
    slidesPerView={3}
    slidesPerGroup={3}
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
    {sli2(news, navigate)}
  </Swiper>
</div>

      {gic()}

      {f1()}
    <Footer />
     
    </>
  )
}
export default Main