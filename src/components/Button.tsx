'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface ButtonProps {
  /** "solid" = pill filled button (btn-editorial-solid); "link" = underline text link. Default "solid". */
  variant?: "solid" | "link";
  /** Show the trailing arrow icon. Default true. */
  icon?: boolean;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  /** Native button type when not rendered as a link. Default "button". */
  type?: "button" | "submit";
}

export default function Button({ variant = "solid", icon = true, href, onClick, children, className, type = "button" }: ButtonProps) {
  const baseClass = variant === "link" ? "link-editorial" : "btn-editorial-solid";
  const combinedClassName = className ? `${baseClass} ${className}` : baseClass;
  const Icon = variant === "link" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      {icon && <Icon size={variant === "link" ? 15 : 16} aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClassName} onClick={onClick} style={{ cursor: "pointer" }}>
      {content}
    </button>
  );
}
