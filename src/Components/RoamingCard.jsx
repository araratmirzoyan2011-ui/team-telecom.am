function RoamingCard({ title, subtitle, extra, price }) {
    return (
        <div className="flex flex-col items-center text-center relative pb-8 w-full">
            {/* Վերնագիր */}
            <p className="text-gray-200 text-base md:text-lg font-light mb-1">
                {title}
            </p>

            {/* Եթե կա subtitle (օրինակ՝ Russia, Georgia), եթե չկա՝ պահում է տեղը */}
            <div className="min-h-[28px] flex items-center justify-center mb-1">
                {subtitle && <p className="text-lg md:text-xl font-light text-gray-300">{subtitle}</p>}
            </div>

            {/* Գիգաբայթեր / Extra (օրինակ՝ 1 GB +) */}
            <div className="min-h-[36px] flex items-center justify-center mb-2">
                {extra && <p className="text-2xl md:text-3xl font-bold">{extra}</p>}
            </div>

            {/* Գինը */}
            <p className="text-2xl md:text-3xl font-bold mb-6">
                {price}
            </p>

            {/* Ներքևի հորիզոնական սպիտակ գիծը */}
            <div className="absolute bottom-0 w-[85%] h-[2px] bg-white/40"></div>
        </div>
    );
}

export default RoamingCard;