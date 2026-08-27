import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { bgimg } from "../Components/bg.jsx";
import { HBorder } from '../Components/hborder.jsx';
import { HBorder2 } from '../Components/hborder2.jsx';

function DeviceSettings() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');

  const [whatToDoOptions, setWhatToDoOptions] = useState([]);
  const [deviceModelOptions, setDeviceModelOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const whatToDoSnap = await getDocs(collection(db, "whatToDo"));
        const whatToDoData = whatToDoSnap.docs.map(doc => doc.data().title);
        setWhatToDoOptions(whatToDoData);

        const deviceSnap = await getDocs(collection(db, "deviceModels"));
        const deviceData = deviceSnap.docs.map(doc => doc.data().title);
        setDeviceModelOptions(deviceData);
      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալները կարդալիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ searchTerm, selectedAction, selectedDevice });
  };

  return (
    <>
      {header()}
      {bgimg("https://www.telecomarmenia.am/images/menu/1/16509767646793.png")}

      <div className="mt-[-50px] h-[120px] bg-white shadow-md rounded-lg flex justify-center items-center w-4/5 ml-[10%] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:w-[94%] max-[900px]:ml-[3%] z-10 relative">
        <HBorder 
          url="https://www.telecomarmenia.am/files/icons/1/16510715800139/45x45.png" 
          text="FAQ" 
          onClickHandler={() => navigate('/faq')} 
        />
        <HBorder2 
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

      <div className="w-4/5 mx-auto max-[1200px]:w-[90%] max-[900px]:w-[94%] my-12 relative min-h-[500px]">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#161414] mb-8">
          Device settings
        </h1>

        <form onSubmit={handleSearch} className="max-w-4xl relative z-10">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-full text-gray-700 focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-10 py-3 bg-[#ef4b4c] hover:bg-[#e03a3b] text-white font-semibold rounded-full transition-colors duration-200 shadow-sm"
            >
              Search
            </button>
          </div>

          <p className="text-gray-500 mb-4 text-sm sm:text-base">
            Select your question or device model to get the settings
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                disabled={loading}
                className="w-full px-5 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-gray-600 appearance-none focus:outline-none focus:border-gray-300 cursor-pointer text-sm disabled:opacity-60"
              >
                <option value="">{loading ? "Բեռնվում է..." : "What to do"}</option>
                {whatToDoOptions.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 text-xs">
                ▼
              </span>
            </div>

            <div className="relative">
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                disabled={loading}
                className="w-full px-5 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-gray-600 appearance-none focus:outline-none focus:border-gray-300 cursor-pointer text-sm disabled:opacity-60"
              >
                <option value="">{loading ? "Բեռնվում է..." : "Device model"}</option>
                {deviceModelOptions.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 text-xs">
                ▼
              </span>
            </div>
          </div>
        </form>

        <div className="absolute left-1/2 top-48 -translate-x-1/2 pointer-events-none z-0 opacity-40">
          <svg
            width="320"
            height="320"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DeviceSettings;