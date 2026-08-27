import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from '../Components/hborder.jsx';
import { HBorder2 } from '../Components/hborder2.jsx';

const DEFAULT_FAQ_DATA = {
  'Mobile': [
    {
      title: 'USSD commands',
      items: [
        'How to change the SMS language in the Team?',
        'I use Be Free/Smart price plan, how can I check the balance of inclusions?',
        'How can I transfer money to another subscriber?',
        'How can I borrow money?',
        'How to make a call with a hidden caller ID?',
        'I want to call just one person with a hidden caller ID, but not to other numbers.',
        'How may I deactivate SMS ads notifications?',
        'How can I check the balance (for corporate subscribers)?',
        'How to check the balance of "3GB" and "40GB" postpaid internet packages?',
        'I use monthly internet service, how can I check the balance of MB?',
        'I use "Let\'s talk" service, how can I check the expiration date?'
      ]
    },
    {
      title: 'Balance check',
      items: [
        'How can I check the balance?',
        'In the case of a postpaid system, when is the amount to be paid presented and when is the number blocked?',
        'I paid an excess amount, what will happen to that amount?'
      ]
    },
    {
      title: 'Documentation',
      items: [
        'I am the authorized person of a company and I want to go to a retail store to make a deal. What documents should be presented?',
        'I am a Legal Entity and I want to become a corporate subscriber. What are the required documents?',
        'Can I terminate the contract online?'
      ]
    },
    {
      title: 'Limit',
      items: [
        'Why is my number suspended?',
        'I have not set a limit on the number, what limit is set?',
        'I want to set a permanent limit, can I set it by calling?',
        'I\'ve set a fixed limit on my number, but the bill has exceeded the limit, why?',
        'May I decrease the set limit on my number?'
      ]
    },
    {
      title: 'SMS settings',
      items: [
        'Why can\'t I send SMS?',
        'Why am I not receiving SMS messages from banks?',
        'Can I use the SMS messages provided by the price plan in the roaming zone?'
      ]
    },
    {
      title: 'Roaming',
      items: [
        'Can I top up my phone balance in roaming?',
        'Can I use the "Trusted payment" service in roaming?',
        'How can I contact the operator while in roaming?',
        'Can I use the "Call me" and the "Recharge my balance" services while in roaming?',
        'Is an incoming SMS charged in roaming?',
        'Can I activate roaming services if I am already outside of the country?'
      ]
    },
    {
      title: 'COMBO',
      items: [
        'Are COMBO packages prepaid or postpaid?',
        'How i can pay for activation?',
        'Why am I not charged after toping-up my mobile?',
        'How can I check the expiration date?',
        'During what period can I pay for the service before the termination of the contract?',
        'The expiry date of COMBO package hasn\'t passed yet, but the landline internet is disconnected, why?',
        'We paid for the internet using the 13****** key code, but it isn\'t reconnected, what\'s the problem?',
        'We use COMBO plan, but we don\'t make use of mobile number. Will my phone be charged if we make a payment?',
        'The number is in roaming zone, but the expiry date has passed, will it be activated if we make a payment?'
      ]
    }
  ],
  'Team Bonus': [
    {
      title: 'Team Bonus',
      items: [
        'Who can benefit from “Team Bonus”?',
        'How to enroll in the program?',
        'How to accumulate points?',
        'Bonus points accumulated for prepaid subscribers',
        'Bonus points accumulated for postpaid subscribers?',
        'How to exchange bonus points to the services?',
        'What kind of phone numbers are available within the "Nice Numbers" service?',
        'For how long can I use the accumulated points?',
        'Is there a validation period for the accumulated bonus points?',
        'What is status of the Team Bonus program and how is it granted?',
        'Can the accumulated bonus points be transferred to another subscriber?',
        'Can the granted status of Team Bonus be changed?',
        'Will my status and accumulated points be saved in the new Bonus program?'
      ]
    }
  ],
  'Internet': [
    {
      title: 'Internet settings',
      items: [
        'How can I get internet settings?',
        'How can I register Internet settings for phones with IOS system?',
        'How can I register internet settings for an Android system phone device?',
        'Do these settings also work in roaming, or does the APN change?'
      ]
    }
  ],
  'Fixed & Home solution': [
    {
      title: 'Documentation',
      items: [
        'I am a Legal Entity and I want to become a corporate subscriber. What are the required documents?',
        'I am the authorized person of the company and I want to go to a retail store to make a deal. What documents should be presented?'
      ]
    },
    {
      title: 'Additional services',
      items: [
        'What do the blocking numbers for directions mean?',
        'What do the numbers of blocked directions mean?',
        'How can I change my password?',
        'How can I activate / deactivate instant call forwarding?',
        'How can I activate / deactivate call forwarding when the line is busy?',
        'How can I activate / deactivate call forwarding when there is no answer?',
        'How can I close my number?',
        'How can I activate the "Calling number identification" service?',
        'How to activate / deactivate the "call waiting" service (third call)',
        'How does the "call waiting" service function?',
        'Why can\'t I make an outgoing call?'
      ]
    },
    {
      title: 'Balance check',
      items: [
        'How much do I need to pay for a new telephone line installation?',
        'How can I get my monthly billing information if I disagree with the bill presented for the previous month?',
        'Can I check my balance for the current month?',
        'How can I get information concerning my debt?',
        'How can I get a detailed bill?'
      ]
    },
    {
      title: 'Conclusion, termination of the contract',
      items: [
        'How can I make a contract for a telephone line installation?',
        'How can I temporarily disable the service?',
        'Will the service get activated automatically after suspension period?',
        'How can I terminate landline service contract?',
        'Can I install a temporary landline service?',
        'Can I change my telephone number?',
        'Can I rename the telephone number to another subscriber\'s name?'
      ]
    }
  ],
  'Payments': [
    {
      title: 'Payments validity period',
      items: [
        'How can I know the balance recharge validity period?',
        'If there is no charging period, can I go without charging and talking even for 1 year?',
        'How long can I use my SIM-card in case of zero or negative account balance?',
        'What is my SIM-card’s validity period in case of positive account balance?'
      ]
    },
    {
      title: 'Trusted Payment',
      items: [
        'How the amount will the charged if there is no sufficient amount on the balance?',
        'Why can\'t I use the service?',
        'How can I block the service with a code? I do not want this service be available for my phone number.',
        'How much is the service connection cost?',
        'Can I use the service while outside of Armenia?',
        'Can postpaid subscribers use the service?'
      ]
    },
    {
      title: 'Cards',
      items: [
        'Can I buy a phone number online?',
        'Can I buy an eSIM on the website?'
      ]
    }
  ],
  'Personal account': [
    {
      title: 'Personal Account',
      items: [
        'How can I sign up for “Personal Account”?',
        'Can I remove any number from the list?',
        'Can I see the content of text messages through the "Personal Account"?',
        'Is billing information provided by any payment?',
        'I am a corporate subscriber, can I use the "Personal Account"?',
        'Can I view my billing information separately or it is for the whole package?',
        'Can I activate a service through the "Personal Account"?',
        'Is "Personal Account" meant for landline numbers?'
      ]
    }
  ]
};

