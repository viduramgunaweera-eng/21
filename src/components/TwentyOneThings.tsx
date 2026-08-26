"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { brotherData } from "@/data/brotherData";

export default function TwentyOneThings() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="things" className="w-full min-h-screen bg-brand-charcoal py-24 px-12 md:px-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-white/5" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-white/5" />

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-[10px] font-sans tracking-[0.25em] text-brand-red mb-2 uppercase font-semibold block">
            07 // ENGINE SPECIFICATIONS & RATINGS
          </span>
          <h2 className="text-4xl md:text-6xl font-bebas font-bold tracking-tight text-brand-white uppercase leading-none mb-4">
            21 THINGS THAT MAKE YOU — YOU<span className="text-brand-red">.</span>
          </h2>
          <p className="text-brand-white/50 text-xs md:text-sm font-sans tracking-wide">
            “Championship-winning core components and telemetry readings.”
          </p>
        </div>

        {/* 21 Telemetry Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {brotherData.twentyOneThings.map((thing) => (
            <motion.div
              key={thing.number}
              variants={cardVariants}
              className="bg-brand-black border border-brand-white/5 p-6 flex flex-col justify-between hover:border-brand-red/40 transition-colors duration-300 relative group overflow-hidden"
            >
              {/* Corner accent pixel */}
              <div className="absolute top-0 right-0 w-1 h-1 bg-brand-red" />
              
              {/* Thin background racing grid line */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-brand-white/2 pointer-events-none" />

              <div>
                {/* Header info */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bebas font-semibold text-brand-red tracking-widest">
                    #{thing.number}
                  </span>
                  <span className="text-[8px] font-mono text-brand-white/30 tracking-widest">
                    SYS.LOG_{thing.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bebas font-bold text-brand-white tracking-wide uppercase mb-2">
                  {thing.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-brand-white/70 leading-relaxed font-sans mt-2">
                {thing.description}
              </p>

              {/* Telemetry bar visual decorator */}
              <div className="flex gap-1.5 mt-6 items-center">
                <div className="h-1.5 w-1.5 rounded-none bg-brand-red" />
                <div className="h-[2px] flex-1 bg-brand-white/10 relative">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-brand-white/35 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
                <span className="text-[7px] font-mono text-brand-white/40">100%_VND</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
