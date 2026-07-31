import { Button } from "./Appbuttonmianal"

export function Border(img, title, info, onClickHandler) {
    return (
        <div className="flex flex-row gap-[30px] items-start" onClick={onClickHandler}>
            <img
    src={img}
    alt=""
    className="w-[50%] h-full object-cover rounded-[10px] flex-shrink-0"
/>
            <div className="flex flex-col h-[280px] overflow-hidden">
                <h1 className="text-black text-[26px] font-bold mb-[15px]">{title}</h1>
                <p className="text-gray-600 text-[16px] leading-[26px] mb-[20px] line-clamp-5">
                    {info}
                </p>
                {Button("Միանալ")}
            </div>
        </div>
    )
}