import {Ph } from './Ph4';

export function N1({ arr, h1, p }) {
  return (
    <div className="w-full py-20 px-6 flex flex-col items-center text-white  bg-[#024566]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center max-w-4xl leading-tight mb-16">
        {h1}
      </h1>
      
      <div className="w-full max-w-6xl flex flex-wrap justify-center items-center gap-12 md:gap-20  bg-[#024566]">
            {arr.map((el, index) => (
                <div key={index} className="w-full sm:w-[280px] flex justify-center">
                <Ph src={el[0]} text={el[1]} subText={el[2]} />
                </div>
            ))}
        </div>
    </div>
  );
}