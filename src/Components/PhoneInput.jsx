import { useState, useRef, useEffect } from "react";

// Ամենահաճախ պետք եղող երկրները՝ Հայաստանը՝ առաջինը
const COUNTRIES = [
  { code: "AM", dial: "+374", name: "Armenia" },
  { code: "RU", dial: "+7", name: "Russia" },
  { code: "GE", dial: "+995", name: "Georgia" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "IR", dial: "+98", name: "Iran" },
  { code: "AE", dial: "+971", name: "UAE" },
];

export function PhoneInput({
  label = "Contact phone number",
  required = true,
  value,
  onChange,
  error,
}) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [number, setNumber] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);

  // Հետևել էկրանի լայնությանը՝ 700px-ից փոքրում placeholder-ը թաքցնելու համար
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 700);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Փակել dropdown-ը click-outside-ի դեպքում
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNumberChange = (e) => {
    // Միայն թվանշաններ ու բացատներ
    const val = e.target.value.replace(/[^\d\s]/g, "");
    setNumber(val);
    onChange?.(`${country.dial} ${val}`.trim());
  };

  const selectCountry = (c) => {
    setCountry(c);
    setOpen(false);
    onChange?.(`${c.dial} ${number}`.trim());
  };

  return (
    <div className="w-full">
      <label className="block text-gray-500 max-[700px]:text-[14px] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        ref={wrapperRef}
        className={`relative flex items-center w-full h-[40px] max-[700px]:h-[36px] rounded-[20px] border px-[15px] max-[700px]:px-[12px] transition-colors ${
          error ? "border-red-400" : "border-gray-300 focus-within:border-teal-400"
        }`}
      >
        {/* Երկրի ընտրություն */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 pr-2 max-[700px]:pr-1.5 shrink-0 -ml-[2px]"
        >
          <img
            src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
            alt={country.name}
            className="w-5 h-5 max-[700px]:w-4 max-[700px]:h-4 rounded-full object-cover"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 max-[700px]:w-3 max-[700px]:h-3 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <span className="h-5 max-[700px]:h-4 w-px bg-gray-300" />

        {/* Dial code + number */}
        <span className="pl-2 max-[700px]:pl-1.5 text-gray-500 max-[700px]:text-[14px] select-none">{country.dial}</span>
        <input
          type="tel"
          value={number}
          onChange={handleNumberChange}
          placeholder={isMobile ? "" : "XX XXX XXX"}
          className="flex-1 bg-transparent outline-none pl-2 max-[700px]:pl-1.5 text-gray-800 max-[700px]:text-[14px] placeholder:text-gray-400"
        />

        {/* Dropdown list */}
        {open && (
          <div className="absolute top-[44px] max-[700px]:top-[40px] left-0 w-56 max-[700px]:w-48 max-h-64 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-100 z-20">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => selectCountry(c)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left"
              >
                <img
                  src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                  alt={c.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-sm max-[700px]:text-[13px] text-gray-700">{c.name}</span>
                <span className="ml-auto text-sm max-[700px]:text-[13px] text-gray-400">{c.dial}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error indicator (կարմիր կետ, ինչպես screenshot-ում) */}
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
}