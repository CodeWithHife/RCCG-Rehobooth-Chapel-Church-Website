"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const heroImages = ["/hero/img1.jpg", "/hero/img2.jpg", "/hero/img3.jpg"];
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=Edola+Hotel,+Leme,+Abeokuta,+Ogun+State";

// Nigeria is UTC+1 year-round (no daylight saving)
function getNigeriaNow() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + 60 * 60000);
}

function getNextSunday9AM(nowWAT: Date) {
  const target = new Date(nowWAT);
  target.setHours(9, 0, 0, 0);

  const dayOfWeek = nowWAT.getDay();
  let daysUntilSunday = (7 - dayOfWeek) % 7;

  if (dayOfWeek === 0 && nowWAT.getTime() < target.getTime()) {
    daysUntilSunday = 0;
  } else if (dayOfWeek === 0) {
    daysUntilSunday = 7;
  }

  target.setDate(nowWAT.getDate() + daysUntilSunday);
  return target;
}

function isServiceOngoing(nowWAT: Date) {
  if (nowWAT.getDay() !== 0) return false;
  const start = new Date(nowWAT);
  start.setHours(9, 0, 0, 0);
  const end = new Date(nowWAT);
  end.setHours(11, 30, 0, 0);
  return nowWAT.getTime() >= start.getTime() && nowWAT.getTime() <= end.getTime();
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [targetLabel, setTargetLabel] = useState("");
  const [ongoing, setOngoing] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const nowWAT = getNigeriaNow();

      if (isServiceOngoing(nowWAT)) {
        setOngoing(true);
        return;
      }

      setOngoing(false);
      const target = getNextSunday9AM(nowWAT);
      const diff = target.getTime() - nowWAT.getTime();

      setTargetLabel(
        target.toLocaleDateString("en-NG", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return { ...timeLeft, targetLabel, ongoing };
}

export default function Hero() {
  const { days, hours, minutes, seconds, targetLabel, ongoing } = useCountdown();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image Slideshow - Fully Visible */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt="RCCG Rehoboth Chapel Worship Service"
              fill
              priority={index === 0}
              className="object-cover object-[center_35%]"
            />
          </div>
        ))}
        {/* Soft Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-[#0B1E3D]/70" />
      </div>

      {/* Main Container - Well Spaced 2 Columns */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Info (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Church Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1E3D]/80 border border-[#D4AF37]/40 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                THE REDEEMED CHRISTIAN CHURCH OF GOD
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-wide mb-4">
              RCCG REHOBOTH <br />
              <span className="text-[#D4AF37]">CHAPEL</span>
            </h1>

            {/* Slogan */}
            <p className="text-[#D4AF37] font-serif italic text-lg sm:text-xl mb-6">
              " Room for More "
            </p>

            {/* Welcome Text */}
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-light drop-shadow-sm">
              Founded in April 2016, we are a family of believers committed to holiness,
              worship, and reaching every nation for the Lord Jesus Christ. You are welcome —
              there is room for you here.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/#contact"
                className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-sm tracking-wide shadow-lg shadow-black/40 transition-all duration-300"
              >
                Contact Us
              </Link>
              <Link
                href="/give"
                className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-[#0B1E3D]/80 hover:bg-white hover:text-[#0B1E3D] text-white border border-white/40 font-semibold text-sm tracking-wide backdrop-blur-md transition-all duration-300"
              >
                Give Offering
              </Link>
            </div>
          </div>

          {/* Right Column: Standalone Next Service Countdown Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-md bg-[#0B1E3D]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60">
              {ongoing ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-950 border border-red-500/50 text-red-400 text-xs font-bold uppercase mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span>SERVICE LIVE NOW</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-white mb-2">
                    Celebration Service
                  </h3>
                  <p className="text-slate-200 text-sm mb-6 font-light">
                    Fellowship is ongoing right now! Come worship with us at Edola Hotel, Leme, Abeokuta.
                  </p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-sm text-center transition-colors"
                  >
                    Get Live Directions
                  </a>
                </div>
              ) : (
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                    <div>
                      <span className="text-[11px] font-bold text-[#D4AF37] tracking-widest uppercase block">
                        NEXT SUNDAY SERVICE
                      </span>
                      <p className="text-white font-medium text-sm mt-0.5">
                        {targetLabel} • 9:00 AM
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-1 rounded-md">
                      WAT (UTC+1)
                    </span>
                  </div>

                  {/* 4 Separated Countdown Boxes with Clear Spacing */}
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-6">
                    {[
                      { label: "DAYS", value: days },
                      { label: "HRS", value: hours },
                      { label: "MIN", value: minutes },
                      { label: "SEC", value: seconds },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.06] border border-white/15 shadow-inner"
                      >
                        <span className="font-mono font-bold text-2xl sm:text-3xl text-[#D4AF37]">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] text-slate-300 font-semibold tracking-wider mt-1">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Get Directions Button Linking directly to Google Maps */}
                  <div className="pt-2 text-center">
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-sm transition-colors shadow-md text-center"
                    >
                      Get Directions to Church
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}