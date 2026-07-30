export function Button(info) {
    return (
        <>
        <button className="w-[200px] h-[60px] bg-red-500 text-white text-[24px] rounded-[50px] mb-[10px] max-[600px]:w-[100px] text-[18px]">
            <p>{info}</p>
        </button>
        </>
    )
}