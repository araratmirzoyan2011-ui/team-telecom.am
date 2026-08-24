export function border3(inf1, inf2, bgImage, onClickHandler) {
  return (
    <div 
      className="relative flex flex-col md:flex-row justify-between items-center rounded-3xl text-white bg-gradient-to-br from-[#0a4d6c] to-[#052b3d] w-full lg:w-[47%] h-auto md:h-[300px] shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden group border border-white/10 p-5 md:p-6"
      onClick={onClickHandler}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-between opacity-0 translate-y-5 animate-[fadeInUp_1s_ease-out_forwards] z-10 pr-2">
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-wide line-clamp-2 text-white group-hover:text-red-400 transition-colors duration-200">
            {inf1}
          </h1>
          
          <p className="text-sm text-gray-300 hidden md:block line-clamp-2 mt-2 font-light">
            {inf2}
          </p>
        </div>

        <div className="flex items-center text-sm font-medium text-gray-200 group-hover:text-white transition-colors mt-4 md:mt-0">
          <span className="border-b border-transparent group-hover:border-red-500 transition-all">Read more</span>
          <i className="fa-solid fa-arrow-right text-red-500 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300"></i>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 h-[180px] md:h-full bg-contain bg-no-repeat bg-center transition-transform duration-500 group-hover:scale-105 my-3 md:my-0 z-10 filter drop-shadow-md"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    </div>
  );
}