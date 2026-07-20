export function bgimg(url) {
  return (
    <>
      <div
        className="w-full h-[500px] bg-no-repeat bg-[length:100%_100%] mt-[100px]"
        style={{ backgroundImage: `url(${url})` }}
      ></div>
    </>
  );
}