import React from 'react';

function BannerCard({ bgImage, title, text, buttonText = "More details", onButtonClick, className = "" }) {
    return (
        <div 
            className={`relative rounded-2xl overflow-hidden shadow-lg flex flex-col justify-end p-8 h-full ${className}`}
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 flex flex-col items-start">
                <h2 className="text-[32px] font-bold text-white mb-3">
                    {title}
                </h2>
                <p className="text-white text-[14px] leading-relaxed mb-5 line-clamp-3">
                    {text}
                </p>
                <button 
                    onClick={onButtonClick}
                    className="bg-[#f0645a] hover:bg-[#e05349] text-white font-semibold px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md text-[14px]"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default BannerCard;