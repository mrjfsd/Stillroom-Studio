"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProjectCardData } from "@/types";

interface ProjectCardProps {
  data: ProjectCardData;
}

export default function ProjectCard({ data }: ProjectCardProps) {
  const shouldReduce = useReducedMotion();

  const floatAnimation = shouldReduce
    ? {}
    : {
        y: [0, -4, 0] as number[],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const hoverAnimation = shouldReduce
    ? {}
    : {
        y: -4,
        scale: 1.012,
        boxShadow:
          "0 32px 72px rgba(0,0,0,0.30), 0 4px 12px rgba(0,0,0,0.14)",
      };

  return (
    <motion.article
      aria-label="Featured project details"
      className="absolute z-10 rounded-[20px]"
      style={{
        top: "clamp(14px, 2.5vw, 26px)",
        right: "clamp(14px, 2.5vw, 28px)",
        width: "clamp(170px, 21vw, 230px)",
        backgroundColor: "rgba(247,243,236,0.91)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        padding: "clamp(14px, 1.8vw, 22px) clamp(16px, 2vw, 24px)",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.26), 0 2px 8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
      animate={floatAnimation}
      whileHover={hoverAnimation}
    >
      {/* Chip */}
      <p
        className="flex items-center gap-[6px] text-sage uppercase tracking-[0.15em] mb-[9px]"
        style={{
          fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
          fontSize: "9px",
          fontWeight: 500,
        }}
      >
        <span className="w-[5px] h-[5px] rounded-full bg-brass shrink-0" />
        {data.chip}
      </p>

      {/* Title */}
      <h2
        className="font-display font-semibold text-charcoal leading-[1.2] mb-[5px]"
        style={{
          fontFamily: "var(--font-cormorant, Georgia, serif)",
          fontSize: "clamp(15px, 1.5vw, 20px)",
        }}
      >
        {data.title}
      </h2>

      {/* Sub */}
      <p
        className="mb-[14px] tracking-[0.04em]"
        style={{
          fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
          fontSize: "10.5px",
          color: "rgba(20,35,30,0.5)",
        }}
      >
        {data.sub}
      </p>

      {/* Rule */}
      <div className="card-rule" aria-hidden="true" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span
          className="uppercase tracking-[0.09em] font-medium"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "9.5px",
            color: "rgba(20,35,30,0.38)",
          }}
        >
          {data.year}
        </span>

        <motion.button
          aria-label={`View ${data.title} project`}
          className="w-[26px] h-[26px] rounded-full border border-[rgba(20,35,30,0.15)] bg-transparent flex items-center justify-center cursor-pointer"
          whileHover={
            shouldReduce
              ? {}
              : {
                  rotate: -15,
                  borderColor: "#B78C4A",
                  backgroundColor: "rgba(183,140,74,0.1)",
                }
          }
          transition={{ duration: 0.3 }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M2 9L9 2M9 2H4.5M9 2V6.5"
              stroke="#14231E"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>
    </motion.article>
  );
}
