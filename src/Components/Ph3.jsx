export function HowToParticipate({ src, title, description, ussd }) {
  return (
    <div className="w-full flex flex-col items-center text-center mx-auto max-w-[210px]">
      
      {/* Նկարի բլոկ */}
      <div className="w-full h-[130px] sm:h-[150px] rounded-xl overflow-hidden shadow-lg mb-3 bg-white/5 border border-white/10">
        <img 
          src={src} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Վերնագիր */}
      <h2 className="text-base sm:text-lg font-bold text-white mb-2 tracking-wide leading-tight min-h-[40px] flex items-center justify-center">
        {title}
      </h2>

      {/* Նկարագրություն */}
      <p className="text-white/90 text-[11px] sm:text-xs leading-relaxed font-light px-1">
        {description}{" "}
        {ussd && (
          <span className="font-semibold text-white">{ussd}</span>
        )}
      </p>

    </div>
  );
}