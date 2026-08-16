export function N3({ src, h1, p,col }) {
  return (
    <>
      <div className={`${col} flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 md:pt-10`}>
        {/* Responsive text size: մոբայլում 36px, մեծում 60px */}
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[60px] font-bold leading-tight">
          {h1}
        </h1>

        <p className="mt-4 font-sans text-base md:text-xl lg:text-[24px]">
          {p}
        </p>
      </div>
      <div className="flex justify-center items-center p-6">
        <img 
          src={src} 
          className="w-full max-w-[450px] h-auto object-contain" 
          alt="" 
        />
      </div>
    </>
  );
}