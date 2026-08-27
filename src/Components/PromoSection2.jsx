export function PromoSection2({
  title,
  subtitle,
  listItems,
  buttonText,
  imageSrc,
  bgColor = "bg-[#f4f4f5]",
  textColor = "text-[#003B5C]",
  imageLeft = true
}) {
  return (
    <section className={`w-full py-12 px-6 md:px-16 flex justify-center items-center ${bgColor}`}>
      <div className={`w-full max-w-7xl flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-12`}>
        
        {imageSrc && (
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src={imageSrc}
              alt={title || "Promo Image"}
              className="w-full max-w-[550px] md:max-w-[650px] h-auto object-contain drop-shadow-2xl transition-all duration-300 scale-105"
            />
          </div>
        )}

        <div className={`w-full md:w-1/2 flex flex-col justify-center items-start ${textColor}`}>
          {title && (
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-lg md:text-xl font-medium mb-6">
              {subtitle}
            </p>
          )}

          {listItems && listItems.length > 0 && (
            <ul className="space-y-3 list-disc list-inside text-base md:text-lg mb-8">
              {listItems.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {buttonText && (
            <button className="bg-[#ff4e50] hover:bg-red-600 text-white font-semibold text-base px-10 py-3 rounded-full transition-all duration-300 shadow-md">
              {buttonText}
            </button>
          )}
        </div>

      </div>
    </section>
  );
}