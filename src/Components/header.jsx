import { Link } from 'react-router-dom';

export function header() {
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
          <div className="h-full text-sm text-center flex items-center justify-center bg-[#083f58] transition duration-1000 border-r border-gray-500 hover:text-red-500 w-[200px] text-white">
            <i className="fa-solid fa-circle-user"></i>
            <p>Personal account</p>
          </div>
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

      {/* h2 - ստորին տող */}
      <div className="bg-white flex justify-around max-[1100px]:hidden">
        <div className="flex">
          <div className="w-[100px] h-10 mt-2.5 bg-[url('https://www.telecomarmenia.am/img/logo-light.svg?v=1')] bg-contain bg-no-repeat" />
          <div className="w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 hover:bg-[whitesmoke]">
            <p>Tariffs</p>
          </div>
          <div className="w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 hover:bg-[whitesmoke]">
            <p>Internet</p>
          </div>
          <div className="w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 hover:bg-[whitesmoke]">
            <p>Services</p>
          </div>
          <div className="w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 hover:bg-[whitesmoke]">
            <p>Roaming</p>
          </div>
          <div className="w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 hover:bg-[whitesmoke]">
            <p>Online shop</p>
          </div>
          <div className="w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 hover:bg-[whitesmoke]">
            <p>Offers</p>
          </div>
          <div className="w-[100px] h-full text-[#2c3843] text-base text-center flex items-center justify-center bg-white transition duration-1000 hover:bg-[whitesmoke]">
            <p>Help</p>
          </div>
        </div>
        <div className="w-[150px] h-full flex text-[#2c3843] bg-[rgba(15,228,228,0.524)] justify-center items-center text-xl max-[1250px]:w-[100px]">
          <i className="fa-regular fa-envelope"></i>
          <p>Payments</p>
        </div>
      </div>
    </header>
  );
}