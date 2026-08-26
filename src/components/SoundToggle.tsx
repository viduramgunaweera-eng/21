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

  const osc3Ref = useRef<OscillatorNode | null>(null);
  const osc3GainRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  const startEngineSound = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime); // Highly audible on mobile but balanced
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low pass filter with low resonance peak
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime); // Opens up to 1800Hz when revving
      filter.Q.setValueAtTime(3, ctx.currentTime);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Base idle pitch for a V10 (around 120Hz)
      const baseIdlePitch = 120;

      // Oscillator 1 - Sawtooth wave (main base growl)
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(baseIdlePitch, ctx.currentTime);
      osc1.connect(filter);
      osc1Ref.current = osc1;

      // Oscillator 2 - Sawtooth wave (detuned for chorused texture)
      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(baseIdlePitch + 0.8, ctx.currentTime);
      osc2.connect(filter);
      osc2Ref.current = osc2;

      // Oscillator 3 - High screaming 5th-order harmonic (authentic V10 acoustic signature)
      const osc3 = ctx.createOscillator();
      osc3.type = "sawtooth";
      osc3.frequency.setValueAtTime(baseIdlePitch * 5.0, ctx.currentTime);
      
      const osc3Gain = ctx.createGain();
      osc3Gain.gain.setValueAtTime(0.02, ctx.currentTime); // Subtle growl at idle, screams at high speed
      
      osc3.connect(osc3Gain);
      osc3Gain.connect(filter);
      osc3Ref.current = osc3;
      osc3GainRef.current = osc3Gain;

      // LFO to modulate base frequencies slightly for organic rumbling idle
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(1.2, ctx.currentTime); // Modulate at 1.2Hz

      const lfoGain1 = ctx.createGain();
      lfoGain1.gain.setValueAtTime(4.0, ctx.currentTime); // Modulate base frequency by +/- 4Hz
      lfo.connect(lfoGain1);
      lfoGain1.connect(osc1.frequency);
      lfoGain1.connect(osc2.frequency);

      const lfoGain2 = ctx.createGain();
      lfoGain2.gain.setValueAtTime(20.0, ctx.currentTime); // Modulate the 5th-order harmonic proportionally
      lfo.connect(lfoGain2);
      lfoGain2.connect(osc3.frequency);
      
      lfo.start();
      osc1.start();
      osc2.start();
      osc3.start();

      lfoRef.current = lfo;

      // --- SCROLL VELOCITY MODULATION ---
      let lastScrollY = window.scrollY;
      let lastTime = performance.now();
      let targetPitchMultiplier = 1.0;
      let currentPitchMultiplier = 1.0;

      const handleScroll = () => {
        const now = performance.now();
        const currentScrollY = window.scrollY;
        const dt = now - lastTime;
        if (dt > 0) {
          const dy = Math.abs(currentScrollY - lastScrollY);
          const speed = dy / dt; // pixels per millisecond
          // Map scroll speed: idle multiplier is 1.0, max speed revs it up to 3.5x
          targetPitchMultiplier = 1.0 + Math.min(speed * 2.0, 2.5);
        }
        lastScrollY = currentScrollY;
        lastTime = now;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      scrollListenerRef.current = handleScroll;

      // Animation frame update loop (flywheel inertia simulation)
      const updateAudio = () => {
        if (!audioCtxRef.current || ctx.state === "suspended") return;

        // Constantly decay target back to idle (1.0)
        targetPitchMultiplier += (1.0 - targetPitchMultiplier) * 0.08;

        // Interpolate actual pitch. Quick acceleration (0.15) vs slow engine deceleration (0.03)
        const easeRate = targetPitchMultiplier > currentPitchMultiplier ? 0.15 : 0.03;
        currentPitchMultiplier += (targetPitchMultiplier - currentPitchMultiplier) * easeRate;

        const baseF = baseIdlePitch * currentPitchMultiplier;
        const nowTime = ctx.currentTime;

        // Set frequencies
        osc1.frequency.setValueAtTime(baseF, nowTime);
        osc2.frequency.setValueAtTime(baseF + 0.8, nowTime);
        osc3.frequency.setValueAtTime(baseF * 5.0, nowTime);

        // Adjust the high-pitched harmonic volume (gain) based on throttle/RPM
        const screamGain = 0.02 + (currentPitchMultiplier - 1.0) * 0.08;
        osc3Gain.gain.setValueAtTime(screamGain, nowTime);

        // Open up the low-pass filter cutoff with high RPMs to let the metallic scream through
        const filterF = 450 + (currentPitchMultiplier - 1.0) * 1200;
        filter.frequency.setValueAtTime(filterF, nowTime);

        animationFrameRef.current = requestAnimationFrame(updateAudio);
      };

      animationFrameRef.current = requestAnimationFrame(updateAudio);

      // Expose manual click rev blips
      const triggerRev = () => {
        targetPitchMultiplier = 3.2; // Blip the engine revs
      };

      document.addEventListener("click", triggerRev);
      (window as any)._triggerF1Rev = triggerRev;

    } catch (e) {
      console.error("Failed to initialize audio engine", e);
    }
  };

  const stopEngineSound = () => {
    try {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (scrollListenerRef.current) {
        window.removeEventListener("scroll", scrollListenerRef.current);
        scrollListenerRef.current = null;
      }
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
      if (osc3Ref.current) {
        osc3Ref.current.stop();
        osc3Ref.current.disconnect();
        osc3Ref.current = null;
      }
      if (lfoRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
        lfoRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      
      document.removeEventListener("click", (window as any)._triggerF1Rev);
    } catch (e) {
      console.error(e);
    }
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
