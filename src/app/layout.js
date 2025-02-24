import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/navbar";
import GlowCursor from "@/components/GlowCursor";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ibrahim ANIL ~ Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="fr">
        <body className="relative bg-black text-white overflow-hidden">
          <GlowCursor />
          <Navbar />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}