import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom'; // Եթե react-router-dom ես օգտագործում էջ գնալու համար
import { useCartStore } from './useCartStore'; // Կախված քո ֆայլի ճանապարհից

function ProductCard({ el, i }) {
  const navigate = useNavigate();
  
  // Zustand-ից վերցնում ենք ֆունկցիաները և վիճակը
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleLike = useCartStore((state) => state.toggleLike);
  const isLiked = useCartStore((state) => state.likes[i] || false);

  const isSpecial = [1, 3, 4, 5, 6, 7, 8, 9, 10].includes(i);

  const handleAddToCart = () => {
    addToCart(el); // Ավելացնում ենք Zustand-ի զամբյուղ
    navigate('/cart'); // Գնում ենք զամբյուղի էջ
  };

  return (
    <div className="relative p-[10px] text-black w-[90%] h-[500px] flex flex-col items-center border border-gray-500 bg-[whitesmoke] rounded-[20px] overflow-hidden transition-transform duration-300 ease-in-out [transform-origin:center_center] mt-10 hover:scale-110">
      
      {/* 🔴 Սրտիկի կոճակը անկյունում */}
      <button 
        onClick={() => toggleLike(i)}
        className="absolute top-4 right-4 z-10 text-2xl focus:outline-none transition-transform active:scale-95"
      >
        <i className={`fa-solid fa-heart ${isLiked ? 'text-red-600' : 'text-gray-400'}`}></i>
      </button>

      <p className="ml-5 mt-5 text-xl font-sans">{el.text}</p>
      <img
        src={el.src}
        className="rounded-t-[20px] object-cover"
        alt=""
      />
      <h1 className="mt-[10px]">{el.value}</h1>

      {isSpecial ? (
        <>
          <div className="w-[91%] h-px bg-gray-500 mt-[15px]"></div>
          <h1 className="mt-[10px]">{el.amsekan}/per mounth</h1>
          <div 
            onClick={handleAddToCart}
            className="mt-5 w-[200px] h-10 flex items-center justify-center bg-red-600 text-white transition-colors duration-1000 rounded-[20px] hover:bg-white hover:text-red-600 cursor-pointer"
          >
            <i className="fa-solid fa-basket-shopping mr-2"></i>
            <p>Add to cart</p>
          </div>
        </>
      ) : (
        <div 
          onClick={handleAddToCart}
          className="mt-[55px] w-[200px] h-10 flex items-center justify-center bg-red-600 text-white transition-colors duration-1000 rounded-[20px] hover:bg-white hover:text-red-600 cursor-pointer"
        >
          <i className="fa-solid fa-basket-shopping mr-2"></i>
          <p>Add to cart</p>
        </div>
      )}
    </div>
  );
}

export function slider5(d) {
  return d.map((el, i) => (
    <SwiperSlide key={i} className="flex justify-center">
      <ProductCard el={el} i={i} />
    </SwiperSlide>
  ));
}