import React from 'react';
import { useCartStore } from './useCartStore';

export default function ProductCard({ el, i, isSpecial }) {
  const toggleLike = useCartStore((state) => state.toggleLike);
  const likedItems = useCartStore((state) => state.likedItems);
  
  const isLiked = likedItems.some((p) => p.text === el.text);

  return (
    <div className="relative p-5 text-black w-full h-[520px] flex flex-col justify-between border border-gray-200 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 my-4">
      
      <button 
        onClick={() => toggleLike(el)}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 active:scale-90 transition-transform cursor-pointer"
        aria-label="Like product"
      >
        <i className={`fa-solid fa-heart text-xl transition-colors duration-200 ${isLiked ? 'text-red-500 scale-110' : 'text-gray-300 hover:text-gray-400'}`}></i>
      </button>

      <div className="w-full h-[210px] flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
        <img
          src={el.src}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          alt={el.text || "Product image"}
        />
      </div>

      <div className="flex flex-col flex-grow mt-4">
        <p className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
          {el.text}
        </p>
        <h2 className="text-xl font-bold text-gray-900 mt-2">
          {el.value}
        </h2>
      </div>

      <div className="mt-auto pt-2">
        {isSpecial && (
          <>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <p className="text-sm font-medium text-red-600 mb-2">
              {el.amsekan} <span className="text-gray-500 font-normal">/ month</span>
            </p>
          </>
        )}

        <button 
          className="w-full h-11 flex items-center justify-center bg-red-600 text-white font-medium rounded-xl shadow-md hover:bg-red-700 active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <i className="fa-solid fa-basket-shopping mr-2"></i>
          <span>Add to cart</span>
        </button>
      </div>

    </div>
  );
}