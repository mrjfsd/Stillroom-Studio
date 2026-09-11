"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "./Header";
import EditorialBadge from "./EditorialBadge";
import ProjectCard from "./ProjectCard";
import type { ProjectCardData } from "@/types";

const projectData: ProjectCardData = {
  chip: "Featured Project",
  title: "The Oak Residence",
  sub: "Residential \u00a0·\u00a0 Bengaluru",
  year: "Completed 2026",
};

/** Brass drafting marks — kept as SVG for editorial precision */
function DraftingMarks() {
  return (
    <svg
      className="absolute pointer-events-none opacity-50"
      style={{ top: "-14px", left: "-14px", width: "88px", height: "88px" }}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="44" x2="30" y2="44" stroke="#B78C4A" strokeWidth="0.8" strokeDasharray="2 5" />
      <line x1="44" y1="0" x2="44" y2="30" stroke="#B78C4A" strokeWidth="0.8" strokeDasharray="2 5" />
      <line x1="22" y1="8" x2="44" y2="30" stroke="#8FA394" strokeWidth="0.7" opacity="0.65" />
      <circle cx="44" cy="44" r="3.5" stroke="#B78C4A" strokeWidth="0.8" fill="none" />
      <line x1="58" y1="6" x2="80" y2="28" stroke="#8FA394" strokeWidth="0.6" opacity="0.38" />
      <circle cx="44" cy="44" r="10" stroke="rgba(143,163,148,0.12)" strokeWidth="0.6" />
    </svg>
  );
}

export default function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="home"
      className="hero-grain hero-card relative overflow-hidden flex flex-col bg-forest scroll-mt-6 rounded-[20px] lg:rounded-[18px] mx-auto w-full max-w-full box-border"
      style={{
        boxShadow:
          "0 18px 48px rgba(10,18,14,0.22), 0 2px 10px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
      aria-label="Hero — Marwan Design"
    >
      {/* Left forest glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "-5%",
          left: "-8%",
          width: "50%",
          height: "55%",
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(13,42,33,0.55) 0%, transparent 65%)",
        }}
      />

      {/* Navigation (inside hero) */}
      <Header />

      {/* Rotating editorial badge (desktop only — hidden < 560px) */}
      <div className="hidden [@media(min-width:561px)]:block">
        <EditorialBadge />
      </div>

      {/* Hero body */}
      <div
        className="relative z-[5] flex-1 flex flex-col pb-6 sm:pb-7 lg:pb-0"
        style={{
          paddingLeft: "clamp(20px, 3.5vw, 60px)",
          paddingRight: "clamp(20px, 3.5vw, 60px)",
          paddingTop: "clamp(16px, 2vw, 28px)",
        }}
      >
        {/* ── Text Block ── */}
        <div className="relative" style={{ maxWidth: "580px" }}>
          <DraftingMarks />

          {/* Eyebrow */}
          <p
            className="flex items-center gap-[10px] text-sage uppercase tracking-[0.2em] mb-5"
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "10.5px",
              fontWeight: 500,
            }}
          >
            <span className="block w-[26px] h-[1px] bg-brass shrink-0" aria-hidden="true" />
            Luxury Residential &amp; Commercial
          </p>

          {/* Headline */}
          <h1
            className="text-ivory mb-[26px] leading-[1.04] tracking-[-0.02em] font-display font-semibold"
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "clamp(44px, 5.4vw, 80px)",
            }}
          >
            Spaces that feel
            <br />
            <span className="accent-word">
              <span className="bg-block" aria-hidden="true" />
              unmistakably yours.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="mb-[38px] leading-[1.78] font-light"
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "clamp(13.5px, 1.15vw, 16px)",
              color: "rgba(231,226,217,0.52)",
              maxWidth: "400px",
            }}
          >
            Marwan Design creates thoughtful interiors that balance timeless
            materials, personal stories, and everyday ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-[14px]">
            {/* Primary button */}
            <motion.a
              href="#"
              id="explore-btn"
              className="inline-block text-charcoal bg-ivory rounded-full whitespace-nowrap no-underline font-medium tracking-[0.05em] cursor-pointer"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "13px",
                padding: "15px 28px",
              }}
              whileHover={
                shouldReduce
                  ? {}
                  : {
                      y: -3,
                      backgroundColor: "#DDD3C4",
                      boxShadow: "0 14px 36px rgba(0,0,0,0.28)",
                    }
              }
              transition={{ duration: 0.25 }}
            >
              Explore Our Work
            </motion.a>

            {/* Circle arrow button */}
            <motion.a
              href="#"
              aria-label="View our portfolio"
              className="flex items-center justify-center shrink-0 rounded-full border border-[rgba(231,226,217,0.22)] bg-transparent text-ivory cursor-pointer no-underline"
              style={{ width: "50px", height: "50px" }}
              whileHover={
                shouldReduce
                  ? {}
                  : {
                      y: -3,
                      x: 2,
                      borderColor: "#B78C4A",
                      backgroundColor: "rgba(183,140,74,0.12)",
                    }
              }
              transition={{ duration: 0.28 }}
            >
              <motion.span
                whileHover={shouldReduce ? {} : { rotate: -18, scale: 1.12 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                <ArrowUpRight size={17} strokeWidth={1.4} />
              </motion.span>
            </motion.a>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div
          className="relative w-full flex-none"
          style={{ marginTop: "clamp(24px, 3vw, 40px)" }}
        >
          <motion.div
            className="relative w-full overflow-hidden img-gradient rounded-[16px] lg:rounded-b-none lg:rounded-t-[16px]"
            whileHover={shouldReduce ? {} : { scale: 1.03 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Mobile shim (< 640px): 1:1 ratio for deliberate, complete visual ending */}
            <div
              aria-hidden="true"
              className="block sm:hidden w-full"
              style={{ paddingTop: "100%" }}
            />

            {/* Tablet shim (640px to 1023px): 16:10 ratio */}
            <div
              aria-hidden="true"
              className="hidden sm:block lg:hidden w-full"
              style={{ paddingTop: "60%" }}
            />

            {/* Desktop shim (1024px+): 16:8 (2:1) ratio untouched */}
            <div
              aria-hidden="true"
              className="hidden lg:block w-full"
              style={{ paddingTop: "50%" }}
            />

            <Image
              src="/images/atelier_haven_interior.jpg"
              alt="The Oak Residence — warm contemporary living room with natural oak paneling, travertine coffee table, linen sectional sofa, sculptural brass pendant lighting, and floor-to-ceiling windows overlooking lush greenery. Designed by Marwan Design."
              fill
              priority
              sizes="(max-width: 860px) 100vw, 95vw"
              className="object-cover"
              style={{
                objectPosition: "center 25%",
              }}
            />

            {/* Floating project card — hidden < 560px */}
            <div className="hidden [@media(min-width:561px)]:block">
              <ProjectCard data={projectData} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
