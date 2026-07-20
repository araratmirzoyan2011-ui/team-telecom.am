export function border(text) {
  return (
    <>
      <div className="w-auto h-auto p-[5px] flex justify-center text-gray-500 ml-5 transition-colors duration-1000 hover:bg-[whitesmoke]">
        <h1>{text}</h1>
      </div>
    </>
  );
}