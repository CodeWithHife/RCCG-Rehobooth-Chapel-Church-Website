"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getStoredData, saveToStorage, PrayerRequest } from "@/lib/churchData";

export default function PrayerRequestsPage() {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<PrayerRequest["category"]>("Breakthrough");
  const [details, setDetails] = useState("");
  const [isConfidential, setIsConfidential] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const data = getStoredData();
    const myPrayers = data.prayers.filter(
      (p: PrayerRequest) =>
        p.memberId === user?.id || p.requesterName?.toLowerCase().includes(user?.name.toLowerCase() || "")
    );
    setPrayers(myPrayers);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !details) return;

    const data = getStoredData();
    const newPrayer: PrayerRequest = {
      id: "pray-" + Date.now(),
      requesterName: user?.name || "Church Member",
      phone: user?.phone || "",
      category,
      title,
      details,
      dateSubmitted: new Date().toISOString().split("T")[0],
      status: "Pending",
      isConfidential,
      memberId: user?.id,
    };

    const updated = [newPrayer, ...data.prayers];
    saveToStorage("rccg_prayers", updated);
    setPrayers([newPrayer, ...prayers]);
    setTitle("");
    setDetails("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
          INTERCESSORY ALTAR
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
          Prayer Requests &amp; Counseling
        </h1>
        <p className="text-slate-300 text-sm font-light">
          Submit confidential prayer points to Pastor Tosin Adewale and the Prayer Force.
        </p>
      </div>

      {/* Submit New Prayer Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091830] border border-white/10 shadow-xl">
        <h3 className="font-serif font-bold text-lg text-white mb-4">Submit a New Prayer Point</h3>

        {submitted && (
          <div className="mb-4 p-4 rounded-xl bg-green-600/20 border border-green-500 text-green-300 text-xs sm:text-sm font-semibold">
            ✓ Your prayer request has been delivered to the pastoral altar. We are standing in agreement with you!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Prayer Title / Need *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Divine healing, Job promotion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-white text-sm"
              >
                <option value="Breakthrough">Breakthrough &amp; Open Doors</option>
                <option value="Healing">Healing &amp; Sound Health</option>
                <option value="Family">Family &amp; Marriage</option>
                <option value="Job / Career">Job / Career &amp; Business</option>
                <option value="Spiritual Growth">Spiritual Growth</option>
                <option value="Other">Other Request</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Details &amp; Specific Petitions *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Share details so our pastors and intercessors can pray specifically according to the scriptures..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl p-3 text-white text-sm resize-none focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="confidential"
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] rounded"
            />
            <label htmlFor="confidential" className="text-xs text-slate-300 cursor-pointer">
              Keep Strictly Confidential (Visible only to Pastor Tosin Adewale)
            </label>
          </div>

          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            Send to Pastoral Altar
          </button>
        </form>
      </div>

      {/* Previous Submitted Requests */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#091830] border border-white/10 shadow-xl space-y-4">
        <h3 className="font-serif font-bold text-lg text-white">My Submitted Prayer Points</h3>

        {prayers.length > 0 ? (
          <div className="space-y-3">
            {prayers.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-[#0B1E3D] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[10px] text-[#D4AF37] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {item.category}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === "Answered"
                      ? "bg-green-600/30 text-green-300 border border-green-500"
                      : item.status === "Prayed For"
                      ? "bg-blue-600/30 text-blue-300 border border-blue-500"
                      : "bg-amber-600/30 text-amber-300 border border-amber-500"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{item.details}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                  <span>Submitted: {item.dateSubmitted}</span>
                  <span>{item.isConfidential ? "🔒 Pastoral Confidential" : "👥 General Intercession"}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-xs py-4 text-center">
            No prayer requests submitted yet. Submit a request above to stand in faith with us.
          </p>
        )}
      </div>
    </div>
  );
}
