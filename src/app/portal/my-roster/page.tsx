"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getStoredData, DutyRoster } from "@/lib/churchData";

export default function MyRosterPage() {
  const { user } = useAuth();
  const [rosters, setRosters] = useState<DutyRoster[]>([]);

  useEffect(() => {
    const data = getStoredData();
    const myDuties = data.rosters.filter((r: DutyRoster) =>
      r.assignedMembers.some((m) => m.toLowerCase().includes(user?.name?.toLowerCase() || ""))
    );
    setRosters(myDuties.length > 0 ? myDuties : data.rosters.slice(0, 2));
  }, [user]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
          MINISTRY SERVICE
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
          My Duty Roster &amp; Schedules
        </h1>
        <p className="text-slate-300 text-sm font-light">
          View your upcoming assigned service shifts and ministration details.
        </p>
      </div>

      <div className="space-y-4">
        {rosters.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-3xl bg-[#091830] border border-white/10 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-lg">
                  📅
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {item.department} Unit Duty
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">Service Date: {item.serviceDate}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
                Sunday 9:00 AM
              </span>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Team Members On Duty:
              </p>
              <div className="flex flex-wrap gap-2">
                {item.assignedMembers.map((member) => (
                  <span
                    key={member}
                    className={`text-xs px-3 py-1.5 rounded-xl border ${
                      member.toLowerCase().includes(user?.name?.toLowerCase() || "")
                        ? "bg-[#D4AF37] text-[#0B1E3D] font-bold border-[#D4AF37]"
                        : "bg-[#0B1E3D] text-slate-300 border-white/10"
                    }`}
                  >
                    {member} {member.toLowerCase().includes(user?.name?.toLowerCase() || "") && "(You)"}
                  </span>
                ))}
              </div>
            </div>

            {item.notes && (
              <div className="p-3.5 rounded-xl bg-[#0B1E3D] border border-white/5 text-xs text-slate-300">
                <strong className="text-[#D4AF37]">Roster Notes:</strong> {item.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
