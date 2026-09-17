// src/app/about/page.tsx
import Details from "../components/Details";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us | RCCG Rehoboth Chapel",
  description: "Learn about RCCG Rehoboth Chapel in Abeokuta, Ogun State.",
};

export default function About() {
  return (
    <>
      <div className="pt-24 bg-[#0B1E3D] min-h-[85vh]">
        <div className="max-w-4xl mx-auto text-center px-4 pt-10 pb-6">
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
            ABOUT OUR CHURCH
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            RCCG Rehoboth <span className="text-[#D4AF37]">Chapel</span>
          </h1>
          <p className="text-gray-300 text-base max-w-xl mx-auto mt-4 font-light">
            A family of believers committed to holiness, worship, and reaching every nation for Jesus Christ. There is room for you here.
          </p>
        </div>
        <Details />
      </div>
      <Footer />
    </>
  );
}