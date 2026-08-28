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
import { hborder3 } from "../Components/hborder3.jsx";

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
            q: "For roaming guests",
            a: "Here you can place information and instructions for roaming guests."
        }
    ];

    const faqRight = [
        {
            q: "How to recharge balance abroad?",
            a: "Here you can place instructions on how to recharge your balance while being abroad."
        }
    ];

    const packages = [
        { id: 1, title: "Roaming package", dataValue: "1 GB +", price: "2000 AMD" },
        { id: 2, title: "Roaming package", dataValue: "4 GB", price: "5000 AMD" },
        { id: 3, title: "Roaming package", dataValue: "10 GB", price: "12000 AMD" },
        { id: 4, title: "Roaming package", dataValue: "20 GB", price: "20000 AMD" },
        { id: 5, title: "Roaming package 1 GB", subtitle: "(Russia, Georgia)", price: "500 AMD" }
    ];

    const roaming9Data = [
        { label: "Internet", value: "9 AMD/MB*" },
        { label: "Incoming and outgoing calls to Armenia", value: "150 AMD/min" },
        { label: "Local and International calls", value: "250 AMD/min" },
        { label: "SMS", value: "25 AMD" }
    ];

    const roaming9Countries = "*Albania, Andorra, Anguilla, Antigua and Barbuda, Argentina, Australia, Austria, Bahamas, Bangladesh, Barbados, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Canada, Cayman Islands, China, Congo, Croatia, Cyprus, Czech Republic, Denmark, Dominica, Egypt, Estonia, Faroe Islands, Fiji, Finland, France, Georgia, Germany, Ghana, Greece, Greenland, Grenada, Iceland, Ireland, Isle of Man, Israel, Italy, Japan, Kazakhstan, Kosovo, Kyrgyzstan, Latvia, Lesotho, Liechtenstein, Lithuania, Luxembourg, Malaysia, Malta, Moldova, Montenegro, Montserrat, Morocco, Mozambique, Myanmar, Netherlands, New Zealand, North Macedonia, Norway, Papua New Guinea, Poland, Portugal, Qatar, Romania, Russia, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Taiwan, Tajikistan, Thailand, Tonga, Ukraine, United Kingdom, United States, Uzbekistan, Vanuatu.";

    const tariffsData = [
        { label: "Internet", value: "9 AMD/MB" },
        { label: "Incoming and outgoing calls to Team* mobile network", value: "29.99 AMD/min" },
        { label: "Local and International calls", value: "250 AMD/min" }
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

            <div className="w-full py-20 px-6 md:px-16 bg-[#024566] text-white">
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

            <div className="w-full h-auto bg-[#083f58] py-8">
                <N1 arr={arr2} h1="More than 140 countries" />
            </div>

            <div className="w-full py-16 px-6 md:px-16 bg-white text-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        Internet in Roaming 9 AMD/MB
                    </h2>
                    <p className="text-sm text-gray-500 mb-8">
                        Available destinations and tariffs: <a href="#list" className="text-blue-600 underline">list</a>
                    </p>

                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
                        {roaming9Data.map((row, index) => (
                            <div 
                                key={index} 
                                className={`flex flex-col md:flex-row justify-between items-center p-4 md:p-5 ${
                                    index !== roaming9Data.length - 1 ? 'border-b border-gray-200' : ''
                                } bg-gray-50 hover:bg-gray-100 transition-colors`}
                            >
                                <div className="text-left font-medium text-gray-700 w-full md:w-3/4 mb-2 md:mb-0">
                                    {row.label}
                                </div>
                                <div className="text-left md:text-right font-bold text-gray-900 w-full md:w-1/4">
                                    {row.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-gray-400 text-left leading-relaxed">
                        {roaming9Countries}
                    </p>
                </div>
            </div>

            <div className="w-full py-16 px-6 md:px-16 bg-gray-50 text-gray-800 border-t border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                        Best tariffs
                    </h2>

                    <div className="flex justify-center items-center gap-3 mb-3">
                        <span className="text-2xl" title="Italy">🇮🇹</span>
                        <span className="text-2xl" title="Russia">🇷🇺</span>
                        <span className="text-2xl" title="Georgia">🇬🇪</span>
                        <span className="text-2xl" title="Ukraine">🇺🇦</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                        Italy (Wind), Russia(Beeline), Georgia (Cellfie), Ukraine (Kyivstar)
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        Available destinations and tariffs: <a href="#list" className="text-blue-600 underline">list</a>
                    </p>

                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                        {tariffsData.map((row, index) => (
                            <div 
                                key={index} 
                                className={`flex flex-col md:flex-row justify-between items-center p-4 md:p-5 ${
                                    index !== tariffsData.length - 1 ? 'border-b border-gray-200' : ''
                                } hover:bg-gray-50 transition-colors`}
                            >
                                <div className="text-left font-medium text-gray-700 w-full md:w-3/4 mb-2 md:mb-0">
                                    {row.label}
                                </div>
                                <div className="text-left md:text-right font-bold text-gray-900 w-full md:w-1/4">
                                    {row.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h1 className="text-[40px] ml-[20%] font-bold text-[rgb(22,20,20)] mt-[60px]">Useful information</h1>

            <div className="w-[80%] mt-[40px] ml-[20%] mb-[150px] grid grid-cols-3 gap-5 max-xl:grid-cols-3 max-[800px]:grid-cols-2 max-[700px]:grid-cols-1">
                {hborder3(
                    "Roaming activation terms", 
                    "Learn more about the terms and conditions required for activating roaming services."
                )}
                {hborder3(
                    "Roaming tariffs at the sea and in the air", 
                    "Be online even at the sea and in the air"
                )}
            </div>

            <Faq leftItems={faqLeft} rightItems={faqRight} title="FAQ" />
            
            <Footer />
        </>
    );
}

export default Roaming;