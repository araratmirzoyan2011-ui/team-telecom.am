import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { border8 } from '../Components/border8.jsx';
import { share } from '../Components/Share.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from '../Components/hborder.jsx';
import { HBorder2 } from '../Components/hborder2.jsx';

function Promo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('News');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews7 = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "news7"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNewsList(data);
      } catch (error) {
        console.error("Սխալ news7 collection-ը կարդալիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews7();
  }, []);

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
        <div className="flex justify-between items-center mt-12 sm:mt-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161414]">
            Promos
          </h1>
        </div>

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
            loading ? (
              <div className="text-center py-10 text-gray-500 font-semibold">
                Բեռնվում է...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
                {newsList.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
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
            )
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