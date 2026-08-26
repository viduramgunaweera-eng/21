"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { brotherData } from "@/data/brotherData";

export default function DriverProfile() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="driver" className="w-full min-h-screen bg-brand-charcoal py-24 px-6 md:px-24 flex items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Subtle halftone background grid */}
      <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center z-10"
      >
        {/* LEFT COLUMN: Editorial Profile Photo Box */}
        <motion.div variants={itemVariants} className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-lg mx-auto border border-brand-white/10 p-3 bg-brand-black/40 backdrop-blur-sm relative group">
          {/* F1 telemetry frame corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-red -translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-white/20 translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-white/20 -translate-x-[2px] translate-y-[2px]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-red translate-x-[2px] translate-y-[2px]" />

          {/* Grid annotations */}
          <div className="absolute top-6 left-6 text-[8px] font-mono text-brand-white/50 tracking-widest z-20 bg-brand-black/80 px-2 py-0.5">
            DRV_MODEL // AP.21
          </div>
          <div className="absolute bottom-6 right-6 text-[8px] font-mono text-brand-red tracking-widest z-20 bg-brand-black/80 px-2 py-0.5">
            SYS.STATUS: LOCKED
          </div>

          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/images/portrait.jpeg"
              alt="Driver profile side-view"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center filter grayscale contrast-125 brightness-75 hover:scale-105 transition-transform duration-700"
            />
            {/* Dark navy visual dye */}
            <div className="absolute inset-0 bg-brand-navy/15 mix-blend-color-burn" />
            {/* Warm gold vignette glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-gold/10 pointer-events-none" />
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Editorial Stats & Paragraphs */}
        <motion.div variants={itemVariants} className="flex flex-col justify-center">
          <span className="text-[10px] font-sans tracking-[0.25em] text-brand-red mb-2 uppercase font-semibold">
            02 // SYSTEM DIAGNOSTICS
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas font-bold tracking-tight text-brand-white uppercase leading-none mb-6">
            MEET THE DRIVER<span className="text-brand-red">.</span>
          </h2>

          <p className="text-brand-white/70 text-sm md:text-base font-sans leading-relaxed tracking-wide mb-8">
            “{brotherData.age} years. Countless memories. One more lap around the sun. Fast lines, unexpected corners, but always hitting the throttle when the lights go green.”
          </p>

          {/* Core Telemetry Specs Table */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-b border-brand-white/10 py-6 mb-8 font-sans">
            <div>
              <span className="block text-[9px] tracking-widest text-brand-white/40 uppercase mb-1">NAME</span>
              <span className="text-sm font-bold text-brand-white tracking-wider">{brotherData.brotherName}</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-widest text-brand-white/40 uppercase mb-1">AGE // SEASON</span>
              <span className="text-sm font-bold text-brand-white tracking-wider">{brotherData.age}</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-widest text-brand-white/40 uppercase mb-1">CLASS</span>
              <span className="text-sm font-bold text-brand-gold tracking-wider font-bebas text-lg">{brotherData.driverClass}</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-widest text-brand-white/40 uppercase mb-1">CURRENT SETTINGS</span>
              <span className="text-sm font-bold text-brand-red tracking-wider uppercase font-semibold">{brotherData.currentStatus}</span>
            </div>
          </div>

          {/* Performance stats progress indicators */}
          <div className="space-y-4">
            <span className="block text-[10px] tracking-widest text-brand-white/40 uppercase font-semibold mb-2">
              TELEMETRY RATINGS:
            </span>
            {brotherData.metrics.map((metric) => (
              <div key={metric.name} className="space-y-1.5">
                <div className="flex justify-between items-end text-[10px] font-mono tracking-widest text-brand-white/80">
                  <span className="font-bebas text-sm text-brand-white">{metric.name}</span>
                  <span>{metric.value}%</span>
                </div>
                {/* Progress track */}
                <div className="w-full h-1.5 bg-brand-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                    className={`h-full ${
                      metric.name === "CHAOS" || metric.name === "SPEED" 
                        ? "bg-brand-red" 
                        : metric.name === "STYLE" 
                        ? "bg-brand-gold" 
                        : "bg-brand-white"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
