export function border2(t1, t2, t3) {
  return (
    <div className="w-[300px] h-[450px] text-white flex flex-col justify-around items-center ml-[10px] rounded-[6px] transition-transform duration-300 ease-in-out [transform-origin:center_center] bg-repeat hover:scale-110"
      style={{
        background: `
          url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M96 95h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm-10 96h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm-10 96h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4zm0-10h4v4h-4v-4z"/></g></g></svg>'),
          linear-gradient(135deg, #3d5a6c 0%, #2e4a5b 100%)
        `,
      }}
    >
      <div className="w-full h-[100px] flex justify-center items-center flex-col">
        <h1 className="text-xl my-[5px]">{t1}</h1>
        <h2 className="text-xl my-[5px]">{t2}</h2>
      </div>
      <button className="w-[60%] h-[50px] bg-red-600 text-white border border-red-600 rounded-[30px] mt-5 cursor-pointer">
        {t3}
      </button>
    </div>
  );
}