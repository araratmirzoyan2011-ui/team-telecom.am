import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function sl3(sl) {
  return (
    <>
      {sl.map((slide, index) => (
        <SwiperSlide key={index}>
          {index === 1 ? (
            <div
              className="flex w-full h-full relative overflow-hidden items-center"
              style={{ background: "radial-gradient(circle at 70% 30%, #1a5c7c 0%, #02273a 70%)" }}
            >
              <div
                className="absolute w-[60px] h-[60px] top-[20%] left-[40%] rounded-full opacity-80"
                style={{ background: "radial-gradient(circle at 30% 30%, #308fb5, #02273a)" }}
              />
              <div
                className="absolute w-[300px] h-[300px] bottom-[15%] left-[35%] rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #308fb5, #02273a)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              />

              <div className="w-1/2 flex flex-col justify-center items-start pl-[10%] z-[2] text-white">
                <h1 className="mt-[10px] text-[3rem] m-0 mb-5">{slide.title}</h1>
                <p className="mt-[10px] text-[28px] text-[1.2rem] mb-[30px]">{slide.text}</p>
                <button className="mt-[10px] bg-white text-red-500 px-[30px] py-[10px] rounded-[20px] border-none cursor-pointer">
                  Details
                </button>
              </div>

              <div
                className="w-1/2 h-full bg-contain bg-no-repeat bg-center z-[1]"
                style={{ backgroundImage: `url(${slide.imgsrc})` }}
              />
            </div>
          ) : (
            <div
              className="flex w-full h-full items-center relative overflow-hidden bg-[#02273a]"
              style={{
                backgroundImage: `
                  radial-gradient(1px 1px at 20% 30%, white, rgba(0,0,0,0)),
                  radial-gradient(1px 1px at 40% 70%, white, rgba(0,0,0,0)),
                  radial-gradient(2px 2px at 80% 20%, white, rgba(0,0,0,0)),
                  radial-gradient(1px 1px at 60% 50%, white, rgba(0,0,0,0)),
                  radial-gradient(1.5px 1.5px at 10% 90%, white, rgba(0,0,0,0)),
                  radial-gradient(2px 2px at 90% 80%, white, rgba(0,0,0,0)),
                  linear-gradient(150deg, #021b29 0%, #052f40 50%, #0a4d66 100%)
                `,
                backgroundSize:
                  "200px 200px, 300px 300px, 400px 400px, 250px 250px, 350px 350px, 450px 450px, 100% 100%",
              }}
            >
              <div className="w-1/2 pl-[10%] text-white z-[2]">
                <h1 className=" text-[3rem] mb-5">{slide.title}</h1>
                <ul className="list-none p-0">
                  {[slide.text1, slide.text2, slide.text3].map((text, i) => (
                    <li key={i} className="text-[28px] mb-[15px] flex items-center">
                      <span className="mr-[10px] text-[#00d4ff]">✦</span> {text}
                    </li>
                  ))}
                </ul>
                <button className="bg-white text-red-500 px-[30px] py-[10px] rounded-[20px] border-none cursor-pointer">Read More</button>
              </div>

              <div
                className="w-1/2 h-full bg-contain bg-no-repeat bg-center z-[1]"
                style={{
                  backgroundImage: `url(${slide.imgsrc})`,
                  filter: "drop-shadow(0 0 20px rgba(0, 212, 255, 0.2))",
                }}
              />
            </div>
          )}
        </SwiperSlide>
      ))}
    </>
  );
}