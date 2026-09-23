"use client";
import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/** `next/image` with `fill`, plus a shimmer placeholder shown until the image decodes. */
export function SkeletonImage({ className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="img-skeleton" aria-hidden="true" />}
      <Image
        {...props}
        fill
        onLoad={(e) => {
          setLoaded(true);
          props.onLoad?.(e);
        }}
        className={cn("transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0", className)}
      />
    </>
  );
}
