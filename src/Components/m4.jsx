import { useState, useEffect } from "react";
import parth from "./parth";

export function Select({ sectionsData, title, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0] : null);
  const [selected, setSelected] = useState(sectionsData?.[0]?.glname);

  useEffect(() => {
    if (sectionsData?.[0]) {
      setSelected(sectionsData[0].glname);
    }
  }, [title, sectionsData]);

  if (!sectionsData || sectionsData.length === 0) {
    return <p className="text-center py-10 text-gray-400">Բեռնվում է...</p>;
  }

  const selectSection = (glname) => {
    setSelected(glname);
  };

  const current = sectionsData.find((s) => s.glname === selected);

  // Հավաքում ենք բոլոր "files"/"filesN" բանալիների items-երը մեկ հարթ ցուցակի մեջ
  const items = current
    ? Object.keys(current)
        .filter((key) => key === "files" || /^files\d+$/.test(key))
        .flatMap((key) => (Array.isArray(current[key]) ? current[key] : []))
    : [];

  return (
    <div className="w-full px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="underline">Home</span>
        <span className="mx-2">›</span>
        <span className="underline">Private Clients</span>
        <span className="mx-2">›</span>
        <span className="underline">Tariffs</span>
        <span className="mx-2">›</span>
        <span>{title}</span>
      </div>

      {/* Prepaid / Postpaid tabs */}
      {tabs && (
        <div className="flex gap-10 border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-base font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-teal-400 text-slate-900"
                  : "border-transparent text-gray-400 hover:text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Sidebar */}
        <div className="w-full lg:w-96 shrink-0">
          <h2 className="text-xl font-bold text-slate-800 mb-6 px-1">
            Choose your package
          </h2>
          <div className="space-y-1">
            {sectionsData.map(({ glname }) => {
              const isActive = selected === glname;
              return (
                <button
                  key={glname}
                  onClick={() => selectSection(glname)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-md text-left transition-colors ${
                    isActive
                      ? "bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold"
                      : "bg-transparent hover:bg-gray-100 text-slate-600 font-normal"
                  }`}
                >
                  {glname}
                  {isActive && <span>▸</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full flex-1 lg:sticky lg:top-[120px] self-start">
          {items.length > 0 ? (
            <div className="mt-10">
              {parth()}
            </div>
          ) : (
            <p className="text-gray-400 pt-6">Դեռ հաշվետվություն չկա</p>
          )}
        </div>
      </div>
    </div>
  );
}