import { ph } from "./ph"

export function m5() {
  return (
    <>
      <div
        className="w-full h-[600px] flex flex-col justify-center items-center text-white max-[750px]:h-[850px]"
        style={{
          background: `
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill="none" stroke="white" stroke-width="0.3" stroke-opacity="0.2"><path d="M0 0l100 50L0 100zM100 0l-50 50 50 50z"/></g></svg>'),
            linear-gradient(135deg, #1b4a6b 0%, #0b2531 100%)
          `,
          backgroundSize: "80px 80px, cover",
        }}
      >
        <h1 className="mt-5">VIRTUAL PBX</h1>
        <div className="mt-10 flex flex-row justify-around w-[70%] h-[250px] max-[750px]:flex-col">
          {ph("Routing the calls: not a single call to be missed", "https://www.telecomarmenia.am/img/virtual-icon-1.png")}
{ph("Recording the conversations and call statistics", "https://www.telecomarmenia.am/img/virtual-icon-2.png")}
{ph("Voice assistant for the customers", "https://www.telecomarmenia.am/img/virtual-icon-3.png")}
        </div>
        <div className="bg-white text-red-600 rounded-[20px] mt-10 w-[200px] h-10 text-center max-[750px]:mt-[350px]">
          <h1>Read More</h1>
        </div>
      </div>
    </>
  );
}