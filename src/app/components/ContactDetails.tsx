// src/app/components/ContactDetails.tsx
"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const PASTOR_PHONE = "2349112521558"; // Pastor Tosin Adewale
const ADDRESS = "Edola Hotel, Leme, Abeokuta, Ogun State";

const REASONS = [
  "Prayer Request",
  "General Inquiry",
  "Counseling",
  "Ministry / Department Info",
  "Other",
];

export default function ContactDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const fullName = `${firstName} ${lastName}`.trim() || "____";
    const text =
      `Hello, my name is ${fullName}.\n` +
      `Email: ${email || "____"}\n` +
      `Phone: ${phone || "____"}\n` +
      `Reason: ${reason}\n\n` +
      `${message || "I'd like to reach out to the church."}`;

    const url = `https://wa.me/${PASTOR_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative w-full bg-[#0B1E3D] px-6 md:px-16 py-20 md:py-28 overflow-hidden">
      {/* Ambient glow accents */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#D4AF37] rounded-full blur-[140px] opacity-10 -z-0" />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#5b1a4a] rounded-full blur-[120px] opacity-30 -z-0" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
              GET IN TOUCH
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight">
              Contact <span className="text-[#D4AF37]">Us</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-5 rounded-full" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Address + Map */}
          <Reveal>
            <div className="h-full flex flex-col gap-6">
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="shrink-0 w-11 h-11 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.16-7-11.5A7 7 0 0 1 19 9.5C19 14.84 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-[#D4AF37] text-xs tracking-widest font-semibold mb-1">
                    OUR LOCATION
                  </p>
                  <p className="text-white text-sm leading-relaxed">{ADDRESS}</p>
                </div>
              </div>

              <div className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                <iframe
                  title="Church location map"
                  src="https://www.google.com/maps?q=Edola+Hotel,+Leme,+Abeokuta,+Ogun+State&output=embed"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          {/* Right: Message Form */}
          <Reveal delay={150}>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <div>
                  <p className="text-white font-serif font-bold text-lg">Send a Message</p>
                  <p className="text-gray-400 text-xs">We'll respond via WhatsApp</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* First & Last Name – side by side on larger screens */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest mb-2">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. John"
                      className="w-full bg-[#0B1E3D]/60 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest mb-2">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Doe"
                      className="w-full bg-[#0B1E3D]/60 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone – side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#0B1E3D]/60 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest mb-2">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 2348000000000"
                      className="w-full bg-[#0B1E3D]/60 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs tracking-widest mb-2">
                    REASON FOR REACHING OUT
                  </label>
                  <div className="relative">
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full appearance-none bg-[#0B1E3D]/60 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors cursor-pointer"
                    >
                      {REASONS.map((r) => (
                        <option key={r} value={r} className="bg-[#0B1E3D] text-white">
                          {r}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs tracking-widest mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                    rows={4}
                    className="w-full bg-[#0B1E3D]/60 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37]/60 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSend}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0B1E3D] font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/40 hover:-translate-y-0.5 hover:bg-[#e6c458]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.85 14.03c-.24.68-1.19 1.25-1.94 1.4-.51.11-1.17.19-3.42-.73-2.87-1.19-4.72-4.06-4.86-4.25-.14-.19-1.16-1.54-1.16-2.94s.72-2.09.98-2.37c.24-.27.53-.34.71-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.79 1.93.86 2.07.07.14.11.3.02.48-.09.19-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.26.27-.11.53.14.27.65 1.07 1.4 1.73.97.86 1.78 1.13 2.05 1.26.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.44.19.51.3.06.11.06.65-.18 1.33z" />
                  </svg>
                  Send Message
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}