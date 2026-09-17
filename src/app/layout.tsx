import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "RCCG Rehoboth Chapel",
  description: "Room for More — a family of believers committed to holiness, worship, and reaching every nation for the Lord Jesus Christ.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#0B1E3D] text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}