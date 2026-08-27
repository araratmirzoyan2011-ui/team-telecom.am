import "../CSS/shared.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { N2 } from '../Components/style2.jsx';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { Ph } from "./ph3.jsx";
import { PromoSection } from "../Components/PromoSection.jsx";

function Shake() {

  // 1-ին բլոկի տվյալները
  const otherOperatorSteps = [
    "Shake every day, accumulate MBs and Team Bonus points",
    "By becoming a TEAM subscriber with your number within the Shake promo, you can activate all accumulated Bonus points and megabytes for a period of 3 days, paying 1 AMD for each MB package won."
  ];

  // 2-րդ բլոկի (Karapp) տվյալները
  const karappSteps = [
    "Win promo code",
    <>
      Download Karapp <a href="#" className="underline">application</a>
    </>,
    <>
      Activate promo code following the <a href="#" className="underline">instruction</a>
    </>,
    "Teach yourself by listening to audio recordings of lessons different areas and subjects"
  ];

  const bgImageStyle = (url) => ({
    backgroundImage: `url(${url})`
  });

  return (
    <>
      <Header />
      
      {/* Banner */}
      <div className="w-full mt-[100px] h-[500px] flex items-center justify-between relative px-6 md:px-16 overflow-hidden bg-[#143d49]">
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <path fill="#174450" d="M0,350 C360,250 720,450 1080,320 C1260,260 1380,300 1440,320 L1440,800 L0,800 Z"></path>
          <path fill="#143d49" d="M0,420 C400,320 680,500 1020,380 C1200,320 1350,380 1440,400 L1440,800 L0,800 Z"></path>
          <path fill="#113843" d="M0,500 C300,420 750,560 1100,460 C1250,420 1370,470 1440,490 L1440,800 L0,800 Z"></path>
        </svg>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-start pl-[5%] md:pl-[10%] pr-[5%] text-white z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide leading-tight">
              Shake and Win!
            </h2>
            <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed mb-8">
              Many prizes!
            </p>
          </div>
          <div>
            <button className="bg-[#ff4e50] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md">
              Join
            </button>
          </div>
        </div>

        <div
          className="hidden md:block w-1/2 h-full bg-contain bg-no-repeat bg-center z-10"
          style={bgImageStyle("https://www.telecomarmenia.am/images/sliders_block_slides/1/17399730277817.png")}
        />
      </div>
        
      <div className='w-full min-h-[500px] flex items-center justify-center '>
        <N2
          src='https://www.telecomarmenia.am/images/block_with_text/1/1785733079117.png'
          h1='Shake and win!'
          p='Shake every day and get opportunity to win iPhone 15, Apple AirPods Max, Dyson Styler, smart watch, powerbank, earbuds.'
          button=""
          col="text-[#2c3843]"
        />
      </div>

      <div className="w-full flex flex-col items-center gap-12 py-10 bg-[#f4f4f5]">
        <h1 className="text-3xl font-bold text-[#003B5C] text-center">
          How to participate?
        </h1>

        <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-5xl px-4">
          <Ph 
            src="https://www.telecomarmenia.am/file_manager/new_shake/am.png"
            text="Register in My Team application"
            button="Download"
          />
          <Ph 
            src="https://www.telecomarmenia.am/file_manager/icons/logo_icon%20(2).png"
            text="Open the Shake section"
          />
          <Ph 
            text="Shake and win surprises every day"
          />
        </div>

        <Ph 
          title="Subscribers of other operators also can shake"
          button="I want!"
        />
      </div>

      {/* Բլոկ 1: Բաց ֆոն, վերնագիրը մեջտեղում */}
      <PromoSection
        bgColor="#f8f9fa"
        textColor="text-[#003B5C]"
        title="If you are subscriber of other operator"
        centerTitle={true}
        imageSrc="https://www.telecomarmenia.am/file_manager/new_shake/shake%20lending-07.png"
        listItems={otherOperatorSteps}
      />

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#e3ddd2] '>
        <N2
          src='https://www.telecomarmenia.am/images/block_with_text/1/17337485990808.png'
          h1='Unlimited Shakes'
          p='Activate "1GB + Shake" service, get 1GB internet for 3 days and one additional shake only for 100 AMD.'
          button="Activate"
          col="text-[#2c3843]"
        />
      </div>

      {/* Բլոկ 2: Karapp promo codes (Մուգ կապույտ, վերնագիրը ձախից) */}
      <PromoSection
        bgColor="#01425f"
        textColor="text-white"
        title="Karapp promo codes"
        centerTitle={false}
        imageSrc="https://www.telecomarmenia.am/file_manager/new_shake/karapp.jpg"
        listItems={karappSteps}
      />

      <Footer />
    </>
  );
}

export default Shake;