export function StepTimeline() {
  const steps = [
    { number: "1" },
    { number: "2" },
    { number: "3" }
  ];

  return (
    <div className="w-full px-6 flex justify-center items-center">
      <div className="max-w-4xl w-full relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[4px] bg-[#68b0ac] z-0"></div>

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            <span className="text-white font-bold text-xl md:text-2xl mb-3">
              {step.number}
            </span>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#68b0ac] border-4 border-[#024566] shadow-md flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}