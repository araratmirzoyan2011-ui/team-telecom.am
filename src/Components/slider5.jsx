import { SwiperSlide } from 'swiper/react';

export function slider5(d) {
  return d.map((el, i) => (
    <SwiperSlide key={i} className="flex justify-center">
      {[1, 3, 4, 5, 6, 7, 8, 9, 10].includes(i) ? (
        <div className="p-[10px] text-black w-[90%] h-[500px] flex flex-col items-center border border-gray-500 bg-[whitesmoke] rounded-[20px] overflow-hidden transition-transform duration-300 ease-in-out [transform-origin:center_center] mt-10 hover:scale-110">
          <p className="ml-5 mt-5 text-xl font-sans">{el.text}</p>
          <img
            src={el.src}
            className="rounded-t-[20px] object-cover"
            alt=""
          />
          <h1 className="mt-[10px]">{el.value}</h1>
          <div className="w-[91%] h-px bg-gray-500 mt-[15px]"></div>
          <h1 className="mt-[10px]">{el.amsekan}/per mounth</h1>
          <div className="mt-5 w-[200px] h-10 flex items-center justify-center bg-red-600 text-white transition-colors duration-1000 rounded-[20px] hover:bg-white hover:text-red-600">
            <i className="fa-solid fa-basket-shopping"></i>
            <p>Add to cart</p>
          </div>
        </div>
      ) : (
        <div className="p-[10px] text-black w-[90%] h-[500px] flex flex-col items-center border border-gray-500 bg-[whitesmoke] rounded-[20px] overflow-hidden transition-transform duration-300 ease-in-out [transform-origin:center_center] mt-10 hover:scale-110">
          <p className="ml-5 mt-5 text-xl font-sans">{el.text}</p>
          <img
            src={el.src}
            className="rounded-t-[20px] object-cover"
            alt=""
          />
          <h1 className="mt-[10px]">{el.value}</h1>
          <div className="mt-[55px] w-[200px] h-10 flex items-center justify-center bg-red-600 text-white transition-colors duration-1000 rounded-[20px] hover:bg-white hover:text-red-600">
            <i className="fa-solid fa-basket-shopping"></i>
            <p>Add to cart</p>
          </div>
        </div>
      )}
    </SwiperSlide>
  ));
}