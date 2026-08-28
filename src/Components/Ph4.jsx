export function Ph({ src, text, subText }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      {/* Պատկերը (Icon) */}
      <div className="mb-4">
        {typeof src === 'string' ? (
          <img src={src} alt="icon" className="w-12 h-12 object-contain" />
        ) : (
          src // Եթե պատկերը նկարի փոխարեն React Icon/SVG է
        )}
      </div>

      {/* Վերնագիրը (Օրինակ՝ Internet) */}
      <h3 className="text-2xl md:text-3xl font-medium mb-2 text-white">
        {text}
      </h3>

      {/* Ներքևի տեքստը/գինը (Օրինակ՝ From 0.5 AMD/MB) */}
      {subText && (
        <p className="text-sm md:text-base text-gray-300">
          {subText}
        </p>
      )}
    </div>
  );
}