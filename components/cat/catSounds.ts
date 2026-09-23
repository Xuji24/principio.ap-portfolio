"use client";
import { useCallback, useRef } from "react";

// Rapid clicks within this window count toward a "spam" streak.
const SPAM_WINDOW_MS = 350;
const SPAM_THRESHOLD = 3;

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!ctx) ctx = new Ctx();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(audio: AudioContext, duration: number): AudioBuffer {
  const size = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, size, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

// A real recorded meow (Mixkit "Sweet Kitty Meow", free/no-attribution
// license) — synthesizing a convincing voiced meow from oscillators kept
// falling short, so we just play the clip.
const MEOW_SRC = "/sounds/cat-meow.wav";

export function playMeow() {
  if (typeof window === "undefined") return;
  const audio = new Audio(MEOW_SRC);
  audio.volume = 0.8;
  void audio.play().catch(() => {});
}

// A real hiss is a sudden, broadband, gritty burst — a cat snaps its mouth
// open and pushes air through bared teeth almost instantly, nothing like a
// slow-building tone. (The earlier version leaned too much on one narrow,
// smoothly-modulated band, which read as a synth whistle rather than a
// threat — same lesson playMeow already learned about a single clean
// oscillator not reading as "cat": here the fix is broadening the noise
// and sharpening the envelope, not switching to a recording, since a hiss
// is unpitched and synthesizes far more convincingly than a meow's voiced
// pitch contour does.)
export function playHiss() {
  const audio = getCtx();
  if (!audio) return;
  const now = audio.currentTime;
  const dur = 0.42;

  const out = audio.createGain();
  out.connect(audio.destination);

  // Fast, uneven crackle — turbulent airflow through bared teeth flickers
  // erratically, not a smooth sine tremolo. A sawtooth at a quicker rate
  // gives it that ragged edge.
  const flutter = audio.createGain();
  flutter.gain.value = 0;
  flutter.connect(out);

  const flutterOsc = audio.createOscillator();
  flutterOsc.type = "sawtooth";
  flutterOsc.frequency.value = 32;
  const flutterDepth = audio.createGain();
  flutterDepth.gain.value = 0.28;
  flutterOsc.connect(flutterDepth);
  flutterDepth.connect(flutter.gain);

  const flutterBase = audio.createConstantSource();
  flutterBase.offset.value = 0.78;
  flutterBase.connect(flutter.gain);

  flutterOsc.start(now);
  flutterOsc.stop(now + dur);
  flutterBase.start(now);
  flutterBase.stop(now + dur);

  const noise = audio.createBufferSource();
  noise.buffer = noiseBuffer(audio, dur);

  // Bright, broadband "sss" — real hiss noise spreads across a wide swath
  // of high frequencies, not one narrow whistle-y peak.
  const sBand = audio.createBiquadFilter();
  sBand.type = "bandpass";
  sBand.frequency.value = 6500;
  sBand.Q.value = 0.5;

  // Mid "shh" body, fills the gap between the bright band and the growl.
  const mBand = audio.createBiquadFilter();
  mBand.type = "bandpass";
  mBand.frequency.value = 3200;
  mBand.Q.value = 0.5;

  // Low breathy/growl undertone underneath, for menace.
  const hBand = audio.createBiquadFilter();
  hBand.type = "bandpass";
  hBand.frequency.value = 1200;
  hBand.Q.value = 0.6;
  const hGain = audio.createGain();
  hGain.gain.value = 0.4;

  noise.connect(sBand);
  sBand.connect(flutter);
  noise.connect(mBand);
  mBand.connect(flutter);
  noise.connect(hBand);
  hBand.connect(hGain);
  hGain.connect(flutter);

  // Snaps on almost instantly, a short hold, then a hard cutoff — a hiss
  // ends abruptly as the mouth closes, it doesn't taper gently like a sigh.
  out.gain.setValueAtTime(0.0001, now);
  out.gain.linearRampToValueAtTime(0.4, now + 0.025);
  out.gain.setValueAtTime(0.4, now + 0.16);
  out.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  noise.start(now);
  noise.stop(now + dur);
}

// Meows on a normal click; switches to a hiss once clicks come in fast
// enough in a row to count as spamming. Returns whether this click was
// classified as spam, so callers (e.g. the reaction bubble) can react the
// same way without re-detecting the streak themselves.
export function useCatClickSound() {
  const lastClick = useRef(0);
  const streak = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    streak.current = now - lastClick.current < SPAM_WINDOW_MS ? streak.current + 1 : 1;
    lastClick.current = now;

    const spamming = streak.current >= SPAM_THRESHOLD;
    if (spamming) playHiss();
    else playMeow();
    return spamming;
  }, []);
}
