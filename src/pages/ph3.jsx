export function Ph({ text, src, button }) {
  return (
    <div className="flex flex-col items-center text-center w-full">
      {src && (
        <img src={src} alt="" className="w-16 h-16 mb-6 object-contain" />
      )}
      
      {text && (
        <p className="text-sm leading-relaxed max-w-full sm:max-w-[220px]">
          {text}
        </p>
      )}

      {button && (
        <button className="group-hover:bg-red-600 group-hover:text-white group-hover:border-white w-[60%] h-[50px] bg-white text-red-600 border border-red-600 rounded-[30px] mt-4">
          {button}
        </button>
      )}
    </div>
  );
}