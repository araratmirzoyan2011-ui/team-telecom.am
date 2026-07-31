import { Link } from 'react-router-dom';

export function footer() {
  return (
    <>
      <footer className="flex flex-row justify-around w-full h-[600px] bg-[#083f58] text-white max-[1100px]:h-[700px] max-[900px]:h-[850px] max-[877px]:h-[940px] max-[801px]:mt-[30px] max-[801px]:h-[500px] max-[801px]:justify-center">
        <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
          <div
            className="ml-[5%] w-[200px] h-[60px] bg-contain bg-no-repeat"
            style={{ backgroundImage: "url(https://www.telecomarmenia.am/img/logo-light.svg?v=1)" }}
          ></div>
          <div className="flex mt-[30px] ml-[5%] text-xl">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
          <div className="flex mt-[30px] ml-[5%] text-xl">
            <i className="fa-solid fa-phone"></i>
            <p>100</p>
          </div>
          <div className="flex mt-[30px] ml-[5%] text-xl">
            <i className="fa-regular fa-envelope"></i>
            <p>info@telecomarmenia.am</p>
          </div>
          <div className="ml-5 mt-[60px] flex text-white">
            <img
              src="https://www.telecomarmenia.am/img/redesign/qr.svg"
              alt=""
              className="w-[100px] h-[100px]"
            />
            <div className="ml-[10px] flex flex-col">
              <img src="https://www.telecomarmenia.am/img/redesign/app_store.png" alt="" />
              <img
                src="https://www.telecomarmenia.am/img/redesign/google_play.png"
                alt=""
                className="mt-[5px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-start max-[900px]:flex-wrap max-[801px]:hidden">
          <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
            <img
              src="https://www.telecomarmenia.am/files/icons/1/16511388037707/45x45.png"
              alt=""
              className="w-[60px] h-[60px]"
            />
            <h1 className="mt-5 text-xl max-[1000px]:mt-5 max-[1000px]:text-lg">About Company</h1>
            <Link to="/about-us" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">About us</Link>
            <Link to="/conmus" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Connections museum</Link>
            <Link to="/news" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">News</Link>
            <Link to="/carrer" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">Career in Telecom Armenia</Link>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Results and reporting</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Corporate Ethics and Compliance</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Sustainable Development</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">To shareholders</p>
          </div>

          <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
            <img
              src="https://www.telecomarmenia.am/files/icons/1/16511387478667/45x45.png"
              alt=""
              className="w-[60px] h-[60px]"
            />
            <h1 className="mt-5 text-xl max-[1000px]:mt-5 max-[1000px]:text-lg">Information</h1>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Terms and conditions</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Security</p>
            <Link to="/paymanner" className="block text-[rgb(178,173,173)] mt-[10px] no-underline cursor-pointer max-[1000px]:text-xs">E-shop terms</Link>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Credit terms</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Delivery terms</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Sales and service centers</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Coverage</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Mobile network coverage areas</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Team internet available areas</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Useful documents</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Partners and suppliers</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Privacy policy</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">RA regions' codes</p>
          </div>

          <div className="mt-[60px] ml-[100px] max-[1100px]:ml-[50px]">
            <img
              src="https://www.telecomarmenia.am/files/icons/1/16511387748123/45x45.png"
              alt=""
              className="w-[60px] h-[60px]"
            />
            <h1 className="mt-5 text-xl max-[1000px]:mt-5 max-[1000px]:text-lg">Team applications</h1>
            <Link to="/TeamTv" className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">TeamTV</Link>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">My Team</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">TeamPay</p>
            <p className="text-[rgb(178,173,173)] mt-[10px] max-[1000px]:text-xs">Team Energy</p>
          </div>
        </div>
      </footer>

      <div className="text-white w-full h-10 bg-[#0c2a38] flex justify-center items-center">
        <p>© 2026 Telecom Armenia OJSC. All rights reserved. Developed by Team Solutions CJSC.</p>
      </div>
    </>
  );
}