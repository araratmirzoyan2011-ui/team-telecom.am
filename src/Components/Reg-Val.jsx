import { useState } from "react";

function StepContent({ steps, note }) {
  return (
    <div className="px-5 py-4 text-sm text-gray-500 leading-relaxed bg-white space-y-4">
      {steps.map((step, i) => (
        <p key={i}>
          <span className="font-bold text-[#0b3049]">Step {i + 1}: </span>
          {step.linkText ? (
            <>
              {step.before}
              <a
                href={step.linkHref}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
              
                {step.linkText}
              </a>
              {step.after}
            </>
          ) : (
            step.text
          )}
        </p>
      ))}
      {note && (
        <p className="uppercase font-semibold text-gray-600 pt-2">{note}</p>
      )}
    </div>
  );
}

function AccordionColumn({ items, openIndex, setOpenIndex, colOffset }) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md overflow-hidden">
      {items.map((item, i) => {
        const idx = colOffset + i;
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className={`w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-sm transition-colors ${
                isOpen ? "bg-[#7ecfd4] text-[#0b3049]" : "bg-white text-[#0b3049]"
              }`}
            >
              <span>{item.q}</span>
              <span className={`text-red-500 ml-4 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {isOpen &&
              (item.steps ? (
                <StepContent steps={item.steps} note={item.note} />
              ) : (
                <div className="px-5 py-4 text-sm text-gray-500 leading-relaxed bg-white">
                  {item.a}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}

export function Faq2({ leftItems, rightItems, title = "SIM Card Registration via the My Team App" }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full py-16 px-6 flex flex-col items-center bg-[#e3ddd2]">
      <h1 className="text-4xl font-semibold text-[#0b3049] mb-10">{title}</h1>
      <div className="w-full max-w-5xl grid grid-cols-2 gap-6 max-[750px]:grid-cols-1 ">
        <AccordionColumn items={leftItems} openIndex={openIndex} setOpenIndex={setOpenIndex} colOffset={0} />
        <AccordionColumn items={rightItems} openIndex={openIndex} setOpenIndex={setOpenIndex} colOffset={leftItems.length} />
      </div>
    </div>
  );
}