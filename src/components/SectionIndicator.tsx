"use client";

import React, { useEffect, useState } from "react";

const SECTIONS = [
  "hero",
  "driver",
  "story",
  "archive",
  "grid",
  "graffiti",
  "things",
  "future",
  "final",
];

export default function SectionIndicator() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = 0; i < SECTIONS.length; i++) {
        const element = document.getElementById(SECTIONS[i]);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveIdx(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-6 bottom-12 z-40 hidden md:flex flex-col items-center gap-4 select-none font-bebas tracking-widest">
      <div className="flex flex-col items-center gap-1">
        <span className="text-brand-red text-sm font-bold">
          {String(activeIdx + 1).padStart(2, "0")}
        </span>
        <div className="w-[1px] h-12 bg-brand-white/10 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-brand-red transition-all duration-300 ease-out"
            style={{ 
              height: `${((activeIdx + 1) / SECTIONS.length) * 100}%` 
            }}
          />
        </div>
        <span className="text-brand-white/30 text-xs">
          {String(SECTIONS.length).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-brand-white/40 uppercase rotate-90 origin-left translate-x-1 translate-y-8 mt-2">
        LAP {activeIdx + 1}
      </span>
    </div>
  );
}
