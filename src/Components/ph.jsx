export function ph(text, src) {
  return (
    <div className="flex flex-col items-center w-[250px] h-[250px] text-center">
      <img src={src} alt="" className="img" />
      <p>{text}</p>
    </div>
  );
}