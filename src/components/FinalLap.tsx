"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { brotherData } from "@/data/brotherData";

export default function FinalLap() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section 
      id="final" 
      className="w-full min-h-screen bg-brand-black flex items-center justify-center relative overflow-hidden py-24 px-6 select-none"
    >
      {/* Massive 21 in background with extremely low opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[280px] sm:text-[450px] md:text-[650px] font-bebas font-extrabold text-stroke-white opacity-[0.02] leading-none select-none">
          {brotherData.age}
        </span>
      </div>

      {/* Subtle red spotlight glow at the very bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Telemetry frame lines for final paddock closure */}
      <div className="absolute inset-x-12 bottom-12 h-[1px] bg-brand-white/5 pointer-events-none hidden md:block" />
      <div className="absolute left-12 top-12 bottom-12 w-[1px] bg-brand-white/5 pointer-events-none hidden md:block" />
      <div className="absolute right-12 top-12 bottom-12 w-[1px] bg-brand-white/5 pointer-events-none hidden md:block" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-2xl text-center flex flex-col items-center justify-center"
      >
        {/* Editorial indicator */}
        <motion.span 
          variants={textVariants}
          className="text-[10px] font-sans tracking-[0.3em] text-brand-red mb-4 uppercase font-semibold block"
        >
          09 // THE FINISH LINE
        </motion.span>

        {/* Happy 21st Header */}
        <motion.h2 
          variants={textVariants}
          className="text-5xl sm:text-7xl md:text-8xl font-bebas font-extrabold tracking-tight text-brand-white leading-none uppercase mb-2"
        >
          {brotherData.finalMessage.headline}
        </motion.h2>

        {/* Subhead */}
        <motion.h3 
          variants={textVariants}
          className="text-xl sm:text-2xl md:text-3xl font-bebas text-brand-gold tracking-widest uppercase mb-8"
        >
          {brotherData.finalMessage.subheadline}
        </motion.h3>

        {/* Main message */}
        <motion.p 
          variants={textVariants}
          className="text-xs sm:text-sm text-brand-white/80 font-sans leading-relaxed tracking-wider text-center max-w-lg mb-12"
        >
          “To my brother — here's to another year of crazy memories, big dreams, unexpected turns and full-throttle living.
          <br /><br />
          Keep pushing.
          Keep laughing.
          Keep becoming the person you're meant to be.
          <br /><br />
          And whatever happens...
          <span className="text-brand-red font-semibold"> NEVER HIT THE BRAKES.</span>”
        </motion.p>

        {/* Signoff */}
        <motion.div 
          variants={textVariants}
          className="flex flex-col items-center"
        >
          <span className="font-graffiti text-lg sm:text-xl text-brand-gold -rotate-3 select-none">
            {brotherData.finalMessage.signoff}
          </span>
          <span className="text-[8px] font-mono text-brand-white/30 tracking-widest uppercase mt-4">
            CHECKERED_FLAG_CLOSED // END_OF_LAP_21
          </span>
        </motion.div>

        {/* Tiny F1 checkered strip at the bottom */}
        <motion.div 
          variants={textVariants}
          className="w-24 h-2 bg-[repeating-conic-gradient(#fff_0_25%,transparent_0_50%)] bg-[size:8px_8px] opacity-10 mt-8" 
        />
      </motion.div>
    </section>
  );
}
