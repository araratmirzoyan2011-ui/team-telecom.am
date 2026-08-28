import "../CSS/shared.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { N2 } from '../Components/style2.jsx';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { N3 } from '../Components/style5.jsx';
import { Faq } from '../Components/Faq.jsx';
import RoamingCard from '../Components/RoamingCard.jsx';
import { N1 } from "../Components/Style111.jsx";

function Roaming() {
    const arr2 = [
        [
            "https://www.telecomarmenia.am/images/block_with_icons_icons/1/16511298499299.png", 
            "Calls", 
            "From 29,99 AMD/min"
        ],
        [
            "https://www.telecomarmenia.am/images/block_with_icons_icons/1/16511332255945.png", 
            "Internet", 
            "From 0.5 AMD/MB"
        ],
        [
            "https://www.telecomarmenia.am/images/block_with_icons_icons/1/17830723331028.png", 
            "SMS", 
            "From 25 AMD"
        ]
    ];

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

    // Փաթեթների տվյալները
    const packages = [
        { id: 1, title: "Roaming package", dataValue: "1 GB +", price: "2000 AMD" },
        { id: 2, title: "Roaming package", dataValue: "4 GB", price: "5000 AMD" },
        { id: 3, title: "Roaming package", dataValue: "10 GB", price: "12000 AMD" },
        { id: 4, title: "Roaming package", dataValue: "20 GB", price: "20000 AMD" },
        { id: 5, title: "Roaming package 1 GB", subtitle: "(Russia, Georgia)", price: "500 AMD" }
    ];

    return (
        <>
            <Header />
            <div 
                className="w-full h-[500px] flex items-center justify-center relative px-6 md:px-16 mt-[100px]"
                style={{ backgroundColor: "#e2ecf7" }}
            >
                <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full py-10">
                    <div 
                        className="w-full md:w-[480px] rounded-3xl p-8 md:p-10 text-white flex flex-col justify-between shadow-md z-10"
                        style={{ backgroundColor: "#777777" }}
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide leading-tight">
                                Let's discover the world
                            </h2>
                            <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed mb-8">
                                Roaming that moves with you
                            </p>
                        </div>
                        <div>
                            <button className="bg-[#ff4e50] text-white text-base font-semibold px-8 py-2.5 rounded-full hover:bg-red-600 transition-all duration-300 shadow-sm">
                                Map
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center max-w-[650px]">
                        <img 
                            src="https://www.telecomarmenia.am/images/sliders_block_slides/1/17857625505622.png" 
                            alt="Roaming landing" 
                            className="max-h-full max-w-full object-contain rounded-3xl"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full py-20 px-6 md:px-16  bg-[#024566] text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">
                        Internet in roaming
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {packages.slice(0, 3).map((item) => (
                            <RoamingCard 
                                key={item.id}
                                title={item.title}
                                subtitle={item.subtitle}
                                dataValue={item.dataValue}
                                price={item.price}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {packages.slice(3, 5).map((item) => (
                            <RoamingCard 
                                key={item.id}
                                title={item.title}
                                subtitle={item.subtitle}
                                dataValue={item.dataValue}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-full h-auto bg-[#083f58] py-8'>
                <N1 arr={arr2} h1='More than 140 countries' />
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
Compete with friends and become the best .'
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

export default Roaming;