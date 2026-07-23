// os.jsx
export function os(l, mainTab, setMainTab) {
  return (
    <button
      type="button"
      onClick={() => setMainTab(l)}
      className={`ml-8 pb-3 font-medium text-sm transition-colors relative ${
        mainTab === l ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {l}
      {mainTab === l && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00a896]" />
      )}
    </button>
  );
}