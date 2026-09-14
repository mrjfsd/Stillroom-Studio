"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";

/* ── Animation variants ───────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

/* ── Service card data types ─────────────────────────────── */
interface ServiceCardBase {
  number: string;
  titleLines: [string, string];
  description: string;
  linkLabel?: string;
}

interface LightCard extends ServiceCardBase {
  variant: "light";
  bgColor: string;
}

interface SageCard extends ServiceCardBase {
  variant: "sage";
  bgColor: string;
}

interface ImageCard extends ServiceCardBase {
  variant: "image";
  imageSrc: string;
  imageAlt: string;
}

type ServiceCard = LightCard | SageCard | ImageCard;

const services: ServiceCard[] = [
  {
    variant: "light",
    number: "01",
    bgColor: "#F0EDE6",
    titleLines: ["Residential", "Interiors"],
    description:
      "Homes with depth, ease, and a strong sense of identity—designed around your daily rituals.",
    linkLabel: "Explore service",
  },
  {
    variant: "sage",
    number: "02",
    bgColor: "#EAF0EC",
    titleLines: ["Renovation &", "Spatial Planning"],
    description:
      "Thoughtful reconfiguration, material direction, and detailed planning that unlock the potential of an existing space.",
    linkLabel: "Explore service",
  },
  {
    variant: "image",
    number: "03",
    imageSrc: "/images/marwan_hospitality_interior.jpg",
    imageAlt:
      "The White Atelier hospitality project: an intimate boutique lounge with deep green velvet curved banquette, brass wall sconces, walnut panelled ceiling, and warm amber lighting.",
    titleLines: ["Hospitality &", "Commercial"],
    description:
      "Atmospheric spaces that turn a brand story into a memorable experience.",
    linkLabel: "Explore service",
  },
];

/* ── Light / Sage card component ─────────────────────────── */
function PaletteCard({
  card,
  shouldReduce,
}: {
  card: LightCard | SageCard;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.article
      className="relative flex flex-col justify-between rounded-[24px] lg:rounded-[26px] overflow-hidden"
      style={{
        backgroundColor: card.bgColor,
        padding: "clamp(28px, 3.2vw, 48px)",
        minHeight: "clamp(380px, 42vw, 520px)",
        boxShadow: "0 2px 20px rgba(20,35,30,0.05)",
      }}
      variants={cardVariant}
      whileHover={
        shouldReduce
          ? {}
          : {
              y: -4,
              boxShadow:
                "0 18px 56px rgba(20,35,30,0.12), 0 2px 8px rgba(20,35,30,0.06)",
            }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Number */}
      <div>
        <span
          className="block mb-8 leading-none select-none"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(56px, 6vw, 88px)",
            fontWeight: 300,
            color: "rgba(20,35,30,0.08)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {card.number}
        </span>

        {/* Title */}
        <h3
          className="text-charcoal leading-[1.12] tracking-[-0.01em] mb-4"
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(26px, 2.8vw, 38px)",
            fontWeight: 600,
          }}
        >
          {card.titleLines[0]}
          <br />
          {card.titleLines[1]}
        </h3>

        {/* Description */}
        <p
          className="leading-[1.74]"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "clamp(13.5px, 1.1vw, 15.5px)",
            color: "rgba(20,35,30,0.56)",
          }}
        >
          {card.description}
        </p>
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(20,35,30,0.09)]">
        <a
          href="/services"
          className="flex items-center gap-[7px] no-underline group"
          aria-label={`${card.linkLabel} — ${card.titleLines[0]} ${card.titleLines[1]}`}
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "11.5px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "rgba(20,35,30,0.48)",
          }}
        >
          <span className="uppercase tracking-[0.1em] transition-colors duration-300 group-hover:text-charcoal">
            {card.linkLabel}
          </span>
          <ArrowUpRight
            size={13}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            style={{ color: "rgba(20,35,30,0.38)" }}
          />
        </a>
      </div>
    </motion.article>
  );
}

