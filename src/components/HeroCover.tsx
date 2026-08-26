"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { brotherData } from "@/data/brotherData";

export default function HeroCover() {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const scanlineVariants: Variants = {
    hidden: { left: "-100%" },
    visible: {
      left: "100%",
      transition: { duration: 2.2, ease: "easeInOut", delay: 1 },
    },
  };

  const textSlideVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const labelFadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full min-h-screen bg-brand-black overflow-hidden flex flex-col justify-end md:justify-center editorial-container py-16 md:py-0 select-none"
    >
      {/* 1. Portrait Image with cinematic overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.8 }}
        className="absolute inset-y-0 right-0 w-full md:w-3/5 h-full z-0 pointer-events-none"
      >
        <Image
          src="/images/portrait.jpeg"
          alt={brotherData.brotherName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-[center_20%] md:object-right-top filter brightness-75 contrast-110"
        />
        {/* Gradients blending image to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black md:bg-gradient-to-r md:from-brand-black md:via-brand-black/15 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-transparent to-brand-black/90" />
        
        {/* Subtle red spotlight glow */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>

      {/* 2. Intro Sweep Laser */}
      <motion.div
        variants={scanlineVariants}
        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-brand-red/15 to-transparent z-10 pointer-events-none"
      />

      {/* 3. Telemetry Overlay Lines */}
      <div className="absolute inset-0 pointer-events-none z-10 p-6 md:p-12">
        {/* Vertical F1 telemetry grid lines */}
        <motion.div
          variants={lineVariants}
          className="absolute top-12 left-12 right-12 h-[1px] bg-brand-white/10 origin-left"
        />
        <motion.div
          variants={lineVariants}
          className="absolute bottom-12 left-12 right-12 h-[1px] bg-brand-white/10 origin-left"
        />
        <div className="absolute top-12 left-12 bottom-12 w-[1px] bg-brand-white/10 hidden md:block" />
        <div className="absolute top-12 right-12 bottom-12 w-[1px] bg-brand-white/10 hidden md:block" />

        {/* Small corner crosses and indicators */}
        <div className="absolute top-14 left-14 text-[8px] font-sans text-brand-white/30 tracking-widest hidden md:block">
          SYS.LOC // 21.00.05
        </div>
        <div className="absolute bottom-14 right-14 text-[8px] font-sans text-brand-white/30 tracking-widest hidden md:block">
          GRID_LAT // 2026.08
        </div>
      </div>

      {/* 4. Main Editorial Content */}
      <div className="relative z-20 max-w-4xl flex flex-col justify-end h-full md:justify-center pl-8">
        {/* Magazine issue label */}
        <motion.div 
          variants={textSlideVariants}
          className="flex items-center gap-3 mb-2 md:mb-4"
        >
          <span className="text-[10px] md:text-xs font-sans font-semibold tracking-[0.3em] text-brand-red uppercase">
            EDITORIAL ISSUE // EST. {brotherData.birthYear}
          </span>
          <span className="h-[1px] w-8 bg-brand-red" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-brand-white/50">
            2026
          </span>
        </motion.div>

        {/* Massive 21 */}
        <div className="relative overflow-visible leading-none mb-1 md:mb-2">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-[120px] sm:text-[180px] md:text-[260px] font-bebas font-bold text-brand-white tracking-tighter"
          >
            {brotherData.age}
          </motion.h1>
          {/* Subtle outline duplicate shifted slightly for offset print effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="absolute top-2 left-2 text-[120px] sm:text-[180px] md:text-[260px] font-bebas font-bold text-stroke-red pointer-events-none select-none"
          >
            {brotherData.age}
          </motion.div>
        </div>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h2
            variants={textSlideVariants}
            className="text-3xl sm:text-5xl md:text-7xl font-bebas font-bold tracking-tight text-brand-white uppercase leading-none mb-4"
          >
            THE NEXT LAP BEGINS<span className="text-brand-red">.</span>
          </motion.h2>
        </div>

        {/* Paragraph & Profile Specs */}
        <div className="max-w-md">
          <motion.p
            variants={textSlideVariants}
            className="text-xs sm:text-sm text-brand-white/80 font-sans leading-relaxed tracking-wide mb-6 md:mb-8"
          >
            Celebrating {brotherData.age} years of {brotherData.brotherName}. One more lap completed, accelerating into the future with full send settings locked.
          </motion.p>

          {/* F1 Driver Identifier Cards */}
          <motion.div
            variants={labelFadeVariants}
            className="grid grid-cols-3 gap-4 border-t border-brand-white/10 pt-4 md:pt-6"
          >
            <div>
              <span className="block text-[9px] font-sans tracking-widest text-brand-white/40 uppercase">DRIVER</span>
              <span className="text-xs font-bebas tracking-wider text-brand-white uppercase">#{brotherData.age}</span>
            </div>
            <div>
              <span className="block text-[9px] font-sans tracking-widest text-brand-white/40 uppercase">SEASON</span>
              <span className="text-xs font-bebas tracking-wider text-brand-white uppercase">2026.1</span>
            </div>
            <div>
              <span className="block text-[9px] font-sans tracking-widest text-brand-white/40 uppercase">STATUS</span>
              <span className="text-xs font-bebas tracking-wider text-brand-red uppercase font-semibold">UNSTOPPABLE</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. Small Telemetry Dashboard widgets floating around hero */}
      <div className="absolute right-12 bottom-20 z-20 hidden lg:flex flex-col gap-6 text-[10px] font-mono text-brand-white/30 tracking-widest select-none">
        <motion.div variants={labelFadeVariants} className="flex flex-col items-end">
          <span className="text-brand-red font-semibold">SECTOR 01</span>
          <span>TIME // 21.05.00</span>
        </motion.div>
        <motion.div variants={labelFadeVariants} className="flex flex-col items-end">
          <span>DRS // ACTIVE</span>
          <span>TYRES // SOFT</span>
        </motion.div>
        <motion.div variants={labelFadeVariants} className="flex flex-col items-end">
          <span className="text-brand-white/60">PIT → LIFE MODE</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
