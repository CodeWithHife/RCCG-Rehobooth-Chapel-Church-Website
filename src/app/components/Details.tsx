// src/app/components/Details.tsx
import Image from "next/image";

const serviceTimes = [
  { day: "Sunday", time: "9:00 AM", label: "Celebration Service" },
  { day: "Wednesday", time: "5:00 PM", label: "Midweek Service" },
];

export default function Details() {
  return (
    <section className="w-full bg-[#0B1E3D] px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Logo */}
        <div className="relative w-full h-72 md:h-[420px] rounded-xl overflow-hidden shadow-lg shadow-black/40 border border-white/10 bg-gradient-to-br from-[#3a0f3f] via-[#4a1a52] to-[#2a1454] flex items-center justify-center">
          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <Image
              src="/logo.png"
              alt="RCCG Rehoboth Chapel logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-[#D4AF37] text-xs tracking-widest font-semibold mb-3">
            THE REDEEMED CHRISTIAN CHURCH OF GOD
          </p>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-2 leading-tight">
            Rehoboth Chapel
          </h2>
          <p className="text-gray-300 text-sm mb-6 tracking-wide">
            Youth Province 15 · <span className="italic">Triple Grace</span>
          </p>

          <p className="text-gray-300 leading-relaxed mb-8">
            Join us every Sunday and Wednesday as we gather in worship, the Word, and
            fellowship. We are a family of believers committed to holiness, growth, and
            reaching every nation for the Lord Jesus Christ.
          </p>

          {/* Service Times */}
          <div className="grid grid-cols-2 gap-4">
            {serviceTimes.map((service) => (
              <div
                key={service.day}
                className="bg-gradient-to-br from-[#3a0f3f]/80 via-[#4a1a52]/80 to-[#2a1454]/80 border border-white/10 rounded-xl px-5 py-4 text-center"
              >
                <p className="text-[#D4AF37] text-xs tracking-widest font-semibold mb-1">
                  {service.day.toUpperCase()}
                </p>
                <p className="text-white text-2xl font-bold">{service.time}</p>
                <p className="text-gray-400 text-xs mt-1">{service.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}