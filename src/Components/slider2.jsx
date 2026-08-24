import { SwiperSlide } from 'swiper/react';

export function sli2(l, navigate) {
  return l.map((el, i) => (
    <SwiperSlide key={i} className="flex justify-center py-4">
      {i <= 17 ? (
        <div
          onClick={() => navigate(`/news/${el.id}`)}
          className="w-[90%] h-[480px] sm:h-[500px] flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden text-black shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 cursor-pointer group"
        >
          {/* Նկարի հատված */}
          <div className="w-full h-[240px] sm:h-[260px] overflow-hidden bg-gray-100">
            <img
              src={el.src}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={el.title || "News image"}
            />
          </div>

          {/* Տեքստային հատված */}
          <div className="flex flex-col flex-grow p-5 justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-red-600 mb-2">
                {el.date}
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                {el.text}
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-gray-500 mt-2">
              <span>Կարդալ ավելին</span>
              <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/news/${el.id}`)}
          className="w-[90%] h-[480px] sm:h-[500px] flex flex-col justify-between bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 text-black cursor-pointer group"
        >
          <div>
            <p className="text-xs sm:text-sm font-medium text-red-600 mb-3">
              {el.date}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 py-2 group-hover:text-red-600 transition-colors line-clamp-2">
              {el.title}
            </p>
            <p className="text-sm sm:text-base text-gray-600 py-2 line-clamp-4">
              {el.text}
            </p>
          </div>

          <div className="flex items-center text-sm font-semibold text-gray-500 pt-4 border-t border-gray-100">
            <span>Կարդալ ավելին</span>
            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </div>
        </div>
      )}
    </SwiperSlide>
  ));
}