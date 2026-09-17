"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getStoredData, saveToStorage, Testimony } from "@/lib/churchData";

export default function TestimoniesPage() {
  const { user } = useAuth();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const data = getStoredData();
    setTestimonies(data.testimonies);
  }, []);

  const handleShareTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const data = getStoredData();
    const newTestimony: Testimony = {
      id: "test-" + Date.now(),
      authorName: user?.name || "Beloved Member",
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      status: "Approved",
      likes: 1,
    };

    const updated = [newTestimony, ...data.testimonies];
    saveToStorage("rccg_testimonies", updated);
    setTestimonies(updated);
    setTitle("");
    setContent("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleLike = (id: string) => {
    const updated = testimonies.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t));
    setTestimonies(updated);
    saveToStorage("rccg_testimonies", updated);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
          PRAISE &amp; THANKSGIVING
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
          Answered Prayers &amp; Testimonies
        </h1>
        <p className="text-slate-300 text-sm font-light">
          "And they overcame him by the blood of the Lamb, and by the word of their testimony." — Revelation 12:11
        </p>
      </div>

      {/* Share Testimony Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091830] border border-white/10 shadow-xl">
        <h3 className="font-serif font-bold text-lg text-white mb-3">Share Your Praise Report</h3>

        {submitted && (
          <div className="mb-4 p-4 rounded-xl bg-green-600/20 border border-green-500 text-green-300 text-xs sm:text-sm font-semibold">
            ✓ Your testimony has been shared! To God be the glory!
          </div>
        )}

        <form onSubmit={handleShareTestimony} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Testimony Headline *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. God provided miraculous healing / Miracle job provision"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Your Story / What God Did *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Share how God manifested His grace, what prayer was answered, and give Him glory..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl p-3 text-white text-sm resize-none focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            Post Testimony
          </button>
        </form>
      </div>

      {/* Community Testimonies Stream */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg text-white">Recent Praise Reports</h3>
        {testimonies.map((t) => (
          <div key={t.id} className="p-6 rounded-3xl bg-[#091830] border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base sm:text-lg text-white text-[#D4AF37]">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-400">By {t.authorName} · {t.date}</p>
              </div>
              <button
                onClick={() => handleLike(t.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
              >
                <span>❤️ Amen!</span>
                <span className="font-bold text-[#D4AF37]">{t.likes}</span>
              </button>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed font-light">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
