// src/app/contact/page.tsx
import ContactDetails from "../components/ContactDetails";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us | RCCG Rehoboth Chapel",
  description: "Get in touch with RCCG Rehoboth Chapel in Abeokuta, Ogun State.",
};

export default function Contact() {
  return (
    <>
      <div className="pt-24 bg-[#0B1E3D] min-h-[85vh]">
        <div className="max-w-4xl mx-auto text-center px-4 pt-10 pb-2">
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] font-semibold mb-3 border border-[#D4AF37]/30 rounded-full px-4 py-1">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Contact <span className="text-[#D4AF37]">Us</span>
          </h1>
          <p className="text-gray-300 text-base max-w-xl mx-auto mt-4 font-light">
            Send us a prayer request, inquiry, or visit us at Edola Hotel, Leme, Abeokuta.
          </p>
        </div>
        <ContactDetails />
      </div>
      <Footer />
    </>
  );
}