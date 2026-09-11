"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS, type NavLink } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeId?: string;
  navLinks?: NavLink[];
  id?: string;
}

function MMonogram() {
  return (
    <svg
      width="30"
      height="30"
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
        d="M7 27V7L17 19L27 7V27"
        stroke="#F7F3EC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="7"
        y1="18"
        x2="27"
        y2="18"
        stroke="#B78C4A"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function MobileMenu({
  isOpen,
  onClose,
  activeId = "home",
  navLinks = NAV_LINKS,
  id = "mobile-nav",
}: MobileMenuProps) {
  const shouldReduce = useReducedMotion();

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    // 1. Close menu smoothly
    onClose();
    // 2. Return scroll control immediately
    document.body.style.overflow = "";

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      // 3. Smoothly scroll to destination (instant if reduced motion)
      setTimeout(() => {
        targetEl.scrollIntoView({
          behavior: shouldReduce ? "auto" : "smooth",
          block: "start",
        });
        // 4. Move keyboard focus appropriately for accessibility
        targetEl.setAttribute("tabindex", "-1");
        targetEl.focus({ preventScroll: true });
        window.history.pushState(null, "", href);
      }, 60);
    }
  };

  const resolvedMenuVariants = shouldReduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 }, exit: { opacity: 1 } }
    : menuVariants;

  const resolvedItemVariants = shouldReduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : itemVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          id={id}
          className="fixed inset-0 z-[100] backdrop-blur-[24px] px-6 sm:px-10 pt-5 pb-12 overflow-y-auto flex flex-col justify-between"
          style={{ backgroundColor: "rgba(10, 18, 14, 0.98)" }}
          variants={resolvedMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div>
            {/* Top bar with Monogram / Logo and Close Button */}
            <div className="flex items-center justify-between pb-8 pt-2 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-[10px]">
                <MMonogram />
                <span
                  className="text-ivory whitespace-nowrap leading-none font-display font-medium tracking-[0.045em]"
                  style={{
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    fontSize: "clamp(16px, 1.4vw, 20px)",
                  }}
                >
                  Marwan Design
                </span>
              </div>

              <button
                type="button"
                id="mobile-nav-close-btn"
                onClick={onClose}
                className="flex items-center justify-center bg-transparent border border-white/20 rounded-full p-2 text-ivory cursor-pointer hover:border-brass hover:text-brass-lt transition-colors"
                aria-label="Close navigation menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <motion.ul
              role="list"
              className="flex flex-col"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => {
                const isActive = activeId === link.href.replace("#", "");
                return (
                  <motion.li key={link.label} variants={resolvedItemVariants}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className="block py-3 border-b border-white/[0.06] text-[clamp(26px,6.5vw,38px)] font-display font-medium text-text-lt no-underline transition-colors duration-250 hover:text-brass-lt hover:pl-2 data-[active=true]:text-brass-lt data-[active=true]:pl-2"
                      data-active={isActive}
                      style={{
                        fontFamily: "var(--font-cormorant, Georgia, serif)",
                        transition: "color 0.25s ease, padding-left 0.28s ease",
                      }}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          <div className="pt-8">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-block text-[13px] font-medium tracking-[0.07em] text-ivory border border-white/30 px-7 py-[13px] rounded-full no-underline hover:border-brass hover:text-brass-lt"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
              }}
            >
              Start a Project
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
