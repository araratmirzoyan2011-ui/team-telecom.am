export default function Border1({ inf1, sizeClass, bgImage, onClickHandler, className=""}) {
  return (
    <div
      className={`flex justify-between rounded-[10px] text-white bg-[#083f58] ${sizeClass} ${className}`}
      onClick={onClickHandler}
    >
      <div className="w-1/2 h-full flex flex-col items-center justify-around opacity-0 translate-y-5 animate-[fadeInUp_3s_ease-out_forwards]">
        <h1 className="text-xl">{inf1}</h1>
        <div className="flex text-lg">
          <p className="text-lg">Read more</p>
          <i className="fa-solid fa-arrow-right text-red-500"></i>
        </div>
      </div>
      <div
        className="w-1/2 h-full bg-contain bg-no-repeat bg-[position:center]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    </div>
  );
}