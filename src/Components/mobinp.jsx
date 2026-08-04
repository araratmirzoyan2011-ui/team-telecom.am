import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { hborder3 } from "./hborder3";
function AccordionSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 border-t border-gray-100 pt-4 grid grid-cols-2 gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Pl() {
  return (
    <AccordionSection title="Other tariff plans">
      {hborder3("Be Free 2500/15 days","Unlimited internet.")}
      {hborder3("Welcome","Calls to all networks of RA  49 AMD Internet 50 AMD")}
    </AccordionSection>
  );
}