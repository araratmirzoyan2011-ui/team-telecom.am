export function HowToParticipate({ src, title, description, ussd }) {
  return (
    <div className="w-full bg-[#0b2545] py-12 px-4 flex justify-center items-center">
      <div className="max-w-[450px] w-full flex flex-col items-center text-center">
        
        {/* Նկարի բլոկ */}
        <div className="w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden shadow-xl mb-8 bg-white/5 border border-white/10">
          <img 
            src={src} 
            alt="How to participate" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Վերնագիր */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-wide leading-tight">
          {title}
        </h2>

        {/* Նկարագրություն */}
        <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light px-2">
          {description}{" "}
          {ussd && (
            <span className="font-semibold text-white">{ussd}</span>
          )}
        </p>

      </div>
    </div>
  );
}