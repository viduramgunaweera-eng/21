import React from "react";
import Navbar from "@/components/Navbar";
import SectionIndicator from "@/components/SectionIndicator";
import HeroCover from "@/components/HeroCover";
import DriverProfile from "@/components/DriverProfile";
import RaceTimeline from "@/components/RaceTimeline";
import MemoryArchive from "@/components/MemoryArchive";
import TeamGrid from "@/components/TeamGrid";
import GraffitiBreak from "@/components/GraffitiBreak";
import TwentyOneThings from "@/components/TwentyOneThings";
import NextSeason from "@/components/NextSeason";
import FinalLap from "@/components/FinalLap";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white font-sans selection:bg-brand-red selection:text-brand-black">
      {/* Floating Headers and Navigation */}
      <Navbar />
      <SectionIndicator />

      {/* Main Editorial Story Flow */}
      <main className="w-full flex flex-col">
        {/* Section 01: Hero - The cover */}
        <HeroCover />

        {/* Section 02: Meet The Driver */}
        <DriverProfile />

        {/* Section 03: Grand Prix Career Timeline */}
        <RaceTimeline />

        {/* Section 04: Memory collage grid */}
        <MemoryArchive />

        {/* Section 05: Collective collect cards crew */}
        <TeamGrid />

        {/* Section 06: Street art visual break */}
        <GraffitiBreak />

        {/* Section 07: 21 component specifications */}
        <TwentyOneThings />

        {/* Section 08: 2026 Season Future track blueprint */}
        <NextSeason />

        {/* Section 09: Final Lap signoff */}
        <FinalLap />
      </main>
    </div>
  );
}
