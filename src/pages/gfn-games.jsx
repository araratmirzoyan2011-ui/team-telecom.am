import "../CSS/shared.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { N2} from '../Components/style2.jsx';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N3 } from '../Components/style5.jsx';
import { Faq } from '../Components/Faq.jsx';


function Gfn() {
const faqLeft = [
    {
        q: "Performance subscription",
        a: "Details regarding the Performance subscription."
    },
    {
        q: "How much does a subscription cost?",
        a: "Information about subscription pricing."
    },
    {
        q: "Who can subscribe?",
        a: "Information about who is eligible to subscribe."
    },
    {
        q: "How to start playing?",
        a: "Instructions on how to start playing."
    }
];

const faqRight = [
    {
        q: "Activation and Deactivation",
        a: "Instructions regarding activation and deactivation."
    },
    {
        q: "What devices can I play on?",
        a: "List of supported devices for playing."
    },
    {
        q: "System requirements.",
        a: "Details about system requirements."
    },
    {
        q: "Cosmo Box",
        a: "Information regarding Cosmo Box."
    }
];

  return (
    <>
      <Header />
<div 
  className="w-full h-[500px] flex items-center justify-center relative px-6 md:px-16 mt-[100px] overflow-hidden"
  style={{ 
    backgroundColor: "#020e1a",
    backgroundImage: `
      radial-gradient(circle at 10% 20%, rgba(0, 112, 243, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(0, 112, 243, 0.1) 0%, transparent 40%)
    `
  }}
>
  {/* Ֆոնի զարդանախշերը (PlayStation-ի խորհրդանիշների ոճով անկյունային ձևավորումներ) */}
  <div className="absolute top-10 left-10 w-24 h-24 border-l-4 border-t-4 border-[#0070f3]/30 rotate-[-15deg] pointer-events-none"></div>
  <div className="absolute bottom-10 right-10 w-32 h-32 border-r-4 border-b-4 border-[#0070f3]/20 rotate-[15deg] pointer-events-none"></div>

  <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full py-10 relative z-10">
      
      {/* Ձախ կողմի քարտը */}
      <div 
        className="w-full md:w-[480px] rounded-2xl p-8 md:p-10 text-white flex flex-col justify-between shadow-2xl border border-white/5"
        style={{ backgroundColor: "#111822" }}
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide leading-tight">
            Finally!
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8">
            A gaming computer is no longer needed!
          </p>
        </div>

        <div>
          <button className="bg-[#ff4e50] text-white text-base font-semibold px-8 py-3 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md">
            Play
          </button>
        </div>
      </div>

      {/* Աջ կողմի նկարը */}
      <div className="flex-1 h-full flex items-center justify-center max-w-[650px]">
        <img 
          src="https://www.telecomarmenia.am/images/sliders_block_slides/1/16902169870757.png" 
          alt="Cloud gaming landing" 
          className="max-h-full max-w-full object-contain"
        />
      </div>

  </div>
</div>
<div className='w-full min-h-[500px] flex items-center justify-center'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/16902170036083.jpeg"
          h1='Gaming computer in the cloud!'
          p='To play the most demanding games, you no longer need to buy an expensive gaming computer! All games are launched remotely on powerful servers, and the picture is broadcast to the device without delay.'
          col="text-[#2c3843]"
          button="Want to play!"
        />
      </div>

      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17477397496471.png'
        h1='Fast Internet'
        p='With Cosmo and Combo tariffs, you will get Full HD quality with frequency of 60 FPS and access to NVIDIA RTX and DLSS technologies. Become a TEAM subscriber, activate a subscription to the GeForce Games service'
        button=""
      />

      <div className='w-full min-h-[500px] flex items-center justify-center'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/17309633263175.jpeg"
          h1='Cosmo Box - watch, play, enjoy!'
          p='Explore new horizons of gaming experience and dive into the world of entertainment with our Cosmo Box.'
          button="Read more"
          col="text-[#2c3843]"
        />
      </div>

      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/16902170400405.jpeg'
        h1='Any device will become a gaming device'
        p='All games are already installed and run in the GFN.AM cloud service, which allows you to run demanding games on almost any device: PC, Mac, TV and even smartphone.'
        button=""
      />

      <div className='w-full min-h-[500px] flex items-center justify-center'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/16902170677644.jpeg"
          h1='Start playing right now!'
          p='Activate your subscription and get a Performance opportunity to launch more than 2000 games from the catalog GFN.AM'
          button=""
          col="text-[#2c3843]"
        />
      </div>

      <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17010843790026.png'
        h1='Connect in 3 steps'
        p='To start playing: 1. Connect the GeForce Games service, use the command *321# 😉 2. Register and log in to the GFN.AM via the Team button with your phone number 😎 3. On the GFN.AM download the app. Use your phone to log in to the site and play for a Premium subscription without queues at the top settings!'
        button=""
      />


        <Faq leftItems={faqLeft} rightItems={faqRight} title='FAQ' />
      
      <Footer />
    </>
  );
}

export default Gfn;