// src/app/components/Department.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const PASTOR_PHONE = "2349112521558"; // Pastor Tosin Adewale

const departments = [
  { name: "Children's Church", tagline: "Raising the next generation in the Word", images: ["/department/children1.jpg", "/department/children2.jpg"] },
  { name: "Choir", tagline: "Leading the congregation in worship", images: ["/department/choir.jpg"] },
  { name: "Drama", tagline: "Telling the gospel through performance", images: ["/department/drama1.jpg", "/department/drama2.jpg"] },
  { name: "Prayer Force", tagline: "Standing in the gap for the church", images: ["/department/prayer.jpg"] },
  { name: "Teens Church", tagline: "Guiding teenagers in their walk of faith", images: ["/department/teen1.jpg"] },
  { name: "Ushering", tagline: "Welcoming everyone who walks through the door", images: ["/department/ulsher1.jpg"] },
];

function DepartmentCard({ name, tagline, images }: { name: string; tagline: string; images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const whatsappUrl = "https://wa.me/" + PASTOR_PHONE + "?text=" + encodeURIComponent("Hello, I'd like to join the " + name + " department.");

  return (
    <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.35)]">
      <div className="relative w-full h-72 overflow-hidden">
        {images.map((img, index) => (
          <div key={img} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}>
            <Image src={img} alt={name} fill className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-[#0B1E3D]/10 to-transparent" />
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <span key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === current ? "w-5 bg-[#D4AF37]" : "w-1.5 bg-white/40"}`} />
            ))}
          </div>
        )}
      </div>

      <div className="relative p-6 text-center">
        <h3 className="text-white font-serif font-bold text-lg mb-1 tracking-wide">{name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{tagline}</p>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0B1E3D] font-bold text-sm px-6 py-2.5 rounded-full shadow-md shadow-[#D4AF37]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/40 hover:-translate-y-0.5 hover:bg-[#e6c458]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.85 14.03c-.24.68-1.19 1.25-1.94 1.4-.51.11-1.17.19-3.42-.73-2.87-1.19-4.72-4.06-4.86-4.25-.14-.19-1.16-1.54-1.16-2.94s.72-2.09.98-2.37c.24-.27.53-.34.71-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.79 1.93.86 2.07.07.14.11.3.02.48-.09.19-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.26.27-.11.53.14.27.65 1.07 1.4 1.73.97.86 1.78 1.13 2.05 1.26.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.44.19.51.3.06.11.06.65-.18 1.33z" />
          </svg>
          Join Department
        </a>

        <div className="w-8 h-[2px] bg-[#D4AF37] mx-auto mt-5 rounded-full opacity-70" />
      </div>
    </div>
  );
}

export default function Department() {
  return (
    <section id="departments" className="relative w-full bg-[#0B1E3D] px-6 md:px-16 py-20 md:py-28 overflow-hidden scroll-mt-24">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D4AF37] rounded-full blur-[140px] opacity-10 -z-0" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#5b1a4a] rounded-full blur-[120px] opacity-30 -z-0" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
              GET INVOLVED
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight">
              Some of Our <span className="text-[#D4AF37]">Departments</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-5 rounded-full" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {departments.map((dept, i) => (
            <Reveal key={dept.name} delay={i * 100}>
              <DepartmentCard name={dept.name} tagline={dept.tagline} images={dept.images} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}