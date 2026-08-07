export function HBorder2({ url, text, onClickHandler }) {
  
   return (
    <div className="flex w-full md:w-1/4 h-full flex-col justify-center items-center border-x border-gray-400 border-b-[3px] border-b-cyan-400 text-center" onClick={onClickHandler}>
      <img 
        className="w-auto h-auto max-[700px]:w-10 max-[700px]:h-10" 
        src={url} 
        alt="" 
      />
      <h2 className="text-xl max-[900px]:text-base max-[550px]:text-sm font-semibold mt-2 px-1">
        {text}
      </h2>
    </div>
  );
}