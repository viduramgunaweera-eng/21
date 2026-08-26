"use client";

import { motion, Variants } from "framer-motion";

export default function GraffitiBreak() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const drawSVG: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <section id="graffiti" className="w-full min-h-[70vh] bg-brand-black flex items-center justify-center relative overflow-hidden py-24 px-6 select-none">
      {/* Decorative Spray paint texture backdrops */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 spray-texture opacity-30 rounded-full blur-[40px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 spray-texture opacity-20 rounded-full blur-[60px] pointer-events-none" />

      {/* Checkered flag fragments in background */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 h-32 opacity-[0.03] rotate-12 bg-[repeating-conic-gradient(#fff_0_25%,transparent_0_50%)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute -right-10 top-1/3 w-40 h-24 opacity-[0.03] -rotate-12 bg-[repeating-conic-gradient(#fff_0_25%,transparent_0_50%)] bg-[size:16px_16px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl text-center flex flex-col items-center justify-center"
      >
        {/* Animated Hand-drawn Arrow SVG */}
        <svg 
          className="absolute -top-12 -left-12 w-24 h-24 md:w-32 md:h-32 text-brand-red pointer-events-none hidden md:block" 
          viewBox="0 0 100 100" 
          fill="none"
        >
          <motion.path
            variants={drawSVG}
            d="M20,80 Q40,20 80,40 M80,40 L65,30 M80,40 L70,55"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Big Headline Layer 1 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 0.08, scale: 1, transition: { duration: 1 } }
          }}
          className="absolute text-[120px] sm:text-[180px] md:text-[240px] font-bebas font-extrabold text-stroke-white pointer-events-none"
        >
          VD // 2026
        </motion.div>

        {/* Central Street Text */}
        <div className="relative flex flex-col items-center gap-1 md:gap-4 z-10 leading-none">
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-[60px] sm:text-[90px] md:text-[150px] font-bebas font-black tracking-tighter text-brand-white leading-none uppercase"
          >
            21 YEARS<span className="text-brand-red">.</span>
          </motion.h2>

          {/* Overlapping slanted hand graffiti */}
          <motion.h3 
            variants={{
              hidden: { opacity: 0, rotate: 0, scale: 0.9 },
              visible: { 
                opacity: 1, 
                rotate: -6, 
                scale: 1, 
                transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.1], delay: 0.3 } 
              }
            }}
            className="text-4xl sm:text-6xl md:text-8xl font-graffiti text-brand-red tracking-wider leading-none mt-2"
          >
            ZERO BRAKES.
          </motion.h3>
        </div>

        {/* White chalk stars & scribbles SVG */}
        <svg 
          className="absolute -bottom-8 -right-8 w-24 h-24 text-brand-gold/60 pointer-events-none hidden md:block" 
          viewBox="0 0 100 100" 
          fill="none"
        >
          {/* Handdrawn Star */}
          <motion.path
            variants={drawSVG}
            d="M50,15 L58,35 L80,35 L62,48 L70,70 L50,56 L30,70 L38,48 L20,35 L42,35 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Crossouts decoration */}
        <svg 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-full text-brand-red/10 pointer-events-none"
          viewBox="0 0 400 200" 
          fill="none"
        >
          {/* Scribbled arrows or lines */}
          <motion.path
            variants={drawSVG}
            d="M30,160 L370,50 M360,150 L50,40"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Tech label */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.4, transition: { delay: 0.6 } }
          }}
          className="mt-12 text-[9px] font-mono tracking-[0.3em] text-brand-white uppercase"
        >
          STREET_ART_SPREAD // BLOCK_06
        </motion.div>
      </motion.div>
    </section>
  );
}
