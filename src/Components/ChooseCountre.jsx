import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Բոլոր երկրների կամ հիմնականների տվյալների բազան (դրոշներ, կոդեր, գներ)
const countriesDatabase = {
  "Canada": { code: "CA", flag: "🇨🇦", price1: "344 AMD", price2: "301 AMD" },
  "United States": { code: "US", flag: "🇺🇸", price1: "190 AMD", price2: "160 AMD" },
  "Russia": { code: "RU", flag: "🇷🇺", price1: "150 AMD", price2: "120 AMD" },
  "China": { code: "CN", flag: "🇨🇳", price1: "344 AMD", price2: "301 AMD" },
  "Georgia": { code: "GE", flag: "🇬🇪", price1: "90 AMD", price2: "70 AMD" },
  "Germany": { code: "DE", flag: "🇩🇪", price1: "220 AMD", price2: "190 AMD" },
  "France": { code: "FR", flag: "🇫🇷", price1: "230 AMD", price2: "200 AMD" },
  "United Kingdom": { code: "GB", flag: "🇬🇧", price1: "210 AMD", price2: "180 AMD" },
  "Iran": { code: "IR", flag: "🇮🇷", price1: "180 AMD", price2: "150 AMD" },
  "United Arab Emirates": { code: "AE", flag: "🇦🇪", price1: "290 AMD", price2: "250 AMD" }
};

export function InteractiveMap() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Երբ սեղմում ես քարտեզի վրա կամ ընտրում ցանկից
  const handleCountryClick = (geo) => {
    const name = geo.properties.name;
    // Եթե տվյալը կա բազայում, վերցնում ենք, եթե ոչ՝ տալիս ենք ստանդարտ գներ
    const data = countriesDatabase[name] || {
      code: name.slice(0, 2).toUpperCase(),
      flag: "🌐",
      price1: "250 AMD",
      price2: "200 AMD"
    };
    setSelectedCountry({ name, ...data });
  };

  const handleSelectChange = (e) => {
    const name = e.target.value;
    const data = countriesDatabase[name];
    if (data) {
      setSelectedCountry({ name, ...data });
    }
  };

  return (
    <div className="w-[80%] ml-[10%] my-[40px] bg-white rounded-2xl p-8 shadow-md relative">
      {/* Վերնագիր և Select դաշտ */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-[32px] font-bold text-[rgb(22,20,20)]">Choose country</h2>
        
        <select 
          onChange={handleSelectChange}
          defaultValue=""
          className="w-[320px] p-3.5 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-cyan-500 shadow-sm cursor-pointer"
        >
          <option value="" disabled>Select country</option>
          {Object.keys(countriesDatabase).map((countryName) => (
            <option key={countryName} value={countryName}>{countryName}</option>
          ))}
        </select>
      </div>

      {/* Քարտեզի բլոկ */}
      <div className="relative w-full flex justify-center items-center bg-gray-50 rounded-xl p-4 border border-gray-100 overflow-hidden">
        <ComposableMap 
          projection="geoMercator" 
          projectionConfig={{ scale: 140 }}
          className="w-full max-w-[950px] h-[500px]"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelected = selectedCountry?.name === geo.properties.name;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="cursor-pointer outline-none transition-colors duration-200"
                    style={{
                      default: { 
                        fill: isSelected ? "#06b6d4" : "#94a3b8", 
                        stroke: "#FFFFFF", 
                        strokeWidth: 0.75 
                      },
                      hover: { fill: "#06b6d4", stroke: "#FFFFFF", strokeWidth: 1 },
                      pressed: { fill: "#0891b2", stroke: "#FFFFFF", strokeWidth: 1 },
                    }}
                    onClick={() => handleCountryClick(geo)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Ինֆորմացիոն պատուհան (Tooltip)՝ նկարի ոճով */}
        {selectedCountry && (
          <div className="absolute bottom-6 right-6 z-30 bg-white border border-gray-200 shadow-2xl rounded-2xl p-5 w-[310px] text-gray-800 flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCountry.flag}</span>
                <span className="font-bold text-sm bg-gray-100 px-2 py-1 rounded">{selectedCountry.code}</span>
              </div>
              <span className="font-semibold text-sm text-right text-gray-700">{selectedCountry.name}</span>
              <button 
                onClick={() => setSelectedCountry(null)}
                className="text-gray-400 hover:text-gray-600 font-bold px-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pt-1">
              <div className="flex flex-col bg-gray-50 p-2 rounded-lg">
                <span className="text-gray-400 text-[10px]">🕒 07:00 - 23:00</span>
                <span className="font-bold text-gray-900 mt-1">🏷️ {selectedCountry.price1}</span>
              </div>
              <div className="flex flex-col bg-gray-50 p-2 rounded-lg">
                <span className="text-gray-400 text-[10px]">🕒 23:00 - 07:00</span>
                <span className="font-bold text-gray-900 mt-1">🏷️ {selectedCountry.price2}</span>
              </div>
            </div>

            <div className="text-[11px] text-cyan-600 font-medium pt-1 border-t border-gray-100 cursor-pointer">
              Special offers *
            </div>
          </div>
        )}
      </div>
    </div>
  );
}