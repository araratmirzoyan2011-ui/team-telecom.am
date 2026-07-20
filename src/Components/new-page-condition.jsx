export function text(news) {
    return (
        news.id <= 18 ? (
            <div className="mt-[200px] w-1/2 h-auto ml-[10%] border-b border-gray-400">
                <h1 className='mt-[40px] text-[50px]'>{news.text}</h1>
                <p className='mt-[40px] text-gray-500'>{news.date}</p>
                <img src={news.src} alt="" className='mt-[40px] w-full h-[600px]'/>
                <p className='mt-[40px] text-[24px]'>{news.bgtext}</p>
            </div>
        ) : (
            <div className="mt-[200px] w-1/2 h-auto ml-[10%] border-b border-gray-400">
                <h1 className='mt-[40px] text-[50px]'>{news.title}</h1>
                <p className='mt-[40px] text-gray-500'>{news.date}</p>
                <p className='mt-[40px] text-[24px]'>{news.text}</p>
            </div>
        )
    )
}