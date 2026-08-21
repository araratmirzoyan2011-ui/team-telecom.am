export function border2(t1, t2, t3) {
  return (
    <div className="w-full sm:w-[280px] md:w-[300px] h-[400px] sm:h-[450px] text-white flex flex-col justify-around items-center mx-auto sm:ml-[10px] my-4 sm:my-0 rounded-[6px] transition-transform duration-300 ease-in-out [transform-origin:center_center] bg-repeat hover:scale-105 md:hover:scale-110 shadow-lg"
      style={{
        background: `
          url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M96 95h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm-10 96h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm-10 96h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4z"/></g></g></svg>'),
          linear-gradient(135deg, #3d5a6c 0%, #2e4a5b 100%)
        `,
      }}
    >
      <div className="w-full h-[100px] flex justify-center items-center flex-col px-4 text-center">
        <h1 className="text-lg md:text-xl my-[5px] font-semibold">{t1}</h1>
        <h2 className="text-base md:text-xl my-[5px] text-white/90">{t2}</h2>
      </div>
      <button className="w-[70%] sm:w-[60%] h-[45px] sm:h-[50px] bg-red-600 text-white border border-red-600 rounded-[30px] mt-5 cursor-pointer hover:bg-red-700 transition-colors">
        {t3}
      </button>
    </div>
  );
}