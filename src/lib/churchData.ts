export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  birthday: string;
  gender?: "Male" | "Female" | string;
  status?: "Member" | "First-Timer" | "Convert" | "Leader" | string;
  role?: "member" | "admin" | "first-timer" | string;
  department: string;
  joinedDate: string;
  followUpStatus?: "New" | "Called" | "Visited" | "Established" | "pending" | "contacted" | "completed" | string;
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  serviceType: string;
  men: number;
  women: number;
  teens: number;
  children: number;
  total: number;
  firstTimers?: number;
  preacher?: string;
  notes?: string;
}

export interface GivingRecord {
  id: string;
  date: string;
  donorName: string;
  category?: string;
  type?: "tithe" | "offering" | "thanksgiving" | "project" | "welfare" | string;
  amount: number;
  method?: string;
  paymentMethod?: "bank-transfer" | "pos" | "cash" | string;
  reference?: string;
  status?: string;
  memberId?: string;
}

export interface DutyRoster {
  id: string;
  serviceDate: string;
  department: string;
  assignedMembers: string[];
  notes?: string;
}

export interface PrayerRequest {
  id: string;
  requesterName: string;
  phone?: string;
  category: "Healing" | "Breakthrough" | "Family" | "Spiritual Growth" | "Job / Career" | "Other" | string;
  title: string;
  details: string;
  dateSubmitted: string;
  status: "Pending" | "Prayed For" | "Answered" | string;
  isConfidential: boolean;
  memberId?: string;
}

export interface Testimony {
  id: string;
  authorName: string;
  title: string;
  content: string;
  date: string;
  status: "Approved" | "Pending" | string;
  likes: number;
}

export interface BroadcastTemplate {
  id: string;
  title: string;
  targetAudience?: string;
  audience?: string;
  channel?: "whatsapp" | "sms" | "email" | string;
  sentDate?: string;
  status?: string;
  message: string;
}

// Initial Mock Seed Data
const initialMembers: Member[] = [
  {
    id: "mem-1",
    name: "Pastor Tosin Adewale",
    phone: "2349112521558",
    email: "tosin.adewale@rccgrehoboth.org",
    address: "Leme, Abeokuta, Ogun State",
    birthday: "1985-05-14",
    gender: "Male",
    status: "Leader",
    department: "Pastoral",
    joinedDate: "2016-04-01",
    notes: "Resident Pastor",
  },
  {
    id: "mem-2",
    name: "Sister Blessing Adeyemi",
    phone: "2348031234567",
    email: "blessing.adeyemi@gmail.com",
    address: "Kuto, Abeokuta, Ogun State",
    birthday: "1996-09-22",
    gender: "Female",
    status: "Member",
    department: "Choir",
    joinedDate: "2019-02-10",
    notes: "Soprano Lead",
  },
  {
    id: "mem-3",
    name: "Brother Samuel Okon",
    phone: "2348029876543",
    email: "samuel.okon@yahoo.com",
    address: "Ibara, Abeokuta, Ogun State",
    birthday: "1994-11-05",
    gender: "Male",
    status: "Member",
    department: "Ushering",
    joinedDate: "2020-08-15",
    notes: "Ushering Unit Lead",
  },
  {
    id: "mem-4",
    name: "Sister Deborah Fashola",
    phone: "2348105557788",
    email: "deborah.fash@gmail.com",
    address: "Leme, Abeokuta",
    birthday: "2001-03-18",
    gender: "Female",
    status: "First-Timer",
    department: "None",
    joinedDate: "2026-09-10",
    followUpStatus: "New",
    notes: "Visited last Sunday, interested in Youth Church",
  },
  {
    id: "mem-5",
    name: "Brother Emmanuel Davies",
    phone: "2348123344556",
    email: "e.davies@outlook.com",
    address: "Asero, Abeokuta",
    birthday: "1998-07-29",
    gender: "Male",
    status: "First-Timer",
    department: "None",
    joinedDate: "2026-09-03",
    followUpStatus: "Called",
    notes: "Pastor Tosin called for welcome chat",
  },
];

const initialAttendance: AttendanceRecord[] = [
  {
    id: "att-1",
    date: "2026-09-13",
    serviceType: "Sunday Celebration Service",
    men: 42,
    women: 58,
    teens: 24,
    children: 35,
    total: 159,
    notes: "Supernatural Expansion Sunday",
  },
  {
    id: "att-2",
    date: "2026-09-09",
    serviceType: "Midweek Digging Deep",
    men: 25,
    women: 32,
    teens: 14,
    children: 10,
    total: 81,
    notes: "Book of Genesis in-depth study",
  },
  {
    id: "att-3",
    date: "2026-09-06",
    serviceType: "Sunday Celebration Service",
    men: 39,
    women: 54,
    teens: 20,
    children: 31,
    total: 144,
    notes: "Thanksgiving & Anointing Service",
  },
];

