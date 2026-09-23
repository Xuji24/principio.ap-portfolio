import { forwardRef, useId } from "react";

export type CatVariant = "classic" | "calico" | "gray" | "black" | "siamese";

type Props = { pose?: "sit" | "stand"; className?: string; variant?: CatVariant };

const BODY_SIT_D =
  "M70 64 C43 64 29 86 29 110 L29 128 C29 135 33 139 40 139 L100 139 C107 139 111 135 111 128 L111 110 C111 86 97 64 70 64 Z";
const BODY_STAND_D =
  "M70 42 C55 42 46 64 46 92 L46 128 C46 135 50 139 57 139 L83 139 C90 139 94 135 94 128 L94 92 C94 64 85 42 70 42 Z";

type Palette = {
  body: string;
  earL: string;
  earR: string;
  outline?: string;
  eyeIris: string;
  tail: string;
  pawL: string;
  pawR: string;
  glasses?: boolean;
  markings?: string;
  tabby?: boolean;
};

const PALETTES: Record<CatVariant, Palette> = {
  // Unchanged look: themed ink silhouette that flips with light/dark mode.
  classic: {
    body: "var(--ink)", earL: "var(--ink)", earR: "var(--ink)",
    eyeIris: "var(--amber)", tail: "var(--ink)", pawL: "var(--ink)", pawR: "var(--ink)",
  },
  // Silver classic-tabby coloring, like an American Shorthair.
  gray: {
    body: "#A8ACB3", earL: "#82868D", earR: "#82868D", outline: "var(--line)",
    eyeIris: "var(--amber)", tail: "#82868D", pawL: "#82868D", pawR: "#82868D",
    markings: "#5F636B", tabby: true,
  },
  // Plain solid black cat — same silhouette as everyone else, just recolored,
  // with a thin outline so it still reads against a dark surface.
  black: {
    body: "#1E1B18", earL: "#1E1B18", earR: "#1E1B18", outline: "var(--line)",
    eyeIris: "var(--amber)", tail: "#1E1B18", pawL: "#1E1B18", pawR: "#1E1B18",
  },
  calico: {
    body: "#F7F1E4", earL: "#211D1A", earR: "#D97C3F", outline: "var(--line)",
    eyeIris: "var(--amber)", tail: "#D97C3F", pawL: "#211D1A", pawR: "#D97C3F",
  },
  siamese: {
    body: "#E7D3AE", earL: "#4B3626", earR: "#4B3626", outline: "var(--line)",
    eyeIris: "#5B93C9", tail: "#4B3626", pawL: "#4B3626", pawR: "#4B3626", glasses: true,
  },
};

