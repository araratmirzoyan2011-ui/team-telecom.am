import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export function header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [navMenu, setNavMenu] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const docRef = doc(db, "setting2", "menuData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNavMenu(docSnap.data().items || []);
        }
      } catch (error) {
        console.error("Error fetching menu: ", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-[1000] border-b border-gray-200 shadow-sm bg-white max-[1100px]:h-10">

      {/* Վերին տող (Top Bar) */}
      <div className="w-full bg-[#083f58] h-[40px] flex justify-center">
        <div className="w-full max-w-[1400px] flex justify-between items-center px-4">
          
          {/* Ձախ կողմ՝ լոգո և հիմնական հղումներ */}
          <div className="flex items-center h-full">
            <div className="w-[100px] h-8 bg-[url('https://www.telecomarmenia.am/img/logo-light.svg?v=1')] bg-contain bg-no-repeat max-[900px]:w-[60px]" />

            <Link
              to="/page1"
              className="h-full text-white text-sm px-4 flex items-center justify-center transition-all duration-300 no-underline hover:bg-[#125372] max-[900px]:hidden"
            >
              Private Clients
            </Link>

            <Link
              to="/business"
              className="h-full text-white text-sm px-4 flex items-center justify-center transition-all duration-300 no-underline hover:bg-[#125372] max-[900px]:hidden"
            >
              Business
            </Link>

            <Link
              to="/ej3"
              className="h-full text-white text-sm px-4 flex items-center justify-center transition-all duration-300 no-underline hover:bg-[#125372] max-[900px]:hidden"
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-basket-shopping text-xs"></i>
                <span>E-shop</span>
              </div>
            </Link>
          </div>

          {/* Աջ կողմ՝ Լեզուներ, որոնում և հաշիվ */}
          <div className="flex items-center h-full text-white">
            <div className="w-10 h-full text-sm hidden min-[1250px]:flex items-center justify-center border-r border-[#1a5570] hover:text-red-400 cursor-pointer transition-colors">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            
            <div className="flex text-xs font-medium hidden min-[1250px]:flex h-full">
              {['Հայ', 'Рус', 'Eng'].map((lang, idx) => (
                <div 
                  key={idx} 
                  className="w-12 h-full flex items-center justify-center border-r border-[#1a5570] hover:text-red-400 cursor-pointer transition-colors"
                >
                  {lang}
                </div>
              ))}
            </div>

            {/* Մոբայլ իկոններ */}
            <div className="flex items-center gap-4 px-2 min-[1250px]:hidden">
              <Link to="/ej3" className="text-white hover:text-red-400 transition-colors">
                <i className="fa-solid fa-basket-shopping"></i>
              </Link>
              <i className="fa-regular fa-credit-card hover:text-red-400 cursor-pointer transition-colors"></i>
              <i className="fa-solid fa-bars cursor-pointer hover:text-red-400 transition-colors"></i>
            </div>

            {/* Անձնական հաշվի կոճակ */}
            <Link
              to={isLoggedIn ? "/user" : "/login"}
              className="h-full px-4 text-sm flex items-center justify-center transition-all duration-300 border-l border-[#1a5570] hover:text-red-400 text-white no-underline gap-2 bg-[#083f58] hover:bg-[#125372]"
            >
              <i className="fa-solid fa-circle-user text-lg"></i>
              <span className="max-[1250px]:hidden font-medium">
                {isLoggedIn ? "Account" : "Personal account"}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Ներքին մենյու (Bottom Bar) */}
      <div className="w-full bg-white h-[60px] flex justify-center max-[1100px]:hidden">
        <div className="w-full max-w-[1400px] flex justify-between items-center px-4">
          <div className="flex items-center h-full">
            <div className="w-[100px] h-8 mr-6 bg-[url('https://www.telecomarmenia.am/img/logo-light.svg?v=1')] bg-contain bg-no-repeat filter brightness-75" />

            <div className="flex h-full">
              {navMenu.map((menu) => (
                <div
                  key={menu.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    to={menu.to}
                    className={`h-full px-5 text-[#2c3843] text-sm font-medium flex items-center justify-center transition-all duration-200 no-underline hover:bg-gray-50 hover:text-[#083f58] ${
                      openMenu === menu.label ? "bg-gray-50 text-[#083f58] shadow-inner" : ""
                    }`}
                  >
                    {menu.label}
                  </Link>

                  {openMenu === menu.label && menu.items && (
                    <div className="absolute top-full left-0 min-w-[220px] bg-white border border-gray-100 rounded-b-lg shadow-xl py-2 z-[1001]">
                      {menu.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="block px-4 py-2.5 text-sm text-[#2c3843] no-underline whitespace-nowrap transition-all duration-200 hover:bg-gray-50 hover:text-[#083f58] hover:pl-5"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payments Կոճակ */}
          <Link 
            to="/payments" 
            className="h-9 px-4 rounded-full flex text-[#083f58] bg-[#0fe4e4]/20 hover:bg-[#0fe4e4]/40 justify-center items-center gap-2 text-sm font-semibold transition-all duration-300 no-underline max-[1250px]:px-3"
          >
            <i className="fa-regular fa-envelope text-base"></i>
            <span>Payments</span>
          </Link>
        </div>
      </div>
    </header>
  );
}