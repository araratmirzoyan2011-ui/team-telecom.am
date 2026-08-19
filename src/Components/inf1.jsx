export function IL({ src, h1, p }) {
  return (
    <div className="flex items-center gap-6 mb-8 text-white">
      {/* Իկոնկայի հատվածը */}
      <div className="w-16 h-16 shrink-0 flex justify-center items-center">
        <img src={src} className="w-full h-full object-contain" alt="" />
      </div>

      {/* Տեքստերի հատվածը */}
      <div className="flex flex-col justify-center">
        {h1 && <h3 className="text-2xl font-bold leading-snug">{h1}</h3>}
        {p && <p className="text-gray-200 text-base mt-1">{p}</p>}
      </div>
    </div>
  );
}