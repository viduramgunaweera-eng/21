"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  const startEngineSound = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime); // Low volume background rumble
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low pass filter to make the engine hum deep and growling
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, ctx.currentTime); // Cutoff high harsh frequencies
      filter.Q.setValueAtTime(4, ctx.currentTime);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Oscillator 1 - Sawtooth wave (main engine buzz)
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(62, ctx.currentTime); // B1 note, low rumble
      osc1.connect(filter);
      osc1Ref.current = osc1;

      // Oscillator 2 - Sawtooth wave (slightly detuned for organic chorus)
      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(62.8, ctx.currentTime); // Slightly detuned
      osc2.connect(filter);
      osc2Ref.current = osc2;

      // LFO to modulate engine pitch (creating the idling rumble pattern)
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.8, ctx.currentTime); // Modulate at 0.8 Hz (idle cycle)

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(3.5, ctx.currentTime); // Modulate frequency by +/- 3.5Hz

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);
      
      lfo.start();
      osc1.start();
      osc2.start();

      lfoRef.current = lfo;

      // Add dynamic revving on click/interact events
      const triggerRev = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
        const now = audioCtxRef.current.currentTime;
        
        // Rev the engine: increase frequency rapidly then decay
        osc1.frequency.cancelScheduledValues(now);
        osc2.frequency.cancelScheduledValues(now);
        filter.frequency.cancelScheduledValues(now);

        // Accelerate
        osc1.frequency.exponentialRampToValueAtTime(110, now + 0.15);
        osc2.frequency.exponentialRampToValueAtTime(111, now + 0.15);
        filter.frequency.exponentialRampToValueAtTime(250, now + 0.15);

        // Decelerate back to base idle
        osc1.frequency.exponentialRampToValueAtTime(62, now + 0.8);
        osc2.frequency.exponentialRampToValueAtTime(62.8, now + 0.8);
        filter.frequency.exponentialRampToValueAtTime(140, now + 0.8);
      };

      document.addEventListener("click", triggerRev);
      (window as any)._triggerF1Rev = triggerRev; // Expose globally for hover triggers

    } catch (e) {
      console.error("Failed to initialize audio engine", e);
    }
  };

  const stopEngineSound = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
      }
      if (lfoRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      
      document.removeEventListener("click", (window as any)._triggerF1Rev);
    } catch (e) {
      console.error(e);
    }

    osc1Ref.current = null;
    osc2Ref.current = null;
    lfoRef.current = null;
    audioCtxRef.current = null;
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopEngineSound();
      setIsPlaying(false);
    } else {
      startEngineSound();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopEngineSound();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-4 py-2 bg-brand-black/80 hover:bg-brand-red border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-black backdrop-blur-md rounded-none text-xs font-bebas tracking-widest transition-all duration-300 group"
      aria-label="Toggle ambient racing audio"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-white"></span>
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
        )}
      </span>
      <span>ENGINE SOUND: {isPlaying ? "ON" : "OFF"}</span>
      {isPlaying ? (
        <Volume2 size={14} className="animate-pulse" />
      ) : (
        <VolumeX size={14} className="opacity-55 group-hover:opacity-100" />
      )}
    </button>
  );
}
