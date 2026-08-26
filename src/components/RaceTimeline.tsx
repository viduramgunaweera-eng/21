"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { brotherData } from "@/data/brotherData";

export default function RaceTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position for horizontal translation on desktop
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress to horizontal movement (e.g. -75%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <div ref={targetRef} className="relative h-[200vh] md:h-[300vh] bg-brand-black">
      {/* Sticky container for horizontal scrolling effect on desktop */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-16 md:py-24">
        {/* Section Header */}
        <div className="px-6 md:px-24 mb-6 md:mb-12 z-20 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-sans tracking-[0.25em] text-brand-red mb-2 uppercase font-semibold block">
              03 // GRAND PRIX HISTORY
            </span>
            <h2 className="text-4xl md:text-6xl font-bebas font-bold tracking-tight text-brand-white uppercase leading-none">
              THE RACE SO FAR<span className="text-brand-red">.</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-brand-white/30 hidden md:block select-none">
            DRAG OR SCROLL TO NAVIGATE CIRCUIT →
          </span>
        </div>

        {/* Desktop Layout: Horizontal Scroll */}
        <div className="hidden md:block w-full cursor-grab active:cursor-grabbing">
          <motion.div style={{ x }} className="flex gap-8 px-24 w-max">
            {brotherData.timeline.map((event, idx) => (
              <div
                key={event.year}
                className="w-[380px] h-[360px] bg-brand-charcoal border border-brand-white/5 relative p-8 flex flex-col justify-between group overflow-hidden select-none hover:border-brand-red/30 transition-colors duration-300"
              >
                {/* Background decorative lap time stamp */}
                <div className="absolute top-2 right-4 text-[10px] font-mono text-brand-white/10">
                  LAP_TIME // 00:0{event.year}:00
                </div>

                {/* Slanted handwritten graffiti annotation */}
                {idx === 0 && (
                  <div className="absolute top-12 right-8 font-graffiti text-sm text-brand-red/60 -rotate-12 select-none">
                    GREEN LIGHTS!
                  </div>
                )}
                {idx === 3 && (
                  <div className="absolute top-12 right-10 font-graffiti text-sm text-brand-gold/60 rotate-6 select-none">
                    FASTEST LAP!
                  </div>
                )}
                {idx === 5 && (
                  <div className="absolute top-10 right-6 font-graffiti text-sm text-brand-red/80 -rotate-6 select-none">
                    P1 STATUS.
                  </div>
                )}

                <div>
                  {/* Big Number */}
                  <span className="block text-6xl md:text-8xl font-bebas font-bold text-stroke-white group-hover:text-stroke-red transition-all duration-300">
                    {event.year}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bebas tracking-wide text-brand-white mt-4 uppercase">
                    {event.title}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-brand-white/70 leading-relaxed font-sans mt-4">
                    {event.description}
                  </p>
                  
                  {/* Technical visual elements */}
                  <div className="flex items-center gap-2 mt-6 border-t border-brand-white/5 pt-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                    <span className="text-[8px] font-mono text-brand-white/40 tracking-widest uppercase">
                      GEAR POSITION // {idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Layout: Scrollable Vertical Cards */}
        <div className="md:hidden flex-1 overflow-y-auto px-6 space-y-6 no-scrollbar pb-6 z-20">
          {brotherData.timeline.map((event, idx) => (
            <div
              key={event.year}
              className="bg-brand-charcoal border border-brand-white/5 p-6 relative flex flex-col justify-between overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <span className="text-5xl font-bebas font-bold text-stroke-white">
                  {event.year}
                </span>
                {idx === 5 && (
                  <span className="font-graffiti text-xs text-brand-red -rotate-6">P1!</span>
                )}
              </div>
              <h3 className="text-lg font-bebas text-brand-white uppercase mt-2">
                {event.title}
              </h3>
              <p className="text-xs text-brand-white/70 mt-2 leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
