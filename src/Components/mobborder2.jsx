export function Border({gb, min, chanell, Amd }) {
  return (
    <div className="w-full rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between rounded-2xl bg-[#f5f6f7] px-8 py-6">
        
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-800">{gb}</span>
          <span className="text-base text-gray-400">GB</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-800">{min}</span>
          <span className="text-base text-gray-400">min</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-800">{chanell}</span>
          <span className="text-base text-gray-400">channels</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-800">{Amd}</span>
          <span className="text-base text-gray-400">AMD</span>
        </div>

        <button className="w-[180px] h-[56px] flex items-center justify-center rounded-full border border-red-500 bg-white text-red-500 font-bold hover:bg-red-50 transition">
          Details
        </button>
      </div>
    </div>
  );
}