import type { Metadata } from "next";
import { Inter, Bebas_Neue, Permanent_Marker } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import SoundToggle from "@/components/SoundToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNode = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const graffiti = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-graffiti",
});

export const metadata: Metadata = {
  title: "CHAPTER 21 — THE RACE CONTINUES",
  description: "An editorial-style Formula 1 and high-fashion digital tribute dedicated to my brother on his 21st birthday.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNode.variable} ${graffiti.variable} h-full antialiased dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full bg-brand-black text-brand-white selection:bg-brand-red selection:text-brand-black relative">
        <NoiseOverlay />
        <CustomCursor />
        <SoundToggle />
        {children}
      </body>
    </html>
  );
}
