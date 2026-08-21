import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N2 } from '../Components/style2.jsx';
import { N } from '../Components/stylei1.jsx';
import { N3 } from '../Components/style5.jsx';
import { N1 } from '../Components/style1.jsx';
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

export const faqLeft = [
    {
        q: "What does it mean to purchase a number by subscription?",
        a: "Here you can place the detailed description of purchasing a number by subscription."
    },
    {
        q: "What are the conditions for purchasing a number by subscription?",
        a: "Here you can place the conditions regarding the subscription purchase."
    }
];

export const faqRight = [
    {
        q: "How to get a number by subscription?",
        a: "Here you can place instructions on how to get a number by subscription."
    },
    {
        q: "What happens if contract is terminated before the specified period?",
        a: "Here you can place details regarding early contract termination."
    }
];

function TeamTv2() {
   
    return (
        <>
            <Header />
{/* 
            <div className='w-full min-h-[500px] flex items-center justify-center'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/16832074487761.png"
                    h1='Buy Number by Subscription'
                    p="Get a nice number only just by subscribing to our services"
                    col="text-[#01415f]"
                    button="e-Shop"
                />
            </div> */}
            <div className='mt-[100px]'></div>
            <N 
                    src="https://www.telecomarmenia.am/file_manager/cosmo/img/iptv.png" 
                    arr={arr2} 
                  />
            {/* <div className='w-full h-auto bg-[#083f58] py-8'>
                <N1 arr={arr1} h1='How to Buy Number by Subscription?' />
            </div>
            <div className='w-full min-h-[500px] flex items-center justify-center bg-[#01415f]'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/16832074143841.png"
                    h1='Nice numbers'
                    p="Nice numbers available by online credit with VTB bank"
                    col="text-white"
                    button="Buy now"
                />
            </div>


            <Faq leftItems={faqLeft} rightItems={faqRight} title='FAQ' /> */}
            
            <Footer />
        </>
    );
}

export default TeamTv2;