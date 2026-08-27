import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { border8 } from '../Components/border8.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from '../Components/hborder.jsx';
import { HBorder2 } from '../Components/hborder2.jsx';

// Տվյալների զանգվածը
const newsData = [
  {
    id: 1,
    date: "23 July",
    title: "Talk Together with the COSMO/COMBO Family",
    description: "",
    image: "https://www.telecomarmenia.am/images/news/2/17848037424702/450x250c-center.jpeg",
  },
  {
    id: 2,
    date: "15 July",
    title: "Special Offers Terms and Conditions",
    description: "Personalized special offers may be sent via SMS to prepaid subscribers of \"Telecom Armenia OJSC\". These offers are available only to subscribers who have received the respective SMS. To benefit from the offer, the subscriber must fulfill the condition specified in the SMS. Upon completion, a bonus will be credited in the form of balance or mobile data (MB/GB). The validity period of the bonus is specified in the SMS. The remaining bonus balance and its expiry date can be checked by dialing *17",
    image: null,
  },
  {
    id: 3,
    date: "08 July",
    title: "Special Offer Across the Republic of Armenia",
    description: "",
    image: "https://www.telecomarmenia.am/images/news/2/1784207591747/450x250c-center.jpeg",
  },
  {
    id: 4,
    date: "17 June",
    title: "Buy a TCL TV and enjoy COSMO 4 under special conditions",
    description: "",
    image: "https://www.telecomarmenia.am/images/news/2/17822016325371/450x250c-center.jpeg",
  },
  {
    id: 5,
    date: "10 June",
    title: "TCL: Special Offer for COSMO and COMBO Subscribers",
    description: "Starting June 10, «Telecom Armenia» OJSC launches a new special offer on TCL QLED TVs. By subscribing for 12 months to one of the following service packages — “COSMO 4 Regional 9900”, “COSMO 4 12500”, “COSMO 4 16500” or “COMBO 9900” — you can purchase TCL TVs at exclusive prices: TCL 55T6D QLED — AMD 189,000 instead of AMD 299,900 TCL 65P7K QLED — AMD 259,000 instead of AMD 369,900 The offer is available to both new and existing subscribers.",
    image: null,
  },
  {
    id: 6,
    date: "30 April",
    title: "Your MacBook with COSMO: 0%–0%–0% Installment Plan",
    description: "Join COSMO tariff packages and get your new MacBook with exclusive installment terms. The offer is available for both new and existing subscribers from May 1, 2026, to May 20, 2026. For New Subscribers By joining any COSMO tariff package, you can purchase a MacBook on installment with the following conditions for the first 18 months: 0% down payment 0% service fee 0% commission.",
    image: null,
  },
  {
    id: 7,
    date: "30 May",
    title: "Change your SIM card — get 40 GB.",
    description: "",
    image: "https://www.telecomarmenia.am/images/news/1/17784819024191/450x250c-center.jpeg",
  },
  {
    id: 8,
    date: "03 February",
    title: "Get 40 GB of Internet",
    description: "",
    image: "https://www.telecomarmenia.am/images/news/2/17486024156277/450x250c-center.jpeg",
  },
  {
    id: 9,
    date: "05 March",
    title: "Activate My Team unique offers!",
    description: "Have you already used the UNIQUE offers of the My Team application? Activate: \"Giga +\" Internet packages and get an additional 1 GB of Internet for the same fee \"Mega 500 +\" / \"Mega 300+\" services and get twice as much Internet for the same fee The offers are avialble only in My Team application. Download the My Team application.",
    image: null,
  },
  {
    id: 10,
    date: "03 March",
    title: "Sale of \"Regional 350+\" prepaid TP",
    description: "In all the kiosks of “Press Stand” you can buy prepaid tariff plan “Regional 350”. The price for prepaid card is 400 AMD The price for the Prepaid Tariff plan is 350 AMD, within the framework of which for 7 days you will get: Calls: to Team mobile network – 1000 minutes to RA and Artsakh other mobile networks – 10 minutes.",
    image: null,
  }
];

function Promo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('News');

  return (
    <>
      {header()}
      {bgimg("https://www.telecomarmenia.am/images/menu/1/16509766969299.png")}

      <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
        <HBorder 
          url="https://www.telecomarmenia.am/file_manager/shake_site/shake_logo.png" 
          text="Shake and Win!" 
          onClickHandler={() => navigate('/shake')} 
        />
        <HBorder 
          url="https://www.telecomarmenia.am/files/icons/1/1651070448779/45x45.png" 
          text="Team Bonus" 
          onClickHandler={() => navigate('/team-bonus')} 
        />
        <HBorder2 
          url="https://www.telecomarmenia.am/files/icons/1/16510717960323/45x45.png" 
          text="Promos" 
          onClickHandler={() => navigate('/promos')} 
        />
        <HBorder 
          url="https://www.telecomarmenia.am/files/icons/1/17865189736438/45x45.png" 
          text="MobiBattle" 
          onClickHandler={() => navigate('/mobibattle')} 
        />
        <HBorder 
          url="https://www.telecomarmenia.am/files/icons/1/17865188939861/45x45.png" 
          text="GeForce Games" 
          onClickHandler={() => navigate('/geforce-games')} 
        />
        <HBorder 
          url="https://www.telecomarmenia.am/files/icons/1/17865188628767/45x45.png" 
          text="Koreez" 
          onClickHandler={() => navigate('/koreez')} 
        />
      </div>

      <div className="w-[90%] max-w-[1200px] mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161414] mt-12 sm:mt-16">
          Promos
        </h1>

        <div className="mt-6 border-b border-gray-200 flex gap-6 sm:gap-10 items-center overflow-x-auto">
          {['News', 'Announcements', 'All'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-base sm:text-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'font-bold text-[#003B5C] border-b-4 border-[#52cee2] -mb-[2px]'
                  : 'font-medium text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {kalendar("2026.08.27", "2026.08.27")}
          {border8("Search")}
        </div>

        <div className="my-10">
          {(activeTab === 'News' || activeTab === 'All') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
              {newsData.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {item.image ? (
                      <div className="w-full h-56 sm:h-64 overflow-hidden relative bg-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#003B5C] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                          {item.date}
                        </span>
                      </div>
                    ) : (
                      <div className="pt-6 px-6">
                        <span className="inline-block bg-sky-50 text-[#003B5C] text-xs font-semibold px-3 py-1 rounded-full">
                          {item.date}
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-[#161414] group-hover:text-[#003B5C] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-50 mt-auto">
                    <span className="text-xs font-semibold text-[#52cee2] group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                      Read more &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Announcements' && (
            <div className="w-full py-16 flex flex-col items-center justify-center">
              <img 
                src="https://www.telecomarmenia.am/img/news-nothing-found.png" 
                alt="No Result Found" 
                className="w-28 sm:w-36 h-auto object-contain opacity-80"
              />
              <p className="text-xl sm:text-2xl text-gray-700 mt-6 font-medium">
                No Result Found
              </p>
            </div>
          )}
        </div>

        <div className="my-10 flex items-center">
          {share()}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Promo;