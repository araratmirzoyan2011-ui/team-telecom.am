import { button } from "./button1";

export function border7(num, num1, num2, num3, num4) {
  return (
    <>
      <div className="group bg-[whitesmoke] transition-transform duration-300 ease-in-out [transform-origin:center_center] hover:scale-105 md:hover:scale-110 w-full sm:w-[280px] md:w-[300px] h-full min-h-[450px] border-t-4 border-t-[#183e5d] flex flex-col justify-around items-center mx-auto sm:ml-[10px] my-4 sm:my-0 rounded-[6px] text-lg md:text-xl shadow-md p-4 sm:p-0">
        
        <div className="group-hover:bg-[#183e5d] group-hover:text-white w-full h-[90px] md:h-[100px] text-[#0b1d2d] bg-white flex justify-center items-center flex-col text-xl rounded-t-[6px] transition-colors duration-300">
          <h1 className="las1 pt-[10px] font-bold">PRO</h1>
          <h1 className="las1 font-semibold">{num}</h1>
        </div>

        <div className="flex items-center gap-3 w-full px-4 mt-4 sm:mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16509740618025/56x56.png"
            className="las3 w-[35px] h-[35px] md:w-[40px] md:h-[40px] object-contain flex-shrink-0"
            alt="icon"
          />
          <p className="las2 text-sm md:text-base">{num1}</p>
        </div>

        <div className="flex items-center gap-3 w-full px-4 mt-2 sm:mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16510708980018/56x56.png"
            className="las3 w-[35px] h-[35px] md:w-[40px] md:h-[40px] object-contain flex-shrink-0"
            alt="icon"
          />
          <p className="las2 text-sm md:text-base">{num2} min</p>
        </div>

        <div className="flex items-center gap-3 w-full px-4 mt-2 sm:mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16510708352906/56x56.png"
            className="las3 w-[35px] h-[35px] md:w-[40px] md:h-[40px] object-contain flex-shrink-0"
            alt="icon"
          />
          <p className="las2 text-sm md:text-base">{num3} channels</p>
        </div>

        <div className="flex items-center gap-3 w-full px-4 mt-2 sm:mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16510702991504/56x56.png"
            className="las3 w-[35px] h-[35px] md:w-[40px] md:h-[40px] object-contain flex-shrink-0"
            alt="icon"
          />
          <p className="las2 text-sm md:text-base">{num4} sms</p>
        </div>

        <div className="w-full px-4 my-4 flex justify-center">
          {button()}
        </div>

      </div>
    </>
  );
}