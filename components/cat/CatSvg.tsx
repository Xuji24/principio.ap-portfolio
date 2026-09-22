import { forwardRef } from "react";

type Props = { pose?: "sit" | "stand"; className?: string };

export const CatSvg = forwardRef<SVGSVGElement, Props>(function CatSvg({ pose = "sit", className }, ref) {
  return (
    <svg ref={ref} viewBox="0 0 140 152" className={className} aria-hidden="true" style={{ overflow: "visible" }}>
      <g className="cat-root">
        <g className="tailg">
          <path
            d="M98 132 C130 134 138 108 129 91 C122 78 104 80 102 91 C100 100 109 105 115 100"
            fill="none" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round"
          />
        </g>
        <path
          className="body-sit"
          style={{ opacity: pose === "sit" ? 1 : 0, transition: "opacity 80ms linear" }}
          d="M70 64 C43 64 29 86 29 110 L29 128 C29 135 33 139 40 139 L100 139 C107 139 111 135 111 128 L111 110 C111 86 97 64 70 64 Z"
          fill="var(--ink)"
        />
        <path
          className="body-stand"
          style={{ opacity: pose === "stand" ? 1 : 0, transition: "opacity 80ms linear" }}
          d="M70 42 C55 42 46 64 46 92 L46 128 C46 135 50 139 57 139 L83 139 C90 139 94 135 94 128 L94 92 C94 64 85 42 70 42 Z"
          fill="var(--ink)"
        />
        <ellipse cx="55" cy="136" rx="12" ry="7.5" fill="var(--ink)" opacity=".82" />
        <ellipse cx="85" cy="136" rx="12" ry="7.5" fill="var(--ink)" opacity=".82" />

        <g className="arms" style={{ opacity: 0, transition: "opacity 80ms linear" }}>
          <path d="M52 74 q-13 10 -11 25 q1 8 8 7 q7 -1 6 -9 q-1 -11 7 -18z" fill="var(--ink)" />
          <g className="arm-r">
            <path d="M90 72 q17 4 23 18 q3 8 -4 11 q-7 3 -10 -4 q-4 -10 -14 -13z" fill="var(--ink)" />
            <circle cx="113" cy="92" r="8.5" fill="var(--ink)" opacity=".82" />
          </g>
        </g>

        <g className="headwrap">
          <g className="head">
            <path className="ear" d="M38 31 L29 3 L61 18 Z" fill="var(--ink)" />
            <path className="ear" d="M102 31 L111 3 L79 18 Z" fill="var(--ink)" />
            <path d="M41 28 L35 12 L55 21 Z" fill="var(--rose)" opacity=".6" />
            <path d="M99 28 L105 12 L85 21 Z" fill="var(--rose)" opacity=".6" />
            <circle cx="70" cy="58" r="41" fill="var(--ink)" />

            <g className="eye">
              <ellipse cx="52" cy="59" rx="15" ry="16.5" fill="var(--surface)" />
              <g className="ball">
                <circle cx="52" cy="59" r="10.6" fill="var(--amber)" />
                <circle cx="52" cy="59" r="7" fill="var(--ink)" />
                <circle cx="48.4" cy="55" r="3.7" fill="#fff" />
                <circle cx="55" cy="62.6" r="1.9" fill="#fff" opacity=".8" />
              </g>
            </g>
            <g className="eye">
              <ellipse cx="88" cy="59" rx="15" ry="16.5" fill="var(--surface)" />
              <g className="ball">
                <circle cx="88" cy="59" r="10.6" fill="var(--amber)" />
                <circle cx="88" cy="59" r="7" fill="var(--ink)" />
                <circle cx="84.4" cy="55" r="3.7" fill="#fff" />
                <circle cx="91" cy="62.6" r="1.9" fill="#fff" opacity=".8" />
              </g>
            </g>

            <path d="M70 83 L64.5 77.5 Q70 74.8 75.5 77.5 Z" fill="var(--rose)" />
            <path d="M70 83 q-4.5 5.5 -9 1.8" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
            <path d="M70 83 q4.5 5.5 9 1.8" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
});
