import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export function TariffCards() {
  const [tariffs, setTariffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tariffs"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTariffs(data);
      } catch (error) {
        console.error("Firebase fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTariffs();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-10">Բեռնվում է...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center items-stretch gap-6 w-full">
      {tariffs.map((plan) => (
        <div
          key={plan.id}
          className="relative w-full max-w-[360px] bg-[#004e70] rounded-lg shadow-xl border-t-4 border-[#ff4f41] p-6 text-white overflow-hidden flex flex-col justify-between"
        >
          {plan.badge && (
            <div className="absolute top-[20px] -right-[35px] bg-[#ff4f41] text-white font-bold text-xs py-1 px-10 rotate-45 shadow-md tracking-wider">
              {plan.badge}
            </div>
          )}

          <div>
            {/* Title */}
            <h2 className="text-center text-3xl font-extrabold tracking-wide text-white mb-3">
              {plan.title}
            </h2>

            {/* Price Section */}
            <div className="flex justify-center items-center gap-2 my-2">
              <div className="text-right leading-none">
                <span className="text-[#ff4f41] text-xl font-extrabold block leading-tight">
                  ֏
                </span>
                <span className="text-[#ff4f41] text-xs font-semibold">
                  ամիս
                </span>
              </div>
              <span className="text-[#ff4f41] text-5xl font-black tracking-tight">
                {plan.price}
              </span>
              {plan.oldPrice && (
                <span className="text-gray-300 text-xl line-through ml-2 font-light">
                  {plan.oldPrice}
                </span>
              )}
            </div>

            {/* Dashed Separator Line */}
            <div className="border-b border-dashed border-[#136a91] my-6 w-full" />

            {/* Features List */}
            <div className="space-y-5 text-xl font-bold px-2">
              {/* Internet (4G Icon + Text) */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center border-2 border-white rounded-md text-xs font-black">
                  4G
                </div>
                {plan.isUnlimitedData ? (
                  <span className="text-3xl font-black text-white leading-none">
                    ∞
                  </span>
                ) : (
                  <span className="text-2xl">{plan.data}</span>
                )}
              </div>

              {/* Minutes (Phone Icon + Text) */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-8 h-8 fill-none stroke-white stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-2xl">{plan.minutes}</span>
              </div>

              {/* SMS (Chat Icon + Text) */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-8 h-8 fill-none stroke-white stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-2xl">{plan.sms}</span>
              </div>

              {/* Roaming (Plane Icon + Text) */}
              {plan.roaming && (
                <div className="flex items-center gap-4">
                  <svg
                    className="w-8 h-8 fill-none stroke-white stroke-2 -rotate-45"
                    viewBox="0 0 24 24"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span className="text-2xl">{plan.roaming}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Apps Icons Grid */}
          {plan.apps && plan.apps.length > 0 && (
            <div className="mt-8 pt-2 flex flex-wrap justify-center gap-1.5 max-w-[280px] mx-auto">
              {plan.apps.map((icon, iconIdx) => (
                <img
                  key={iconIdx}
                  src={icon}
                  alt="app icon"
                  className="w-6 h-6 rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TariffCards;