"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { brotherData } from "@/data/brotherData";

export default function MemoryArchive() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  // Expose a global rev event trigger on hover to play F1 engine revs!
  const handleCardMouseEnter = () => {
    if (typeof window !== "undefined" && (window as any)._triggerF1Rev) {
      (window as any)._triggerF1Rev();
    }
  };

  return (
    <section id="archive" className="w-full min-h-screen bg-brand-black py-24 editorial-container relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/3 left-10 text-[100px] font-bebas text-brand-white/2 select-none pointer-events-none tracking-widest">
        THE ARCHIVE
      </div>
      <div className="absolute bottom-1/4 right-10 text-[150px] font-bebas text-brand-red/2 select-none pointer-events-none tracking-widest">
        VD-21
      </div>

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-[10px] font-sans tracking-[0.25em] text-brand-red mb-2 uppercase font-semibold block">
            04 // PHOTO ARCHIVES
          </span>
          <h2 className="text-4xl md:text-6xl font-bebas font-bold tracking-tight text-brand-white uppercase leading-none mb-4">
            THE ARCHIVE<span className="text-brand-red">.</span>
          </h2>
          <p className="text-brand-white/50 text-xs md:text-sm font-sans tracking-wide">
            “Proof that the best moments were never planned.”
          </p>
        </div>

        {/* Asymmetric Collage Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 md:gap-x-12 auto-rows-max"
        >
          {brotherData.archive.map((image, idx) => (
            <motion.div
              key={image.title}
              variants={cardVariants}
              onMouseEnter={handleCardMouseEnter}
              className={`${image.size} ${image.rotation} bg-brand-charcoal p-4 pb-8 border border-brand-white/5 shadow-2xl relative group hover:border-brand-red transition-colors duration-500 cursor-none`}
              data-cursor="view"
            >
              {/* Tape aesthetics */}
              {idx % 2 === 0 ? (
                <div className="tape-top" />
              ) : (
                <div className="tape-side" />
              )}

              {/* Red racing corner lines animating on hover */}
              <div className="absolute inset-0 border border-brand-red scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none" />

              {/* Photo Area */}
              <div className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden bg-brand-black mb-4">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center filter grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Visual grid blueprint mark */}
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-2 left-2 text-[8px] font-mono text-brand-white/40 tracking-widest bg-brand-black/70 px-1 py-0.5">
                  CAM_CH_0{idx + 1}
                </div>
              </div>

              {/* Caption details */}
              <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bebas tracking-wide text-brand-white text-lg">
                    {image.title}
                  </h3>
                  <span className="text-[8px] font-mono text-brand-red font-semibold tracking-widest">
                    #{idx + 21}
                  </span>
                </div>
                <p className="text-[10px] font-graffiti text-brand-gold/80 mt-1 select-none">
                  {image.annotation}
                </p>
              </div>

              {/* Small telemetry graphic elements */}
              <div className="absolute bottom-2 right-4 text-[7px] font-mono text-brand-white/20 select-none">
                EXP.21_LAT // SEC_0{idx + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
