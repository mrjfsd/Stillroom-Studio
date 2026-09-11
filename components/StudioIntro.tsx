"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ── Animation variants ───────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const imageVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

/* ── Principles list ─────────────────────────────────────── */
const principles = [
  "Material Honesty",
  "Light & Flow",
  "Lasting Craft",
  "Personal Detail",
];

/* ── Stats ───────────────────────────────────────────────── */
const stats = [
  { value: "40+", label: "Completed spaces" },
  { value: "12",  label: "Years of practice" },
  { value: "8",   label: "Design awards" },
];

export default function StudioIntro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const shouldReduce = useReducedMotion();

  const visible = shouldReduce || inView;

  return (
    <section
      id="studio"
      ref={ref}
      className="scroll-mt-20 section-pad-x w-full max-w-full box-border"
      aria-label="Our approach — studio introduction"
      style={{
        paddingTop: "clamp(72px, 10vw, 140px)",
        paddingBottom: "clamp(72px, 10vw, 140px)",
      }}
    >
      <div
        className="mx-auto w-full max-w-[1340px] min-w-0"
      >
        {/* ── Two-column grid ── */}
        <motion.div
          className="flex flex-col lg:flex-row items-start gap-[clamp(40px,5vw,80px)] w-full min-w-0"
          variants={stagger}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
        >
          {/* ── LEFT: Image card ── */}
          <motion.div
            className="w-full lg:w-[42%] shrink-0 min-w-0 mx-auto"
            variants={imageVariant}
          >
            {/* Image wrapper — portrait card with overlay text */}
            <motion.div
              className="relative overflow-hidden rounded-[28px] lg:rounded-[30px] w-full max-w-full mx-auto"
              style={{
                /* ~3:4 portrait ratio via padding-top shim */
                paddingTop: "125%",
                boxShadow:
                  "0 32px 80px rgba(13,42,33,0.22), 0 4px 16px rgba(0,0,0,0.1)",
              }}
              whileHover={shouldReduce ? {} : { scale: 1.015 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              {/* Photography */}
              <Image
                src="/images/marwan_studio_intro_dining.jpg"
                alt="Completed Marwan Design dining room featuring travertine table, curved cream linen chairs, warm oak joinery and a sculptural dried-branch chandelier with brass hardware."
                fill
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />

              {/* Deep gradient overlay — begins at lower third */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,42,33,0.92) 0%, rgba(13,42,33,0.6) 32%, transparent 62%)",
                }}
              />

              {/* Overlay content */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10"
                style={{ padding: "clamp(22px, 3vw, 38px)" }}
              >
                {/* Eyebrow */}
                <p
                  className="uppercase tracking-[0.2em] mb-3 flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                    fontSize: "9.5px",
                    fontWeight: 500,
                    color: "rgba(183,140,74,0.9)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="block h-[1px] bg-brass shrink-0"
                    style={{ width: "22px" }}
                  />
                  Marwan Design Principles
                </p>

                {/* Title */}
                <h2
                  className="text-ivory leading-[1.06] tracking-[-0.01em] mb-5"
                  style={{
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    fontSize: "clamp(26px, 3.2vw, 44px)",
                    fontWeight: 600,
                  }}
                >
                  Designed for Living
                </h2>

                {/* Principles grid */}
                <ul
                  className="flex flex-wrap gap-x-5 gap-y-2"
                  role="list"
                  aria-label="Design principles"
                >
                  {principles.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-[7px] text-text-lt"
                      style={{
                        fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                        fontSize: "11.5px",
                        fontWeight: 400,
                        color: "rgba(235,229,220,0.80)",
                      }}
                    >
                      {/* Brass dot */}
                      <span
                        aria-hidden="true"
                        className="w-[4px] h-[4px] rounded-full bg-brass shrink-0"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Editorial copy ── */}
          <motion.div
            className="w-full lg:flex-1 flex flex-col justify-center min-w-0"
            variants={stagger}
            style={{ paddingTop: "clamp(0px, 4vw, 64px)" }}
          >
            {/* Eyebrow */}
            <motion.p
              className="flex items-center gap-3 uppercase tracking-[0.22em] text-sage mb-6"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "10px",
                fontWeight: 500,
              }}
              variants={fadeUp}
            >
              <span
                aria-hidden="true"
                className="block h-[1px] bg-brass shrink-0"
                style={{ width: "26px" }}
              />
              Our Approach
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="text-charcoal leading-[1.07] tracking-[-0.02em] mb-7"
              style={{
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "clamp(38px, 4.6vw, 68px)",
                fontWeight: 600,
              }}
              variants={fadeUp}
            >
              Interiors with a{" "}
              <span className="accent-word">
                <span className="bg-block" aria-hidden="true" />
                sense of place,
              </span>
              <br />
              made for the way you live.
            </motion.h2>

            {/* Body copy */}
            <motion.p
              className="leading-[1.82] font-light mb-10"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "clamp(14px, 1.15vw, 16.5px)",
                color: "rgba(20,35,30,0.60)",
                maxWidth: "480px",
              }}
              variants={fadeUp}
            >
              We shape residential and hospitality interiors around natural
              materials, considered proportions, and the rituals that make a
              space truly personal. Every decision is made to feel effortless
              long after the project is complete.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="flex items-stretch mb-10"
              style={{ maxWidth: "440px" }}
              variants={fadeUp}
            >
              {stats.map((s, i) => (
                <div key={s.value} className="flex items-stretch">
                  {/* Stat block */}
                  <div className="flex flex-col gap-[5px] px-0">
                    <span
                      className="text-charcoal leading-none tracking-[-0.03em]"
                      style={{
                        fontFamily: "var(--font-cormorant, Georgia, serif)",
                        fontSize: "clamp(34px, 3.8vw, 52px)",
                        fontWeight: 600,
                      }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="uppercase tracking-[0.14em]"
                      style={{
                        fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                        fontSize: "9.5px",
                        fontWeight: 500,
                        color: "rgba(20,35,30,0.42)",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* Divider — not after last item */}
                  {i < stats.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="mx-[clamp(16px,2.2vw,30px)] self-stretch"
                      style={{
                        width: "1px",
                        background:
                          "linear-gradient(to bottom, transparent 0%, #DDD3C4 30%, #DDD3C4 70%, transparent 100%)",
                      }}
                    />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              className="flex items-center gap-4"
              variants={fadeUp}
            >
              {/* Primary pill button */}
              <motion.a
                href="#"
                id="meet-studio-btn"
                aria-label="Meet the Marwan Design studio"
                className="inline-block text-charcoal bg-ivory rounded-full whitespace-nowrap no-underline font-medium tracking-[0.05em] cursor-pointer border border-[rgba(20,35,30,0.14)]"
                style={{
                  fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                  fontSize: "13px",
                  padding: "14px 28px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  backgroundColor: "#14231E",
                  color: "#F7F3EC",
                }}
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        y: -3,
                        backgroundColor: "#0D2A21",
                        boxShadow: "0 12px 32px rgba(13,42,33,0.28)",
                      }
                }
                transition={{ duration: 0.25 }}
              >
                Meet the Studio
              </motion.a>

              {/* Circle arrow button */}
              <motion.a
                href="#"
                aria-label="Learn more about Marwan Design"
                className="flex items-center justify-center shrink-0 rounded-full border border-[rgba(20,35,30,0.18)] bg-transparent text-charcoal cursor-pointer no-underline"
                style={{ width: "50px", height: "50px" }}
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        y: -3,
                        x: 2,
                        borderColor: "#B78C4A",
                        backgroundColor: "rgba(183,140,74,0.10)",
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
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
