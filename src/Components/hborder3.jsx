import { button } from "./button1";

export function hborder3(vernagir, text) {
  return (
    <div
      className="group flex flex-col justify-between bg-white rounded-2xl p-6 shadow-md 
                 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl border border-gray-100"
    >
      <div>
        <h2 className="text-[22px] font-bold text-gray-900 mb-3 group-hover:text-[#f0645a] transition-colors">
          {vernagir}
        </h2>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
          {text}
        </p>
      </div>

      <div className="mt-auto">
        {button()}
      </div>
    </div>
  );
}