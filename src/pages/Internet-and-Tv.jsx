import { useState, useEffect } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

import "../CSS/shared.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import VideoCard from '../Components/VideoCard.jsx';
import PlanCard from '../Components/planeCard.jsx';
import { TariffCards } from '../Components/Tariff-Card.jsx';
import { N } from '../Components/stylei1.jsx';
import { db } from "../firebase.js";
import { N2, N4 } from '../Components/style2.jsx';
import { slider } from '../Components/slides4.jsx';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N3 } from '../Components/style5.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';;
import { Faq } from '../Components/Faq.jsx';
const arr2 = [
  { 
    img: "https://www.telecomarmenia.am/file_manager/cosmo/icons/2_icon.png", 
    title: "Catch-Up up-to 7 days", 
    text: "You will never miss your favorite TV programs and movies" 
  },
  { 
    img: "https://www.telecomarmenia.am/file_manager/cosmo/icons/3_icon.png", 
    title: "Huge Video Library", 
    text: "Large selection of movies, cartoons and TV series" 
  },
  { 
    img: "https://www.telecomarmenia.am/file_manager/cosmo/icons/4K_icon.png", 
    title: "TV box with 4K opportunity" 
  }
];

function InternetTV() {
  const [slides4, setSlides4] = useState([]);
  const [plans, setPlans] = useState([]);
  const [regionalPlans, setRegionalPlans] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [news4, setNews4] = useState([]);
  const [faqData, setFaqData] = useState({ left: [], right: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slidesSnapshot = await getDocs(collection(db, "slides4"));
        setSlides4(slidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const plansSnapshot = await getDocs(collection(db, "plans"));
        setPlans(plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const regionalSnapshot = await getDocs(collection(db, "plans2"));
        setRegionalPlans(regionalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const news4Snapshot = await getDocs(collection(db, "news4"));
        setNews4(news4Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // FAQ տվյալների բեռնումը Firebase-ից
        const faqDocRef = doc(db, "faq", "data");
        const faqDocSnap = await getDoc(faqDocRef);
        if (faqDocSnap.exists()) {
          setFaqData(faqDocSnap.data());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const displayedPlans = activeTab === 'basic' ? plans : regionalPlans;

  return (
    <>
      <Header />

      {/* Main Slider Section */}
      <div className="pt-[100px] w-full min-h-[500px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="mySwiper w-full h-[500px]"
        >
          {slider(slides4)}
        </Swiper>
      </div>

      <div className="w-full bg-[#024566] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-t-lg overflow-hidden flex w-full max-w-4xl shadow-md">
              <button
                onClick={() => setActiveTab('basic')}
                className={`flex-1 py-4 text-center font-bold text-lg transition-all border-b-4 cursor-pointer ${
                  activeTab === 'basic'
                    ? 'border-[#e64141] text-[#024566] bg-white'
                    : 'border-transparent text-gray-500 bg-gray-50 hover:text-gray-700'
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setActiveTab('regional')}
                className={`flex-1 py-4 text-center font-bold text-lg transition-all border-b-4 cursor-pointer ${
                  activeTab === 'regional'
                    ? 'border-[#e64141] text-[#024566] bg-white'
                    : 'border-transparent text-gray-500 bg-gray-50 hover:text-gray-700'
                }`}
              >
                Regional
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-6">
            {displayedPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17761517712737.png'
        h1='Be Free at a special price'
        p='Become a subscriber of one of the COSMO or COMBO packages and get up to 3 SIM cards at special rates'
      />

      <div className="w-full bg-[#024566] py-16 px-4">
        <div className='w-full flex justify-center text-white text-[32px] md:text-[48px] mb-[40px] text-center'>
          <h1>Get Be Free packages at a special price</h1>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-stretch gap-6">
            <TariffCards />
          </div>
        </div>
      </div>

      <N 
        src="https://www.telecomarmenia.am/file_manager/cosmo/img/iptv.png" 
        arr={arr2} 
      />

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#9d9991]'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/17859375803242.jpeg"
          h1='the big screen'
          p='Join COSMO 4 for 1 year and purchase premium TVs at an affordable price: TCL 55T6d QLED TV for 189 000 AMD instead of 299 900 AMD TCL 65P7K QLED TV for 259 000 AMD instead of 369,900 AMD. The most intense matches are ahead. Watch the games with high-speed internet and a premium quality screen.'
          button="Join"
          col="text-white"
        />
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
        <N4
          src="https://www.telecomarmenia.am/images/block_with_text/1/17859375803242.jpeg"
          h1='Special Offer'
          p="If you're already a COSMO subscriber, take advantage of the special offer on smart home devices. Automate lighting, heating, and security — with one tap and unlimited internet."
          button="More"
          col="text-white"
        />
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-white'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/1775819602079.png"
          h1='Cosmo Box - watch, play, enjoy!'
          p='Explore new horizons of gaming experience and dive into the world of entertainment.'
          button="Read more"
          col="text-[#2c3843]"
        />
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#daddde]'>
        <N4
          src="https://www.telecomarmenia.am/images/block_with_text/1/17859375803242.jpeg"
          h1='Nokia WI-FI 6 amplifier'
          p="Possibility of purchasing 3 SIM cards under “Be Free ” on special terms tariff plans, and amplifier of the Wi-Fi 6 signal."
          col="text-[#2c3843]"
        />
      </div>

      <div className='w-full py-8 flex justify-center text-[#2c3843] items-center text-2xl md:text-3xl font-bold'>
        <h1>NOKIA devices</h1>
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
        <N4
          src="https://www.telecomarmenia.am/images/block_with_text/1/1775822890677.png"
          h1='NOKIA BEACON 1.1 WI-FI 5'
          p="The device provides an uninterrupted and high-quality Wi-FI network throughout the apartment. Smart selection of frequencies guarantees uninterrupted Wi-Fi connection."
          col="text-white"
        />
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/17758229248308.png"
          h1='NOKIA BEACON 2 WI-FI 6'
          p="The newest device that works on Wi-Fi 6 technology and provides the opportunity to have a stable connection on an area of ​​up to 140 sq/m and also watch video in 4k quality and play online games."
          col="text-white"
        />
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
        <N4
          src="https://www.telecomarmenia.am/images/block_with_text/1/17758197185003.png"
          h1='GPON G-2426G-B'
          p="Dedicated communication channel. The technology of building a network provides the possibility of obtaining a separate optical fiber for each subscriber, which is the guarantee of the maximum Internet quality and high speed."
          col="text-white"
        />
      </div>

      {/* news4 Swiper Slider */}
      <div className="mt-[60px] w-full px-5 box-border min-h-[500px] flex justify-center py-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={2}
          slidesPerGroup={1}
          navigation={true}
          pagination={{ clickable: true }}
          style={{ width: "100%", paddingBottom: "40px" }}
          className='w-full max-w-6xl'
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            1000: { slidesPerView: 2, spaceBetween: 30 },
          }}
        >
          {news4 && news4.map((el, index) => (
            <SwiperSlide key={el.id ?? index}>
              <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-100 mx-auto">
                <div className="relative w-full h-[220px] overflow-hidden flex items-center justify-center">
                  <img 
                    src={el.bgImage || el.image || ''} 
                    alt={el.title || 'news'} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#024566]/70 mix-blend-multiply" />
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-start">
                  <h2 className="text-[#024566] text-2xl md:text-3xl font-bold mb-3">
                    {el.title || ''}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {el.description || ''}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='w-[60%] grid grid-cols-2 gap-[60px] mx-auto'>
        <VideoCard 
          src="https://www.youtube.com/embed/WzbiaREKq-g"
          title="Nokia Beacon 1.1 Wi-Fi 5"
          text="Nokia WiFi mesh creates a seamless Wi-Fi network throughout the home. The intelligent channel selection ensures that at each moment, the optimal Wi-Fi channel is selected, avoiding any Wi-Fi glitches."
        />
        <VideoCard 
          src="https://www.youtube.com/embed/PtGSGvtSxv4"
          title="Nokia Beacon 2 Wi-Fi 6"
          text="The latest device that works on Wi-Fi 6. Uninterrupted Wi-Fi connection without speed lose."  
        />
      </div>

      <Faq leftItems={faqData.left} rightItems={faqData.right} title="Terms" />
      
      <Footer />
    </>
  );
}

export default InternetTV;