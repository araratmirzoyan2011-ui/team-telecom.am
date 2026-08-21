import "../CSS/shared.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { N2} from '../Components/style2.jsx';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N3 } from '../Components/style5.jsx';
import { Faq } from '../Components/Faq.jsx';
import { StepTimeline } from '../Components/StepTimeline';
import { HowToParticipate } from "../Components/Ph3.jsx";
import { ph as Ph } from '../Components/ph';
import { N8 } from "../Components/stile8.jsx";
function TeamBonus() {

    const faqLeft = [
    {
        q: "Who can use MobiBattle promocodes?",
        a: "All active Team subscribers participating in the Team Bonus program can exchange points for MobiBattle promocodes."
    },
    {
        q: "Steps to activate MobiBattle promo code",
        a: "Visit the MobiBattle portal, enter your promo code in the 'Enter Promocode' field, and activate your 7-day free subscription."
    }
];

const faqRight = [
    {
        q: "Where i can find FAQ?",
        a: "You can find all general questions and answers related to the Team Bonus program right here in this section."
    },
    {
        q: "Where i can find terms of \"Team Bonus\" program?",
        a: "Detailed terms, conditions, and regulations of the Team Bonus program are available on the official Team Telecom Armenia website or in the 'My Team' application."
    }
];

const arr = [
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16511330523361.png", "Minutes"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/1651133131141.png", "Free Internet"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17213717628461.png", "Nice Numbers"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/17213717629677.png", "Promo Codes"]
];

  return (
    <>
      <Header />
      
      {/* Վերևի գլխավոր բլոկ */}
      <div className="w-full mt-[100px] h-[500px] flex items-center justify-center relative px-6 md:px-16 overflow-hidden" style={{ backgroundColor: "#024566" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap gap-12 justify-center items-center p-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <svg key={i} className="w-12 h-12 text-white transform -rotate-45" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ))}
        </div>

        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full py-10 relative z-10">
          <div 
            className="w-full md:w-[480px] rounded-2xl p-8 md:p-10 text-white flex flex-col justify-between shadow-2xl backdrop-blur-md"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide leading-tight">
                “Team Bonus”
              </h2>
              <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed mb-8">
                Join us and accumulate bonus points
              </p>
            </div>
            <div>
              <button className="bg-[#ff4e50] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md">
                More
              </button>
            </div>
          </div>

          <div className="flex-1 h-full flex items-center justify-center max-w-[550px]">
            <img 
              src="https://www.telecomarmenia.am/images/sliders_block_slides/1/16534822128047.png" 
              alt="Team Bonus landing" 
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* What is Team Bonus */}
      <div className='w-full min-h-[500px] flex items-center justify-center'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/1653482242093.png"
          h1='What is "Team Bonus"?'
          p='"Team Bonus" is a reward program that allows you to accumulate bonus points for your expenses and exchange them with the proposed services. Accumulate bonus points just using Team services and exchange them with different services: Internet packages, minutes and special offers.'
          col="text-[#01425f]"
        />
      </div>

      {/* How to join */}
      <div className="w-full bg-[#024566] py-16 px-4 md:px-10 flex flex-col items-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">How to join?</h1>
        
        <div className="w-full max-w-5xl mb-12">
            <StepTimeline />
        </div>

        <div className="w-[80%] max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <HowToParticipate 
                src="https://www.telecomarmenia.am/images/slider_block_with_steps_slides/1/1649664611896.jpeg"
                title="How to participate?"
                description='In order to enroll in Team Bonus, you need to install "My Team" application and visit Bonus section or register to "Personal Account". You can join the program by dialing'
                ussd="*555# ."
            />
            <HowToParticipate 
                src="https://www.telecomarmenia.am/images/slider_block_with_steps_slides/1/16496646119184.png"
                title="How to accumulate points?"
                description='In order to benefit from Team Bonus, you just need to be Team subscriber, use services and accumulate bonus points.'
                ussd=""
            />
            <HowToParticipate 
                src="https://www.telecomarmenia.am/images/slider_block_with_steps_slides/1/16496646119398.jpeg"
                title="How to use points?"
                description='Accumulated points you can exchange with GBs/MBs, free minutes, SMS, voice packages, and special offers.'
                ussd=""
            />
        </div>
      </div>

      <div className="w-full py-20 px-6 flex flex-col items-center text-[#01425f]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center max-w-4xl leading-tight mb-16">
          On what i can spent my bonus points?
        </h1>
        <div className="w-[80%] max-w-6xl grid grid-cols-4 gap-8 max-[750px]:grid-cols-1 max-[750px]:gap-12">
          {arr.map((el, index) => (
            <Ph key={index} src={el[0]} text={el[1]} />
          ))}
        </div>
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#e3ddd4]'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/17636361813873.png"
          h1='Roaming package in Team Bonus'
          p='Accumulate bonus points and enhance your travels with Team Bonus. Don’t miss the opportunity to purchase Roaming package 1GB+ for 12000 points and 100 AMD..'
          button="More"
          col="text-[#01425f]"
        />
      </div>

      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#f4f1ea]'>
        <N3
          src='https://www.telecomarmenia.am/images/block_with_text/1/17213689791654.jpeg'
          h1='MobiBattle promocodes!'
          p='In partner offers section activate MobiBattle 7-day free subscription promo code via 1000 Team Bonus points. Visit MobiBattle portal. Enter Promocode in the "Enter Promocode" field. Activate and get a 7-day free subscription. With activated subscription start playing Casual games, Battle Arena (PUBG) and Singlepayer games from MobiBattle portal for 7 days free period.'
          
        />
      </div>

      <Faq leftItems={faqLeft} rightItems={faqRight} title='Useful information' />
      <div className='w-full min-h-[300px] flex justify-center items-center bg-[#024566]'>
                <N8
                    h1='Interested?'
                    p='Then start accumulate points right now!'
                    button='Join'
                    col="text-white"
                />
      </div>
      <Footer />
    </>
  );
}

export default TeamBonus;