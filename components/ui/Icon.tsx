type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconDoc = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
);
export const IconMail = ({ className }: IconProps) => (
  <svg {...base} className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" /></svg>
);
export const IconLinkedIn = ({ className }: IconProps) => (
  <svg {...base} className={className}><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /><path d="M10 21V9m0 4a4 4 0 018 0v8" /></svg>
);
export const IconGitHub = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3-.3 6-1.5 6-6.5a5 5 0 00-1.4-3.5 4.7 4.7 0 00-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.9 1.2 5.8 1.5 5.8 1.5a4.7 4.7 0 00-.1 3.5A5 5 0 004.3 8.5c0 5 3 6.2 6 6.5a3.4 3.4 0 00-1 2.6V21" /></svg>
);
export const IconSun = ({ className }: IconProps) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const IconMoon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
);
export const IconArrowUpRight = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M7 17L17 7M7 7h10v10" /></svg>
);
