export function pagination(l, navigate) {
  return l.map((el, i) => (
    <div key={el.id || i} className="flex justify-center">
      {i <= 17 ? (
        <div
          onClick={() => navigate(`/news/${el.id}`)}
          className="w-full h-[500px] flex flex-col border border-gray-500 bg-[whitesmoke] rounded-[20px] overflow-hidden text-black cursor-pointer"
        >
          <img
            src={el.src}
            className="w-full h-[300px] rounded-t-[20px] object-cover"
            alt=""
          />
          <div className="px-[15px]">
            <p className="text-gray-500 mt-[10px]">{el.date}</p>
            <p className="text-2xl mt-5">{el.text}</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/news/${el.id}`)}
          className="w-full h-[500px] flex flex-col border border-gray-500 bg-[whitesmoke] rounded-[20px] p-[15px] box-border text-black cursor-pointer"
        >
          <p className="text-lg py-[10px] text-gray-500">{el.date}</p>
          <p className="text-2xl text-black py-[10px] font-bold">{el.title}</p>
          <p className="text-lg py-[10px]">{el.text}</p>
        </div>
      )}
    </div>
  ));
}