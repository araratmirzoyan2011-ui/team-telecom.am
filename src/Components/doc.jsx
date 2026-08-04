export default function Doc({ inf }) {
    return (
        <div className="flex bg-[whitesmoke] text-gray-500 h-[200px] items-center justify-center transition-transform duration-300 ease-in-out shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:scale-[1.01] hover:shadow-[0_20px_30px_rgba(0,0,0,0.2)] hover:text-red-500">
            <i className="fa-regular fa-file-pdf fa-3x  "></i>
            <p className="text-[20px] max-[660px]:text-[16px]">{inf}</p>
        </div>
    );
}