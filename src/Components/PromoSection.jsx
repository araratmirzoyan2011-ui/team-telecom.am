export function PromoSection({ 
  title, 
  listItems, 
  imageSrc, 
  bgColor = "#01425f", 
  textColor = "text-white",
  centerTitle = false // true՝ եթե վերնագիրը պետք է լինի մեջտեղում (ինչպես If you are subscriber...)
}) {
  const isCustomBg = bgColor.startsWith('#') || bgColor.startsWith('rgb');

  return (
    <section 
      style={{ backgroundColor: isCustomBg ? bgColor : undefined }}
      className={`w-full py-12 px-6 md:px-16 flex flex-col items-center justify-center ${
        !isCustomBg ? bgColor : ''
      }`}
    >
      <div className="w-full max-w-6xl flex flex-col items-center">
        
        {title && centerTitle && (
          <h2 className={`text-3xl md:text-5xl font-bold mb-10 text-center ${textColor}`}>
            {title}
          </h2>
        )}

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {title && !centerTitle && (
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 leading-tight ${textColor}`}>
                {title}
              </h2>
            )}

            {listItems && listItems.length > 0 && (
              <ul className={`space-y-4 list-disc list-inside text-sm md:text-base leading-relaxed ${textColor}`}>
                {listItems.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    <span className="inline">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {imageSrc && (
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src={imageSrc}
                alt="Promo Illustration"
                className="w-full max-w-md md:max-w-lg object-contain rounded-lg"
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}