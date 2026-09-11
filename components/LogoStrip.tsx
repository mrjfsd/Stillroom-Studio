"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import type { Publication } from "@/types";

/* ── Publication icon components ─────────────────────────── */
const ArchitecturalDigestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <rect x="0.75" y="0.75" width="14.5" height="14.5" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M4 12L8 4L12 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="5.5" y1="9.5" x2="10.5" y2="9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const DesignMilkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

const ElleDecorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path d="M2 14V2h12v12H2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M5 14V8.5h6V14" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const HouzzIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M10.5 10.5L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const DezeeenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path d="M1 8H15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M9 2L15 8L9 14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const publications: Publication[] = [
  { name: "Architectural Digest", icon: ArchitecturalDigestIcon },
  { name: "Design Milk", icon: DesignMilkIcon },
  { name: "Elle Decor", icon: ElleDecorIcon },
  { name: "Houzz", icon: HouzzIcon },
  { name: "Dezeen", icon: DezeeenIcon },
];

/* ── Animation variants ───────────────────────────────────── */
const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function LogoStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });
  const shouldReduce = useReducedMotion();

  const isVisible = shouldReduce || inView;

  return (
    <section
      ref={ref}
      className="text-center section-pad-x w-full max-w-full box-border"
      style={{
        paddingTop: "clamp(56px, 8vw, 100px)",
        paddingBottom: "clamp(56px, 8vw, 100px)",
      }}
      aria-label="Featured in and trusted by"
    >
      <div className="mx-auto w-full max-w-[1340px] min-w-0">
        {/* Eyebrow label */}
        <motion.p
          className="inline-flex items-center gap-4 text-sage uppercase tracking-[0.22em] strip-eyebrow"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "10px",
            fontWeight: 500,
            marginBottom: "clamp(36px, 5vw, 56px)",
          }}
          variants={eyebrowVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Featured In &amp; Trusted By
        </motion.p>

        {/* Logo row */}
        <motion.div
          className="flex items-center justify-center flex-wrap"
          style={{
            gap: "clamp(20px, 4vw, 60px) clamp(24px, 5vw, 70px)",
          }}
          role="list"
          aria-label="Publications and industry partners"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {publications.map((pub, i) => {
            const Icon = pub.icon;
            return (
              <motion.div
                key={pub.name}
                role="listitem"
                className="flex items-center gap-2 group"
                variants={logoVariants}
                custom={i}
              >
                <Icon className="shrink-0 transition-colors duration-300 text-[rgba(20,35,30,0.28)] group-hover:text-[rgba(20,35,30,0.55)]" />
                <span
                  className="whitespace-nowrap uppercase tracking-[0.1em] font-display font-medium transition-colors duration-300 text-[rgba(20,35,30,0.30)] group-hover:text-[rgba(20,35,30,0.58)]"
                  style={{
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    fontSize: "clamp(12px, 1.35vw, 17px)",
                  }}
                >
                  {pub.name}
                </span>

                {/* Separator — hidden on mobile */}
                {i < publications.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden [@media(min-width:561px)]:block w-[1px] bg-stone opacity-70 shrink-0 ml-[clamp(20px,4vw,60px)]"
                    style={{ height: "clamp(14px, 1.5vw, 20px)" }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