export const CatSvg = forwardRef<SVGSVGElement, Props>(function CatSvg(
  { pose = "sit", className, variant = "classic" },
  ref,
) {
  const uid = useId();
  const headClipId = `${uid}-head-clip`;
  const bodyClipId = `${uid}-body-clip`;
  const p = PALETTES[variant];
  const outlineProps = p.outline ? { stroke: p.outline, strokeWidth: 2.5 } : undefined;

  return (
    <svg ref={ref} viewBox="0 0 140 152" className={className} aria-hidden="true" style={{ overflow: "visible" }}>
      <defs>
        <clipPath id={headClipId}>
          <circle cx="70" cy="58" r="41" />
        </clipPath>
        <clipPath id={bodyClipId}>
          <path d={BODY_SIT_D} />
        </clipPath>
      </defs>
      <g className="cat-root">
        <g className="tailg">
          {p.outline && (
            <path
              d="M98 132 C130 134 138 108 129 91 C122 78 104 80 102 91 C100 100 109 105 115 100"
              fill="none" stroke={p.outline} strokeWidth="13" strokeLinecap="round"
            />
          )}
          <path
            d="M98 132 C130 134 138 108 129 91 C122 78 104 80 102 91 C100 100 109 105 115 100"
            fill="none" stroke={p.tail} strokeWidth="10" strokeLinecap="round"
          />
          {p.tabby && (
            <path
              d="M98 132 C130 134 138 108 129 91 C122 78 104 80 102 91 C100 100 109 105 115 100"
              fill="none" stroke={p.markings} strokeWidth="7" strokeLinecap="round"
              strokeDasharray="6 9" opacity=".65"
            />
          )}
        </g>
        <path
          className="body-sit"
          style={{ opacity: pose === "sit" ? 1 : 0, transition: "opacity 80ms linear" }}
          d={BODY_SIT_D}
          fill={p.body}
          {...outlineProps}
        />
        <path
          className="body-stand"
          style={{ opacity: pose === "stand" ? 1 : 0, transition: "opacity 80ms linear" }}
          d={BODY_STAND_D}
          fill={p.body}
          {...outlineProps}
        />

        {variant === "calico" && (
          <g clipPath={`url(#${bodyClipId})`}>
            <ellipse cx="97" cy="112" rx="22" ry="24" fill={p.earR} />
            <ellipse cx="40" cy="118" rx="15" ry="17" fill={p.earL} />
          </g>
        )}

        {p.tabby && (
          <g clipPath={`url(#${bodyClipId})`} stroke={p.markings} strokeWidth="4" strokeLinecap="round" opacity=".45" fill="none">
            <path d="M42 92 Q35 98 40 107" />
            <path d="M50 86 Q43 93 48 102" />
            <path d="M98 92 Q105 98 100 107" />
            <path d="M90 86 Q97 93 92 102" />
          </g>
        )}

        <ellipse cx="55" cy="136" rx="12" ry="7.5" fill={p.pawL} opacity=".9" {...outlineProps} />
        <ellipse cx="85" cy="136" rx="12" ry="7.5" fill={p.pawR} opacity=".9" {...outlineProps} />

        <g className="headwrap">
          <g className="head">
            <path className="ear" d="M38 31 L29 3 L61 18 Z" fill={p.earL} {...outlineProps} />
            <path className="ear" d="M102 31 L111 3 L79 18 Z" fill={p.earR} {...outlineProps} />
            <path d="M41 28 L35 12 L55 21 Z" fill="var(--rose)" opacity=".6" />
            <path d="M99 28 L105 12 L85 21 Z" fill="var(--rose)" opacity=".6" />
            <circle cx="70" cy="58" r="41" fill={p.body} {...outlineProps} />

            {variant === "calico" && (
              <g clipPath={`url(#${headClipId})`}>
                <ellipse cx="47" cy="42" rx="26" ry="30" fill={p.earL} />
                <ellipse cx="97" cy="72" rx="18" ry="20" fill={p.earR} />
              </g>
            )}
            {variant === "siamese" && (
              <g clipPath={`url(#${headClipId})`}>
                <ellipse cx="70" cy="84" rx="26" ry="20" fill={p.earL} />
              </g>
            )}

            {p.tabby && (
              <g clipPath={`url(#${headClipId})`} stroke={p.markings} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".55">
                <path d="M56 30 L60 40 L65 32 L70 42 L75 32 L80 40 L84 30" strokeWidth="3" />
                <path d="M34 34 Q30 42 33 50" strokeWidth="2.5" />
                <path d="M106 34 Q110 42 107 50" strokeWidth="2.5" />
              </g>
            )}

            <g className="eye">
              <ellipse cx="52" cy="59" rx="15" ry="16.5" fill="var(--surface)" />
              <g className="ball">
                <circle cx="52" cy="59" r="10.6" fill={p.eyeIris} />
                <circle cx="52" cy="59" r="7" fill="var(--eye-pupil)" />
                <circle cx="48.4" cy="55" r="3.7" fill="#fff" />
                <circle cx="55" cy="62.6" r="1.9" fill="#fff" opacity=".8" />
              </g>
            </g>
            <g className="eye">
              <ellipse cx="88" cy="59" rx="15" ry="16.5" fill="var(--surface)" />
              <g className="ball">
                <circle cx="88" cy="59" r="10.6" fill={p.eyeIris} />
                <circle cx="88" cy="59" r="7" fill="var(--eye-pupil)" />
                <circle cx="84.4" cy="55" r="3.7" fill="#fff" />
                <circle cx="91" cy="62.6" r="1.9" fill="#fff" opacity=".8" />
              </g>
            </g>

            <path d="M70 83 L64.5 77.5 Q70 74.8 75.5 77.5 Z" fill="var(--rose)" />
            <path d="M70 83 q-4.5 5.5 -9 1.8" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
            <path d="M70 83 q4.5 5.5 9 1.8" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />

            {p.glasses && (
              <g className="glasses" fill="none" stroke="#2A2118" strokeWidth="3" strokeLinecap="round">
                <circle cx="52" cy="59" r="17" />
                <circle cx="88" cy="59" r="17" />
                <path d="M69 58 Q70 55.5 71 58" />
                <path d="M35 57 L25 51" />
                <path d="M105 57 L115 51" />
              </g>
            )}
          </g>
        </g>

        <g className="arms" style={{ opacity: 0, transition: "opacity 80ms linear" }}>
          <path d="M52 74 q-13 10 -11 25 q1 8 8 7 q7 -1 6 -9 q-1 -11 7 -18z" fill={p.body} {...outlineProps} />
          <g className="arm-r">
            <path d="M90 72 q17 4 23 18 q3 8 -4 11 q-7 3 -10 -4 q-4 -10 -14 -13z" fill={p.body} {...outlineProps} />
            <circle cx="113" cy="92" r="8.5" fill={p.body} opacity=".9" {...outlineProps} />
          </g>
        </g>
      </g>
    </svg>
  );
});
