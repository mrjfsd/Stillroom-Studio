"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/types";

/** Compact monogram for sticky navigation — architectural W letterform */
function StudioMonogram() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="0.5"
        y="0.5"
        width="33"
        height="33"
        rx="3.5"
        stroke="#B78C4A"
        strokeOpacity="0.7"
      />
      <path
        d="M7 8L12 26L17 14L22 26L27 8"
        stroke="#F7F3EC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="7"
        y1="17"
        x2="27"
        y2="17"
        stroke="#B78C4A"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  // Direction & threshold tracking refs
  const lastScrollYRef = useRef(0);
  const pivotScrollYRef = useRef(0);
  const lastDirectionRef = useRef<"up" | "down" | "none">("none");
  const heroThresholdRef = useRef(450);
  const isMenuOpenRef = useRef(false);

  // Keep menuOpen ref in sync
  useEffect(() => {
    isMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    pivotScrollYRef.current = window.scrollY;

    const sectionIds = ["home", "studio", "services", "projects", "contact"];
    const SCROLL_THRESHOLD = 10; // 8-12px dead zone to trigger direction change

    const updateHeroThreshold = () => {
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop) {
          heroThresholdRef.current = 450;
        } else {
          // On mobile, hero has top padding + content + 1:1 image
          // Threshold is when the hero area has scrolled past navbar height
          const navbarHeight = 64;
          heroThresholdRef.current = Math.max(320, heroEl.offsetHeight - navbarHeight);
        }
      } else {
        heroThresholdRef.current = 450;
      }
    };

    updateHeroThreshold();
    window.addEventListener("resize", updateHeroThreshold, { passive: true });
    window.addEventListener("orientationchange", updateHeroThreshold, { passive: true });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

      // Ignore overscroll bounce beyond bottom document bounds
      if (currentScrollY > maxScrollY) {
        return;
      }

      // If at or bouncing above the very top, always hide
      if (currentScrollY <= 10) {
        setIsVisible(false);
        lastDirectionRef.current = "none";
        lastScrollYRef.current = currentScrollY;
        pivotScrollYRef.current = currentScrollY;
        setActiveId("home");
        return;
      }

      // 1. Within hero area: always keep sticky nav hidden so only original hero nav shows
      if (currentScrollY < heroThresholdRef.current) {
        setIsVisible(false);
        lastDirectionRef.current = "none";
        lastScrollYRef.current = currentScrollY;
        pivotScrollYRef.current = currentScrollY;
      } else {
        // 2. Beyond hero threshold: detect direction change
        const rawDiff = currentScrollY - lastScrollYRef.current;

        if (rawDiff > 0) {
          // Scrolling downwards
          if (lastDirectionRef.current !== "down") {
            lastDirectionRef.current = "down";
            pivotScrollYRef.current = currentScrollY;
          }
          const downDelta = currentScrollY - pivotScrollYRef.current;
          if (downDelta >= SCROLL_THRESHOLD && !isMenuOpenRef.current) {
            setIsVisible(false);
          }
        } else if (rawDiff < 0) {
          // Scrolling upwards
          if (lastDirectionRef.current !== "up") {
            lastDirectionRef.current = "up";
            pivotScrollYRef.current = currentScrollY;
          }
          const upDelta = pivotScrollYRef.current - currentScrollY;
          if (upDelta >= SCROLL_THRESHOLD) {
            setIsVisible(true);
          }
        }

        lastScrollYRef.current = currentScrollY;
      }

      // 3. Dynamic active section detection
      if (currentScrollY < 140) {
        setActiveId("home");
      } else if (window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 100) {
        setActiveId("contact");
      } else {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 260) {
              setActiveId(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeroThreshold);
      window.removeEventListener("orientationchange", updateHeroThreshold);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: shouldReduce ? "auto" : "smooth",
        block: "start",
      });
      targetEl.setAttribute("tabindex", "-1");
      targetEl.focus({ preventScroll: true });
      window.history.pushState(null, "", href);
      setActiveId(targetId);
    }
  };

  return (
    <>
      <div
        id="sticky-header-container"
        className={`fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-[10px] sm:px-[14px] lg:px-[20px] transition-opacity duration-300 ${
          isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isVisible}
      >
        <motion.nav
          id="sticky-nav-bar"
          aria-label="Sticky global navigation"
          className="w-full max-w-[1240px] flex items-center justify-between gap-3 px-4 sm:px-6 py-2 rounded-[16px] border border-[rgba(247,243,236,0.12)]"
          style={{
            backgroundColor: "rgba(16, 26, 21, 0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow:
              "0 16px 40px rgba(10, 18, 14, 0.35), 0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
          initial={false}
          animate={
            shouldReduce
              ? { opacity: isVisible ? 1 : 0 }
              : {
                  y: isVisible ? 0 : -28,
                  opacity: isVisible ? 1 : 0,
                }
          }
          transition={{
            duration: shouldReduce ? 0.01 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-[9px] no-underline shrink-0"
            aria-label="The White Atelier — return to top"
            tabIndex={isVisible ? 0 : -1}
          >
            <StudioMonogram />
            <span
              className="text-ivory whitespace-nowrap leading-none font-display font-medium tracking-[0.045em]"
              style={{
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "clamp(14.5px, 1.2vw, 17px)",
              }}
            >
              The White Atelier
            </span>
          </a>

          {/* Desktop nav links */}
          <ul
            className="hidden [@media(min-width:861px)]:flex items-center list-none"
            style={{ gap: "clamp(16px, 2vw, 30px)" }}
            role="list"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace("#", "");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={isVisible ? 0 : -1}
                    className={`nav-link font-body font-normal tracking-[0.07em] no-underline transition-colors duration-[250ms] ${
                      isActive
                        ? "nav-link-active text-ivory"
                        : "text-[rgba(231,226,217,0.60)]"
                    }`}
                    style={{
                      fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                      fontSize: "clamp(11.5px, 0.88vw, 12.5px)",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            tabIndex={isVisible ? 0 : -1}
            className="hidden [@media(min-width:861px)]:inline-block text-ivory border border-[rgba(231,226,217,0.28)] bg-transparent rounded-full whitespace-nowrap shrink-0 no-underline font-medium tracking-[0.07em] cursor-pointer"
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "clamp(10.5px, 0.82vw, 12px)",
              padding: "7px clamp(14px, 1.2vw, 18px)",
            }}
            whileHover={{
              y: -1,
              borderColor: "#B78C4A",
              backgroundColor: "rgba(183,140,74,0.1)",
              color: "#C9A063",
              boxShadow: "0 6px 18px rgba(183,140,74,0.14)",
            }}
            transition={{ duration: 0.2 }}
          >
            Start a Project
          </motion.a>

          {/* Hamburger — mobile only */}
          <button
            id="sticky-hamburger-btn"
            className="[@media(min-width:861px)]:hidden flex items-center justify-center bg-transparent border-none p-[5px] cursor-pointer text-ivory"
            aria-expanded={menuOpen}
            aria-controls="sticky-mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            tabIndex={isVisible ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
          >
            {menuOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </motion.nav>
      </div>

      {/* Mobile menu overlay triggered from sticky header */}
      <MobileMenu
        id="sticky-mobile-nav"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
