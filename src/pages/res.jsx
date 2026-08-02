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

const reportsData = [
  {
    year: 2026,
    files: [
      `Regarding the main technical and economic indicators of the mobile network of "Telecom Armenia" OJSC for the 1-th quarter of 2026`,
      `Regarding the main technical and economic indicators of the fixed network of "Telecom Armenia" OJSC for the 1-th quarter of 2026`,
    ],
  },
  {
    year: 2025,
    files: [
      `Regarding the main technical and economic indicators of the mobile network of "Telecom Armenia" OJSC for the 1-th quarter of 2025`,
      `Regarding the main technical and economic indicators of the fixed network of "Telecom Armenia" OJSC for the 1-th quarter of 2025`,
      `Regarding the main technical and economic indicators of the mobile network of "Telecom Armenia" OJSC for the 2-nd quarter of 2025`,
      `Regarding the main technical and economic indicators of the fixed network of "Telecom Armenia" OJSC for the 2-nd quarter of 2025`,
      `Regarding the main technical and economic indicators of the mobile network of "Telecom Armenia" OJSC for the 3-th quarter of 2025`,
      `Regarding the main technical and economic indicators of the fixed network of "Telecom Armenia" OJSC for the 3-th quarter of 2025`,
      `Regarding the main technical and economic indicators of the mobile network of "Telecom Armenia" OJSC for the 4-th quarter of 2025`,
      `Regarding the main technical and economic indicators of the fixed network of "Telecom Armenia" OJSC for the 4-th quarter of 2025`,
      `Annual Financial Report of "Telecom Armenia" OJSC of the 2025`,
    ],
  },
  {
    year: 2024,
    files: [
      `Regarding the main technical and economic indicators of the mobile network of "Telecom Armenia" OJSC for the 4-th quarter of 2024`,
      `Regarding the main technical and economic indicators of the fixed network of "Telecom Armenia" OJSC for the 4-th quarter of 2024`,
      `Annual Financial Report of "Telecom Armenia" OJSC of the 2024`,
    ],
  },
];

export default function ResultsAndReporting() {
  const [openYear, setOpenYear] = useState(null);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  return (
    <>
      {header()}
      <div className="max-w-6xl mx-auto px-4 py-10 mt-[100px]">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home <span className="mx-1">›</span> About Company{" "}
          <span className="mx-1">›</span> Results and reporting
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Results and reporting
        </h1>

        <div className="flex gap-8">
          <div className="w-72 shrink-0">
            <button className="w-full flex items-center justify-between bg-teal-400 hover:bg-teal-500 transition-colors text-slate-900 font-semibold px-5 py-4 rounded-md text-left">
              Annual reports of "Telecom Armenia" OJSC
              <span>▸</span>
            </button>
          </div>

          <div className="flex-1">
            {reportsData.map(({ year, files }) => (
              <div key={year} className="border-b border-gray-200">
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center justify-between py-6 text-2xl font-bold text-slate-800"
                >
                  {year}
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      openYear === year ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openYear === year && (
                  <div className="pb-6 pl-2 space-y-2 text-slate-600">
                    {files.length > 0 ? (
                      files.map((f, i) => (
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
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}