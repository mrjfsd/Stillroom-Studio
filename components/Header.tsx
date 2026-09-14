"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import StudioLogo from "./StudioLogo";
import { NAV_LINKS } from "@/types";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const shouldReduce = useReducedMotion();

  // Scroll detection to update active navigation state
  useEffect(() => {
    const sectionIds = ["home", "studio", "services", "projects", "contact"];

    const handleScroll = () => {
      // 1. Near the top of the page -> "home"
      if (window.scrollY < 140) {
        setActiveId("home");
        return;
      }

      // 2. Near bottom of page -> "contact"
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isBottom) {
        setActiveId("contact");
        return;
      }

      // 3. Scan sections from bottom to top
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveId(id);
            return;
          }
        }
      }
      setActiveId("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
      <nav
        className="relative z-20 flex items-center justify-between gap-4"
        style={{
          padding:
            "clamp(20px, 2.5vw, 30px) clamp(20px, 3.5vw, 60px)",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-[10px] no-underline shrink-0"
          aria-label="The White Atelier — go to homepage"
        >
          <StudioLogo size={34} priority />
          <span
            className="text-ivory whitespace-nowrap leading-none font-display font-medium tracking-[0.045em]"
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "clamp(15px, 1.3vw, 19px)",
            }}
          >
            The White Atelier
          </span>
        </a>

        {/* Desktop nav links */}
        <ul
          className="hidden [@media(min-width:861px)]:flex items-center list-none"
          style={{ gap: "clamp(18px, 2.2vw, 34px)" }}
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
                  className={`nav-link font-body font-normal tracking-[0.07em] no-underline transition-colors duration-[250ms] ${
                    isActive
                      ? "nav-link-active text-ivory"
                      : "text-[rgba(231,226,217,0.55)]"
                  }`}
                  style={{
                    fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                    fontSize: "clamp(11.5px, 0.9vw, 13px)",
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
          className="hidden [@media(min-width:861px)]:inline-block text-ivory border border-[rgba(231,226,217,0.28)] bg-transparent rounded-full whitespace-nowrap shrink-0 no-underline font-medium tracking-[0.07em] cursor-pointer"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "clamp(11px, 0.88vw, 12.5px)",
            padding: "10px clamp(16px, 1.4vw, 22px)",
          }}
          whileHover={{
            y: -1,
            borderColor: "#B78C4A",
            backgroundColor: "rgba(183,140,74,0.1)",
            color: "#C9A063",
            boxShadow: "0 6px 20px rgba(183,140,74,0.14)",
          }}
          transition={{ duration: 0.22 }}
        >
          Start a Project
        </motion.a>

        {/* Hamburger — mobile only */}
        <button
          className="[@media(min-width:861px)]:hidden flex items-center justify-center bg-transparent border-none p-[6px] z-[25] cursor-pointer text-ivory"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          {menuOpen ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
