export function border4(id, inf) {
  return (
    <div className="w-1/5 h-full flex flex-row gap-[10px] justify-center items-center bg-[whitesmoke] text-[rgb(92,89,89)] rounded-[20px] text-xl transition-transform duration-300 ease-in-out shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:scale-[1.01] hover:shadow-[0_20px_30px_rgba(0,0,0,0.2)] max-[900px]:w-[45%] max-[900px]:h-[45%]">
      <i className={id}></i>
      <p>{inf}</p>
    </div>
  );
}