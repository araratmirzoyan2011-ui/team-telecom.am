import React, { useState } from 'react';

const VideoCard = ({ src, title, text }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play ավելացնել iframe-ին կլիքից հետո
  const formattedSrc = src?.includes('?') 
    ? `${src}&autoplay=1` 
    : `${src}?autoplay=1`;

  return (
    <div className="max-w-[400px] w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100/60 font-sans">
      {/* Video / Player Area */}
      <div className="relative w-full h-[240px] bg-gray-100">
        {isPlaying ? (
          <iframe
            src={formattedSrc}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="relative w-full h-full cursor-pointer group flex items-center justify-center"
            onClick={() => setIsPlaying(true)}
          >
            {/* Background iframe / video preview */}
            <iframe
              src={src}
              title={title}
              className="w-full h-full border-0 pointer-events-none"
            />

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />

            {/* Play Button Icon */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <svg
                className="w-16 h-16 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Text Area */}
      <div className="p-6">
        <h2 className="text-[22px] font-bold text-[#0B3C5D] mb-3 leading-snug">
          {title}
        </h2>
        <p className="text-[#556B7D] text-[14px] leading-relaxed font-normal">
          {text}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;