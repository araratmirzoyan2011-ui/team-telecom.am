export function N3({ src, h1, p, button, col = "text-white" }) {
  return (
    <div className="w-full bg-[#024566] py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Ձախ սյունակ - Տեքստեր + Կոճակ */}
        <div className={`${col} flex flex-col items-center md:items-start text-center md:text-left space-y-6`}>
          {h1 && (
            <h1 className="font-sans text-3xl md:text-5xl lg:text-[52px] font-bold leading-tight">
              {h1}
            </h1>
          )}

          {p && (
            <p className="font-sans text-base md:text-lg lg:text-[20px] text-gray-200">
              {p}
            </p>
          )}

          {button && (
            <button className="mt-4 bg-[#00A896] hover:bg-[#008f80] text-white font-bold py-3 px-8 rounded-full transition-all cursor-pointer">
              {button}
            </button>
          )}
        </div>

        {/* Աջ սյունակ - Նկար */}
        <div className="flex justify-center items-center">
          <img 
            src={src} 
            className="w-full max-w-[500px] h-auto object-contain" 
            alt="Promo" 
          />
        </div>

      </div>
    </div>
  );
}