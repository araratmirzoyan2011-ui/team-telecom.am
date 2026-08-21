import "../CSS/shared.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { N2} from '../Components/style2.jsx';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N3 } from '../Components/style5.jsx';
import { Faq } from '../Components/Faq.jsx';


function Koreez() {

    const faqLeft = [
    {
        q: "Activation and Deactivation",
        a: "Here you can place instructions regarding activation and deactivation."
    },
    {
        q: "Subscription price",
        a: "Here you can place details regarding the subscription price."
    }
];

const faqRight = [
    {
        q: "Who can subscribe?",
        a: "Here you can place information about who is eligible to subscribe."
    },
    {
        q: "How to start using Koreez?",
        a: "Here you can place instructions on how to start using Koreez."
    }
];

  return (
    <>
      <Header />
<div 
  className="w-full h-[500px] flex items-center justify-center relative px-6 md:px-16 mt-[100px]"
  style={{ backgroundColor: "#e2ecf7" }}
>
  <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full py-10">
      
      {/* Ձախ կողմի քարտը */}
      <div 
        className="w-full md:w-[480px] rounded-2xl p-8 md:p-10 text-white flex flex-col justify-between shadow-lg z-10"
        style={{ backgroundColor: "#42728e" }}
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide leading-tight">
            Koreez
          </h2>
          <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed mb-8">
            Learn by playing, Compete with your friends, Win with knowledge
          </p>
        </div>

        <div>
          <button className="bg-[#ff4e50] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md">
            Learn more
          </button>
        </div>
      </div>

      {/* Աջ կողմի նկարը */}
      <div className="flex-1 h-full flex items-center justify-center max-w-[650px]">
        <img 
          src="https://www.telecomarmenia.am/images/sliders_block_slides/1/17733177317883.png" 
          alt="Koreez landing" 
          className="max-h-full max-w-full object-contain"
        />
      </div>

  </div>
</div>
      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/17733165160539.png"
          h1='What is Koreez?'
          p='With Koreez, you can master your entire school curriculum through games and competing with friends.'
          col="text-white"
        />
      </div>
        <N3
        src='https://www.telecomarmenia.am/images/block_with_text/1/17733169461711.png'
        h1='The Advantages of Koreez'
        p='Study your lessons based on the national curriculum.
Play and earn points.
Compete with friends and become the best .
'
      />
      <div className='w-full min-h-[500px] flex items-center justify-center bg-[#024566]'>
        <N2
          src="https://www.telecomarmenia.am/images/block_with_text/1/17733183195181.png"
          h1='Safe and engaging learning'
          p='Koreez helps kids learn with joy, ensuring parents that the educational content is safe and high-quality.'
          button="Join"
          col="text-white"
        />
      </div>


        <Faq leftItems={faqLeft} rightItems={faqRight} title='FAQ' />
      
      <Footer />
    </>
  );
}

export default Koreez;