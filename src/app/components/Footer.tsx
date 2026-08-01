// src/app/components/Footer.tsx
"use client";

import Link from "next/link";

const currentYear = new Date().getFullYear();

const PASTOR_PHONE = "2349112521558"; // Pastor Tosin Adewale
const FACEBOOK_URL = "https://web.facebook.com/people/RCCG-Rehoboth-Chapel/61590256955969/?sk=";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Departments", href: "/departments" },
  { name: "Ministers", href: "/ministers" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/" + PASTOR_PHONE,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.85 14.03c-.24.68-1.19 1.25-1.94 1.4-.51.11-1.17.19-3.42-.73-2.87-1.19-4.72-4.06-4.86-4.25-.14-.19-1.16-1.54-1.16-2.94s.72-2.09.98-2.37c.24-.27.53-.34.71-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.79 1.93.86 2.07.07.14.11.3.02.48-.09.19-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.26.27-.11.53.14.27.65 1.07 1.4 1.73.97.86 1.78 1.13 2.05 1.26.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.44.19.51.3.06.11.06.65-.18 1.33z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: FACEBOOK_URL,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-b from-[#0B1E3D] to-[#060f1f] border-t border-[#D4AF37]/20 pt-16 pb-6 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="font-serif font-bold text-2xl text-white">
                RCCG <span className="text-[#D4AF37]">Rehoboth</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A place of worship, fellowship, and spiritual growth. We are
              committed to spreading the love of Christ.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1E3D] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#D4AF37] mt-1" />
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4 relative">
              Contact Info
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#D4AF37] mt-1" />
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <svg className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.16-7-11.5A7 7 0 0 1 19 9.5C19 14.84 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <span>Edola Hotel, Leme, Abeokuta, Ogun State</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+234 911 252 1558</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                </svg>
                <span>info@rccgrehoboth.org</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Times */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4 relative">
              Service Times
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#D4AF37] mt-1" />
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-gray-400">
                <span>Sunday Celebration</span>
                <span className="text-[#D4AF37]">9:00 AM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Midweek Service</span>
                <span className="text-[#D4AF37]">Wed 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-linear-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-2 sm:space-y-0">
          <p>
            &copy; {currentYear} RCCG Rehoboth Chapel. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built by CodeWithHife
          </p>
        </div>
      </div>
    </footer>
  );
}