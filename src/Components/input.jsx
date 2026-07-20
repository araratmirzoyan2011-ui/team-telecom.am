export function imp(text, id, mod) {
  return (
    <div className="w-[400px] h-[60px] flex flex-col text-sm ">
      <label htmlFor={id} className="ml-[10px]">{text}</label>
      <input type={mod} id={id} className="w-full h-10 rounded-[20px] bg-white" />
    </div>
  );
}