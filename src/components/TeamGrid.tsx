"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Shield, Sparkles, Zap, Heart, Award } from "lucide-react";
import { brotherData } from "@/data/brotherData";

export default function TeamGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  // Assign icons to crew roles for editorial look
  const getRoleIcon = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes("principal")) return <Shield className="text-brand-red" size={16} />;
    if (roleLower.includes("engineer")) return <Zap className="text-brand-gold" size={16} />;
    if (roleLower.includes("ceo") || roleLower.includes("executive")) return <Heart className="text-brand-red" size={16} />;
    if (roleLower.includes("chaos")) return <Sparkles className="text-brand-gold" size={16} />;
    return <Award className="text-brand-silver" size={16} />;
  };

  return (
    <section id="grid" className="w-full min-h-screen bg-brand-charcoal py-24 px-12 md:px-24 flex items-center relative overflow-hidden">
      {/* Background checks pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#050505_25%,transparent_25%),linear-gradient(-45deg,#050505_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#050505_75%),linear-gradient(-45deg,transparent_75%,#050505_75%)] bg-[size:40px_40px] opacity-2 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-[10px] font-sans tracking-[0.25em] text-brand-red mb-2 uppercase font-semibold block">
            05 // TEAM PRINCIPALS & PADDOCK CREW
          </span>
          <h2 className="text-4xl md:text-6xl font-bebas font-bold tracking-tight text-brand-white uppercase leading-none mb-4">
            THE GRID<span className="text-brand-red">.</span>
          </h2>
          <p className="text-brand-white/50 text-xs md:text-sm font-sans tracking-wide">
            “The pit crew and race directors that keep the drive going.”
          </p>
        </div>

        {/* Collective Collectible Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {brotherData.teamGrid.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ y: -8, borderColor: "#E10600" }}
              className="bg-brand-black border border-brand-white/5 p-6 flex flex-col justify-between aspect-[3/4.2] relative group transition-all duration-300 overflow-hidden cursor-none"
              data-cursor="explore"
            >
              {/* Glossy card reflect shine */}
              <div className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-br from-brand-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Diagonal speed lines background details */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[linear-gradient(135deg,transparent_45%,rgba(225,6,0,0.06)_45%,rgba(225,6,0,0.06)_55%,transparent_55%)] bg-[size:10px_10px] pointer-events-none" />

              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-brand-white/5 pb-4">
                <div className="flex items-center gap-2">
                  {getRoleIcon(member.role)}
                  <span className="text-[8px] font-mono tracking-widest text-brand-white/40 uppercase">
                    OFFICIAL_CREW
                  </span>
                </div>
                <span className="text-2xl font-bebas font-bold text-brand-white/20 group-hover:text-brand-red/40 transition-colors duration-300">
                  {member.driverNumber}
                </span>
              </div>

              {/* Card Body - Name */}
              <div className="my-6">
                <span className="block text-[9px] font-mono tracking-widest text-brand-red mb-1">
                  MEMBER // {member.name.toUpperCase()}
                </span>
                <h3 className="text-2xl md:text-3xl font-bebas font-bold text-brand-white tracking-wide uppercase leading-tight">
                  {member.name}
                </h3>
              </div>

              {/* Card Footer - Role */}
              <div className="border-t border-brand-white/5 pt-4 flex flex-col gap-1.5 font-sans">
                <span className="text-[8px] tracking-widest text-brand-white/30 uppercase">
                  PADDOCK ROLE
                </span>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                  {member.role}
                </span>
              </div>

              {/* Barcode visual decoration */}
              <div className="absolute bottom-2 left-6 right-6 h-3 flex items-center justify-between opacity-10">
                <div className="w-[2px] h-full bg-brand-white" />
                <div className="w-[1px] h-full bg-brand-white" />
                <div className="w-[3px] h-full bg-brand-white" />
                <div className="w-[1px] h-full bg-brand-white" />
                <div className="w-[2px] h-full bg-brand-white" />
                <div className="w-[1px] h-full bg-brand-white" />
                <div className="w-[4px] h-full bg-brand-white" />
                <div className="w-[1px] h-full bg-brand-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
