// src/app/services/page.tsx
import Details from "../components/Details";
import Footer from "../components/Footer";

export const metadata = {
  title: "Worship Services | RCCG Rehoboth Chapel",
  description: "Weekly worship service times and programs at RCCG Rehoboth Chapel in Abeokuta.",
};

export default function Services() {
  return (
    <>
      <div className="pt-24 bg-[#0B1E3D] min-h-[85vh]">
        <div className="max-w-4xl mx-auto text-center px-4 pt-10 pb-6">
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
            WORSHIP WITH US
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Our Weekly <span className="text-[#D4AF37]">Services</span>
          </h1>
          <p className="text-gray-300 text-base max-w-xl mx-auto mt-4 font-light">
            Join us every Sunday at 9:00 AM and Wednesday at 5:00 PM for life-changing times in God's presence.
          </p>
        </div>
        <Details />
      </div>
      <Footer />
    </>
  );
}