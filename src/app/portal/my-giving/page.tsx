"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getStoredData, saveToStorage, GivingRecord } from "@/lib/churchData";

const BANK_NAME = "Access Bank";
const ACCOUNT_NUMBER = "1220817306";
const ACCOUNT_NAME = "RCCG Rehoboth Chapel";

export default function MyGivingPage() {
  const { user } = useAuth();
  const [givingList, setGivingList] = useState<GivingRecord[]>([]);
  const [copied, setCopied] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form states
  const [category, setCategory] = useState<GivingRecord["category"]>("Tithe");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const data = getStoredData();
    const myRecords = data.giving.filter(
      (g: GivingRecord) =>
        g.memberId === user?.id || g.donorName.toLowerCase().includes(user?.name.toLowerCase() || "")
    );
    setGivingList(myRecords);
  }, [user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    const data = getStoredData();
    const newRecord: GivingRecord = {
      id: "giv-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      donorName: user?.name || "Church Member",
      category,
      amount: numAmount,
      method: "Bank Transfer",
      reference: reference || `TRF-${Math.floor(100000 + Math.random() * 900000)}`,
      memberId: user?.id,
    };

    const updated = [newRecord, ...data.giving];
    saveToStorage("rccg_giving", updated);
    setGivingList([newRecord, ...givingList]);
    setShowLogModal(false);
    setAmount("");
    setReference("");
  };

  const totalGiven = givingList.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
            MY STEWARDSHIP
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
            My Giving &amp; Tithes
          </h1>
          <p className="text-slate-300 text-sm font-light">
            Track your personal kingdom contributions and log recent transfer receipts.
          </p>
        </div>
        <button
          onClick={() => setShowLogModal(true)}
          className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs sm:text-sm transition-colors shadow-md"
        >
          + Log Transfer Receipt
        </button>
      </div>

      {/* Summary Banner & Church Account Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#091830] border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Total Contributions Recorded
            </span>
            <h2 className="font-mono font-bold text-3xl sm:text-4xl text-[#D4AF37] mt-2">
              ₦{totalGiven.toLocaleString()}
            </h2>
            <p className="text-xs text-slate-300 mt-2 font-light">
              "Bring ye all the tithes into the storehouse..." — Malachi 3:10
            </p>
          </div>
          <p className="text-[11px] text-slate-400 mt-4 border-t border-white/10 pt-3">
            Recorded in church treasury database for: <strong className="text-white">{user?.name}</strong>
          </p>
        </div>

        {/* Bank Card */}
        <div className="p-6 rounded-3xl bg-[#0B1E3D] border border-white/15 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Church Bank Account</span>
              <span className="text-xs font-mono text-slate-400">NGN</span>
            </div>
            <p className="text-white font-bold text-base">{BANK_NAME} · {ACCOUNT_NAME}</p>
            <p className="font-mono text-2xl font-bold text-[#D4AF37] mt-1">{ACCOUNT_NUMBER}</p>
          </div>
          <button
            onClick={handleCopy}
            className="w-full mt-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-colors"
          >
            {copied ? "✓ Account Number Copied" : "Copy Account Number"}
          </button>
        </div>
      </div>

      {/* Donation History Table */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#091830] border border-white/10 shadow-xl">
        <h3 className="font-serif font-bold text-lg text-white mb-4">Personal Giving History</h3>

        {givingList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] text-slate-400 uppercase font-mono">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {givingList.map((item) => (
                  <tr key={item.id} className="text-slate-200">
                    <td className="py-3.5 font-mono text-xs text-slate-400">{item.date}</td>
                    <td className="py-3.5 font-semibold text-white">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-[#D4AF37]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-[#D4AF37]">
                      ₦{item.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-xs text-slate-300">{item.method}</td>
                    <td className="py-3.5 font-mono text-xs text-slate-400">{item.reference || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-sm py-6 text-center">
            No personal contribution records found yet. Click "+ Log Transfer Receipt" after sending your offering.
          </p>
        )}
      </div>

      {/* Log Donation Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#091830] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-white">Log Giving Transfer Receipt</h3>
            <p className="text-slate-300 text-xs">
              Enter your transfer details so the church treasury can verify and record your seed.
            </p>

            <form onSubmit={handleLogDonation} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Giving Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0B1E3D] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm"
                >
                  <option value="Tithe">Tithe (10%)</option>
                  <option value="Sunday Offering">Sunday Offering</option>
                  <option value="Thanksgiving">Thanksgiving</option>
                  <option value="Project Rehoboth">Project Rehoboth</option>
                  <option value="Missions">Missions &amp; Outreach</option>
                  <option value="Special Seed">Special Seed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Amount (NGN) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 25000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Bank Reference / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Access Bank App Ref / Name on Transfer"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
