import type { MotionProps } from "framer-motion";

/**
 * Tactile button feel: lifts on hover, presses flush on tap. The shadow is
 * driven here (not via CSS `hover:`/`active:`) because on elements framer
 * motion manages, its own inline-style writes win the cascade for
 * box-shadow and a parallel CSS rule never gets a chance to apply — so the
 * shadow has to come from the same motion values as the lift.
 */
export const liftPress: Pick<MotionProps, "initial" | "whileHover" | "whileTap" | "transition"> = {
  initial: { y: 0, boxShadow: "var(--sh-sm)" },
  whileHover: { y: -3, boxShadow: "var(--sh-md)" },
  whileTap: { y: 0, boxShadow: "var(--sh-sm)" },
  transition: { type: "spring", stiffness: 500, damping: 24 },
};
