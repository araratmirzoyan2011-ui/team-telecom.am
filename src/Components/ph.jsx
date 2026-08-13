export function ph({ text, src }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img src={src} alt="" className="w-16 h-16 mb-6" />
      <p className="text-sm leading-relaxed max-w-[220px]">{text}</p>
    </div>
  );
}