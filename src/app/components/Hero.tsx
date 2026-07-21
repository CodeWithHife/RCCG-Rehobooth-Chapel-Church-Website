// src/app/components/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const heroImages = ["/hero/img1.jpg", "/hero/img2.jpg", "/hero/img3.jpg"];

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
  const [showMobilePopup, setShowMobilePopup] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  // Show the mobile popup shortly after load
  useEffect(() => {
    const timer = setTimeout(() => setShowMobilePopup(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 -z-10">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt="Worship service"
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[#0B1E3D]/70" />
      </div>

      {/* Mobile Popup */}
      <div
        className={`md:hidden fixed top-20 left-4 right-4 z-40 transition-all duration-500 ease-out ${
          showMobilePopup ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-br from-[#3a0f3f]/95 via-[#4a1a52]/95 to-[#2a1454]/95 backdrop-blur-md border border-white/20 rounded-xl px-5 py-4 shadow-lg shadow-black/40 flex items-center justify-between gap-3">
          {ongoing ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <p className="text-white text-sm font-medium">
                Service is <span className="text-[#D4AF37] font-semibold">ongoing</span> — join us now!
              </p>
            </div>
          ) : (
            <div className="flex-1">
              <p className="text-[#D4AF37] text-[10px] tracking-widest font-semibold mb-1">
                DON'T MISS CHURCH
              </p>
              <p className="text-white text-sm">
                Service starts in{" "}
                <span className="font-bold">
                  {days}d {hours}h {minutes}m
                </span>
              </p>
            </div>
          )}
          <button
            onClick={() => setShowMobilePopup(false)}
            aria-label="Dismiss"
            className="text-white/70 hover:text-white text-lg shrink-0 leading-none"
          >
            ✕
          </button>
        </div>
      </div>

      <section className="px-6 md:px-16 pt-16 md:pt-24 pb-32 max-w-5xl">
        {/* Desktop Countdown / Ongoing Card */}
        <div className="hidden md:block absolute top-24 right-16 bg-gradient-to-br from-[#3a0f3f]/80 via-[#4a1a52]/80 to-[#2a1454]/80 backdrop-blur-md border border-white/20 rounded-xl px-8 py-6 text-center shadow-lg shadow-black/30">
          {ongoing ? (
            <>
              <span className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-[#D4AF37] text-xs tracking-widest font-semibold">
                  LIVE NOW
                </p>
              </span>
              <p className="text-white text-sm font-medium">
                Service is ongoing — join us!
              </p>
            </>
          ) : (
            <>
              <p className="text-[#D4AF37] text-xs tracking-widest font-semibold mb-2">
                NEXT SUNDAY SERVICE
              </p>
              <p className="text-white text-sm mb-4">{targetLabel} • 9:00 AM</p>
              <div className="flex gap-4 text-white">
                {[
                  { label: "DAYS", value: days },
                  { label: "HRS", value: hours },
                  { label: "MIN", value: minutes },
                  { label: "SEC", value: seconds },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{String(item.value).padStart(2, "0")}</span>
                    <span className="text-[10px] text-gray-300 tracking-wide">{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Headline */}
        <h1 className="font-serif font-bold text-5xl md:text-6xl leading-tight text-white mt-10">
          RCCG REHOBOTH <br />
          <span className="text-[#D4AF37]">CHAPEL</span>
        </h1>

        {/* Quote */}
        <p className="text-[#D4AF37] italic mt-10 text-lg">" Room for More "</p>

        {/* Description */}
        <p className="text-gray-200 mt-6 max-w-xl leading-relaxed">
          Founded in April 2016, we are a family of believers committed to holiness,
          worship, and reaching every nation for the Lord Jesus Christ. You are welcome —
          there is room for you here.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-10">
          <Link
            href="/programs"
            className="flex-1 sm:flex-none sm:w-48 text-center bg-[#D4AF37] text-[#0B1E3D] font-bold px-6 py-3 rounded-full shadow-md shadow-black/30 hover:bg-[#c29d2e] hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Our Programs
          </Link>
          <Link
            href="/give"
            className="flex-1 sm:flex-none sm:w-48 text-center border border-white/70 text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[#0B1E3D] hover:-translate-y-0.5 transition-all duration-300"
          >
            Give
          </Link>
        </div>
      </section>
    </main>
  );
}