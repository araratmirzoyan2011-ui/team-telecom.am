// Components/m3.jsx (Select)
import { useState, useEffect } from "react";
import { Border } from "./mobborder2";

function ChevronDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function Select({ sectionsData, title, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0] : null);
  const [selected, setSelected] = useState(sectionsData?.[0]?.glname);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (sectionsData?.[0]) {
      setSelected(sectionsData[0].glname);
      setOpenIndex(null);
    }
  }, [title, sectionsData]);

  if (!sectionsData || sectionsData.length === 0) {
    return <p className="text-center py-10 text-gray-400">Բեռնվում է...</p>;
  }

  const selectSection = (glname) => {
    setSelected(glname);
    setOpenIndex(null);
  };

  const toggleGroup = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const current = sectionsData.find((s) => s.glname === selected);

  const groups = current
    ? Object.keys(current)
        .filter((key) => key === "name" || /^name\d+$/.test(key))
        .map((nameKey) => {
          const suffix = nameKey === "name" ? "" : nameKey.replace("name", "");
          const filesKey = "files" + suffix;
          return { title: current[nameKey], items: current[filesKey] };
        })
        .filter((g) => g.title && Array.isArray(g.items) && g.items.length > 0)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
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

      <div className="flex gap-10 items-start">
        {/* Sidebar */}
        <div className="w-72 shrink-0">
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

        <div className="flex-1 sticky top-[120px] self-start">
          {groups.length > 0 ? (
            groups.map((g, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleGroup(idx)}
                    className="w-full flex items-center justify-between py-6 text-3xl font-black text-slate-800"
                  >
                    {g.title}
                    <ChevronDown
                      className={`w-6 h-6 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-6 space-y-3">
                      {g.items.map((f, fi) => (
                        <Border
                          key={fi}
                          gb={f.gb}
                          min={f.min}
                          chanell={f.chanell}
                          Amd={f.Amd}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 pt-6">Դեռ հաշվետվություն չկա</p>
          )}
        </div>
      </div>
    </div>
  );
}