"use client";

import React, { useState, useEffect } from "react";
import { getBroadcasts, saveBroadcast, BroadcastMessage, getMembers } from "@/lib/churchData";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const PRESET_TEMPLATES = [
  {
    name: "Sunday Service Invitation",
    audience: "All Church Members & Guests",
    message:
      "Calvary greetings beloved! Join us this Sunday for an encounter with God at RCCG Rehoboth Chapel. Time: 9:00 AM. Venue: Edola Hotel, Leme, Abeokuta. Come expectant, your Rehoboth awaits you!",
  },
  {
    name: "Midweek Faith Clinic / Digging Deep",
    audience: "All Church Members",
    message:
      "Dear beloved, don't miss our Midweek Service & Digging Deep today by 5:00 PM. Come with your Bible and notebook as we feast upon the Word of Life at RCCG Rehoboth Chapel.",
  },
  {
    name: "First-Timer Warm Welcome",
    audience: "First-Time Visitors",
    message:
      "Beloved Friend, thank you for worshipping with us at RCCG Rehoboth Chapel! We pray that the Lord opens up broad spaces of favor for you. If you have any prayer request, kindly reply to this message. You are always welcome!",
  },
  {
    name: "Birthday Blessing",
    audience: "Birthday Celebrants",
    message:
      "Happy Birthday to our dear brother/sister! On behalf of Pastor Tosin Adewale and the entire Rehoboth Chapel family, we pray that your new year brings greater heights and supernatural speed. Keep flourishing in Jesus' name!",
  },
];

export default function AdminBroadcastPage() {
  const { user } = useAuth();
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([]);
  const [title, setTitle] = useState("Sunday Service Reminder");
  const [audience, setAudience] = useState("All Church Members");
  const [channel, setChannel] = useState<"whatsapp" | "sms" | "email">("whatsapp");
  const [message, setMessage] = useState(PRESET_TEMPLATES[0].message);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBroadcasts(getBroadcasts());
  }, []);

  if (user?.role !== "admin") {
    return (
      <div className="bg-[#091830] border border-amber-500/30 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Pastor / Admin Access Only</h2>
        <p className="text-gray-400 text-sm mb-6">
          Broadcast messaging is restricted to church leadership and media administrators.
        </p>
        <Link
          href="/portal"
          className="px-5 py-2.5 bg-[#D4AF37] text-[#0B1E3D] font-bold rounded-xl text-sm inline-block"
        >
          Return to Member Portal
        </Link>
      </div>
    );
  }

  const handleApplyTemplate = (tpl: typeof PRESET_TEMPLATES[0]) => {
    setTitle(tpl.name);
    setAudience(tpl.audience);
    setMessage(tpl.message);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newBroadcast: BroadcastMessage = {
      id: `bc-${Date.now()}`,
      title,
      audience,
      channel,
      message,
      sentDate: new Date().toISOString().split("T")[0],
      status: "sent",
    };

    saveBroadcast(newBroadcast);
    setBroadcasts(getBroadcasts());

    // Open WhatsApp Web with text prepared
    const waUrl = `https://wa.me/?text=${encodeURIComponent(`*${title}*\n\n${message}`)}`;
    window.open(waUrl, "_blank");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">WhatsApp & SMS Broadcast Center</h1>
        <p className="text-gray-400 text-sm mt-1">
          Compose and dispatch church announcements, service reminders, and first-timer follow-ups.
        </p>
      </div>

      {/* Quick Template Picker */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Quick Message Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_TEMPLATES.map((tpl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyTemplate(tpl)}
              className="text-left bg-[#091830] hover:bg-[#0B1E3D] border border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-3.5 transition group"
            >
              <p className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                {tpl.name}
              </p>
              <p className="text-xs text-gray-400 mt-1 truncate">{tpl.audience}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Broadcast Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#091830] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl">
          <h3 className="text-lg font-bold text-white">Compose Message</h3>

          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Broadcast Title / Subject
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Broadcast Channel
              </label>
              <div className="flex gap-4 text-sm text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === "whatsapp"}
                    onChange={() => setChannel("whatsapp")}
                    className="accent-[#D4AF37]"
                  />
                  <span>WhatsApp Broadcast (Instant)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === "sms"}
                    onChange={() => setChannel("sms")}
                    className="accent-[#D4AF37]"
                  />
                  <span>Direct Bulk SMS</span>
                </label>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Message Content ({message.length} chars)
                </label>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="text-xs text-[#D4AF37] hover:underline"
                >
                  {copied ? "Copied to clipboard!" : "Copy Text"}
                </button>
              </div>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>💬 Launch WhatsApp Broadcast</span>
              </button>
              <button
                type="button"
                onClick={handleCopyText}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm transition"
              >
                Copy Message
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Screen */}
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col">
          <h3 className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
            WhatsApp Live Preview
          </h3>
          <div className="flex-1 bg-[#051120] border border-white/10 rounded-xl p-4 flex flex-col justify-end">
            <div className="bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-sm ml-auto space-y-2 shadow">
              <p className="font-bold text-amber-200">*{title}*</p>
              <p className="whitespace-pre-wrap">{message || "Your broadcast text will appear here..."}</p>
              <div className="text-right text-[10px] text-gray-300">Just now ✓✓</div>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Preview reflects what recipients receive on their phone or WhatsApp community.
          </div>
        </div>
      </div>

      {/* Broadcast History Table */}
      <div className="bg-[#091830] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-base font-bold text-white">Broadcast History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0B1E3D] text-xs uppercase text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Title & Channel</th>
                <th className="px-6 py-4 font-semibold">Audience</th>
                <th className="px-6 py-4 font-semibold">Message Preview</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {broadcasts.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4 text-xs font-mono">{b.sentDate}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{b.title}</div>
                    <span className="text-xs text-emerald-400 font-semibold uppercase">
                      {b.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">{b.audience}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 max-w-sm truncate">
                    {b.message}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-semibold">
                      Sent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
