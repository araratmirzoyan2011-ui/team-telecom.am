// N2: Սկզբում նկարն է, հետո տեքստը
export function N2({ src, h1, p, button, col = "text-white" }) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-8">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img 
          src={src} 
          className="w-full max-w-[450px] h-auto object-contain" 
          alt="" 
        />
      </div>

      <div className={`w-full md:w-1/2 ${col} flex flex-col justify-center items-center md:items-start text-center md:text-left`}>
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[60px] font-bold leading-tight">
          {h1}
        </h1>

        <p className="mt-4 font-sans text-base md:text-xl lg:text-[24px]">
          {p}
        </p>

        {button && (
          <button className="mt-6 w-[200px] h-[44px] bg-red-500 text-white rounded-full text-lg border-none hover:bg-red-600 transition-colors cursor-pointer">
            {button}
          </button>
        )}
      </div>
    </div>
  );
}

// N4: Սկզբում տեքստն է, հետո նկարը (Desktop-ում), իսկ Mobile-ում ճիշտ դասավորվածությամբ
export function N4({ src, h1, p, button, col = "text-white" }) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-8">
      <div className={`w-full md:w-1/2 order-2 md:order-1 ${col} flex flex-col justify-center items-center md:items-start text-center md:text-left`}>
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[60px] font-bold leading-tight">
          {h1}
        </h1>

        <p className="mt-4 font-sans text-base md:text-xl lg:text-[24px]">
          {p}
        </p>

        {button && (
          <button className="mt-6 w-[200px] h-[44px] bg-red-500 text-white rounded-full text-lg border-none hover:bg-red-600 transition-colors cursor-pointer">
            {button}
          </button>
        )}
      </div>

      <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center">
        <img 
          src={src} 
          className="w-full max-w-[450px] h-auto object-contain" 
          alt="" 
        />
      </div>
    </div>
  );
}