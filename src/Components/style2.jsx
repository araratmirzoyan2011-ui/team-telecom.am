export function N2({src,h1,p,button,col}) {
  return (
    <>
      <div className={`flex justify-center items-center`} >
        <img src={src} className="w-[80%] h-[70%]" alt="" />
      </div>
      <div className={` ${col} flex flex-col pt-[80px] items-start`} >
        <h1 className="font-sans text-[60px] ">
            {h1}
        </h1>

        <p className="mt-[20px] font-sans text-[24px]">
            {p}
        </p>

        <button className="mt-[20px] w-[200px] h-[40px] bg-red-500 text-white rounded-[20px] text-[18px] border-none">
            {button}
        </button>
        </div>
    </>
  );
}