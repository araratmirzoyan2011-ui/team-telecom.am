export function N8({ h1, p, button, col }) {
  return (
    <div className={`${col} flex flex-col justify-center items-center text-center p-6 md:pt-10 max-w-4xl mx-auto`}>
      <h1 className="font-sans text-3xl md:text-5xl lg:text-[60px] font-bold leading-tight">
        {h1}
      </h1>

      <p className="mt-4 font-sans text-base md:text-xl lg:text-[24px] max-w-2xl">
        {p}
      </p>

      <button className="mt-6 w-[200px] h-[44px] bg-red-500 text-white rounded-full text-lg border-none hover:bg-red-600 transition-colors cursor-pointer">
        {button}
      </button>
    </div>
  );
}