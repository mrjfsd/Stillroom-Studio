"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ── Animation variants ───────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
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

/* ── Process Stages Data ──────────────────────────────────── */
const processStages = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We listen, understand your lifestyle, and uncover what you want your space to feel like.",
  },
  {
    number: "02",
    title: "CONCEPT",
    description:
      "We translate your ideas into a clear design direction through materials, colours, layouts and mood.",
  },
  {
    number: "03",
    title: "REFINE",
    description:
      "Every detail is thoughtfully considered, adjusted and brought together into one cohesive vision.",
  },
  {
    number: "04",
    title: "CREATE",
    description:
      "The final design comes to life as a space that feels personal, functional and distinctly yours.",
  },
];

export default function StudioIntro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const shouldReduce = useReducedMotion();

  const visible = shouldReduce || inView;

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({
        behavior: shouldReduce ? "auto" : "smooth",
        block: "start",
      });
      window.history.pushState(null, "", "#contact");
    } else {
      window.location.hash = "contact";
    }
  };

  return (
    <section
      id="studio"
      ref={ref}
      className="scroll-mt-20 section-pad-x w-full max-w-full box-border"
      aria-label="From Your Idea to Your Space — The Process"
      style={{
        paddingTop: "clamp(72px, 9vw, 130px)",
        paddingBottom: "clamp(72px, 9vw, 130px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1340px] min-w-0">
        {/* ── Two-column grid ── */}
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-[clamp(40px,4.5vw,72px)] w-full min-w-0"
          variants={stagger}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
        >
          {/* ── LEFT: Clean approach.png image only ── */}
          <motion.div
            className="w-full lg:w-[44%] xl:w-[42%] shrink-0 min-w-0 flex items-center justify-center mx-auto"
            variants={imageVariant}
          >
            <Image
              src="/images/approach.png"
              alt="The White Atelier design process materials, colour palette swatches, drafting compass, and craftsman brush"
              width={1371}
              height={1148}
              className="w-full h-auto max-w-[540px] lg:max-w-full object-contain select-none"
              sizes="(max-width: 1023px) 90vw, 44vw"
              priority={false}
            />
          </motion.div>

          {/* ── RIGHT: Process content & timeline ── */}
          <motion.div
            className="w-full lg:flex-1 flex flex-col justify-center min-w-0"
            variants={stagger}
            style={{ paddingTop: "clamp(0px, 2.5vw, 36px)" }}
          >
            {/* Eyebrow */}
            <motion.p
              className="flex items-center gap-3 uppercase tracking-[0.22em] text-sage mb-5"
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
              THE PROCESS
            </motion.p>

            {/* Main heading */}
            <motion.h2
              className="text-charcoal leading-[1.08] tracking-[-0.02em] mb-6"
              style={{
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "clamp(34px, 4vw, 58px)",
                fontWeight: 600,
              }}
              variants={fadeUp}
            >
              Your vision.
              <br />
              <span className="accent-word">
                <span className="bg-block" aria-hidden="true" />
                Thoughtfully brought to life.
              </span>
            </motion.h2>

            {/* Supporting copy */}
            <motion.p
              className="leading-[1.8] font-light mb-9 text-charcoal/70"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "clamp(14px, 1.08vw, 16px)",
                maxWidth: "560px",
              }}
              variants={fadeUp}
            >
              We listen, understand your lifestyle, and uncover what you want your
              space to feel like. From the first idea to the final detail, every
              decision is thoughtfully shaped around you and the way you live.
            </motion.p>

            {/* ── Process timeline ── */}

            {/* 1. Desktop Horizontal Timeline (>= lg) */}
            <motion.div
              className="hidden lg:block w-full mb-9"
              variants={fadeUp}
            >
              <div className="grid grid-cols-4 gap-4 xl:gap-6 w-full">
                {processStages.map((stage, i) => (
                  <div key={stage.number} className="flex flex-col min-w-0">
                    {/* Header: Number & Title */}
                    <span
                      className="text-brass tracking-[0.18em] font-semibold text-[11px] mb-1 block"
                      style={{
                        fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                      }}
                    >
                      {stage.number}
                    </span>
                    <h3
                      className="text-charcoal tracking-[0.14em] font-medium text-[12px] xl:text-[13px] mb-3 uppercase"
                      style={{
                        fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                      }}
                    >
                      {stage.title}
                    </h3>

                    {/* Horizontal wire & node */}
                    <div className="relative flex items-center mb-3.5 w-full h-[12px]">
                      {/* Connecting line to adjacent stages */}
                      <div
                        aria-hidden="true"
                        className={`absolute h-[1px] bg-[#B78C4A]/40 ${
                          i === 0
                            ? "left-2 -right-4 xl:-right-6"
                            : i === processStages.length - 1
                            ? "-left-4 xl:-left-6 right-auto w-4 xl:w-6"
                            : "-left-4 xl:-left-6 -right-4 xl:-right-6"
                        }`}
                      />
                      {/* Node dot with ivory border ring */}
                      <div
                        aria-hidden="true"
                        className="relative z-10 w-[7px] h-[7px] rounded-full bg-brass ring-4 ring-[#F7F3EC] shrink-0"
                      />
                    </div>

                    {/* Short description */}
                    <p
                      className="leading-[1.62] font-light text-charcoal/65 text-[12px] xl:text-[13px]"
                      style={{
                        fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                      }}
                    >
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2. Mobile & Tablet Vertical Timeline (< lg) */}
            <motion.div
              className="block lg:hidden w-full mb-9"
              variants={fadeUp}
            >
              <div className="relative pl-6 space-y-6">
                {/* Vertical connecting wire */}
                <div
                  aria-hidden="true"
                  className="absolute left-[3px] top-2 bottom-3 w-[1px] bg-[#B78C4A]/35"
                />

                {processStages.map((stage) => (
                  <div key={stage.number} className="relative">
                    {/* Node dot on the wire */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[24px] top-1.5 w-[7px] h-[7px] rounded-full bg-brass ring-4 ring-[#F7F3EC]"
                    />

                    {/* Stage header */}
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span
                        className="text-brass tracking-[0.16em] font-semibold text-[11px]"
                        style={{
                          fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                        }}
                      >
                        {stage.number}
                      </span>
                      <span className="text-brass/60 text-[11px]" aria-hidden="true">
                        —
                      </span>
                      <h3
                        className="text-charcoal tracking-[0.14em] font-medium text-[13px] uppercase"
                        style={{
                          fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                        }}
                      >
                        {stage.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p
                      className="leading-[1.65] font-light text-charcoal/70 text-[13.5px] max-w-[480px]"
                      style={{
                        fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                      }}
                    >
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── CTA row with smooth navigation to contact ── */}
            <motion.div
              className="flex items-center gap-4"
              variants={fadeUp}
            >
              {/* Primary pill button */}
              <motion.a
                href="#contact"
                onClick={handleScrollToContact}
                id="process-talk-space-btn"
                aria-label="Let's talk about your space — scroll to contact section"
                className="inline-block text-ivory rounded-full whitespace-nowrap no-underline font-medium tracking-[0.05em] cursor-pointer"
                style={{
                  fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                  fontSize: "13px",
                  padding: "15px 32px",
                  backgroundColor: "#14231E",
                  color: "#F7F3EC",
                  boxShadow: "0 4px 20px rgba(20,35,30,0.18)",
                }}
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        y: -2.5,
                        backgroundColor: "#0D2A21",
                        boxShadow: "0 12px 32px rgba(13,42,33,0.26)",
                      }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                Let&apos;s Talk About Your Space
              </motion.a>

              {/* Circle arrow button */}
              <motion.a
                href="#contact"
                onClick={handleScrollToContact}
                aria-label="Let's talk about your space — scroll to contact section"
                className="flex items-center justify-center shrink-0 rounded-full border text-charcoal cursor-pointer no-underline"
                style={{
                  width: "52px",
                  height: "52px",
                  borderColor: "rgba(20,35,30,0.20)",
                  backgroundColor: "transparent",
                }}
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        y: -2.5,
                        x: 2.5,
                        borderColor: "#B78C4A",
                        backgroundColor: "rgba(183,140,74,0.10)",
                      }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <motion.span
                  whileHover={shouldReduce ? {} : { rotate: -18, scale: 1.12 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center pointer-events-none"
                >
                  <ArrowUpRight size={18} strokeWidth={1.4} />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
