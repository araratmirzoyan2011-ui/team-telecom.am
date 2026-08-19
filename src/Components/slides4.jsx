import React from 'react';
import { SwiperSlide } from 'swiper/react';

export function slider(slides) {
  if (!slides || slides.length === 0) return null;

  return slides.map((slide, index) => {
    // slbg -> Slider-ի էջի background-ն է (#a8a4a0)
    // bg   -> Քարտի (card) background-ն է (#445d68)
    const pageBg = slide.slbg ? slide.slbg : '#a8a4a0';
    const cardBg = slide.bg ? slide.bg : '#445d68';

    return (
      <SwiperSlide key={slide.id || index}>
        {/* Սլայդերի էջի background-ը (slbg) */}
        <div 
          className="w-full h-[500px] flex items-center justify-center relative px-6 md:px-16"
          style={{ backgroundColor: pageBg }}
        >
          <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full py-10">
            
            {/* Ձախ կողմի քարտը (bg) */}
            <div 
              className="w-full md:w-[480px] rounded-2xl p-8 md:p-10 text-white flex flex-col justify-between shadow-lg z-10"
              style={{ backgroundColor: cardBg }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8">
                  {slide.text}
                </p>
              </div>

              {slide.button && (
                <div>
                  <button className="bg-[#ff4e50] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md">
                    {slide.button}
                  </button>
                </div>
              )}
            </div>

            {/* Աջ կողմի նկարը */}
            {slide.src && (
              <div className="flex-1 h-full flex items-center justify-center max-w-[650px]">
                <img 
                  src={slide.src} 
                  alt={slide.title || "slide"} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

          </div>
        </div>
      </SwiperSlide>
    );
  });
}