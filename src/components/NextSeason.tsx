"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { brotherData } from "@/data/brotherData";

export default function NextSeason() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this section to draw the SVG track path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animate path drawing from 20% to 70% of section scroll
  const pathLength = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      id="future" 
      className="w-full min-h-screen bg-brand-black py-24 px-12 md:px-24 flex items-center relative overflow-hidden"
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* LEFT COLUMN: Mission briefing */}
        <div className="lg:col-span-5 flex flex-col justify-center select-none">
          <span className="text-[10px] font-sans tracking-[0.25em] text-brand-red mb-2 uppercase font-semibold block">
            08 // SEASON 2026 FORECAST
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas font-bold tracking-tight text-brand-white uppercase leading-none mb-6">
            NEXT SEASON<span className="text-brand-red">.</span>
          </h2>
          
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bebas text-brand-gold uppercase tracking-wide">
              {brotherData.futureMission.headline}
            </h3>
            <p className="text-brand-white/70 text-sm font-sans leading-relaxed tracking-wide">
              The contract is signed. The car is tuned. The team is ready. Chapter 21 is a high-speed straightaway leading into a future of limitless possibilities. Keep pushing the envelope, there are no speeds too high.
            </p>
          </div>

          <div className="mt-8 p-6 bg-brand-charcoal/40 border border-brand-white/5 inline-block">
            <span className="text-[10px] font-mono text-brand-red tracking-widest block mb-1">
              CURRENT_MISSION
            </span>
            <span className="text-lg font-bebas text-brand-white tracking-widest">
              {brotherData.futureMission.missionText}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive F1 track map */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative aspect-square w-full max-w-xl mx-auto bg-brand-charcoal/10 border border-brand-white/5 p-8">
          {/* Diagnostic annotations */}
          <div className="absolute top-4 left-4 text-[8px] font-mono text-brand-white/30 tracking-widest">
            CIRCUIT // CHAPTER_21
          </div>
          <div className="absolute top-4 right-4 text-[8px] font-mono text-brand-red tracking-widest uppercase">
            SCALE: LIMITLESS
          </div>

          {/* SVG F1 Track Path */}
          <svg 
            viewBox="0 0 400 300" 
            className="w-full h-full text-brand-white/10"
            fill="none"
          >
            {/* Background static shadow path */}
            <path
              d="M 50,150 C 50,50 150,50 200,100 C 250,150 350,150 350,200 C 350,250 250,250 200,200 C 150,150 50,250 50,150 Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active animated drawing racing path */}
            <motion.path
              d="M 50,150 C 50,50 150,50 200,100 C 250,150 350,150 350,200 C 350,250 250,250 200,200 C 150,150 50,250 50,150 Z"
              stroke="#E10600"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />

            {/* Start / Finish line flag annotation */}
            <line x1="50" y1="135" x2="50" y2="165" stroke="#C9A86A" strokeWidth="2" strokeDasharray="3 3" />
            <text x="35" y="125" fill="#C9A86A" fontSize="8" fontFamily="monospace" letterSpacing="1">
              START_LINE
            </text>

            {/* Sector/Turn labels pointing to points on track */}
            <text x="210" y="85" fill="#F4F1EA" fontSize="8" fontFamily="monospace">
              Turn 21 // Apex
            </text>
            <circle cx="200" cy="100" r="3" fill="#E10600" />

            <text x="250" y="180" fill="#F4F1EA" fontSize="8" fontFamily="monospace">
              Future Straight
            </text>
            <circle cx="270" cy="200" r="3" fill="#C9A86A" />

            <text x="80" y="225" fill="#F4F1EA" fontSize="8" fontFamily="monospace">
              Full Send Turn
            </text>
            <circle cx="110" cy="210" r="3" fill="#E10600" />
          </svg>

          {/* Pit lane stats box overlaid on track map */}
          <div className="absolute bottom-4 right-4 bg-brand-black/90 p-4 border border-brand-white/10 text-[9px] font-mono text-brand-white/50 space-y-1">
            <span className="block text-brand-red font-semibold mb-1">TELEMETRY READING:</span>
            <div>TRACK TEMP // 35°C</div>
            <div>SPEED ASSIGN // MAX_FORCE</div>
            <div>LAP RECORD // 21 YEARS</div>
          </div>
        </div>

      </div>
    </section>
  );
}
