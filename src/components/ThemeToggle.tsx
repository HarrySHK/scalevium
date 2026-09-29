'use client';

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "scalevium-theme";

function syncMetaThemeColor(theme: Theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f6f7f9" : "#070709");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    syncMetaThemeColor(saved);
    setMounted(true);
  }, []);

  const setThemeMode = (mode: Theme) => {
    setTheme(mode);
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(STORAGE_KEY, mode);
    syncMetaThemeColor(mode);
  };

  const isDark = theme === "dark";

  if (!mounted) return null;

  return (
    <aside aria-label="Theme toggle" className="floating-theme-toggle">
      <div className="theme-toggle-pill">
        <button
          type="button"
          onClick={() => setThemeMode("light")}
          className={`theme-toggle-btn ${!isDark ? "active" : ""}`}
          aria-label="Switch to light mode"
          aria-pressed={!isDark}
          title="Light Mode"
        >
          <Sun size={15} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setThemeMode("dark")}
          className={`theme-toggle-btn ${isDark ? "active" : ""}`}
          aria-label="Switch to dark mode"
          aria-pressed={isDark}
          title="Dark Mode"
        >
          <Moon size={15} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>

      <style>{`
        .floating-theme-toggle {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .floating-theme-toggle:hover {
          transform: translateY(-2px);
        }
        .theme-toggle-pill {
          display: flex;
          align-items: center;
          background: rgba(18, 18, 24, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 9999px;
          padding: 0.25rem;
          gap: 0.25rem;
          box-shadow: 0 0.5rem 1.75rem rgba(0, 0, 0, 0.35), 0 0.125rem 0.5rem rgba(0, 0, 0, 0.2);
        }
        [data-theme="light"] .theme-toggle-pill {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 0.5rem 1.75rem rgba(0, 0, 0, 0.14), 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
        }
        .theme-toggle-btn {
          width: 1.875rem;
          height: 1.875rem;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
        }
        [data-theme="light"] .theme-toggle-btn {
          color: rgba(0, 0, 0, 0.5);
        }
        .theme-toggle-btn:hover {
          color: #ffffff;
        }
        [data-theme="light"] .theme-toggle-btn:hover {
          color: #000000;
        }
        .theme-toggle-btn.active {
          background: #0ea5e9;
          color: #ffffff !important;
          box-shadow: 0 0.125rem 0.625rem rgba(14, 165, 233, 0.5);
        }
        @media (max-width: 640px) {
          .floating-theme-toggle {
            bottom: 1.125rem;
            right: 1.125rem;
          }
          .theme-toggle-btn {
            width: 1.75rem;
            height: 1.75rem;
          }
        }
      `}</style>
    </aside>
  );
}
