export function N8({ h1, p, button, col }) {
  return (
    <>
      <div className={`${col} flex flex-col justify-center items-center text-center md:items-start text-center md:text-left p-6 md:pt-10`}>
        <h1 className="font-sans text-3xl md:text-5xl lg:text-[60px] font-bold leading-tight">
          {h1}
        </h1>

        <p className="mt-4 font-sans text-base md:text-xl lg:text-[24px]">
          {p}
        </p>

        <button className="mt-6 w-[200px] h-[44px] bg-red-500 text-white rounded-full text-lg border-none hover:bg-red-600 transition-colors cursor-pointer">
          {button}
        </button>
      </div>
    </>
  );
}