"use client";

import React, { useState, useEffect } from "react";
import { getAttendance, saveAttendance, AttendanceRecord } from "@/lib/churchData";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminAttendancePage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Form State
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [serviceType, setServiceType] = useState("Sunday Celebration Service");
  const [men, setMen] = useState(45);
  const [women, setWomen] = useState(62);
  const [teens, setTeens] = useState(24);
  const [children, setChildren] = useState(38);
  const [firstTimers, setFirstTimers] = useState(6);
  const [preacher, setPreacher] = useState("Pastor Tosin Adewale");
  const [notes, setNotes] = useState("Theme: The Lord Shall Make Room For You");

  useEffect(() => {
    setRecords(getAttendance());
  }, []);

  if (user?.role !== "admin") {
    return (
      <div className="bg-[#091830] border border-amber-500/30 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Pastor / Admin Access Only</h2>
        <p className="text-gray-400 text-sm mb-6">
          Attendance records and analytics are restricted to church leadership.
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

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const total = men + women + teens + children;
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      date,
      serviceType,
      men,
      women,
      teens,
      children,
      total,
      firstTimers,
      preacher,
      notes,
    };

    saveAttendance(newRecord);
    setRecords(getAttendance());
    setIsLogModalOpen(false);
  };

  const totalHeadcountAllTime = records.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalFirstTimersAllTime = records.reduce((acc, curr) => acc + (curr.firstTimers || 0), 0);
  const avgAttendance = records.length ? Math.round(totalHeadcountAllTime / records.length) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Service Attendance & Headcount</h1>
          <p className="text-gray-400 text-sm mt-1">
            Track Sunday and Midweek service attendance statistics and growth metrics.
          </p>
        </div>
        <button
          onClick={() => setIsLogModalOpen(true)}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] font-bold rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
        >
          <span>+ Log Service Headcount</span>
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-semibold text-gray-400">Latest Sunday Total</p>
          <p className="text-3xl font-extrabold text-white mt-1">
            {records[0]?.total || 0} <span className="text-sm font-normal text-emerald-400">worshippers</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Service: {records[0]?.serviceType || "N/A"} ({records[0]?.date || "N/A"})
          </p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-semibold text-gray-400">Average Attendance</p>
          <p className="text-3xl font-extrabold text-[#D4AF37] mt-1">{avgAttendance}</p>
          <p className="text-xs text-gray-400 mt-2">Calculated across recorded services</p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-2xl p-5">
          <p className="text-xs uppercase font-semibold text-gray-400">Total First-Timers Harvest</p>
          <p className="text-3xl font-extrabold text-blue-400 mt-1">{totalFirstTimersAllTime}</p>
          <p className="text-xs text-gray-400 mt-2">New souls recorded this period</p>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-[#091830] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-base font-bold text-white">Recorded Services</h2>
          <span className="text-xs text-gray-400 font-medium">{records.length} Service(s) on record</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0B1E3D] text-xs uppercase text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Service & Date</th>
                <th className="px-6 py-4 font-semibold">Men / Women</th>
                <th className="px-6 py-4 font-semibold">Teens / Children</th>
                <th className="px-6 py-4 font-semibold">First-Timers</th>
                <th className="px-6 py-4 font-semibold">Total Headcount</th>
                <th className="px-6 py-4 font-semibold">Minister / Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{r.serviceType}</div>
                    <div className="text-xs text-gray-400">{r.date}</div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div>👨 Men: <span className="font-semibold text-white">{r.men}</span></div>
                    <div>👩 Women: <span className="font-semibold text-white">{r.women}</span></div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div>🧑 Teens: <span className="font-semibold text-white">{r.teens}</span></div>
                    <div>🧒 Children: <span className="font-semibold text-white">{r.children}</span></div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold">
                      +{r.firstTimers} Souls
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-extrabold text-[#D4AF37]">{r.total}</span>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="text-white font-medium">{r.preacher || "Pastor in charge"}</div>
                    <div className="text-gray-400 truncate max-w-xs">{r.notes}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Headcount Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#091830] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Log Service Attendance</h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAttendance} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Service Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Service Type
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Sunday Celebration Service">Sunday Celebration Service</option>
                    <option value="Wednesday Faith Clinic">Wednesday Faith Clinic</option>
                    <option value="Monthly Holy Ghost Service">Monthly Holy Ghost Service</option>
                    <option value="Special Thanksgiving Service">Special Thanksgiving Service</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0B1E3D] p-4 rounded-xl border border-white/5">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Men</label>
                  <input
                    type="number"
                    min="0"
                    value={men}
                    onChange={(e) => setMen(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#091830] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Women</label>
                  <input
                    type="number"
                    min="0"
                    value={women}
                    onChange={(e) => setWomen(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#091830] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Teens</label>
                  <input
                    type="number"
                    min="0"
                    value={teens}
                    onChange={(e) => setTeens(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#091830] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Children</label>
                  <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#091830] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    First-Timers Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={firstTimers}
                    onChange={(e) => setFirstTimers(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Preacher / Minister
                  </label>
                  <input
                    type="text"
                    value={preacher}
                    onChange={(e) => setPreacher(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Sermon Notes / Theme
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                <span className="text-xs text-gray-300">Total Calculated Headcount: </span>
                <span className="text-lg font-bold text-emerald-400 ml-1">{men + women + teens + children} Worshippers</span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] rounded-xl text-sm font-bold transition"
                >
                  Save Attendance Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