function Faq() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('Mobile');
  const [openAccordion, setOpenAccordion] = useState(0);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'Mobile',
    'Team Bonus',
    'Internet',
    'Fixed & Home solution',
    'Payments',
    'Personal account'
  ];

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
        console.error("Error fetching FAQ data: ", error);
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
  const defaultItems = DEFAULT_FAQ_DATA[activeCategory] || [];
  const itemsToDisplay = filteredFaqs.length > 0 ? filteredFaqs : defaultItems;

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
        <HBorder2
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenAccordion(0);
                }}
                className={`w-full text-left px-5 py-4 font-medium transition-colors flex justify-between items-center border-b border-gray-100 last:border-none ${
                  activeCategory === cat
                    ? 'bg-[#76c9cf] text-gray-900 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{cat}</span>
                {activeCategory === cat && (
                  <span className="text-xs">▶</span>
                )}
              </button>
            ))}
          </div>

          {/* Right Accordion List */}
          <div className="w-full md:w-3/4 flex flex-col gap-3">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (
              itemsToDisplay.map((item, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`w-full px-6 py-4 text-left flex justify-between items-center font-bold transition-colors ${
                        isOpen ? 'bg-[#76c9cf] text-[#003e47]' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.title}</span>
                      <span className="text-xs">
                        {isOpen ? '▲' : '▼'}
                      </span>
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