import { useState } from "react";
import { header } from "../Components/header";
import Footer from "../Components/footer";

function ChevronDown({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const sectionsData = [
  {
    name: "Commitment",
    files: [`Commitment`],
  },
  {
    name: "Prospectus",
    files: [`Prospectus`],
  },
  {
    name: "Sustainability-Linked Bond Framework",
    files: [`Sustainability-Linked Bond Framework`, `Verification Assurance Report 2025`],
  },
  {
    name: "Second-party opinion",
    files: [`Second-party opinion`],
  },
  {
    name: "Financial model",
    files: [`Check financial model`],
  },
  {
    name: "Issuance final terms",
    files: [`Final terms AMD`, `Final terms USD(1)`, `Final terms USD(2)`],
  },
];

export default function Sus() {
  const [selected, setSelected] = useState(sectionsData[0].name);
  const [isOpen, setIsOpen] = useState(true);

  const selectSection = (name) => {
    setSelected(name);
    setIsOpen(true);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const current = sectionsData.find((s) => s.name === selected);

  return (
    <>
      {header()}
      <div className="max-w-6xl mx-auto px-4 py-10 mt-[100px]">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home <span className="mx-1">›</span> About Company{" "}
          <span className="mx-1">›</span> Sustainable Development
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Sustainable Development
        </h1>

        <div className="flex gap-8">
          {/* Left: 6 sidebar tab buttons */}
          <div className="w-72 shrink-0 space-y-1">
            {sectionsData.map(({ name }) => {
              const isActive = selected === name;
              return (
                <button
                  key={name}
                  onClick={() => selectSection(name)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-md text-left font-semibold transition-colors ${
                    isActive
                      ? "bg-teal-400 hover:bg-teal-500 text-slate-900"
                      : "bg-gray-100 hover:bg-gray-200 text-slate-600 font-normal"
                  }`}
                >
                  {name}
                  {isActive && <span>▸</span>}
                </button>
              );
            })}
          </div>

          {/* Right: only the selected section, shown as a single accordion */}
          <div className="flex-1">
            {current && (
              <div className="border-b border-gray-200">
                <button
                  onClick={toggleOpen}
                  className="w-full flex items-center justify-between py-6 text-2xl font-bold text-slate-800"
                >
                  {current.name}
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-6 pl-2 space-y-2 text-slate-600">
                    {current.files.length > 0 ? (
                      current.files.map((f, i) => (
                        <a
                          key={i}
                          href="#"
                          className="block hover:text-teal-500 underline"
                        >
                          {f}
                        </a>
                      ))
                    ) : (
                      <p className="text-gray-400">Դեռ հաշվետվություն չկա</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}