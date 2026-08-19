import React from "react";

const PlanCard = ({
  title,
  description,
  buttonText,
  col
}) => {
  return (
    <div
        className={`${col} rounded-2xl p-8 w-full max-w-sm`}
    >
      <h3 className="text-white text-3xl font-extrabold uppercase tracking-tight mb-6">
        {title}
      </h3>

      <p className="text-white/90 text-lg leading-relaxed mb-8">
        {description}
      </p>

      <button
        className="bg-white text-red-500 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PlanCard;