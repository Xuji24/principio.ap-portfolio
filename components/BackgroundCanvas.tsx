"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/components/ThemeContext";

interface VantaEffect {
  destroy(): void;
  resize(): void;
}

const STARS_CONFIG: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 240, density: { enable: true } },
    color: { value: ["#ffffff", "#e8eeff", "#ffeecc", "#c8dfff"] },
    size: { value: { min: 0.4, max: 2.8 } },
    opacity: {
      value: { min: 0.15, max: 1.0 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    move: {
      enable: true,
      speed: 0.12,
      direction: "none",
      random: true,
      outModes: { default: "out" },
    },
    shape: { type: "circle" },
  },
  detectRetina: true,
};

export default function BackgroundCanvas() {
  const { theme } = useTheme();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<VantaEffect | null>(null);
  const destroyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [particlesReady, setParticlesReady] = useState(false);

  const isDark = theme === "dark";

  // Initialise tsParticles engine once on mount
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  // Boot Vanta clouds (runs client-side only via dynamic imports)
  const bootVanta = useCallback(async () => {
    if (!vantaRef.current || vantaEffectRef.current) return;
    const THREE = await import("three");
    const { default: CLOUDS } = await import("vanta/dist/vanta.clouds.min");
    if (vantaRef.current && !vantaEffectRef.current) {
      vantaEffectRef.current = CLOUDS({
        el: vantaRef.current,
        THREE,
        backgroundColor: 0xdbeafe,
        cloudColor: 0xffffff,
        cloudShadowColor: 0xa0c8e8,
        sunColor: 0xf6c900,
        sunGlareColor: 0xff8800,
        sunlightColor: 0xfff0b0,
        speed: 1.0,
      });
    }
  }, []);

  // Manage Vanta lifecycle based on theme
  useEffect(() => {
    if (!isDark) {
      // Switching to light — cancel any pending destroy, start clouds
      if (destroyTimerRef.current) {
        clearTimeout(destroyTimerRef.current);
        destroyTimerRef.current = null;
      }
      bootVanta();
    } else {
      // Switching to dark — destroy clouds after the CSS fade completes (1200 ms)
      destroyTimerRef.current = setTimeout(() => {
        vantaEffectRef.current?.destroy();
        vantaEffectRef.current = null;
      }, 1300);
    }

    return () => {
      if (destroyTimerRef.current) clearTimeout(destroyTimerRef.current);
    };
  }, [isDark, bootVanta]);

  // Full cleanup on component unmount
  useEffect(() => {
    return () => {
      vantaEffectRef.current?.destroy();
    };
  }, []);

  return (
    <>
      {/* ── Light mode: Vanta animated 3-D clouds (WebGL) ── */}
      <div
        ref={vantaRef}
        className="fixed inset-0 -z-10 w-full h-full transition-opacity duration-[1200ms]"
        style={{ opacity: isDark ? 0 : 1, pointerEvents: "none" }}
        aria-hidden="true"
      />

      {/* ── Dark mode: deep-space nebula gradient + tsParticles stars ── */}
      <div
        className="fixed inset-0 -z-10 w-full h-full transition-opacity duration-[1200ms]"
        style={{
          opacity: isDark ? 1 : 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(ellipse at 22% 25%, rgba(88,28,135,0.45) 0%, transparent 52%)",
            "radial-gradient(ellipse at 78% 68%, rgba(30,58,138,0.50) 0%, transparent 52%)",
            "radial-gradient(ellipse at 50% 95%, rgba(15,23,42,0.75) 0%, transparent 60%)",
            "#050b14",
          ].join(", "),
        }}
        aria-hidden="true"
      >
        {particlesReady && isDark && (
          <Particles
            id="tsparticles-stars"
            className="absolute inset-0 w-full h-full"
            options={STARS_CONFIG}
          />
        )}
      </div>
    </>
  );
}
