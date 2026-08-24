import React from 'react';

export default function Border1({ inf1, sizeClass, bgImage, onClickHandler, className = "" }) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between rounded-2xl text-white bg-[#083f58] shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden group ${sizeClass} ${className}`}
      onClick={onClickHandler}
    >
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-start justify-center p-6 sm:px-8 opacity-0 translate-y-5 animate-[fadeInUp_1s_ease-out_forwards]">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide line-clamp-3 mb-3 sm:mb-4">
          {inf1}
        </h1>
        
        <div className="flex items-center text-sm sm:text-base font-semibold text-gray-200 group-hover:text-white transition-colors">
          <span className="mr-2">Read more</span>
          <i className="fa-solid fa-arrow-right text-red-500 transform group-hover:translate-x-2 transition-transform duration-300"></i>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 h-1/2 md:h-full bg-cover md:bg-contain bg-no-repeat bg-center transition-transform duration-500 group-hover:scale-105 min-h-[180px] md:min-h-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    </div>
  );
}