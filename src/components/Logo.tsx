import React from "react";
import Image from "next/image";

interface LogoProps {
  /** Rendered height in px; width follows the lockup's real aspect ratio. */
  size?: number;
  className?: string;
}

const LOGO_ASPECT = 1931 / 253;

export default function Logo({ size = 24, className = "" }: LogoProps) {
  const height = size;
  const width = Math.round(size * LOGO_ASPECT);

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width,
        height,
        userSelect: "none",
      }}
    >
      <Image
        src="/brand/logo-light.png"
        alt="Scalevium"
        width={width}
        height={height}
        className="logo-mark-light"
        style={{ position: "absolute", inset: 0, width, height, objectFit: "contain" }}
        priority
      />
      <Image
        src="/brand/logo-dark.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
        className="logo-mark-dark"
        style={{ position: "absolute", inset: 0, width, height, objectFit: "contain" }}
        priority
      />
    </span>
  );
}
