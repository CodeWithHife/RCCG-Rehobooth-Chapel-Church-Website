"use client";

import React, { useState, useEffect } from "react";
import { getMembers, saveMember, Member } from "@/lib/churchData";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminMembersPage() {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterFollowUp, setFilterFollowUp] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formRole, setFormRole] = useState<"member" | "first-timer">("member");
  const [formDept, setFormDept] = useState("Sanctuary / General");
  const [formAddress, setFormAddress] = useState("");
  const [formBirthday, setFormBirthday] = useState("");

  useEffect(() => {
    setMembers(getMembers());
  }, []);

  if (user?.role !== "admin") {
    return (
      <div className="bg-[#091830] border border-amber-500/30 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Pastor / Admin Access Only</h2>
        <p className="text-gray-400 text-sm mb-6">
          This member directory is restricted to authorized church leadership and ministers.
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

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || m.role === filterRole;
    const matchesFollowUp =
      filterFollowUp === "all" || m.followUpStatus === filterFollowUp;
    return matchesSearch && matchesRole && matchesFollowUp;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    const newMember: Member = {
      id: `mem-${Date.now()}`,
      name: formName,
      email: formEmail || `${formName.toLowerCase().replace(/\s+/g, ".")}@rehoboth.org`,
      phone: formPhone,
      role: formRole,
      department: formDept,
      joinedDate: new Date().toISOString().split("T")[0],
      birthday: formBirthday || "Jan 1",
      address: formAddress || "Abeokuta, Ogun State",
      followUpStatus: formRole === "first-timer" ? "pending" : undefined,
    };

    saveMember(newMember);
    setMembers(getMembers());
    setIsAddModalOpen(false);

    // Reset Form
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormAddress("");
    setFormBirthday("");
  };

  const updateFollowUpStatus = (member: Member, status: "pending" | "contacted" | "completed") => {
    const updated = { ...member, followUpStatus: status };
    saveMember(updated);
    setMembers(getMembers());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Member & First-Timer Directory</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage church membership records, contacts, and first-timer follow-up care.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] font-bold rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
        >
          <span>+ Add Member / First-Timer</span>
        </button>
      </div>

      {/* Summary Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#091830] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold">Total Directory</p>
          <p className="text-2xl font-bold text-white mt-1">{members.length}</p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold">Regular Members</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {members.filter((m) => m.role === "member" || m.role === "admin").length}
          </p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold">First-Timers</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {members.filter((m) => m.role === "first-timer").length}
          </p>
        </div>
        <div className="bg-[#091830] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold">Pending Follow-ups</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {members.filter((m) => m.followUpStatus === "pending").length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#091830] border border-white/10 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <input
            type="text"
            placeholder="Search by name, phone, dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Category (Members & Guests)</option>
            <option value="member">Regular Members</option>
            <option value="first-timer">First-Timers / Guests</option>
            <option value="admin">Ministers & Pastors</option>
          </select>
        </div>
        <div>
          <select
            value={filterFollowUp}
            onChange={(e) => setFilterFollowUp(e.target.value)}
            className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Follow-up Statuses</option>
            <option value="pending">Pending Follow-up</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed Integration</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-[#091830] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0B1E3D] text-xs uppercase text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Member</th>
                <th className="px-6 py-4 font-semibold">Contact & Location</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Category / Follow-Up</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{m.name}</div>
                    <div className="text-xs text-gray-400">Joined: {m.joinedDate} • Birthday: {m.birthday}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-mono text-xs">{m.phone}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">{m.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 bg-white/10 text-gray-200 rounded-lg text-xs">
                      {m.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          m.role === "first-timer"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : m.role === "admin"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {m.role === "first-timer" ? "First Timer" : m.role === "admin" ? "Minister" : "Member"}
                      </span>

                      {m.followUpStatus && (
                        <div className="flex items-center gap-1.5">
                          <select
                            value={m.followUpStatus}
                            onChange={(e) =>
                              updateFollowUpStatus(
                                m,
                                e.target.value as "pending" | "contacted" | "completed"
                              )
                            }
                            className="bg-[#0B1E3D] border border-white/15 rounded-lg px-2 py-0.5 text-xs text-gray-300 focus:outline-none"
                          >
                            <option value="pending">🟡 Pending</option>
                            <option value="contacted">🔵 Contacted</option>
                            <option value="completed">🟢 Integrated</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <a
                      href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}?text=Calvary%20greetings%20${encodeURIComponent(
                        m.name
                      )},%20wishing%20you%20God's%20abundant%20blessings%20from%20RCCG%20Rehoboth%20Chapel.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <span>💬 WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${m.phone}`}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <span>📞 Call</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#091830] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Add Person to Directory</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sister Deborah Adeleke"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as "member" | "first-timer")}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="member">Regular Church Member</option>
                    <option value="first-timer">First-Timer Guest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Department
                  </label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Choir (The Voice of Praise)">Choir (The Voice of Praise)</option>
                    <option value="Ushering & Protocol">Ushering & Protocol</option>
                    <option value="Media & Technical">Media & Technical</option>
                    <option value="Sanctuary Keepers">Sanctuary Keepers</option>
                    <option value="Follow-up & Evangelism">Follow-up & Evangelism</option>
                    <option value="Children Church Ministry">Children Church Ministry</option>
                    <option value="Sanctuary / General">Sanctuary / General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Birthday (e.g. Oct 14)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. October 14"
                    value={formBirthday}
                    onChange={(e) => setFormBirthday(e.target.value)}
                    className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leme, Abeokuta, Ogun State"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0B1E3D] rounded-xl text-sm font-bold transition"
                >
                  Save to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