const initialGiving: GivingRecord[] = [
  {
    id: "giv-1",
    date: "2026-09-13",
    donorName: "Sister Blessing Adeyemi",
    category: "Tithe",
    amount: 35000,
    method: "Bank Transfer",
    reference: "TRF-902183",
    memberId: "mem-2",
  },
  {
    id: "giv-2",
    date: "2026-09-13",
    donorName: "Anonymous / General Congregation",
    category: "Sunday Offering",
    amount: 142500,
    method: "Cash",
    reference: "CSH-0913",
  },
  {
    id: "giv-3",
    date: "2026-09-13",
    donorName: "Brother Samuel Okon",
    category: "Project Rehoboth",
    amount: 50000,
    method: "Bank Transfer",
    reference: "TRF-882314",
    memberId: "mem-3",
  },
  {
    id: "giv-4",
    date: "2026-09-06",
    donorName: "Sister Blessing Adeyemi",
    category: "Thanksgiving",
    amount: 20000,
    method: "Bank Transfer",
    reference: "TRF-110294",
    memberId: "mem-2",
  },
];

const initialRosters: DutyRoster[] = [
  {
    id: "ros-1",
    serviceDate: "2026-09-20",
    department: "Choir",
    assignedMembers: ["Sister Blessing Adeyemi", "Brother Daniel O.", "Sister Folake M."],
    notes: "Ministration Song: Way Maker & African Praise Medley",
  },
  {
    id: "ros-2",
    serviceDate: "2026-09-20",
    department: "Ushering",
    assignedMembers: ["Brother Samuel Okon", "Sister Grace K.", "Brother Tunde A."],
    notes: "Auditorium Main Door & First Timer Reception Area",
  },
  {
    id: "ros-3",
    serviceDate: "2026-09-20",
    department: "Media & Sound",
    assignedMembers: ["Brother Kayode B.", "Brother Seyi O."],
    notes: "Sound setup at 7:30 AM prompt",
  },
];

const initialPrayers: PrayerRequest[] = [
  {
    id: "pray-1",
    requesterName: "Sister Blessing Adeyemi",
    phone: "2348031234567",
    category: "Job / Career",
    title: "Promotion and Career Breakthrough",
    details: "Praying for divine favor in the upcoming management promotion interview this Thursday.",
    dateSubmitted: "2026-09-14",
    status: "Prayed For",
    isConfidential: true,
    memberId: "mem-2",
  },
  {
    id: "pray-2",
    requesterName: "Brother Samuel Okon",
    phone: "2348029876543",
    category: "Family",
    title: "Good Health and Long Life for Parents",
    details: "Standing in prayer for quick recovery and strength for my elderly mother.",
    dateSubmitted: "2026-09-12",
    status: "Pending",
    isConfidential: false,
    memberId: "mem-3",
  },
];

const initialTestimonies: Testimony[] = [
  {
    id: "test-1",
    authorName: "Sister Blessing Adeyemi",
    title: "God of Rehoboth Provided Divine Accommodation!",
    content:
      "I was searching for a suitable apartment close to work for 4 months without success. After Pastor Tosin prayed for divine room and fruitfulness on Sunday, a landlord called me the next day with the exact place within my budget!",
    date: "2026-09-10",
    status: "Approved",
    likes: 18,
  },
  {
    id: "test-2",
    authorName: "Brother Samuel Okon",
    title: "Miraculous Healing from Chronic Migraines",
    content:
      "During the Midweek Faith Clinic, the pastor called out a word of knowledge about head pains. I believed and claimed it, and instantly the persistent headache vanished!",
    date: "2026-09-02",
    status: "Approved",
    likes: 24,
  },
];

const initialBroadcasts: BroadcastTemplate[] = [
  {
    id: "bc-1",
    title: "Sunday Celebration Reminder",
    targetAudience: "All Members",
    message:
      "Praise God, beloved family! Tomorrow is our Celebration Service at RCCG Rehoboth Chapel. Join us by 9:00 AM as God makes Room For More in your life. Bring a friend along! Venue: Edola Hotel, Leme, Abeokuta.",
  },
  {
    id: "bc-2",
    title: "First-Timer Warm Welcome",
    targetAudience: "First-Timers",
    message:
      "Hello beloved, thank you for worshipping with us at RCCG Rehoboth Chapel! We pray God's blessing and room for more remains with you. If you need prayers or counseling, feel free to reply directly to this message. We love you!",
  },
  {
    id: "bc-3",
    title: "Birthday Apostolic Blessing",
    targetAudience: "Birthday Celebrants",
    message:
      "Happy Birthday beloved! On behalf of Pastor Tosin and the entire RCCG Rehoboth Chapel family, we declare divine expansion, fresh grace, long life, and sound health upon your new year in Jesus' name! 🎂🎉",
  },
  {
    id: "bc-4",
    title: "Midweek Digging Deep Notice",
    targetAudience: "All Members",
    message:
      "Don't miss today's Midweek Digging Deep & Faith Clinic by 5:00 PM. Come with your Bible and notebook as we explore the unadulterated truth of God's Word. See you this evening!",
  },
];

// Type Aliases for convenient page usage
export type FinanceRecord = GivingRecord;
export type BroadcastMessage = BroadcastTemplate;
export interface RosterAssignment {
  id: string;
  serviceDate: string;
  serviceName: string;
  memberName: string;
  department: string;
  role: string;
  status: string;
  notes?: string;
}

