export function Ph({ title, text, src, button }) {
  return (
    <div className="flex flex-col items-center text-center w-full min-h-[160px] justify-start">
      {src && (
        <img src={src} alt="" className="w-16 h-16 mb-4 object-contain" />
      )}

      {title && (
        <h1 className="text-2xl md:text-3xl font-bold text-[#003B5C] mb-4">
          {title}
        </h1>
      )}

      {text && (
        <p className="text-sm text-[#003B5C] leading-relaxed max-w-[220px]">
          {text}
        </p>
      )}

      {button && (
        <button className="w-48 h-12 bg-[#F8534C] hover:bg-red-600 text-white font-medium rounded-full mt-4 transition-all">
          {button}
        </button>
      )}
    </div>
  );
}