/* ── Image card component ─────────────────────────────────── */
function PhotoCard({
  card,
  shouldReduce,
}: {
  card: ImageCard;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.article
      className="relative flex flex-col justify-end rounded-[24px] lg:rounded-[26px] overflow-hidden group"
      style={{
        minHeight: "clamp(380px, 42vw, 520px)",
        boxShadow: "0 4px 32px rgba(13,42,33,0.22)",
      }}
      variants={cardVariant}
      whileHover={
        shouldReduce ? {} : { y: -4, boxShadow: "0 24px 64px rgba(13,42,33,0.32)" }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Background photography — scales on group-hover */}
      <div className="absolute inset-0 overflow-hidden rounded-[24px] lg:rounded-[26px]">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 48vw, 33vw"
          className={[
            "object-cover transition-transform duration-700 ease-out",
            shouldReduce ? "" : "group-hover:scale-[1.04]",
          ].join(" ")}
          style={{ objectPosition: "center 30%" }}
        />
      </div>

      {/* Dark forest gradient — stronger at bottom for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,20,15,0.92) 0%, rgba(10,20,15,0.55) 45%, transparent 75%)",
        }}
      />

      {/* Card text — sits above gradient */}
      <div
        className="relative z-10 flex flex-col justify-end"
        style={{ padding: "clamp(24px, 3vw, 44px)" }}
      >
        {/* Number */}
        <span
          className="block mb-5 leading-none select-none"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(52px, 5.6vw, 80px)",
            fontWeight: 300,
            color: "rgba(247,243,236,0.12)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {card.number}
        </span>

        {/* Title */}
        <h3
          className="text-ivory leading-[1.12] tracking-[-0.01em] mb-3"
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(26px, 2.8vw, 38px)",
            fontWeight: 600,
          }}
        >
          {card.titleLines[0]}
          <br />
          {card.titleLines[1]}
        </h3>

        {/* Description */}
        <p
          className="leading-[1.72] mb-7"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "clamp(13px, 1.05vw, 15px)",
            color: "rgba(235,229,220,0.65)",
          }}
        >
          {card.description}
        </p>

        {/* Footer link */}
        <div className="pt-5 border-t border-[rgba(247,243,236,0.14)] flex items-center justify-between">
          <a
            href="/services"
            className="flex items-center gap-[7px] no-underline group/link"
            aria-label={`${card.linkLabel} — ${card.titleLines[0]} ${card.titleLines[1]}`}
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "11.5px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(247,243,236,0.52)",
            }}
          >
            <span className="uppercase tracking-[0.1em] transition-colors duration-300 group-hover/link:text-ivory">
              {card.linkLabel}
            </span>
            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px]"
              style={{ color: "rgba(247,243,236,0.40)" }}
            />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "0px 0px -40px 0px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "0px 0px -60px 0px" });
  const shouldReduce = useReducedMotion();

  const headerVisible = shouldReduce || headerInView;
  const cardsVisible = shouldReduce || cardsInView;

  return (
    <section
      id="services"
      className="scroll-mt-20 section-pad-x w-full max-w-full box-border"
      aria-label="Interior design services"
      style={{
        paddingBottom:
          "clamp(80px, 10vw, 140px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1340px] min-w-0">

        {/* ── Header area ── */}
        <motion.div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-[clamp(40px,5vw,64px)] w-full min-w-0"
          variants={stagger}
          initial="hidden"
          animate={headerVisible ? "visible" : "hidden"}
        >
          {/* Left: eyebrow + heading + body */}
          <div className="flex-1 min-w-0" style={{ maxWidth: "560px" }}>
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
              What We Do
            </motion.p>

            <motion.h2
              className="text-charcoal leading-[1.07] tracking-[-0.02em] mb-6"
              style={{
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "clamp(38px, 4.6vw, 66px)",
                fontWeight: 600,
              }}
              variants={fadeUp}
            >
              Spaces shaped around
              <br />
              <span className="accent-word">
                <span className="bg-block" aria-hidden="true" />
                your life.
              </span>
            </motion.h2>

            <motion.p
              className="leading-[1.80]"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "clamp(13.5px, 1.12vw, 16px)",
                color: "rgba(20,35,30,0.56)",
              }}
              variants={fadeUp}
            >
              From first concept to final styling, The White Atelier brings clarity,
              character, and craft to every layer of an interior.
            </motion.p>
          </div>

          {/* Right: carousel controls */}
          <motion.div
            className="flex items-center gap-3 shrink-0"
            variants={fadeUp}
            aria-label="Service navigation controls"
          >
            <button
              type="button"
              aria-label="Previous service"
              className="flex items-center justify-center rounded-full border border-[rgba(20,35,30,0.16)] bg-transparent text-charcoal cursor-pointer transition-colors duration-250"
              style={{
                width: "46px",
                height: "46px",
                color: "rgba(20,35,30,0.38)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(20,35,30,0.32)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "#14231E";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(20,35,30,0.16)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(20,35,30,0.38)";
              }}
            >
              <ArrowLeft size={16} strokeWidth={1.4} />
            </button>

            <button
              type="button"
              aria-label="Next service"
              className="flex items-center justify-center rounded-full border cursor-pointer transition-colors duration-250"
              style={{
                width: "46px",
                height: "46px",
                borderColor: "#B78C4A",
                backgroundColor: "rgba(183,140,74,0.08)",
                color: "#B78C4A",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(183,140,74,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(183,140,74,0.08)";
              }}
            >
              <ArrowRight size={16} strokeWidth={1.4} />
            </button>
          </motion.div>
        </motion.div>

        {/* ── Cards row ── */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(14px,1.8vw,24px)] w-full min-w-0"
          variants={stagger}
          initial="hidden"
          animate={cardsVisible ? "visible" : "hidden"}
        >
          {services.map((card) => {
            if (card.variant === "image") {
              return (
                <PhotoCard
                  key={card.number}
                  card={card}
                  shouldReduce={shouldReduce}
                />
              );
            }
            return (
              <PaletteCard
                key={card.number}
                card={card}
                shouldReduce={shouldReduce}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
