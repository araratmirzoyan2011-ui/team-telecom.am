import React from 'react';

function BannerCard({ bgImage, title, text, buttonText = "More details", onButtonClick }) {
    return (
        <div 
            className="relative w-[80%] ml-[10%] h-[400px] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-end p-12 mb-[50px] max-[1200px]:w-[90%] max-[1200px]:ml-[5%] max-[900px]:p-6 max-[900px]:h-[350px]"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Մգեցնող շերտ (Overlay), որ տեքստերը հստակ երևան */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Բովանդակություն */}
            <div className="relative z-10 flex flex-col items-start max-w-[700px]">
                <h2 className="text-[36px] font-bold text-white mb-4 max-[900px]:text-[28px]">
                    {title}
                </h2>
                <p className="text-white text-[16px] leading-relaxed mb-6 line-clamp-3 max-[900px]:text-[14px]">
                    {text}
                </p>
                <button 
                    onClick={onButtonClick}
                    className="bg-[#f0645a] hover:bg-[#e05349] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 shadow-md text-[16px]"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default BannerCard;