export function N2({ src, h1, p, button, col }) {
  return (
    <>
      {/* Նկարի բլոկ */}
      <div className="flex justify-center items-center p-6">
        <img 
          src={src} 
          className="w-full max-w-[450px] h-auto object-contain" 
          alt="" 
        />
      </div>

      {/* Տեքստերի բլոկ */}
      <div className={`${col} flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 md:pt-10`}>
        {/* Responsive text size: մոբայլում 36px, մեծում 60px */}
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[60px] font-bold leading-tight">
          {h1}
        </h1>

        {/* Responsive paragraph size */}
        <p className="mt-4 font-sans text-base md:text-xl lg:text-[24px]">
          {p}
        </p>

        <button className="mt-6 w-[200px] h-[44px] bg-red-500 text-white rounded-full text-lg border-none hover:bg-red-600 transition-colors cursor-pointer">
          {button}
        </button>
      </div>
    </>
  );
}