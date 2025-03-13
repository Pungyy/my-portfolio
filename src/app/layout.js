import "./globals.css";
import Navbar from "@/components/navbar";
import GlowCursor from "@/components/GlowCursor";
import { ViewTransitions } from "next-view-transitions";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importer FontAwesome
import MoonScene from "../components/Moon";

export const metadata = {
  title: "Ibrahim ANIL  ~ Portfolio",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="fr">
        <body className="relative bg-black text-white">
          <GlowCursor />
          <Navbar />
          <MoonScene /> {/* La Lune est maintenant bien en background */}
          <div className="relative z-10">{children}</div>
        </body>
      </html>
    </ViewTransitions>
  ); 
}