// src/app/page.tsx
import Hero from "./components/Hero";
import Details from "./components/Details";
import Minister from "./components/Minister";
import Department from "./components/Department";
import ContactDetails from "./components/ContactDetails";
import Footer from "./components/Footer";   // ← fixed: no extra 'o'

export default function Home() {
  return (
    <>
      <Hero />
      <Details />
      <Minister />
      <Department />
      <ContactDetails />
      <Footer />
    </>
  );
}