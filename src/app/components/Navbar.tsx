// src/app/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Programs", href: "/programs" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full bg-gradient-to-r from-[#3a0f3f] via-[#4a1a52] to-[#2a1454] px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg shadow-black/20">
      {/* Logo + Text */}
      <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0" onClick={() => setIsOpen(false)}>
        <Image
          src="/logo.png"
          alt="Church Logo"
          width={40}
          height={40}
          className="object-contain w-8 h-8 sm:w-10 sm:h-10 shrink-0"
        />
        <span className="text-[#D4AF37] font-serif font-bold text-sm sm:text-lg md:text-xl tracking-wide truncate">
          RCCG REHOBOTH CHAPEL
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative font-medium tracking-wide group transition-colors ${
                isActive ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          );
        })}
      </div>

      {/* Give Button (desktop only) */}
      <Link
        href="/give"
        className="hidden md:inline-block bg-[#D4AF37] text-[#0B1E3D] font-bold px-6 py-2 rounded-full hover:bg-[#c29d2e] transition-colors duration-300"
      >
        GIVE
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white shrink-0 relative w-7 h-7 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
            isOpen ? "rotate-45" : "-translate-y-2"
          }`}
        />
        <span
          className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45" : "translate-y-2"
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#3a0f3f] to-[#2a1454] flex flex-col items-center gap-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium text-lg transition-colors ${
                isActive ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}
        <Link
          href="/give"
          className="bg-[#D4AF37] text-[#0B1E3D] font-bold px-6 py-2 rounded-full"
          onClick={() => setIsOpen(false)}
        >
          GIVE
        </Link>
      </div>
    </nav>
  );
}