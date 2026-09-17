"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function MyProfilePage() {
  const { user, updateCurrentUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const [department, setDepartment] = useState(user?.department || "Choir");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      phone,
      address,
      birthday,
      department,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
          MEMBER PROFILE
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
          My Personal Profile
        </h1>
        <p className="text-slate-300 text-sm font-light">
          Keep your church contact details, birthday, and ministry department up to date.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#091830] border border-white/10 shadow-xl">
        {saved && (
          <div className="mb-6 p-4 rounded-xl bg-green-600/20 border border-green-500 text-green-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
            ✓ Your profile details have been successfully saved and updated in the church registry!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Birthday (for pastoral blessings)
              </label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Residential Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Kuto, Abeokuta"
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Active Department / Unit
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#0B1E3D] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Choir">Choir (Voices of Rehoboth)</option>
                <option value="Ushering">Ushering &amp; Protocol</option>
                <option value="Drama">Drama Ministry</option>
                <option value="Prayer Force">Prayer Force / Intercessory</option>
                <option value="Media">Media &amp; Sound</option>
                <option value="Children's Church">Children's Church</option>
                <option value="Teens Church">Teens Church</option>
                <option value="None">None / General Member</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-sm tracking-wide transition-colors shadow-md"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
