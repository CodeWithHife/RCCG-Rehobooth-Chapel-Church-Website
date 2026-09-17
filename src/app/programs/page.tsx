// src/app/programs/page.tsx
import Department from "../components/Department";
import Footer from "../components/Footer";

export default function Programs() {
  return (
    <>
      <main className="min-h-[80vh] bg-[#0B1E3D] text-white">
        <Department />
      </main>
      <Footer />
    </>
  );
}