"use client";

import React, { useState, useEffect } from "react";
import { getRosters, saveRoster, RosterAssignment, getMembers } from "@/lib/churchData";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminRosterPage() {
  const { user } = useAuth();
  const [rosters, setRosters] = useState<RosterAssignment[]>([]);
  const [members, setMembers] = useState<{ name: string; phone: string; department: string }[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Form State
  const [serviceDate, setServiceDate] = useState("2026-09-20");
  const [serviceName, setServiceName] = useState("Sunday Celebration Service");
  const [memberName, setMemberName] = useState("");
  const [department, setDepartment] = useState("Choir (The Voice of Praise)");
  const [role, setRole] = useState("Praise & Worship Leader");
  const [notes, setNotes] = useState("Soundcheck at 7:45 AM");

  useEffect(() => {
    setRosters(getRosters());
    setMembers(getMembers());
    if (getMembers().length > 0) {
      setMemberName(getMembers()[0].name);
    }
  }, []);

  if (user?.role !== "admin") {
    return (
      <div className="bg-[#091830] border border-amber-500/30 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Pastor / Admin Access Only</h2>
        <p className="text-gray-400 text-sm mb-6">
          Duty roster planning and departmental scheduling are restricted to church leadership.
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

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAssignment: RosterAssignment = {
      id: `rst-${Date.now()}`,
      serviceDate,
      serviceName,
      memberName: memberName || "Sister Blessing Adeleke",
      department,
      role,
      status: "confirmed",
      notes,
    };

    saveRoster(newAssignment);
    setRosters(getRosters());
    setIsAssignModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Duty Roster Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Schedule department volunteers, ministers, choir, and technical crew for upcoming services.
          </p>
        </div>
        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] font-bold rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
        >
          <span>+ Assign Duty Shift</span>
        </button>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rosters.map((rst) => (
          <div
            key={rst.id}
            className="bg-[#091830] border border-white/10 rounded-2xl p-5 space-y-4 hover:border-[#D4AF37]/50 transition shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 bg-white/10 text-gray-300 rounded-lg text-xs font-semibold">
                  {rst.department}
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ● {rst.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mt-3">{rst.role}</h3>
              <p className="text-sm font-semibold text-[#D4AF37] mt-0.5">{rst.memberName}</p>

              <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📅 Service:</span>
                  <span className="text-white font-medium">{rst.serviceName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🕒 Date:</span>
                  <span className="text-white font-medium">{rst.serviceDate}</span>
                </div>
                {rst.notes && (
                  <div className="flex items-start gap-2 pt-1">
                    <span className="text-gray-400">📝 Notes:</span>
                    <span className="text-gray-300 italic">{rst.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <a
                href={`https://wa.me/?text=Calvary%20greetings%20${encodeURIComponent(
                  rst.memberName
                )},%20this%20is%20a%20reminder%20of%20your%20duty%20assignment%20as%20*${encodeURIComponent(
                  rst.role
                )}*%20for%20${encodeURIComponent(rst.serviceName)}%20on%20${encodeURIComponent(
                  rst.serviceDate
                )}.%20God%20bless%20you!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold text-center transition inline-flex items-center justify-center gap-1.5"
              >
                <span>💬 WhatsApp Reminder</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#091830] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Assign Duty Shift</h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Assign To Member *
                </label>
                <select
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                >
                  {members.map((m, idx) => (
                    <option key={idx} value={m.name}>
                      {m.name} ({m.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Choir (The Voice of Praise)">Choir (The Voice of Praise)</option>
                    <option value="Ushering & Protocol">Ushering & Protocol</option>
                    <option value="Media & Technical">Media & Technical</option>
                    <option value="Sanctuary Keepers">Sanctuary Keepers</option>
                    <option value="Children Church Ministry">Children Church Ministry</option>
                    <option value="Follow-up & Evangelism">Follow-up & Evangelism</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Role / Assignment
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Vocals / Sound Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Service Date
                  </label>
                  <input
                    type="date"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Briefing / Arrival Time Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Soundcheck at 7:45 AM sharp"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] rounded-xl text-sm font-bold transition"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
