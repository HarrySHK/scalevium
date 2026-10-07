"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface CaseStudyDetailVideoModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  videoSrc: string;
}

export default function CaseStudyDetailVideoModal({
  open,
  onClose,
  title,
  videoSrc,
}: CaseStudyDetailVideoModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const embedVideoSrc = videoSrc.includes("?")
    ? `${videoSrc}&embed=1`
    : `${videoSrc}?embed=1`;

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.classList.add("case-study-video-modal-open");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("case-study-video-modal-open");
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="case-study-video-modal" role="presentation">
      <button
        type="button"
        className="case-study-video-modal-backdrop"
        aria-label="Close demo video"
        onClick={onClose}
      />
      <div
        className="case-study-video-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="case-study-video-modal-header">
          <h2 id={titleId} className="case-study-video-modal-title">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="case-study-video-modal-close"
            onClick={onClose}
            aria-label="Close demo video"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="case-study-video-modal-frame-wrap">
          <iframe
            key={embedVideoSrc}
            className="case-study-video-modal-frame"
            src={embedVideoSrc}
            title={title}
            allow="autoplay; fullscreen"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
