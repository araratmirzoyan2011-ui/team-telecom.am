export function HBorder({ url, text, onClickHandler }) {
  return (
    <div className="flex w-full md:w-1/4 h-full flex-col justify-center items-center border-l border-r border-gray-400 text-center transition-all duration-300 ease-in-out shadow-md hover:scale-[1.01] hover:shadow-2xl hover:text-black group" onClick={onClickHandler}>
      <img className="w-auto h-auto max-[700px]:w-10 max-[700px]:h-10" src={url} alt="" />
      
      <h2 className="text-xl max-[950px]:text-base max-[550px]:text-sm font-semibold mt-2 px-1">
        {text}
      </h2>
      
      <div className="transition-all duration-1000 group-hover:bg-cyan-400 group-hover:text-black"></div>
    </div>
  );
}