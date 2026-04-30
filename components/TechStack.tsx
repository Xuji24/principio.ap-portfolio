"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type TechItem = {
  name: string;
  icon?: string;
  isExternal?: boolean;
  isTextOnly?: boolean;
};

const languages: TechItem[] = [
  { name: "TypeScript", icon: "/Typescript.png" },
  { name: "HTML5", icon: "/HTML.png" },
  { name: "CSS3", icon: "/CSS.png" },
  { name: "JavaScript", icon: "/Javascript.png" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", isExternal: true },
];

const frameworks: TechItem[] = [
  { name: "Next.js", icon: "/NextJS.png" },
  { name: "React", icon: "/ReactJs.png" },
  { name: "Node.js", icon: "/NodeJs.png" },
  { name: "Express", icon: "/expressjs-light.png" },
  { name: "Tailwind CSS", icon: "/tailwindcss.png" },
  { name: "jQuery", icon: "/Jquery.png" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", isExternal: true },
];

const integrations: TechItem[] = [
  { name: "PostgreSQL", icon: "/PostgreSQL.png" },
  { name: "MySQL", icon: "/MySQL.png" },
  { name: "Supabase", icon: "/Supabase.png" },
  { name: "RESTful API", isTextOnly: true },
  { name: "Claude AI", icon: "/anthropic.svg", isExternal: false },
  { name: "Antigravity", icon: "/antigravity-color.svg", isExternal: false },
  { name: "Gemini", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", isExternal: true },
  { name: "GitHub Copilot", icon: "/githubcopilot.svg", isExternal: false },
];

const allTech = [...languages, ...frameworks, ...integrations];

const TechSphere = ({ items }: { items: TechItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0.005, y: 0.005 }); // Auto-rotation speed
  const requestRef = useRef<number>(null);

  // Use a smaller radius on mobile, larger on desktop. 
  // We'll set a standard and rely on CSS scaling if needed.
  const radius = 250; 
  const isInView = useInView(containerRef, { margin: "200px" }); // Pause animation when off-screen

  // Physics loop
  useEffect(() => {
    if (!isInView) return; // Optimization: Stop heavy 3D math when user is not viewing this section

    const updatePhysics = () => {
      if (!isDraggingRef.current) {
        setRotation((prev) => {
          // Apply friction to velocity if it was thrown, otherwise keep a minimum auto-spin
          velocity.current.x *= 0.95; 
          velocity.current.y *= 0.95;
          
          // Minimum auto-rotation
          if (Math.abs(velocity.current.x) < 0.002) velocity.current.x = velocity.current.x > 0 ? 0.002 : -0.002;
          if (Math.abs(velocity.current.y) < 0.002) velocity.current.y = velocity.current.y > 0 ? 0.002 : -0.002;

          return {
            x: prev.x + velocity.current.x,
            y: prev.y + velocity.current.y,
          };
        });
      }
      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isInView]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { x: rotation.x, y: rotation.y };
    velocity.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    // Calculate rotation and store immediate velocity for inertia
    // Ensuring drag direction strictly follows the mouse pointer
    const newRotX = rotationStart.current.x + deltaY * 0.005;
    const newRotY = rotationStart.current.y - deltaX * 0.005;

    velocity.current = {
      x: (newRotX - rotation.x),
      y: (newRotY - rotation.y),
    };

    setRotation({ x: newRotX, y: newRotY });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Pre-calculate Fibonacci sphere points and edges
  const { points, edges } = useMemo(() => {
    const pts = items.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / items.length);
      const theta = Math.sqrt(items.length * Math.PI) * phi;
      return {
        id: i,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        item
      };
    });

    const eds: { source: number, target: number }[] = [];
    pts.forEach((p1, i) => {
      // Find 2 nearest neighbors to create constellation lines
      const distances = pts.map((p2, j) => {
        if (i === j) return Infinity;
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
      });
      // get indices of 2 smallest
      const sortedIndices = distances.map((d, index) => ({d, index})).sort((a,b) => a.d - b.d);
      eds.push({ source: i, target: sortedIndices[0].index });
      eds.push({ source: i, target: sortedIndices[1].index });
    });

    // Remove duplicate edges (undirected)
    const uniqueEds = eds.filter((e, i, a) => 
      a.findIndex(t => (t.source === e.source && t.target === e.target) || (t.source === e.target && t.target === e.source)) === i
    );

    return { points: pts, edges: uniqueEds };
  }, [items]);

  // Calculate 2D projections dynamically
  const projectedPoints = points.map(point => {
    const y1 = point.y * Math.cos(rotation.x) - point.z * Math.sin(rotation.x);
    const z1 = point.y * Math.sin(rotation.x) + point.z * Math.cos(rotation.x);
    const x2 = point.x * Math.cos(rotation.y) + z1 * Math.sin(rotation.y);
    const z2 = -point.x * Math.sin(rotation.y) + z1 * Math.cos(rotation.y);
    
    const focalLength = 800; // Increased to flatten perspective (scale down front items)
    const scale = Number((focalLength / (focalLength + z2)).toFixed(4));
    const x2d = Number((x2 * scale).toFixed(4));
    const y2d = Number((y1 * scale).toFixed(4));
    
    // Front is -radius, Back is +radius
    const opacity = Number((Math.max(0.1, (radius - z2) / (radius * 2))).toFixed(4));
    const zIndex = Math.round(scale * 100);
    // Removed dynamic blur for performance, relying on scale and opacity for depth

    return { ...point, x2d, y2d, scale, opacity, zIndex };
  });

  return (
    <div 
      className="relative w-full h-125 md:h-175 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      ref={containerRef}
    >
      {/* SVG Network Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {/* Translate to center (50% 50%) */}
        <g style={{ transform: "translate(50%, 50%)" }}>
          {edges.map((edge, i) => {
            const p1 = projectedPoints[edge.source];
            const p2 = projectedPoints[edge.target];
            const lineOpacity = (p1.opacity + p2.opacity) / 2;
            return (
              <line 
                key={i} 
                x1={p1.x2d} y1={p1.y2d} 
                x2={p2.x2d} y2={p2.y2d} 
                stroke="rgba(0, 255, 255, 1)" 
                strokeOpacity={lineOpacity * 0.3}
                strokeWidth={1}
              />
            );
          })}
        </g>
      </svg>

      {/* 3D Nodes */}
      {projectedPoints.map((p, i) => {
        return (
          <div
            key={`${p.item.name}-${i}`}
            className="absolute flex flex-col items-center justify-center transition-all duration-75"
            style={{
              transform: `translate3d(${p.x2d}px, ${p.y2d}px, 0) scale(${p.scale})`,
              opacity: p.opacity,
              zIndex: p.zIndex,
              willChange: "transform, opacity",
            }}
          >
            {/* Minimalist Node Design without white background */}
            <div className="relative flex flex-col items-center justify-center p-2 group">
              {/* Subtle glowing backdrop for dark icons to be visible */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {p.item.isTextOnly ? (
                <div className="relative z-10 font-heading font-black text-[12px] tracking-tighter text-center leading-tight drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(0,255,255,1)] transition-all cursor-pointer">
                  <span className="text-[#ef4444]">REST</span><br/><span className="text-white">API</span>
                </div>
              ) : (
                <div className="relative w-12 h-12 flex items-center justify-center z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] transition-all cursor-pointer group-hover:scale-110">
                  <Image src={p.item.icon as string} alt={p.item.name} fill className="object-contain pointer-events-none" unoptimized={p.item.isExternal} draggable={false} />
                </div>
              )}
              
              <span className="font-mono text-[10px] text-cyan-100/50 group-hover:text-cyan-400 transition-colors text-center absolute -bottom-5 font-medium whitespace-nowrap drop-shadow-md pointer-events-none">
                {p.item.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 uppercase tracking-tighter">
            Tech Skills
          </h2>
          <div className="h-1 w-24 bg-primary mb-6" />
          <p className="font-mono text-muted-foreground text-sm max-w-2xl">
            {"// TECHNOLOGIES AND TOOLS I UTILIZE TO BUILD SCALABLE APPLICATIONS."}
          </p>
        </motion.div>
      </div>

      <div className="w-full flex items-center justify-center">
        <TechSphere items={allTech} />
      </div>
    </section>
  );
}
