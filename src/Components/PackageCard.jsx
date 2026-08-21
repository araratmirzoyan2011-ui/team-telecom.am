import React from 'react';

// Իկոնների ֆունկցիան (կարող ես օգտագործել քո արդեն ունեցածը)
function InclusionIcon({ type }) {
    const common = "w-6 h-6 text-blue-900 shrink-0";
    switch (type) {
        case "wifi":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 8.5a16 16 0 0 1 20 0" />
                    <path d="M5.5 12a11 11 0 0 1 13 0" />
                    <path d="M9 15.5a6 6 0 0 1 6 0" />
                    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
                </svg>
            );
        case "beFree":
            return (
                <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    Be
                </div>
            );
        case "call":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <circle cx="12" cy="18" r="0.8" fill="currentColor" stroke="none" />
                </svg>
            );
        case "internet":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="12" rx="1" />
                    <path d="M8 20h8" />
                    <path d="M12 16v4" />
                </svg>
            );
        case "teamTV":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="6" width="16" height="11" rx="1.5" />
                    <path d="M9 20h6" />
                    <path d="M8 10.5h4" />
                </svg>
            );
        case "roaming":
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 13l18-7-7 18-2-8-8-3z" />
                </svg>
            );
        default:
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                </svg>
            );
    }
}

// Փաթեթի քարտի կոմպոնենտ
export default function PackageCard({ packageData, onJoin }) {
    if (!packageData) return null;

    // Միավորում ենք mobile և fixed ցանկերը միասին ցուցադրելու համար, ինչպես նկարում է
    const allInclusions = [
        ...(packageData.fixedInclusions || []),
        ...(packageData.mobileInclusions || [])
    ];

    return (
        <div className="w-full max-w-[340px] bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden flex flex-col">
            {/* Վերին կապույտ հատված */}
            <div className="bg-[#003d5b] text-white text-center py-6 px-4">
                <div className="text-3xl font-extrabold tracking-wide">
                    {packageData.feeAmount} <span className="text-2xl font-normal">֏</span>
                </div>
                <div className="text-xl font-bold mt-1 tracking-wider">
                    {packageData.heading}
                </div>
            </div>

            {/* Միջնամաս (Ցանկեր) */}
            <div className="flex-1 divide-y divide-gray-100">
                {allInclusions.map((item, index) => (
                    <div key={index} className="flex items-center px-6 py-3.5 gap-4 hover:bg-gray-50 transition-colors">
                        <InclusionIcon type={item.icon} />
                        <span className="text-gray-800 font-medium text-sm">
                            {item.value ? `${item.value} ${item.unit || ''}` : ''} {item.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Ներքևի կոճակը */}
            <div className="p-5 bg-white text-center">
                <button
                    type="button"
                    onClick={onJoin}
                    className="w-full bg-[#ff4d4f] hover:bg-[#ff7875] text-white font-bold py-3 px-6 rounded-full transition-colors cursor-pointer shadow-md"
                >
                    Join
                </button>
            </div>
        </div>
    );
}