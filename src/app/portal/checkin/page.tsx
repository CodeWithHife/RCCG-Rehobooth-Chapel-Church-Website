"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function MemberCheckInPage() {
  const { user } = useAuth();
  const [checkedIn, setCheckedIn] = useState(false);
  const [serviceType, setServiceType] = useState("Sunday Celebration Service (9:00 AM)");
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [notes, setNotes] = useState("");

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckedIn(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Service Attendance Check-In</h1>
        <p className="text-gray-400 text-sm mt-1">
          Check in yourself and family for today&apos;s service at RCCG Rehoboth Chapel.
        </p>
      </div>

      {checkedIn ? (
        <div className="bg-[#091830] border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-white">You Are Checked In!</h2>
          <p className="text-gray-300 max-w-md mx-auto">
            Welcome to worship, <span className="text-[#D4AF37] font-semibold">{user?.name || "Beloved"}</span>. May God richly bless and minister to you today in Jesus&apos; name.
          </p>
          <div className="bg-[#0B1E3D] rounded-xl p-4 text-xs text-gray-300 text-left space-y-2 border border-white/5 max-w-sm mx-auto">
            <div className="flex justify-between">
              <span className="text-gray-400">Service:</span>
              <span className="font-semibold text-white">{serviceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="font-semibold text-white">{serviceDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Count:</span>
              <span className="font-semibold text-white">{attendeesCount} Person(s)</span>
            </div>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCheckedIn(false)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-semibold transition"
            >
              Check In Another Person
            </button>
            <Link
              href="/portal"
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] rounded-xl text-sm font-bold transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleCheckIn} className="bg-[#091830] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Member Name
              </label>
              <input
                type="text"
                disabled
                value={user?.name || "Guest Attendee"}
                className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium opacity-80 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Select Service
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="Sunday Celebration Service (9:00 AM)">Sunday Celebration Service (9:00 AM)</option>
                <option value="Midweek Faith Clinic / Digging Deep (Wednesday 5:00 PM)">Midweek Faith Clinic / Digging Deep (Wednesday 5:00 PM)</option>
                <option value="Monthly Holy Ghost Service (1st Friday)">Monthly Holy Ghost Service (1st Friday)</option>
                <option value="Special Thanksgiving Service">Special Thanksgiving Service</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Number of People Checking In
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={attendeesCount}
                  onChange={(e) => setAttendeesCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Note / Prayer Topic for Ushers (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Attending with 2 first-time visitors from my office"
                className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
          >
            <span>✓ Confirm Service Check-In</span>
          </button>
        </form>
      )}
    </div>
  );
}
