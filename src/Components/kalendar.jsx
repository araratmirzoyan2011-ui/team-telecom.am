export function kalendar(or1, or2) {
  return (
    <>
      <div className="pt-[10px] w-[200px] h-10 rounded-[20px] border-none flex max-[1340px]:w-[300px]">
        <p className="kalp">{or1} - {or2}</p>
        <i className="fa-solid fa-calendar"></i>
      </div>
    </>
  );
}