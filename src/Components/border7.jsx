import { button } from "./button1";

export function border7(num, num1, num2, num3, num4) {
  return (
    <>
      <div className="group bg-[whitesmoke] transition-transform duration-300 ease-in-out [transform-origin:center_center] hover:scale-110 w-[300px] h-full border-t-4 border-t-[#183e5d] flex flex-col justify-around items-center ml-[10px] rounded-[6px] text-xl">
        <div className="group-hover:bg-[#183e5d] group-hover:text-white w-full h-[100px] text-[#0b1d2d] bg-white flex justify-center items-center flex-col text-xl">
          <h1 className="las1 pt-[10px]">PRO</h1>
          <h1 className="las1">{num}</h1>
        </div>
        <div className="flex mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16509740618025/56x56.png"
            className="las3 w-[40px] h-[40px]"
          />
          <p className="las2">{num1}</p>
        </div>
        <div className="flex mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16510708980018/56x56.png"
            className="las3 w-[40px] h-[40px]"
          />
          <p className="las2">{num2} min</p>
        </div>
        <div className="flex mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16510708352906/56x56.png"
            className="las3 w-[40px] h-[40px]"
          />
          <p className="las2">{num3} chanells</p>
        </div>
        <div className="flex mt-[30px]">
          <img
            src="https://www.telecomarmenia.am/files/icons/1/16510702991504/56x56.png"
            className="las3 w-[40px] h-[40px]"
          />
          <p className="las2">{num4} sms</p>
        </div>
        {button()}
      </div>
    </>
  );
}