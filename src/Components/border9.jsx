export function border9(amsativ, vernagir, text) {
  return (
    <>
      <div className="w-[400px] h-[280px] p-[10px] bg-[whitesmoke] rounded-[20px] text-xl transition-all duration-300 ease-in-out shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:scale-[1.01] hover:shadow-[0_20px_30px_rgba(0,0,0,0.2)] max-[1000px]:h-[300px] max-[5500px]:w-[350px]">
        <p className="text-gray-500 text-lg mt-[10px]">{amsativ}</p>
        <h2 className="mt-[10px]">{vernagir}</h2>
        <p className="plo text-lg mt-[10px] max-[1000px]:text-xl">{text}</p>
      </div>
    </>
  );
}