"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Ministers", href: "/#ministers" },
  { name: "Departments", href: "/#departments" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08162e]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-xl shadow-black/30 py-3.5"
          : "bg-[#0B1E3D]/90 backdrop-blur-md border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name - Clean logo without ring & full name with CHAPEL */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0"
            aria-label="RCCG Rehoboth Chapel"
          >
            <Image
              src="/logo.png"
              alt="RCCG Logo"
              width={44}
              height={44}
              className="object-contain w-8 h-8 sm:w-10 sm:h-10 shrink-0"
              priority
            />
            <span className="text-[#D4AF37] font-serif font-bold text-sm sm:text-lg md:text-xl tracking-wide truncate">
              RCCG REHOBOTH CHAPEL
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#D4AF37] bg-[#D4AF37]/15 font-semibold"
                      : "text-slate-200 hover:text-[#D4AF37] hover:bg-white/[0.06]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Give Button */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/give"
              className="bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-2.5 rounded-xl shadow-md shadow-[#D4AF37]/20 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              GIVE
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/give"
              className="bg-[#D4AF37] text-[#0B1E3D] font-bold text-xs px-3.5 py-1.5 rounded-lg"
            >
              GIVE
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none text-white"
            >
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-full bg-[#08162e] border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[460px] py-6 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-md mx-auto px-6 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                    : "text-slate-200 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                <span className="text-[#D4AF37]">›</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10 mt-2">
            <Link
              href="/give"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center text-xs font-bold py-3.5 rounded-xl bg-[#D4AF37] text-[#0B1E3D] uppercase tracking-wider"
            >
              Give Offering
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}