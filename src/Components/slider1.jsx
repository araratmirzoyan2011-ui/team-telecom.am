import { SwiperSlide } from 'swiper/react';

export function slider1(s) {
  if (!s || s.length === 0) return null;

  const bgImageStyle = (url) => ({
    backgroundImage: `url(${url})`,
  });

  return s.map((slide, index) => {
    let content;

    if (index === 1 || index === 4) {
      content = (
        <div className="flex w-full h-full justify-center">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    } else if (index === 10) {
      content = (
        <div className="flex w-full h-full justify-center bg-[#02273a]">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    } else if (index === 0) {
      content = (
        <div className="flex w-full h-full items-center bg-[#02273a]">
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-white">
            <h1 className="font-sans text-[60px]">{slide.description}</h1>
            <button className="mt-[20px] w-[200px] h-[40px] bg-white text-red-500 rounded-[20px] text-[18px]">More</button>
          </div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    } else if (index === 6) {
      content = (
        <div className="flex w-full h-full items-center bg-[#f4f0e6]">
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-white">
          <h1 className="font-sans text-[60px]">{slide.description}</h1>
            <button className="mt-[20px] w-[200px] h-[40px] bg-white text-red-500 rounded-[20px] text-[18px]">More</button>
  
          </div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    } else if (index === 7) {
      content = (
        <div className="relative flex w-full h-full items-center overflow-hidden bg-[#143d49]">
          <svg
            className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
          >
            <path fill="#174450" d="M0,350 C360,250 720,450 1080,320 C1260,260 1380,300 1440,320 L1440,800 L0,800 Z"></path>
            <path fill="#143d49" d="M0,420 C400,320 680,500 1020,380 C1200,320 1350,380 1440,400 L1440,800 L0,800 Z"></path>
            <path fill="#113843" d="M0,500 C300,420 750,560 1100,460 C1250,420 1370,470 1440,490 L1440,800 L0,800 Z"></path>
          </svg>
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-white z-10">
            <h1 className="font-sans text-[60px]">
  {slide.title}
</h1>

<p className="mt-[20px] font-sans text-[24px]">
  {slide.description}
</p>

<button className="mt-[20px] w-[200px] h-[40px] bg-red-500 text-white rounded-[20px] text-[18px] border-none">
  More
</button>
          </div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center z-10"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    } else if (index === 8) {
      content = (
        <div
          className="flex w-full h-full items-center"
          style={{ background: "radial-gradient(circle at 60% 20%, #eaa2cc 0%, #ffffff 74%)" }}
        >
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-[#333]">
            <h1 className="font-sans text-[60px]">
  {slide.title}
</h1>

<p className="mt-[20px] font-sans text-[24px]">
  {slide.description}
</p>

<button className="mt-[20px] w-[200px] h-[40px] bg-red-500 text-white rounded-[20px] text-[18px] border-none">
  More
</button>
          </div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    } else if (index === 9) {
      content = (
        <div className="flex flex-row-reverse w-full h-full items-center bg-[#02273a]">
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-white">
            <h1 className="font-sans text-[60px]">
  {slide.description}
</h1>

<button className="mt-[20px] w-[200px] h-[40px] bg-white text-red-500 rounded-[20px] text-[18px]">
  More
</button>
          </div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    } else {
      content = (
        <div className="flex w-full h-full items-center bg-[#f4f0e6]">
          <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] pr-[5%] box-border text-[#333]">
            <h1 className="font-sans text-[60px]">
  {slide.title}
</h1>

<p className="mt-[20px] font-sans text-[24px]">
  {slide.description}
</p>

<button className="mt-[20px] w-[200px] h-[40px] bg-red-500 text-white rounded-[20px] text-[18px] border-none">
  More
</button>
</div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center"
            style={bgImageStyle(slide.bgImage)}
          />
        </div>
      );
    }

    return <SwiperSlide key={index}>{content}</SwiperSlide>;
  });
}