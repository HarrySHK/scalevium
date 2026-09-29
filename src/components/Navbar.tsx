'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

interface NavItem {
  label: string;
  path: string;
  dropdown?: { label: string; path: string }[];
}

const NAV_LINKS: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    path: "/services",
    dropdown: [
      { label: "Talent Solutions", path: "/services/talent-solutions" },
      { label: "Technology Solutions", path: "/services/technology-solutions" },
      { label: "AI Development", path: "/services/ai-development" },
      { label: "Full-Stack Development", path: "/services/full-stack-development" },
    ],
  },
  { label: "Case Studies", path: "/case-studies" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTriggerRef = useRef<HTMLAnchorElement>(null);

  const focusServicesMenuItem = (index: number, items: { path: string }[]) => {
    if (index < 0 || index >= items.length) return;
    document.getElementById(`services-menu-item-${index}`)?.focus();
  };

  const closeServicesDropdown = () => {
    setDropdownOpen(false);
    servicesTriggerRef.current?.focus();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
      if (e.key === "Escape" && dropdownOpen) {
        closeServicesDropdown();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, dropdownOpen]);

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header>
      <nav
        aria-label="Main Navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 150,
          padding: scrolled ? "1rem 0" : "1.75rem 0",
          background: scrolled ? "var(--nav-scrolled-bg)" : "transparent",
          backdropFilter: scrolled ? "var(--blur-nav)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          transition: "padding 0.4s var(--ease-editorial), background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Scalevium home">
            <Logo size={24} />
          </Link>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
            {NAV_LINKS.map((link) => (
              <div
                key={link.path}
                style={{ position: "relative" }}
                onMouseEnter={() => link.dropdown && setDropdownOpen(true)}
                onMouseLeave={() => link.dropdown && setDropdownOpen(false)}
                onFocus={() => link.dropdown && setDropdownOpen(true)}
                onBlur={(e) => {
                  if (link.dropdown && !e.currentTarget.contains(e.relatedTarget as Node)) {
                    setDropdownOpen(false);
                  }
                }}
              >
                <Link
                  href={link.path}
                  ref={link.dropdown ? servicesTriggerRef : undefined}
                  aria-current={isActive(link.path) ? "page" : undefined}
                  aria-haspopup={link.dropdown ? "true" : undefined}
                  aria-expanded={link.dropdown ? dropdownOpen : undefined}
                  aria-controls={link.dropdown ? "desktop-services-dropdown" : undefined}
                  onKeyDown={
                    link.dropdown
                      ? (e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setDropdownOpen(true);
                            requestAnimationFrame(() => focusServicesMenuItem(0, link.dropdown!));
                          }
                          if (e.key === "Escape") {
                            closeServicesDropdown();
                          }
                        }
                      : undefined
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3125rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isActive(link.path) ? "var(--text-primary)" : "var(--text-muted)",
                    position: "relative",
                    padding: "0.375rem 0",
                    transition: "color 0.3s ease",
                  }}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={13} style={{ opacity: 0.7 }} aria-hidden="true" />}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: 1,
                      width: isActive(link.path) ? "100%" : "0%",
                      background: "var(--accent-light)",
                      transition: "width 0.3s var(--ease-editorial)",
                    }}
                  />
                </Link>

                {link.dropdown && (
                  <div
                    id="desktop-services-dropdown"
                    role="menu"
                    aria-label="Services submenu"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 0.875rem)",
                      left: "50%",
                      minWidth: "14.5rem",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-icon)",
                      padding: "0.5rem",
                      opacity: dropdownOpen ? 1 : 0,
                      visibility: dropdownOpen ? "visible" : "hidden",
                      transform: `translateX(-50%) translateY(${dropdownOpen ? 0 : -6}px)`,
                      transition: "all 0.25s var(--ease-editorial)",
                      boxShadow: "var(--shadow-dropdown)",
                    }}
                  >
                    {link.dropdown.map((item, itemIndex) => (
                      <Link
                        key={item.path}
                        id={`services-menu-item-${itemIndex}`}
                        href={item.path}
                        role="menuitem"
                        aria-current={isActive(item.path) ? "page" : undefined}
                        onClick={() => setDropdownOpen(false)}
                        onKeyDown={(e) => {
                          if (!link.dropdown) return;
                          if (e.key === "Escape") {
                            e.preventDefault();
                            closeServicesDropdown();
                          }
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            focusServicesMenuItem((itemIndex + 1) % link.dropdown.length, link.dropdown);
                          }
                          if (e.key === "ArrowUp") {
                            e.preventDefault();
                            if (itemIndex === 0) {
                              closeServicesDropdown();
                            } else {
                              focusServicesMenuItem(itemIndex - 1, link.dropdown);
                            }
                          }
                        }}
                        style={{
                          display: "block",
                          padding: "0.625rem 0.875rem",
                          fontSize: "0.8125rem",
                          borderRadius: "var(--radius-sm)",
                          color: "var(--text-muted)",
                          transition: "color 0.2s ease, background 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--text-primary)";
                          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--text-muted)";
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <Link href="/contact" className="link-editorial desktop-nav" style={{ fontSize: "0.875rem" }}>
              Get in Touch <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                display: "none",
                padding: "0.5rem",
                cursor: "pointer",
              }}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--bg-primary)",
          zIndex: 140,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s var(--ease-editorial)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "5.5rem 1.5rem 2rem",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
          {NAV_LINKS.map((link) => (
            <div key={link.path} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              {link.dropdown ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 0",
                    }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(link.path) ? "page" : undefined}
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: isActive(link.path) ? "var(--accent-light)" : "var(--text-primary)",
                      }}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      style={{
                        padding: "0.5rem",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                      }}
                      aria-label={mobileServicesOpen ? "Collapse Services submenu" : "Expand Services submenu"}
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services-menu"
                    >
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        style={{
                          transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </button>
                  </div>

                  {mobileServicesOpen && (
                    <div
                      id="mobile-services-menu"
                      style={{
                        paddingLeft: "1rem",
                        paddingBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          onClick={() => setMenuOpen(false)}
                          aria-current={isActive(sub.path) ? "page" : undefined}
                          style={{
                            fontSize: "1rem",
                            color: isActive(sub.path) ? "var(--accent-light)" : "var(--text-muted)",
                            padding: "0.25rem 0",
                            fontWeight: 500,
                          }}
                        >
                          → {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.path) ? "page" : undefined}
                  style={{
                    display: "block",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    padding: "1rem 0",
                    color: isActive(link.path) ? "var(--accent-light)" : "var(--text-primary)",
                  }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "2rem",
              fontSize: "1.125rem",
              color: "var(--accent-light)",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Get in Touch →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
