import React from 'react';

export default function PlanCard({ plan }) {
  return (
    <div className="relative bg-white rounded-t-xl rounded-b-[28px] pt-2 pb-6 px-6 w-full max-w-[280px] shadow-lg flex flex-col justify-between items-center text-gray-800 border-t-8 border-[#ff4e50]">
      
      {/* Զեղչի նշանը (եթե կա) */}
      {plan.discountBadge && (
        <div className="absolute -top-3 -right-2 z-10">
          <span className="text-red-500 font-extrabold text-2xl tracking-tighter drop-shadow">
            -{plan.discountBadge}%
          </span>
        </div>
      )}

      {/* Վերնագիր և Գին */}
      <div className="text-center w-full my-3">
        <h3 className="text-xl font-extrabold uppercase tracking-wide text-gray-800">
          {plan.title}
        </h3>

        <div className="mt-2 min-h-[64px] flex flex-col justify-center items-center">
          {plan.oldPrice && (
            <span className="text-gray-400 line-through text-lg font-semibold leading-none">
              {plan.oldPrice}
            </span>
          )}
          <span className={`text-3xl font-extrabold tracking-tight ${plan.oldPrice ? 'text-[#ff4e50]' : 'text-gray-800'}`}>
            {plan.price}
          </span>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 my-1"></div>

      {/* Ծառայությունների ցանկը */}
      <div className="w-full flex-1 space-y-3 my-2 text-sm">
        
        {/* Wi-Fi / Ինտերնետ */}
        {plan.speed && (
          <div className="flex flex-col items-center py-1">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-lg">📶</span>
              <span className="text-xl font-bold">{plan.speed}</span>
              <span className="text-xs text-gray-500 font-medium">Mbit/sec</span>
            </div>
          </div>
        )}

        {/* TV Ալիքներ */}
        {plan.channels && (
          <div className="flex flex-col items-center border-t border-gray-100 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-[#00a8b5] font-bold text-xs">team TV:</span>
              <span className="text-xl font-bold">{plan.channels}</span>
              <span className="text-xs text-gray-500">channels</span>
            </div>
            {plan.tvApp && (
              <p className="text-[10px] text-gray-400 text-center mt-1 leading-tight">
                {plan.tvApp}
              </p>
            )}
          </div>
        )}

        {/* Րոպեներ */}
        {plan.minutes && (
          <div className="flex flex-col items-center border-t border-gray-100 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold text-xs">ph standard:</span>
              <span className="text-lg font-bold">{plan.minutes}</span>
            </div>
            {plan.minutesNote && (
              <p className="text-[10px] text-gray-400 text-center mt-1 leading-tight px-1">
                {plan.minutesNote}
              </p>
            )}
          </div>
        )}

        {/* Մոբայլ Ինտերնետ (GB / Unlimited) */}
        {plan.data && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-2">
            <span className="border border-gray-400 rounded text-[10px] px-1 font-bold">4G</span>
            <span className="text-lg font-bold">{plan.data}</span>
          </div>
        )}

        {/* Roaming MB */}
        {plan.roamingMb && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-2">
            <span className="text-gray-600">✈️</span>
            <span className="text-base font-bold">{plan.roamingMb}</span>
            <span className="text-xs text-gray-500">MB</span>
          </div>
        )}

        {/* Roaming Min */}
        {plan.roamingMin && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-2">
            <span className="text-gray-600">📞</span>
            <span className="text-base font-bold">{plan.roamingMin}</span>
            <span className="text-xs text-gray-500">min</span>
          </div>
        )}

        {/* Սարքավորումներ (Beacon / PowerBank) */}
        {plan.router && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-2">
            <span className="bg-blue-900 text-white text-[9px] px-1 font-bold rounded">NOKIA</span>
            <span className="text-base font-bold">{plan.router}</span>
          </div>
        )}

        {/* Be Free SIM */}
        {plan.simCards && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-2">
            <span className="text-gray-600">📱</span>
            <span className="text-base font-bold">{plan.simCards}</span>
          </div>
        )}

        {/* GeForce NOW */}
        {plan.geforce && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-2">
            <span className="bg-green-600 text-white text-[8px] px-1 font-bold">NVIDIA</span>
            <span className="text-base font-bold">{plan.geforce}</span>
          </div>
        )}
      </div>

      {/* Միանալու Կոճակը */}
      <div className="w-full mt-4 pt-2 border-t border-gray-100">
        <button className="w-full bg-[#ff4e50] hover:bg-red-600 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-md">
          Join
        </button>
      </div>

    </div>
  );
}