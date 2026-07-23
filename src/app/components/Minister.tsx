// src/app/components/Minister.tsx
import Image from "next/image";

const ministers = [
  {
    name: "Pastor Tosin Adewale",
    role: "Resident Pastor",
    tag: "Rehoboth Chapel",
    image: "/minister/min1.jpg",
    phone: "2349112521558",
  },
  {
    name: "Pastor Femi Eniokanoselu",
    role: "Assistant Pastor",
    tag: "Youth Province 15",
    image: "/minister/min2.jpg",
    phone: "2348066579342",
  },
  {
    name: "Pastor Emmanuel Oyetola",
    role: "Assistant Pastor",
    tag: "Youth Province 15",
    image: "/minister/min3.jpg",
    phone: "2348060400021",
  },
];

export default function Minister() {
  return (
    <section className="relative w-full bg-[#0B1E3D] px-6 md:px-16 py-20 md:py-28 overflow-hidden">
      {/* Ambient glow accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#5b1a4a] rounded-full blur-[120px] opacity-30 -z-0" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#D4AF37] rounded-full blur-[140px] opacity-10 -z-0" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
            OUR LEADERSHIP
          </span>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight">
            Meet Our <span className="text-[#D4AF37]">Pastors</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-5 rounded-full" />
        </div>

        {/* Ministers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {ministers.map((minister) => (
            <div
              key={minister.name}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.35)]"
            >
              {/* Glow ring on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/20 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              {/* Image */}
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={minister.image}
                  alt={minister.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-[#0B1E3D]/20 to-transparent" />

                {/* Floating tag badge */}
                <span className="absolute top-4 left-4 bg-[#0B1E3D]/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] tracking-widest font-semibold px-3 py-1.5 rounded-full">
                  {minister.tag.toUpperCase()}
                </span>
              </div>

              {/* Info */}
              <div className="relative p-7 text-center">
                <h3 className="text-white font-serif font-bold text-xl mb-1 tracking-wide">
                  {minister.name}
                </h3>
                <p className="text-[#D4AF37] text-sm font-medium mb-6 tracking-wide">
                  {minister.role}
                </p>

                {/* FIXED: Single‑line anchor to avoid any parsing issues */}
                <a href={"https://wa.me/" + minister.phone} target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center gap-2 bg-[#D4AF37] text-[#0B1E3D] font-bold text-sm px-7 py-3 rounded-full overflow-hidden shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/40 hover:-translate-y-0.5 hover:bg-[#e6c458]">
                  <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.85 14.03c-.24.68-1.19 1.25-1.94 1.4-.51.11-1.17.19-3.42-.73-2.87-1.19-4.72-4.06-4.86-4.25-.14-.19-1.16-1.54-1.16-2.94s.72-2.09.98-2.37c.24-.27.53-.34.71-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.79 1.93.86 2.07.07.14.11.3.02.48-.09.19-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.26.27-.11.53.14.27.65 1.07 1.4 1.73.97.86 1.78 1.13 2.05 1.26.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.44.19.51.3.06.11.06.65-.18 1.33z" />
                  </svg>
                  <span className="relative z-10">Contact Pastor</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}