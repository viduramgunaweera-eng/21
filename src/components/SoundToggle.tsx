"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

function makeDistortionCurve(amount = 25) {
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const osc3Ref = useRef<OscillatorNode | null>(null);
  const osc4Ref = useRef<OscillatorNode | null>(null);
  const osc3GainRef = useRef<GainNode | null>(null);
  const osc4GainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const noiseFilterRef = useRef<BiquadFilterNode | null>(null);
  const waveShaperRef = useRef<WaveShaperNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  const startEngineSound = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime); // High audibility, comfortable volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 2. Main Filter (frame the frequency response)
      const mainFilter = ctx.createBiquadFilter();
      mainFilter.type = "lowpass";
      mainFilter.frequency.setValueAtTime(450, ctx.currentTime);
      mainFilter.Q.setValueAtTime(1.5, ctx.currentTime);
      mainFilter.connect(masterGain);
      filterNodeRef.current = mainFilter;

      // 3. WaveShaper Node (Adds realistic mechanical overdrive distortion to synth waves)
      const waveShaper = ctx.createWaveShaper();
      waveShaper.curve = makeDistortionCurve(35); // Soft mechanical exhaust clipping
      waveShaper.oversample = "4x";
      waveShaper.connect(mainFilter);
      waveShaperRef.current = waveShaper;

      // V12 Base Pitch (idle growl at 95Hz)
      const baseIdlePitch = 95;

      // 4. Oscillators Setup
      // Osc 1 - Sawtooth wave (main V12 cylinder growl)
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(baseIdlePitch, ctx.currentTime);
      osc1.connect(waveShaper);
      osc1Ref.current = osc1;

      // Osc 2 - Sawtooth wave (slightly detuned for organic thickness)
      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(baseIdlePitch + 0.6, ctx.currentTime);
      osc2.connect(waveShaper);
      osc2Ref.current = osc2;

      // Osc 3 - Screaming V12 3rd harmonic (exhaust resonance)
      const osc3 = ctx.createOscillator();
      osc3.type = "sawtooth";
      osc3.frequency.setValueAtTime(baseIdlePitch * 3.0, ctx.currentTime);
      
      const osc3Gain = ctx.createGain();
      osc3Gain.gain.setValueAtTime(0.04, ctx.currentTime); // Subtle growl at idle
      osc3.connect(osc3Gain);
      osc3Gain.connect(waveShaper);
      osc3Ref.current = osc3;
      osc3GainRef.current = osc3Gain;

      // Osc 4 - Screaming V12 6th harmonic (the high pitch exhaust howl)
      const osc4 = ctx.createOscillator();
      osc4.type = "sawtooth";
      osc4.frequency.setValueAtTime(baseIdlePitch * 6.0, ctx.currentTime);
      
      const osc4Gain = ctx.createGain();
      osc4Gain.gain.setValueAtTime(0.02, ctx.currentTime); // Very quiet at idle, loud when revving
      osc4.connect(osc4Gain);
      osc4Gain.connect(waveShaper);
      osc4Ref.current = osc4;
      osc4GainRef.current = osc4Gain;

      // 5. White Noise Generator (Exhaust Gas Velocity rush)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const channelData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        channelData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Bandpass filter to sculpt the exhaust noise
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(300, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(2.0, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, ctx.currentTime); // Soft at idle

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(waveShaper); // Noise passes through distortion for structural mechanical grind!
      
      noiseSource.start();
      
      noiseSourceRef.current = noiseSource;
      noiseGainRef.current = noiseGain;
      noiseFilterRef.current = noiseFilter;

      // 6. LFO to modulate idle frequencies for mechanical instability
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(1.5, ctx.currentTime);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(3.0, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      lfo.start();
      osc1.start();
      osc2.start();
      osc3.start();
      osc4.start();
      lfoRef.current = lfo;

      // --- SCROLL VELOCITY ENGINE ENGINE ---
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
          // Map scroll speed: idle is 1.0, max is 3.5x
          targetPitchMultiplier = 1.0 + Math.min(speed * 2.2, 2.5);
        }
        lastScrollY = currentScrollY;
        lastTime = now;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      scrollListenerRef.current = handleScroll;

      // Physics loop (inertia simulation)
      const updateAudio = () => {
        if (!audioCtxRef.current || ctx.state === "suspended") return;

        // Decelerate decay back to idle
        targetPitchMultiplier += (1.0 - targetPitchMultiplier) * 0.07;

        // Acceleration inertia
        const easeRate = targetPitchMultiplier > currentPitchMultiplier ? 0.15 : 0.03;
        currentPitchMultiplier += (targetPitchMultiplier - currentPitchMultiplier) * easeRate;

        const baseF = baseIdlePitch * currentPitchMultiplier;
        const nowTime = ctx.currentTime;

        // Update oscillator frequencies
        osc1.frequency.setValueAtTime(baseF, nowTime);
        osc2.frequency.setValueAtTime(baseF + 0.6, nowTime);
        osc3.frequency.setValueAtTime(baseF * 3.0, nowTime);
        osc4.frequency.setValueAtTime(baseF * 6.0, nowTime);

        // Scale harmonic volumes (gain) with RPM (screams at high RPMs)
        const osc3Vol = 0.04 + (currentPitchMultiplier - 1.0) * 0.06;
        const osc4Vol = 0.02 + (currentPitchMultiplier - 1.0) * 0.08;
        osc3Gain.gain.setValueAtTime(osc3Vol, nowTime);
        osc4Gain.gain.setValueAtTime(osc4Vol, nowTime);

        // Update noise filter (exhaust speed rushes higher!)
        const noiseF = 300 + (currentPitchMultiplier - 1.0) * 900;
        noiseFilter.frequency.setValueAtTime(noiseF, nowTime);

        const noiseVol = 0.015 + (currentPitchMultiplier - 1.0) * 0.04;
        noiseGain.gain.setValueAtTime(noiseVol, nowTime);

        // Open up the master lowpass filter cutoff to let the screaming mechanical frequencies through
        const mainFilterF = 450 + (currentPitchMultiplier - 1.0) * 1600;
        mainFilter.frequency.setValueAtTime(mainFilterF, nowTime);

        animationFrameRef.current = requestAnimationFrame(updateAudio);
      };

      animationFrameRef.current = requestAnimationFrame(updateAudio);

      // Expose manual click rev blips
      const triggerRev = () => {
        targetPitchMultiplier = 3.2; // Blip the throttle!
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
      if (osc4Ref.current) {
        osc4Ref.current.stop();
        osc4Ref.current.disconnect();
        osc4Ref.current = null;
      }
      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
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
