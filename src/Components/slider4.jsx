import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function slider4(s) {
  return s.map((slide, index) => (
    <SwiperSlide key={index}>
      {index === 6 ? (
        <div className="flex w-full h-full items-center bg-[#f4f0e6]">
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-[#333]">
            <h1 className="sliderh1">{slide.title}</h1>
            <p className="sliderp1">{slide.description}</p>
            <button className="sliderbutton2">More</button>
          </div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        </div>
      ) : [7].includes(index) ? (
        <div
          className="flex w-full h-full items-center"
          style={{ background: "radial-gradient(circle at 60% 20%, #eaa2cc 0%, #ffffff 74%)" }}
        >
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-[#333]">
            <h1 className="sliderh1">{slide.title}</h1>
            <p className="sliderp1">{slide.description}</p>
            <button className="sliderbutton2">More</button>
          </div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        </div>
      ) : (
        <div className="flex w-full h-full justify-center">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        </div>
      )}
    </SwiperSlide>
  ));
}