import "../CSS/shared.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { N2 } from '../Components/style2.jsx';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N3 } from '../Components/style5.jsx';
import { Faq } from '../Components/Faq.jsx';

function Mobibattle2() {

    const faqLeft = [
        {
            q: "Activation",
            a: "Instructions regarding activation."
        },
        {
            q: "Deactivation",
            a: "Instructions regarding deactivation."
        },
        {
            q: "Price",
            a: "Details regarding the subscription price."
        }
    ];

    const faqRight = [
        {
            q: "Prizes",
            a: "Information about prizes and winners."
        },
        {
            q: "Game types",
            a: "Details about Casual Games, Single Player Games, and Battle Arena."
        }
    ];

    return (
        <>
            <Header />
            
            {/* Հիմնական բաններ (Hero section) */}
            <div 
                className="w-full h-[500px] flex items-center justify-center relative px-6 md:px-16 mt-[100px]"
                style={{ backgroundColor: "#0b2545" }}
            >
                <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full py-10">
                    
                    {/* Ձախ կողմի քարտը */}
                    <div 
                        className="w-full md:w-[480px] rounded-2xl p-8 md:p-10 text-white flex flex-col justify-between shadow-lg z-10"
                        style={{ backgroundColor: "#134074" }}
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide leading-tight">
                                MobiBattle
                            </h2>
                            <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed mb-8">
                                Join, Have fun, Win!
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
                            alt="MobiBattle landing" 
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                </div>
            </div>

            {/* Բլոկ 1 - What is MobiBattle? */}
            <div className='w-full min-h-[500px] flex items-center justify-center bg-[#f4f1ea]'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/17733165160539.png"
                    h1='What is MobiBattle?'
                    p="MobiBattle is a modern gaming platform. You don't need to download anything to your phone. Just go to the site and compete with live players!"
                    col="text-[#2c3843]"
                    button="Play"
                />
            </div>

            {/* Բլոկ 2 - Game Types */}
            <N3
                src='https://www.telecomarmenia.am/images/block_with_text/1/17733169461711.png'
                h1='Game Types'
                p='1. Casual Games: Play and climb to the top of the leaderboard! Casual Games are part of a leaderboard, displaying player rankings (the players who took 1-59 places with the maximum number of points). 2. Single Player Games: Play anytime, anywhere! Single Player Games do not contribute to the leaderboard. 3. Battle Arena: Participate in esports games and win prizes! Battle Arena is a part of a leaderboard, that shows player rankings based on their game results.'
            />

            {/* Բլոկ 3 - Prizes */}
            <div className='w-full min-h-[500px] flex items-center justify-center bg-[#f4f1ea]'>
                <N2
                    src="https://www.telecomarmenia.am/images/block_with_text/1/17733183195181.png"
                    h1='Prizes'
                    p='Get on the leaderboard where the best players get prizes: smartphones, smart watches, wireless headphones, powerbank and more.'
                    button=""
                    col="text-[#2c3843]"
                />
            </div>

            {/* FAQ բաժին */}
            <Faq leftItems={faqLeft} rightItems={faqRight} title='Frequently asked questions' />
            
            <Footer />
        </>
    );
}

export default Mobibattle2;