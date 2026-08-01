// src/app/components/Give.tsx
"use client";

import { useState } from "react";

const BANK_NAME = "Access Bank";
const ACCOUNT_NUMBER = "1220817306";
const ACCOUNT_NAME = "RCCG Rehoboth Chapel";

export default function Give() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full bg-[#0B1E3D] px-5 sm:px-6 md:px-16 py-16 md:py-28 overflow-hidden">
      {/* Ambient glow accents */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#D4AF37] rounded-full blur-[140px] opacity-10 -z-0" />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#5b1a4a] rounded-full blur-[120px] opacity-30 -z-0" />

      <div className="relative max-w-md mx-auto">
        {/* Header section */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-[#D4AF37] text-[10px] sm:text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
            SOW A SEED
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            Give <span className="text-[#D4AF37]">Offering</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-sm mx-auto leading-relaxed text-sm sm:text-base px-2">
            Every tithe, offering, and donation you sow is given back to God —
            it sustains His work and reaches every nation for the Lord Jesus
            Christ. Thank you for giving cheerfully.
          </p>
          <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-5 rounded-full" />
        </div>

        {/* Bank details card */}
        <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.25)]">
          {/* Header strip */}
          <div className="bg-gradient-to-r from-[#3a0f3f] via-[#4a1a52] to-[#2a1454] px-5 sm:px-6 py-4 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              {/* Access Bank icon */}
              <svg className="w-4.5 h-4.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 18h16M4 10h16M6 6l6-3 6 3M6 10v8M10 10v8M14 10v8M18 10v8" />
              </svg>
            </span>
            <div>
              <p className="text-white font-serif font-bold text-base sm:text-lg">Bank Transfer Details</p>
              <p className="text-gray-300 text-[11px] sm:text-xs">Tithes, offerings & donations to God</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[#D4AF37] text-[10px] sm:text-xs tracking-widest font-semibold mb-1">
                  BANK NAME
                </p>
                <p className="text-white text-base sm:text-lg font-semibold">{BANK_NAME}</p>
              </div>
              <svg className="w-5 h-5 text-[#D4AF37]/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 18h16M4 10h16M6 6l6-3 6 3M6 10v8M10 10v8M14 10v8M18 10v8" />
              </svg>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[#D4AF37] text-[10px] sm:text-xs tracking-widest font-semibold mb-1">
                  ACCOUNT NAME
                </p>
                <p className="text-white text-base sm:text-lg font-semibold">{ACCOUNT_NAME}</p>
              </div>
              <svg className="w-5 h-5 text-[#D4AF37]/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
              </svg>
            </div>

            <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[#D4AF37] text-[10px] sm:text-xs tracking-widest font-semibold mb-1">
                  ACCOUNT NUMBER
                </p>
                <p className="text-white text-xl sm:text-2xl font-bold tracking-wide truncate">
                  {ACCOUNT_NUMBER}
                </p>
              </div>

              <button
                onClick={handleCopy}
                className="w-full xs:w-auto sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0B1E3D] font-bold text-sm px-5 py-2.5 rounded-full shadow-md shadow-[#D4AF37]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/40 hover:-translate-y-0.5 hover:bg-[#e6c458] active:scale-95"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="9" y="9" width="12" height="12" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Number
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="flex items-start gap-2 justify-center mt-6 px-2">
          <svg className="w-4 h-4 text-[#D4AF37]/60 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
            After transferring, kindly notify us via WhatsApp so we can confirm and appreciate your giving.
          </p>
        </div>
      </div>
    </section>
  );
}