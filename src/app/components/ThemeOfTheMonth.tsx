"use client";

import Reveal from "./Reveal";

export default function ThemeOfTheMonth() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1322]">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="p-8 sm:p-12 rounded-2xl bg-[#111827] border border-slate-800 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0a0f1d] border border-slate-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="text-[11px] font-bold text-[#d4af37] tracking-widest uppercase">
                SPIRITUAL FOCUS
              </span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight mb-4">
              "The LORD Has Made Room For Us"
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light mb-8">
              "No matter the opposition or trials around you, divine expansion is your portion. You will not strive, for Jehovah has dug a new well of abundance and fruitfulness for you and your family."
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/2349112521558?text=Hello%20Pastor%2C%20please%20stand%20in%20agreement%20with%20me%20in%20prayer%20for%20divine%20expansion."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full bg-[#d4af37] hover:bg-[#c29d2e] text-[#0a0f1d] font-bold text-xs sm:text-sm tracking-wide transition-colors"
              >
                Request Word-Based Prayer
              </a>
              <a
                href="https://web.facebook.com/people/RCCG-Rehoboth-Chapel/61590256955969/?sk="
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                Watch Sermons on Facebook
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
