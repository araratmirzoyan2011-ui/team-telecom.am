import React, { useState } from 'react';

export function ChooseCountry({ onCountryChange }) {
    const [selectedCountry, setSelectedCountry] = useState("");

    // Երկրների օրինակելի ցանկ (կարող ես ավելացնել կամ փոխարինել քո ուզածներով)
    const countries = [
        "United States", "Russia", "Georgia", "Germany", "France", 
        "United Kingdom", "Iran", "China", "UAE", "Canada"
    ];

    return (
        <div className="w-[80%] ml-[10%] my-[40px] bg-white rounded-2xl p-8 shadow-md">
            {/* Վերնագիր և Select դաշտ */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-[28px] font-bold text-gray-900">Choose country</h2>
                
                <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-[300px] p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                    <option value="" disabled>Select country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            {/* Աշխարհի քարտեզի նկար (կամ SVG) */}
            <div className="w-full flex justify-center items-center">
                <img 
                    src="https://www.telecomarmenia.am/images/map-gray.svg" 
                    alt="World Map" 
                    className="w-full max-w-[900px] opacity-70 object-contain"
                    onError={(e) => {
                        // Եթե ուղիղ հղումով նկարը չբացվի, կարող ես փոխարինել ստորև բերված կամ որևէ այլ SVG/PNG հղումով
                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg";
                    }}
                />
            </div>
        </div>
    );
}