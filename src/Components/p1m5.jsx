export function f1() {
  return (
    <>
      <div className="mt-[100px] w-full h-[600px] bg-[length:100%_100%] bg-no-repeat flex flex-row justify-evenly bg-[linear-gradient(160deg,#ffff_62%,rgba(15,228,228,0.524)_62%)] max-[1100px]:h-[700px] max-[1100px]:flex-col max-[1100px]:justify-center max-[1100px]:items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-[#083f58] text-[60px]">My Team application</h1>
          <p className="text-xl mt-5">Download My Team for iOS and Android</p>
          <p className="text-xl mt-5">Make payments, get bonuses, shake and make use of other advantages.</p>
          <div className="ml-5 mt-5 flex">
            <img
              src="https://www.telecomarmenia.am/img/redesign/qr.svg"
              alt=""
              className="w-[100px] h-[100px]"
            />
            <div className="ml-[10px] flex flex-col">
              <img src="https://www.telecomarmenia.am/img/redesign/app_store.png" alt="" />
              <img
                src="https://www.telecomarmenia.am/img/redesign/google_play.png"
                alt=""
                className="mt-[5px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center">
          <div
            className="w-[600px] h-[500px] mt-[100px] bg-contain bg-no-repeat max-[1100px]:w-[400px] max-[1100px]:h-[300px] max-[1100px]:mt-[100px]"
            style={{ backgroundImage: "url(https://www.telecomarmenia.am/img/redesign/app-img.png)" }}
          ></div>
        </div>
      </div>
    </>
  );
}