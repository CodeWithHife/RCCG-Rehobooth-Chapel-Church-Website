// src/app/components/Department.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const departments = [
  {
    name: "Children's Church",
    tagline: "Raising the next generation in the Word",
    images: ["/department/children1.jpg", "/department/children2.jpg"],
  },
  {
    name: "Choir",
    tagline: "Leading the congregation in worship",
    images: ["/department/choir.jpg"],
  },
  {
    name: "Drama",
    tagline: "Telling the gospel through performance",
    images: ["/department/drama1.jpg", "/department/drama2.jpg"],
  },
  {
    name: "Prayer Force",
    tagline: "Standing in the gap for the church",
    images: ["/department/prayer.jpg"],
  },
  {
    name: "Teens Church",
    tagline: "Guiding teenagers in their walk of faith",
    images: ["/department/teen1.jpg"],
  },
  {
    name: "Ushering",
    tagline: "Welcoming everyone who walks through the door",
    images: ["/department/ulsher1.jpg"],
  },
];

function DepartmentCard({
  name,
  tagline,
  images,
}: {
  name: string;
  tagline: string;
  images: string[];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.35)]">
      {/* Image / Slideshow */}
      <div className="relative w-full h-72 overflow-hidden">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={name}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-[#0B1E3D]/10 to-transparent" />

        {/* Slide indicator dots — only if multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? "w-5 bg-[#D4AF37]" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="relative p-6 text-center">
        <h3 className="text-white font-serif font-bold text-lg mb-1 tracking-wide">
          {name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{tagline}</p>
        <div className="w-8 h-[2px] bg-[#D4AF37] mx-auto mt-4 rounded-full opacity-70" />
      </div>
    </div>
  );
}

export default function Department() {
  return (
    <section className="relative w-full bg-[#0B1E3D] px-6 md:px-16 py-20 md:py-28 overflow-hidden">
      {/* Ambient glow accents */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D4AF37] rounded-full blur-[140px] opacity-10 -z-0" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#5b1a4a] rounded-full blur-[120px] opacity-30 -z-0" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
            GET INVOLVED
          </span>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight">
            Some of Our <span className="text-[#D4AF37]">Departments</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-5 rounded-full" />
        </div>

        {/* Departments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.name}
              name={dept.name}
              tagline={dept.tagline}
              images={dept.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
}