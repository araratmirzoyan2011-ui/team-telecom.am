export function ph({ text, src }) {
  return (
    <div className="flex flex-col items-center text-center w-full">
      <img src={src} alt="" className="w-16 h-16 mb-6 object-contain" />
      <p className="text-sm leading-relaxed max-w-full sm:max-w-[220px]">
        {text}
      </p>
    </div>
  );
}