// Helper functions with localStorage support
export const getStoredData = () => {
  if (typeof window === "undefined") {
    return {
      members: initialMembers,
      attendance: initialAttendance,
      giving: initialGiving,
      rosters: initialRosters,
      prayers: initialPrayers,
      testimonies: initialTestimonies,
      broadcasts: initialBroadcasts,
    };
  }

  const members = localStorage.getItem("rccg_members");
  const attendance = localStorage.getItem("rccg_attendance");
  const giving = localStorage.getItem("rccg_giving");
  const rosters = localStorage.getItem("rccg_rosters");
  const prayers = localStorage.getItem("rccg_prayers");
  const testimonies = localStorage.getItem("rccg_testimonies");
  const broadcasts = localStorage.getItem("rccg_broadcasts");

  return {
    members: members ? JSON.parse(members) : initialMembers,
    attendance: attendance ? JSON.parse(attendance) : initialAttendance,
    giving: giving ? JSON.parse(giving) : initialGiving,
    rosters: rosters ? JSON.parse(rosters) : initialRosters,
    prayers: prayers ? JSON.parse(prayers) : initialPrayers,
    testimonies: testimonies ? JSON.parse(testimonies) : initialTestimonies,
    broadcasts: broadcasts ? JSON.parse(broadcasts) : initialBroadcasts,
  };
};

export const saveToStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Member Helpers
export const getMembers = (): Member[] => {
  return getStoredData().members;
};

export const saveMember = (member: Member) => {
  const current = getMembers();
  const existingIdx = current.findIndex((m) => m.id === member.id);
  let updated: Member[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = member;
  } else {
    updated = [member, ...current];
  }
  saveToStorage("rccg_members", updated);
  return updated;
};

// Attendance Helpers
export const getAttendance = (): AttendanceRecord[] => {
  return getStoredData().attendance;
};

export const saveAttendance = (record: AttendanceRecord) => {
  const current = getAttendance();
  const updated = [record, ...current];
  saveToStorage("rccg_attendance", updated);
  return updated;
};

// Giving / Finance Helpers
export const getGiving = (): GivingRecord[] => {
  return getStoredData().giving;
};

export const getFinances = (): FinanceRecord[] => {
  return getStoredData().giving;
};

export const saveGiving = (record: GivingRecord) => {
  const current = getGiving();
  const updated = [record, ...current];
  saveToStorage("rccg_giving", updated);
  return updated;
};

export const saveFinanceRecord = (record: FinanceRecord) => {
  return saveGiving(record);
};

// Duty Roster Helpers
const initialAssignments: RosterAssignment[] = [
  {
    id: "rst-1",
    serviceDate: "2026-09-20",
    serviceName: "Sunday Celebration Service",
    memberName: "Sister Blessing Adeyemi",
    department: "Choir (The Voice of Praise)",
    role: "Praise & Worship Leader",
    status: "confirmed",
    notes: "Soundcheck at 7:45 AM prompt",
  },
  {
    id: "rst-2",
    serviceDate: "2026-09-20",
    serviceName: "Sunday Celebration Service",
    memberName: "Brother Samuel Okon",
    department: "Ushering & Protocol",
    role: "Chief Usher & Offering Collector",
    status: "confirmed",
    notes: "Main Auditorium Door & First Timer reception",
  },
  {
    id: "rst-3",
    serviceDate: "2026-09-23",
    serviceName: "Midweek Faith Clinic",
    memberName: "Brother Kayode B.",
    department: "Media & Technical",
    role: "Livestream & Audio Tech",
    status: "confirmed",
    notes: "Setup system at 4:30 PM",
  },
];

export const getRosters = (): RosterAssignment[] => {
  if (typeof window === "undefined") return initialAssignments;
  const stored = localStorage.getItem("rccg_roster_assignments");
  return stored ? JSON.parse(stored) : initialAssignments;
};

export const saveRoster = (roster: RosterAssignment) => {
  const current = getRosters();
  const updated = [roster, ...current];
  saveToStorage("rccg_roster_assignments", updated);
  return updated;
};

// Prayer Request Helpers
export const getPrayers = (): PrayerRequest[] => {
  return getStoredData().prayers;
};

export const savePrayer = (prayer: PrayerRequest) => {
  const current = getPrayers();
  const updated = [prayer, ...current];
  saveToStorage("rccg_prayers", updated);
  return updated;
};

// Testimony Helpers
export const getTestimonies = (): Testimony[] => {
  return getStoredData().testimonies;
};

export const saveTestimony = (testimony: Testimony) => {
  const current = getTestimonies();
  const updated = [testimony, ...current];
  saveToStorage("rccg_testimonies", updated);
  return updated;
};

// Broadcast Helpers
export const getBroadcasts = (): BroadcastMessage[] => {
  return getStoredData().broadcasts;
};

export const saveBroadcast = (broadcast: BroadcastMessage) => {
  const current = getBroadcasts();
  const updated = [broadcast, ...current];
  saveToStorage("rccg_broadcasts", updated);
  return updated;
};
