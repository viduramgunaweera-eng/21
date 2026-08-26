"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brotherData } from "@/data/brotherData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "HOME", href: "#hero" },
    { name: "THE DRIVER", href: "#driver" },
    { name: "THE STORY", href: "#story" },
    { name: "THE GRID", href: "#grid" },
    { name: "MEMORIES", href: "#archive" },
    { name: "FINAL LAP", href: "#final" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 editorial-container py-4 md:py-6 flex items-center justify-between mix-blend-difference md:mix-blend-normal">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="text-lg md:text-xl font-bebas tracking-widest text-brand-white hover:text-brand-red transition-colors duration-300"
        >
          21 / {brotherData.brotherInitials}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 px-6 py-2.5 bg-brand-black/40 border border-brand-white/5 backdrop-blur-md rounded-none">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-[10px] font-sans tracking-widest text-brand-white/70 hover:text-brand-red transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-white hover:text-brand-red transition-colors duration-200"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-brand-black/98 z-40 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="text-2xl font-bebas tracking-widest text-brand-white hover:text-brand-red transition-colors duration-200"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
