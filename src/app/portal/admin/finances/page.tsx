"use client";

import React, { useState, useEffect } from "react";
import { getFinances, saveFinanceRecord, FinanceRecord } from "@/lib/churchData";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminFinancesPage() {
  const { user } = useAuth();
  const [finances, setFinances] = useState<FinanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Form State
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState(25000);
  const [type, setType] = useState<"tithe" | "offering" | "thanksgiving" | "project" | "welfare">("tithe");
  const [paymentMethod, setPaymentMethod] = useState<"bank-transfer" | "pos" | "cash">("bank-transfer");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [reference, setReference] = useState("");

  useEffect(() => {
    setFinances(getFinances());
  }, []);

  if (user?.role !== "admin") {
    return (
      <div className="bg-[#091830] border border-amber-500/30 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Pastor / Admin Access Only</h2>
        <p className="text-gray-400 text-sm mb-6">
          Church financial ledgers and giving data are strictly restricted to church leadership.
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

  const filteredFinances = finances.filter((f) => {
    const matchesSearch =
      f.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.reference && f.reference.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || f.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalIncome = finances.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTithes = finances
    .filter((f) => f.type === "tithe")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalOfferings = finances
    .filter((f) => f.type === "offering" || f.type === "thanksgiving")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalProjects = finances
    .filter((f) => f.type === "project" || f.type === "welfare")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: FinanceRecord = {
      id: `fin-${Date.now()}`,
      donorName: donorName || "Anonymous Giver",
      amount,
      type,
      paymentMethod,
      date,
      reference: reference || `MANUAL-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "confirmed",
    };

    saveFinanceRecord(newRecord);
    setFinances(getFinances());
    setIsRecordModalOpen(false);

    // Reset Form
    setDonorName("");
    setAmount(25000);
    setReference("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Finances & Giving Ledger</h1>
          <p className="text-gray-400 text-sm mt-1">
            Reconcile tithes, Sunday offerings, thanksgiving seeds, and church project funds.
          </p>
        </div>
        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] font-bold rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
        >
          <span>+ Record Offering / Tithe</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-semibold text-gray-400">Total Church Inflow</p>
          <p className="text-2xl font-extrabold text-[#D4AF37] mt-1">
            ₦{totalIncome.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-2">All categories reconciled</p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-semibold text-gray-400">Tithes Total</p>
          <p className="text-2xl font-extrabold text-blue-400 mt-1">
            ₦{totalTithes.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-2">10% covenant offerings</p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-semibold text-gray-400">Offerings & Praise Seeds</p>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">
            ₦{totalOfferings.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-2">Sunday & Midweek giving</p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-semibold text-gray-400">Building & Welfare</p>
          <p className="text-2xl font-extrabold text-purple-400 mt-1">
            ₦{totalProjects.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-2">Special church causes</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-[#091830] border border-white/10 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            placeholder="Search donor name or transaction ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Contribution Types</option>
            <option value="tithe">Tithes</option>
            <option value="offering">Offerings</option>
            <option value="thanksgiving">Thanksgiving Offerings</option>
            <option value="project">Building / Project Fund</option>
            <option value="welfare">Welfare & Needy Fund</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#091830] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0B1E3D] text-xs uppercase text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Date & Reference</th>
                <th className="px-6 py-4 font-semibold">Donor / Member</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Payment Channel</th>
                <th className="px-6 py-4 font-semibold text-right">Amount (₦)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFinances.map((f) => (
                <tr key={f.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{f.date}</div>
                    <div className="text-xs font-mono text-gray-400">{f.reference || "N/A"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{f.donorName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold uppercase ${
                        f.type === "tithe"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : f.type === "offering"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : f.type === "project"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {f.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-300 capitalize">
                    {(f.paymentMethod || f.method || "bank-transfer").replace("-", " ")}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-white text-base">
                    ₦{f.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#091830] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Record Contribution</h3>
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Donor / Member Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sister Blessing Adeleke (or leave blank for Anonymous)"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Amount (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    step="500"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Giving Category
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(
                        e.target.value as "tithe" | "offering" | "thanksgiving" | "project" | "welfare"
                      )
                    }
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="tithe">Tithe (10%)</option>
                    <option value="offering">Sunday / Midweek Offering</option>
                    <option value="thanksgiving">Thanksgiving Offering</option>
                    <option value="project">Building / Expansion Fund</option>
                    <option value="welfare">Welfare & Outreach Seed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value as "bank-transfer" | "pos" | "cash"
                      )
                    }
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="bank-transfer">Direct Bank Transfer</option>
                    <option value="pos">Church POS Machine</option>
                    <option value="cash">Cash in Envelope</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Date Received
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Reference / Teller Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. TRF-2026-99238"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] rounded-xl text-sm font-bold transition"
                >
                  Save Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
