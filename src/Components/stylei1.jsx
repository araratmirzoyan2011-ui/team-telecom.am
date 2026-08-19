import { IL } from "./inf1.jsx"; // ստուգիր ֆայլի ճիշտ անունը

export function N({ src, arr }) {
  return (
    <div className="w-full bg-[#024566] py-12 px-6 md:px-16 text-white">
      
      {/* TeamTV Վերնագիրը */}
      <div className="w-full flex justify-center mb-12">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight flex items-center">
          <span className="text-[#FF4B4B]">Team</span>
          <span className="text-[#72C9D2]">TV</span>
        </h1>
      </div>

      {/* 2 Սյունակով layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Ձախ սյունակ - Ցուցակը */}
        <div className="flex flex-col justify-center">
          {arr.map((el, index) => (
            <IL key={index} src={el.img} h1={el.title} p={el.text} />
          ))}
        </div>

        {/* Աջ սյունակ - Հեռուստացույցի նկարը */}
        <div className="flex justify-center items-center">
          <img 
            src={src} 
            className="w-full max-w-[650px] h-auto object-contain" 
            alt="TeamTV Preview" 
          />
        </div>

      </div>
    </div>
  );
}