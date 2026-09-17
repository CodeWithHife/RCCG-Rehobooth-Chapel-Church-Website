"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Member, getStoredData, saveToStorage } from "@/lib/churchData";

export type UserRole = "admin" | "member" | null;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  birthday?: string;
  address?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: "admin" | "member", memberId?: string) => void;
  logout: () => void;
  updateCurrentUser: (data: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const demoAccounts = {
  admin: {
    id: "mem-1",
    name: "Pastor Tosin Adewale",
    email: "tosin.adewale@rccgrehoboth.org",
    phone: "2349112521558",
    role: "admin" as UserRole,
    department: "Pastoral",
    birthday: "1985-05-14",
    address: "Leme, Abeokuta, Ogun State",
  },
  member: {
    id: "mem-2",
    name: "Sister Blessing Adeyemi",
    email: "blessing.adeyemi@gmail.com",
    phone: "2348031234567",
    role: "member" as UserRole,
    department: "Choir",
    birthday: "1996-09-22",
    address: "Kuto, Abeokuta, Ogun State",
  },
  member2: {
    id: "mem-3",
    name: "Brother Samuel Okon",
    email: "samuel.okon@yahoo.com",
    phone: "2348029876543",
    role: "member" as UserRole,
    department: "Ushering",
    birthday: "1994-11-05",
    address: "Ibara, Abeokuta, Ogun State",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Check saved session on client mount
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("rccg_portal_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default to member demo for immediate exploration if not logged in
        setUser(demoAccounts.member);
      }
    }
  }, []);

  const loginAs = (role: "admin" | "member", memberId?: string) => {
    let targetUser: AuthUser = demoAccounts.member;

    if (role === "admin") {
      targetUser = demoAccounts.admin;
    } else if (memberId === "mem-3") {
      targetUser = demoAccounts.member2;
    } else if (memberId) {
      const { members } = getStoredData();
      const found = members.find((m: Member) => m.id === memberId);
      if (found) {
        targetUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          phone: found.phone,
          role: "member",
          department: found.department,
          birthday: found.birthday,
          address: found.address,
        };
      }
    }

    setUser(targetUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("rccg_portal_user", JSON.stringify(targetUser));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("rccg_portal_user");
    }
  };

  const updateCurrentUser = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("rccg_portal_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        loginAs,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
