import React from 'react';
import { useCartStore } from './useCartStore';

export default function ProductCard({ el, i, isSpecial }) {
  const toggleLike = useCartStore((state) => state.toggleLike);
  const likedItems = useCartStore((state) => state.likedItems);
  
  const isLiked = likedItems.some((p) => p.text === el.text);

  return (
    <div className="relative p-[10px] text-black w-full h-[500px] flex flex-col items-center border border-gray-500 bg-[whitesmoke] rounded-[20px] overflow-hidden transition-transform duration-300 ease-in-out [transform-origin:center_center] mt-10 hover:scale-105">
      
      <button 
        onClick={() => toggleLike(el)}
        className="absolute top-4 right-4 z-10 text-2xl focus:outline-none transition-transform active:scale-95 cursor-pointer"
      >
        <i className={`fa-solid fa-heart ${isLiked ? 'text-red-600' : 'text-gray-400'}`}></i>
      </button>

      <p className="ml-5 mt-5 text-xl font-sans">{el.text}</p>
      <img
        src={el.src}
        className="rounded-t-[20px] object-cover w-full h-[200px]"
        alt=""
      />
      <h1 className="mt-[10px]">{el.value}</h1>

      {isSpecial ? (
        <>
          <div className="w-[91%] h-px bg-gray-500 mt-[15px]"></div>
          <h1 className="mt-[10px]">{el.amsekan}/per mounth</h1>
          <div className="mt-5 w-[200px] h-10 flex items-center justify-center bg-red-600 text-white transition-colors duration-1000 rounded-[20px] hover:bg-white hover:text-red-600 cursor-pointer">
            <i className="fa-solid fa-basket-shopping mr-2"></i>
            <p>Add to cart</p>
          </div>
        </>
      ) : (
        <div className="mt-[55px] w-[200px] h-10 flex items-center justify-center bg-red-600 text-white transition-colors duration-1000 rounded-[20px] hover:bg-white hover:text-red-600 cursor-pointer">
          <i className="fa-solid fa-basket-shopping mr-2"></i>
          <p>Add to cart</p>
        </div>
      )}
    </div>
  );
}