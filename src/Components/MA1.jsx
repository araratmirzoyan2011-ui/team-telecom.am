export function CallToActionSection({
  title,
  subtitle,
  buttonText,
  bgColor = "bg-[#01425F]",
  textColor = "text-white"
}) {
  return (
    <section className={`w-full py-16 px-6 flex flex-col items-center justify-center text-center ${bgColor}`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {title && (
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${textColor}`}>
            {title}
          </h2>
        )}

        {subtitle && (
          <p className={`text-base md:text-xl font-light mb-8 max-w-2xl leading-relaxed ${textColor}/90`}>
            {subtitle}
          </p>
        )}

        {buttonText && (
          <button className="bg-[#ff4e50] hover:bg-red-600 text-white font-semibold text-base px-10 py-3 rounded-full transition-all duration-300 shadow-md">
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}