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

  // Բեռնում ենք մենյուի տվյալները Firebase-ի "setting2" կոլեկցիայից
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
    <header className="w-full h-[100px] grid grid-rows-[40px_60px] border-b border-gray-500 fixed top-0 left-0 z-[1000] max-[1100px]:h-10 max-[1100px]:grid-rows-[40px] max-[900px]:w-screen">

      {/* h1 - վերին տող */}
      <div className="bg-[#083f58] flex justify-around">

        <div className="grid grid-cols-3">
          <div className="hidden w-[100px] h-10 mt-2.5 bg-[url('https://www.telecomarmenia.am/img/logo-light.svg?v=1')] bg-contain bg-no-repeat max-[900px]:flex max-[900px]:w-[60px]" />

          <Link
            to="/page1"
            className="w-[200px] h-full text-white text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 no-underline hover:bg-[#3d5a76] max-[1250px]:w-[150px] max-[900px]:hidden"
          >
            <p>Private Clients</p>
          </Link>

          <Link
            to="/business"
            className="w-[200px] h-full text-white text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 no-underline hover:bg-[#3d5a76] max-[1250px]:w-[150px] max-[900px]:hidden"
          >
            <p>Business</p>
          </Link>

          <Link
            to="/ej3"
            className="w-[200px] h-full text-white text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 no-underline hover:bg-[#3d5a76] max-[1250px]:w-[150px] max-[900px]:hidden"
          >
            <div>
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <div>
              <p>E-shop</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-5 w-[40%] max-[1250px]:hidden">
          <div className="w-[100px] h-full text-white text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 border-r border-gray-500 hover:text-red-500">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="w-[100px] h-full text-white text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 border-r border-gray-500 hover:text-red-500">
            <p>Հայ</p>
          </div>
          <div className="w-[100px] h-full text-white text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 border-r border-gray-500 hover:text-red-500">
            <p>Рус</p>
          </div>
          <div className="w-[100px] h-full text-white text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 border-r border-gray-500 hover:text-red-500">
            <p>Eng</p>
          </div>

          {isLoggedIn ? (
            <Link
              to="/user"
              className="h-full text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 border-r border-gray-500 hover:text-red-500 w-[200px] text-white no-underline"
            >
              <i className="fa-solid fa-circle-user text-2xl"></i>
            </Link>
          ) : (
            <div className="h-full text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 border-r border-gray-500 hover:text-red-500 w-[200px] text-white">
              <i className="fa-solid fa-circle-user"></i>
              <Link to="/login">Personal account</Link>
            </div>
          )}
        </div>

        <div className="hidden max-[1250px]:flex">
          <div className="hidden max-[1250px]:flex max-[1250px]:flex-row max-[1250px]:justify-around max-[1250px]:w-[200px] max-[1250px]:h-auto max-[1250px]:text-white max-[1250px]:items-center max-[900px]:overflow-hidden">
            <i className="fa-solid fa-user"></i>
            <i className="fa-regular fa-credit-card"></i>
            <i className="fa-solid fa-basket-shopping"></i>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>

      <div className="bg-white flex justify-around max-[1100px]:hidden">
        <div className="flex">
          <div className="w-[100px] h-10 mt-2.5 bg-[url('https://www.telecomarmenia.am/img/logo-light.svg?v=1')] bg-contain bg-no-repeat" />

          {navMenu.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(menu.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                to={menu.to}
                className={`w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 no-underline hover:bg-[whitesmoke] ${
                  openMenu === menu.label ? "bg-[whitesmoke]" : ""
                }`}
              >
                <p>{menu.label}</p>
              </Link>

              {openMenu === menu.label && menu.items && (
                <div className="absolute top-full left-0 min-w-[220px] bg-white border border-gray-200 shadow-lg z-[1001]">
                  {menu.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block px-4 py-2.5 text-sm text-[#2c3843] no-underline whitespace-nowrap transition duration-300 hover:bg-[whitesmoke] hover:text-[#083f58]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-[150px] h-full flex text-[#2c3843] bg-[rgba(15,228,228,0.524)] justify-center items-center text-xl max-[1250px]:w-[100px]">
          <i className="fa-regular fa-envelope"></i>
          <p>Payments</p>
        </div>
      </div>
    </header>
  );
}