import { imp } from "./input"

export function l() {
  return (
    <>
      <div className="w-full h-[500px] bg-[#0b2531] flex flex-col text-white items-center max-[1000px]:h-[600px] max-[700px]:h-[700px] max-[700px]:justify-center">
        <h1 className="text-[60px] mt-[60px] max-[870px]:text-[54px]">Port in Team with your number</h1>
        <p className="text-2xl mt-5 max-[870px]:text-xl">
          Become Team subscriber, enjoy the advantages of the network by keeping your mobile phone number!
        </p>
        <div className="mt-[50px] w-[900px] h-[60px] flex flex-row justify-around text-lg max-[870px]:w-[700px] max-[870px]:text-[10px] max-[700px]:ml-[60%] max-[700px]:w-[800px] max-[700px]:flex-col max-[700px]:justify-center max-[600px]:ml-[70%]">
          {imp("Transition number (enter in the format 0XXYYYYYY)*", "input2", "number")}
          {imp("Name Surname*", "input2", "text")}
        </div>
        <div className="mt-[50px] w-[900px] h-[60px] flex flex-row justify-around text-lg max-[870px]:w-[700px] max-[870px]:text-[10px] max-[700px]:ml-[60%] max-[700px]:w-[800px] max-[700px]:flex-col max-[700px]:justify-center max-[600px]:ml-[70%]">
          {imp("Company*", "input3", "text")}
          {imp("Contact phone number*", "input4", "number")}
        </div>
        <div className="w-[200px] h-10 text-white bg-red-600 rounded-[20px] text-center mt-[60px]">
          <h1>Join</h1>
        </div>
      </div>
    </>
  );
}