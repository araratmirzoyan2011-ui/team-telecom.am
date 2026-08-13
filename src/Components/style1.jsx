import { ph as Ph } from './ph';

export function N1({ arr, h1 }) {
  return (
    <div className="w-full py-20 px-6 flex flex-col items-center text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center max-w-4xl leading-tight mb-16">
        {h1}
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-4 gap-8 max-[750px]:grid-cols-1 max-[750px]:gap-12">
        {arr.map((el, index) => (
          <Ph key={index} src={el[0]} text={el[1]} />
        ))}
      </div>
    </div>
  );
}