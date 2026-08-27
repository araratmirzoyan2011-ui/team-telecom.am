export function N3({ src, h1, p, button, col = "text-[#003B5C]", bgColor = "bg-[#F4F5F7]" }) {
  return (
    <div className={`w-full ${bgColor} py-12 md:py-16 px-6 md:px-16 flex justify-center items-center`}>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Ձախ սյունակ - Տեքստեր + Կոճակ */}
        <div className={`${col} flex flex-col items-start text-left space-y-5 pr-0 md:pr-4`}>
          {h1 && (
            <h1 className="text-3xl md:text-5xl lg:text-[52px] font-bold leading-tight tracking-tight text-[#003B5C]">
              {h1}
            </h1>
          )}

          {p && (
            <p className="text-base md:text-lg text-[#003B5C]/80 font-normal leading-relaxed">
              {p}
            </p>
          )}

          {button && (
            <button className="mt-2 bg-[#FF4E50] hover:bg-[#e04345] text-white text-base font-semibold py-3 px-10 rounded-full transition-all duration-300 shadow-sm cursor-pointer">
              {button}
            </button>
          )}
        </div>

        {/* Աջ սյունակ - Նկար */}
        <div className="flex justify-center md:justify-end items-center">
          <img 
            src={src} 
            className="w-full max-w-[550px] h-auto object-contain rounded-xl" 
            alt={h1 || "Promo"} 
          />
        </div>

      </div>
    </div>
  );
}