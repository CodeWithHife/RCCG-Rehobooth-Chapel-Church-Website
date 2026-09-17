"use client";

import Reveal from "./Reveal";

const visitPillars = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Anointed Worship & Word",
    description:
      "Experience heartfelt contemporary praise, authentic worship, and practical biblical teaching that equips you for everyday victory.",
    badge: "SPIRIT-FILLED",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Children & Teens Church",
    description:
      "We provide safe and engaging environments where children and teenagers learn God's Word, build character, and grow in faith.",
    badge: "NEXT GENERATION",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Come As You Are",
    description:
      "There is no dress code or pressure. Whether in traditional attire, formal suit, or casual wear, you are welcomed with open arms.",
    badge: "ALL ARE WELCOME",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Dedicated Guest Care",
    description:
      "Our hospitality and ushering ministers are ready to guide you, answer questions, and make your first visit smooth and comfortable.",
    badge: "FIRST-TIME CARE",
  },
];

export default function PlanVisit() {
  return (
    <section id="plan-visit" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1322] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[#d4af37] text-xs font-bold tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full bg-[#111827] border border-slate-700">
              FIRST TIME AT REHOBOTH?
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mt-2">
              Plan Your <span className="text-[#d4af37]">Visit</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
              Stepping into a new church should feel welcoming and uplifting. Here is what you can look forward to.
            </p>
            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-6" />
          </div>
        </Reveal>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visitPillars.map((pillar, idx) => (
            <Reveal key={pillar.title} delay={idx * 100}>
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0a0f1d] border border-slate-800 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-bold text-[#d4af37] px-2.5 py-1 rounded-full bg-[#0a0f1d] border border-slate-800">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-[#d4af37] font-semibold">
                  There's room for you
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Guest VIP Invite Card */}
        <Reveal delay={200}>
          <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#111827] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-left">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">GUEST EXPERIENCE</span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                Let Us Know You're Coming
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed font-light">
                Send a quick message ahead of time so our welcome team can prepare to receive you and your family.
              </p>
            </div>
            <a
              href="https://wa.me/2349112521558?text=Hello%20RCCG%20Rehoboth%2C%20I%20am%20planning%20to%20visit%20the%20church%20this%20week!"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-8 py-3.5 rounded-full bg-[#d4af37] hover:bg-[#c29d2e] text-[#0a0f1d] font-bold text-sm tracking-wide transition-colors"
            >
              Notify Welcome Team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
