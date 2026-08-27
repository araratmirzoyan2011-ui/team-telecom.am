import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from '../Components/hborder.jsx';
import { HBorder2 } from '../Components/hborder2.jsx';

const CATEGORIES = [
  'Mobile',
  'Team Bonus',
  'Internet',
  'Fixed & Home solution',
  'Payments',
  'Personal account'
];

function Faq() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('Mobile');
  // Սկզբնական արժեքը դնում ենք null, որպեսզի ոչ մի հարց բացված չլինի
  const [openAccordion, setOpenAccordion] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'faqs'));
        const faqs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFaqData(faqs);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const filteredFaqs = faqData.filter(item => item.category === activeCategory);

  return (
    <>
      {header()}
      {bgimg("https://www.telecomarmenia.am/images/menu/1/16509767646793.png")}

      {/* Top Navigation Cards */}
      <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
        <HBorder2 
          url="https://www.telecomarmenia.am/files/icons/1/16510715800139/45x45.png" 
          text="FAQ" 
          onClickHandler={() => navigate('/faq')} 
        />
        <HBorder 
          url="https://www.telecomarmenia.am/files/icons/1/16510715205036/45x45.png" 
          text="Device settings" 
          onClickHandler={() => navigate('/device-settings')} 
        />
        <HBorder
          url="https://www.telecomarmenia.am/files/icons/1/16510717960323/45x45.png" 
          text="Subscriber service" 
          onClickHandler={() => navigate('/b2c-subscriber-service')} 
        />
        <HBorder 
          url="https://www.telecomarmenia.am/files/icons/1/16510713241559/45x45.png" 
          text="USSD codes and useful numbers" 
          onClickHandler={() => navigate('/ussd-and-numbers')} 
        />
      </div>

      {/* FAQ Main Content */}
      <div className="w-4/5 mx-auto max-[1200px]:w-[90%] max-[900px]:w-[94%] my-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161414] mb-8">
          FAQ
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Sidebar Menu */}
          <div className="w-full md:w-1/4 bg-[#f4f6f7] rounded-md overflow-hidden shadow-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Կատեգորիան փոխելիս նույնպես փակում ենք բոլոր բացված հարցերը
                  setOpenAccordion(null);
                }}
                className={`w-full text-left px-5 py-4 font-medium transition-colors flex justify-between items-center border-b border-gray-100 last:border-none ${
                  activeCategory === cat
                    ? 'bg-[#76c9cf] text-gray-900 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{cat}</span>
                {activeCategory === cat && <span className="text-xs">▶</span>}
              </button>
            ))}
          </div>

          {/* Right Accordion List */}
          <div className="w-full md:w-3/4 flex flex-col gap-3">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : filteredFaqs.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Այս բաժնում հարցեր չկան:</div>
            ) : (
              filteredFaqs.map((item, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div 
                    key={item.id || index} 
                    className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`w-full px-6 py-4 text-left flex justify-between items-center font-bold transition-colors ${
                        isOpen ? 'bg-[#76c9cf] text-[#003e47]' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.title}</span>
                      <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
                    </button>

                    {isOpen && (
                      <div className="px-8 py-5 border-t border-gray-100 bg-white">
                        {Array.isArray(item.items) ? (
                          <ul className="list-disc pl-5 space-y-3 text-[#2b6cb0]">
                            {item.items.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <a href="#faq" className="hover:underline font-medium text-sm">
                                  {subItem}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">{item.content || item.answer}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Faq;