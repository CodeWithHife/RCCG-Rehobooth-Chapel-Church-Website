"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getStoredData, Member, AttendanceRecord, GivingRecord, DutyRoster } from "@/lib/churchData";

export default function PortalDashboard() {
  const { user, role } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(getStoredData());
  }, []);

  if (!data) return <div className="p-8 text-center text-slate-400">Loading Church Portal...</div>;

  // MEMBER VIEW DASHBOARD
  if (role === "member") {
    const myRosters = data.rosters.filter((r: DutyRoster) =>
      r.assignedMembers.some((m) => m.toLowerCase().includes(user?.name?.toLowerCase() || ""))
    );
    const myPrayers = data.prayers.filter((p: any) =>
      p.memberId === user?.id || p.requesterName?.toLowerCase().includes(user?.name?.toLowerCase() || "")
    );
    const myGiving = data.giving.filter((g: any) =>
      g.memberId === user?.id || g.donorName?.toLowerCase().includes(user?.name?.toLowerCase() || "")
    );
    const totalGiven = myGiving.reduce((acc: number, curr: any) => acc + curr.amount, 0);

    return (
      <div className="space-y-8">
        {/* Top Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1E3D] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
              MEMBER ACCESS HUB
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1 font-light">
              Department: <strong className="text-white">{user?.department || "General Member"}</strong> · RCCG Rehoboth Chapel
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/portal/checkin"
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs sm:text-sm transition-colors shadow-md"
            >
              📍 Sunday Check-In
            </Link>
            <Link
              href="/portal/prayer-requests"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-colors"
            >
              🙏 Request Prayer
            </Link>
          </div>
        </div>

        {/* Member KPI Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#091830] border border-white/10 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">My Total Giving</span>
              <span className="text-xl">💰</span>
            </div>
            <p className="font-mono font-bold text-2xl text-[#D4AF37]">
              ₦{totalGiven.toLocaleString()}
            </p>
            <Link href="/portal/my-giving" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
              View donation records &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[#091830] border border-white/10 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duty Assignments</span>
              <span className="text-xl">📅</span>
            </div>
            <p className="font-mono font-bold text-2xl text-white">
              {myRosters.length} Active
            </p>
            <Link href="/portal/my-roster" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
              View roster schedule &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[#091830] border border-white/10 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prayer Points</span>
              <span className="text-xl">🙏</span>
            </div>
            <p className="font-mono font-bold text-2xl text-white">
              {myPrayers.length} Submitted
            </p>
            <Link href="/portal/prayer-requests" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
              View pastoral notes &rarr;
            </Link>
          </div>
        </div>

        {/* Next Service & Duty Roster Card */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#091830] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif font-bold text-lg text-white">Upcoming Service</h3>
              <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                SUNDAY 9:00 AM
              </span>
            </div>
            <p className="text-slate-300 text-sm font-light">
              Celebration &amp; Power Service at Edola Hotel, Leme, Abeokuta. Come expectant for word, worship, and miracles.
            </p>
            <div className="p-4 rounded-xl bg-[#0B1E3D] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#D4AF37] font-bold">VENUE LOCATION</p>
                <p className="text-white text-sm">Edola Hotel, Leme, Abeokuta</p>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Edola+Hotel,+Leme,+Abeokuta,+Ogun+State"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0B1E3D] font-bold text-xs"
              >
                Directions
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#091830] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif font-bold text-lg text-white">My Duty Roster</h3>
              <Link href="/portal/my-roster" className="text-xs text-[#D4AF37] hover:underline font-semibold">
                See all
              </Link>
            </div>
            {myRosters.length > 0 ? (
              myRosters.map((roster: DutyRoster) => (
                <div key={roster.id} className="p-4 rounded-xl bg-[#0B1E3D] border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase">{roster.department}</span>
                    <span className="text-xs text-slate-300 font-mono">{roster.serviceDate}</span>
                  </div>
                  <p className="text-white text-xs mt-1 font-medium">{roster.notes || "Standard Sunday Service Assignment"}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-xs py-4 text-center">
                No active duty assignment for this week. Enjoy fellowship!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ADMIN / PASTOR VIEW DASHBOARD
  const totalMembers = data.members.filter((m: Member) => m.status !== "First-Timer").length;
  const totalFirstTimers = data.members.filter((m: Member) => m.status === "First-Timer").length;
  const lastAttendance = data.attendance[0]?.total || 0;
  const totalIncome = data.giving.reduce((acc: number, curr: GivingRecord) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1E3D] border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
            CHURCH EXECUTIVE MANAGEMENT
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
            Pastor / Admin Dashboard 👑
          </h1>
          <p className="text-slate-300 text-sm mt-1 font-light">
            RCCG Rehoboth Chapel · Operations, Records &amp; Pastoral Pipeline
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/portal/admin/attendance"
            className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs sm:text-sm transition-colors shadow-md"
          >
            + Log Attendance
          </Link>
          <Link
            href="/portal/admin/members"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-colors"
          >
            + Add Member / Visitor
          </Link>
          <Link
            href="/portal/admin/broadcast"
            className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            📢 WhatsApp Broadcast
          </Link>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#091830] border border-white/10 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Members</span>
            <span className="text-xl">👥</span>
          </div>
          <p className="font-mono font-bold text-3xl text-white">{totalMembers}</p>
          <Link href="/portal/admin/members" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
            View directory &rarr;
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-[#091830] border border-white/10 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">First-Timers</span>
            <span className="text-xl">🌟</span>
          </div>
          <p className="font-mono font-bold text-3xl text-[#D4AF37]">{totalFirstTimers}</p>
          <Link href="/portal/admin/members?filter=First-Timer" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
            Follow-up pipeline &rarr;
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-[#091830] border border-white/10 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Headcount</span>
            <span className="text-xl">📊</span>
          </div>
          <p className="font-mono font-bold text-3xl text-white">{lastAttendance}</p>
          <Link href="/portal/admin/attendance" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
            Attendance trends &rarr;
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-[#091830] border border-white/10 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recorded Giving</span>
            <span className="text-xl">💵</span>
          </div>
          <p className="font-mono font-bold text-3xl text-[#D4AF37]">
            ₦{totalIncome.toLocaleString()}
          </p>
          <Link href="/portal/admin/finances" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
            Financial ledger &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Activity & Follow-Up Pipeline */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* First-Timers Follow-Up Alert List (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#091830] border border-white/10">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <h3 className="font-serif font-bold text-lg text-white">First-Timer Follow-Up Pipeline</h3>
            <Link href="/portal/admin/members" className="text-xs text-[#D4AF37] font-semibold hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {data.members
              .filter((m: Member) => m.status === "First-Timer")
              .map((ft: Member) => (
                <div key={ft.id} className="p-4 rounded-xl bg-[#0B1E3D] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white text-sm">{ft.name}</p>
                    <p className="text-xs text-slate-400">Phone: {ft.phone} · Joined: {ft.joinedDate}</p>
                    <p className="text-xs text-[#D4AF37] mt-0.5">Notes: {ft.notes || "No notes yet"}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {ft.followUpStatus || "New"}
                    </span>
                    <a
                      href={`https://wa.me/${ft.phone}?text=${encodeURIComponent(
                        `Hello ${ft.name}, on behalf of Pastor Tosin and RCCG Rehoboth Chapel, we want to warmly thank you for worshipping with us! How was your week?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-xs"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Sunday Giving Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#091830] border border-white/10">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <h3 className="font-serif font-bold text-lg text-white">Recent Income Entries</h3>
            <Link href="/portal/admin/finances" className="text-xs text-[#D4AF37] font-semibold hover:underline">
              View ledger
            </Link>
          </div>

          <div className="space-y-3">
            {data.giving.slice(0, 4).map((item: GivingRecord) => (
              <div key={item.id} className="p-3 rounded-xl bg-[#0B1E3D] border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#D4AF37] uppercase">{item.category}</p>
                  <p className="text-white text-xs truncate max-w-[160px]">{item.donorName}</p>
                  <span className="text-[10px] text-slate-400">{item.date} · {item.method}</span>
                </div>
                <span className="font-mono font-bold text-sm text-white">
                  ₦{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
