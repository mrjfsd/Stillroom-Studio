"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function EditorialBadge() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="absolute z-[12] cursor-default"
      style={{
        top: "clamp(18px, 2.8vw, 46px)",
        right: "clamp(20px, 3.5vw, 60px)",
        width: "clamp(86px, 8.5vw, 118px)",
        height: "clamp(86px, 8.5vw, 118px)",
      }}
      aria-label="Discover your space"
      role="img"
      whileHover={
        shouldReduce ? {} : { rotate: 12, scale: 1.05 }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Outer SVG ring with rotating curved text */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke="rgba(231,226,217,0.1)"
          strokeWidth="1"
        />
        {/* Rotating group */}
        <motion.g
          animate={shouldReduce ? {} : { rotate: 360 }}
          transition={
            shouldReduce
              ? {}
              : { duration: 20, repeat: Infinity, ease: "linear" }
          }
          style={{ transformOrigin: "60px 60px" }}
        >
          <path
            id="tc"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
          <text
            fontSize="8"
            fontWeight="500"
            letterSpacing="3.8"
            fill="rgba(231,226,217,0.5)"
            fontFamily="var(--font-dm-sans, system-ui, sans-serif)"
          >
            <textPath href="#tc" startOffset="0%">
              DISCOVER YOUR SPACE • DISCOVER YOUR SPACE •
            </textPath>
          </text>
        </motion.g>
      </svg>

      {/* Center arrow button */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full border border-[rgba(231,226,217,0.18)] flex items-center justify-center"
        whileHover={
          shouldReduce
            ? {}
            : {
                backgroundColor: "rgba(183,140,74,0.14)",
                borderColor: "#B78C4A",
              }
        }
        transition={{ duration: 0.3 }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M3 12L12 3M12 3H5.5M12 3V9.5"
            stroke="rgba(231,226,217,0.7)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
