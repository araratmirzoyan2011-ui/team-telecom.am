import { button } from "./button1";

export function hborder3(vernagir, text) {
  return (
    <div
      className="group h-[300px] flex flex-col justify-around items-center bg-[whitesmoke] text-[18px] text-gray-500 font-sans
                 transition-all duration-300 shadow-md hover:scale-[1.01] hover:shadow-xl hover:text-black"
    >
      <div className="w-full h-[20%] text-center text-gray-500 transition-all duration-1000 group-hover:bg-cyan-400 group-hover:text-black">
        <h1>{vernagir}</h1>
      </div>

      <p>{text}</p>

      {button()}
    </div>
  );
}