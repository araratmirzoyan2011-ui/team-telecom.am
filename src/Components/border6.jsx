export function border6(inf1, inf2, inf3, sizeClass, bgImage, onClickHandler) {
  return (
    <>
      <div className={`flex justify-between rounded-[10px] text-white h-[300px] max-[1100px]:h-[200px] ${sizeClass}`} onClick={onClickHandler}>
        <div className="w-1/2 h-full flex flex-col items-center justify-around opacity-0 translate-y-5 animate-[fadeInUp_3s_ease-out_forwards]">
          <h1 className="text-[32px]">{inf1}</h1>
          <p className="vol max-[1000px]:hidden">{inf2}</p>
          <div className="flex text-lg">
            <p>{inf3}</p>
            <i className="fa-solid fa-arrow-right text-red-500"></i>
          </div>
        </div>
        <div
          className="w-1/2 h-full bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </div>
    </>
  );
}