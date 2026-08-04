// Components/m2.jsx (Select)
import { useState, useEffect } from "react";

function ChevronDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function Select({ sectionsData, title }) {
  const [selected, setSelected] = useState(sectionsData[0].glname);
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    setSelected(sectionsData[0].glname);
    setOpenGroups({});
  }, [title]);

  const selectSection = (glname) => {
    setSelected(glname);
    setOpenGroups({});
  };

  const toggleGroup = (idx) => {
    setOpenGroups((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const current = sectionsData.find((s) => s.glname === selected);

  // Dynamic-որեն գտնում ենք name, name2, name3, name4, name5... քանի հատ էլ լինեն
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
    <div className="max-w-6xl mx-auto px-4 py-10 mt-[100px]">
      <div className="text-sm text-gray-500 mb-6">
        Home <span className="mx-1">›</span> About Company{" "}
        <span className="mx-1">›</span> {title}
      </div>

      <h1 className="text-4xl font-bold text-slate-800 mb-8">{title}</h1>

      <div className="flex gap-8">
        <div className="w-72 shrink-0 space-y-1">
          {sectionsData.map(({ glname }) => {
            const isActive = selected === glname;
            return (
              <button
                key={glname}
                onClick={() => selectSection(glname)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-md text-left font-semibold transition-colors ${
                  isActive
                    ? "bg-teal-400 hover:bg-teal-500 text-slate-900"
                    : "bg-gray-100 hover:bg-gray-200 text-slate-600 font-normal"
                }`}
              >
                {glname}
                {isActive && <span>▸</span>}
              </button>
            );
          })}
        </div>

        <div className="flex-1">
          {groups.length > 0 ? (
            groups.map((g, idx) => {
              const isOpen = !!openGroups[idx];
              return (
                <div key={idx} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleGroup(idx)}
                    className="w-full flex items-center justify-between py-6 text-2xl font-bold text-slate-800"
                  >
                    {g.title}
                    <ChevronDown
                      className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-6 pl-2 space-y-2 text-slate-600">
                      {g.items.map((f, fi) => (
                        <p key={fi} className="block">
                          {f}
                        </p>
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