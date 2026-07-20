export function border5(hamar, value) {
  return (
    <div className="w-1/4 h-full text-black mr-[40px] flex flex-col justify-center bg-[whitesmoke] rounded-[20px] transition-transform duration-300 ease-in-out [transform-origin:center_center] hover:scale-110">
      <div className="w-full h-[100px] flex items-center justify-center bg-[#0b1d2d] text-white rounded-t-[20px]">
        <h1>TOP</h1>
      </div>
      <div className="w-[90%] h-[60px] flex items-center justify-center border-b border-gray-500 ml-[5%]">
        <h1 className="lop max-[750px]:text-[26px] max-[550px]:text-2xl">{hamar}</h1>
      </div>
      <div className="w-[90%] h-[60px] flex items-center ml-[8%] mt-5">
        <h1 className="lop max-[750px]:text-[26px] max-[550px]:text-2xl">{value}</h1>
      </div>
      <div className="mt-[35px] ml-[5%] w-[90%] h-[50px] flex items-center justify-center bg-white text-red-600 border border-red-600 transition-colors duration-1000 rounded-[25px] hover:bg-red-600 hover:text-white hover:border-white">
        <i className="fa-solid fa-basket-shopping"></i>
        <p>Add to cart</p>
      </div>
    </div>
  );
}