"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PortalLoginPage() {
  const { loginAs } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.toLowerCase().includes("pastor") || identifier.toLowerCase().includes("admin")) {
      loginAs("admin");
    } else {
      loginAs("member");
    }
    router.push("/portal");
  };

  const handleQuickLogin = (role: "admin" | "member", memberId?: string) => {
    loginAs(role, memberId);
    router.push("/portal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#0B1E3D]">
      <div className="w-full max-w-md bg-[#091830] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Image
              src="/logo.png"
              alt="RCCG Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Church Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
            RCCG Rehoboth Chapel · Member &amp; Pastor Portal
          </p>
        </div>

        {/* 1-Click Quick Demo Login Section */}
        <div className="mb-8 p-4 rounded-2xl bg-[#0B1E3D] border border-[#D4AF37]/30">
          <p className="text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase mb-3 text-center">
            🚀 1-Click Instant Demo Login
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleQuickLogin("admin")}
              className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs flex items-center justify-between transition-colors shadow-md"
            >
              <span>👑 Pastor Tosin Adewale</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Admin Dashboard</span>
            </button>
            <button
              onClick={() => handleQuickLogin("member", "mem-2")}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-between transition-colors shadow-md"
            >
              <span>👤 Sister Blessing Adeyemi</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Member Hub</span>
            </button>
            <button
              onClick={() => handleQuickLogin("member", "mem-3")}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-between transition-colors border border-slate-700"
            >
              <span>👤 Brother Samuel Okon</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Ushering Member</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#091830] px-3 text-[11px] text-slate-400 uppercase tracking-widest font-mono">
            OR LOGIN WITH
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number or Email
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. 08012345678 or you@gmail.com"
              className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password / Passcode
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-sm tracking-wide transition-colors mt-2"
          >
            Sign In to Portal
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-slate-400 hover:text-[#D4AF37] transition-colors"
          >
            &larr; Return to Church Website
          </Link>
        </div>
      </div>
    </div>
  );
}
