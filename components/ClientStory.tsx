"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ── Linden House image data ─────────────────────────────── */
const LINDEN_IMAGES = [
  {
    src: "/images/in1.png",
    alt: "Custom floor-to-ceiling wardrobe joinery around window alcove at The Linden House",
    title: "Wardrobe & Window Alcove",
    objectPosition: "center center",
  },
  {
    src: "/images/in2.png",
    alt: "Integrated wardrobe joinery with full-length dressing mirror at The Linden House",
    title: "Integrated Dressing Mirror",
    objectPosition: "center 20%",
  },
  {
    src: "/images/in3.png",
    alt: "Angular view of tailored wardrobe and cantilevered bedside alcove at The Linden House",
    title: "Tailored Bedside Joinery",
    objectPosition: "center center",
  },
  {
    src: "/images/in4.png",
    alt: "Contemporary kitchen cabinetry with glass display fronts and black countertop at The Linden House",
    title: "Kitchen Cabinetry & Glass Display",
    objectPosition: "center center",
  },
  {
    src: "/images/in5.png",
    alt: "Kitchen sink and workstation overlooking garden window at The Linden House",
    title: "Workstation & Garden Window",
    objectPosition: "center center",
  },
];

/* ── Deck resting positions (index 0 = front) ────────────── */
const DECK_OFFSETS = [
  { x: 0,   y: 0,  rotate: 0,  scale: 1,    zIndex: 10, opacity: 1    },
  { x: 12,  y: 5,  rotate: 3,  scale: 0.98, zIndex: 8,  opacity: 0.96 },
  { x: -10, y: 10, rotate: -3, scale: 0.96, zIndex: 6,  opacity: 0.90 },
  { x: 18,  y: 18, rotate: 6,  scale: 0.94, zIndex: 4,  opacity: 0.82 },
  { x: -18, y: 24, rotate: -7, scale: 0.92, zIndex: 2,  opacity: 0.72 },
];

/* ── Shared animation variants ───────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const staggerLeft: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: "easeOut" } },
};

const galleryItemFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Reusable testimonial quote card ─────────────────────── */
function QuoteCard({ visible }: { visible: boolean }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={shouldReduce ? { duration: 0.01 } : { duration: 0.7, delay: 0.25, ease: "easeOut" }}
    >
      <div
        className="rounded-[22px] box-border"
        style={{
          backgroundColor: "#F7F3EC",
          padding: "clamp(22px,2.8vw,38px)",
          boxShadow:
            "0 28px 72px rgba(20,35,30,0.16), 0 2px 8px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      >
        {/* Brass quote mark */}
        <svg
          width="32"
          height="22"
          viewBox="0 0 32 22"
          fill="none"
          aria-hidden="true"
          className="mb-4"
        >
          <path
            d="M0 22V13.2C0 9.6 0.933333 6.53333 2.8 4C4.66667 1.46667 7.2 0 10.4 0L12 2.4C10.1333 3.06667 8.6 4.26667 7.4 6C6.26667 7.73333 5.7 9.6 5.7 11.6H11.4V22H0ZM20.6 22V13.2C20.6 9.6 21.5333 6.53333 23.4 4C25.2667 1.46667 27.8 0 31 0L32.6 2.4C30.7333 3.06667 29.2 4.26667 28 6C26.8667 7.73333 26.3 9.6 26.3 11.6H32V22H20.6Z"
            fill="#B78C4A"
            opacity="0.55"
          />
        </svg>

        {/* Quote body */}
        <p
          className="leading-[1.72] mb-5"
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(14.5px, 1.3vw, 17.5px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(20,35,30,0.82)",
          }}
        >
          &ldquo;Marwan Design understood how we wanted our home to feel before
          we had the words for it. Every room is beautiful, but more
          importantly, it feels like us.&rdquo;
        </p>

        {/* Divider */}
        <div
          className="mb-4"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, #DDD3C4 0%, transparent 85%)",
          }}
          aria-hidden="true"
        />

        {/* Attribution */}
        <div>
          <p
            className="font-medium mb-[3px]"
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "12.5px",
              letterSpacing: "0.02em",
              color: "#14231E",
            }}
          >
            Ananya &amp; Rohan Mehta
          </p>
          <p
            className="uppercase tracking-[0.13em]"
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "9.5px",
              fontWeight: 500,
              color: "rgba(20,35,30,0.42)",
            }}
          >
            The Linden House, Bengaluru
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClientStory() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const shouldReduce = useReducedMotion();

  const visible = shouldReduce || inView;

  /* Deck state */
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const handleNextDeck = () =>
    setActiveDeckIndex((prev) => (prev + 1) % LINDEN_IMAGES.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 35) handleNextDeck();
  };

  return (
    <section
      ref={ref}
      id="contact-stories"
      aria-label="Client stories — testimonials"
      className="scroll-mt-20 section-pad-x w-full max-w-full box-border"
      style={{
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        backgroundColor: "#F7F3EC",
      }}
    >
      <div className="mx-auto w-full max-w-[1340px] min-w-0">

        {/* ══════════════════════════════════════════════════════
            MOBILE layout  (< md)
            Stacked: editorial copy → deck → quote card
        ══════════════════════════════════════════════════════ */}
        <div className="block md:hidden w-full min-w-0">

          {/* Editorial copy */}
          <motion.div
            className="w-full flex flex-col min-w-0 mb-10"
            variants={staggerLeft}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
          >
            <motion.p
              className="flex items-center gap-3 uppercase tracking-[0.22em] text-sage mb-6"
              style={{ fontFamily: "var(--font-dm-sans, system-ui, sans-serif)", fontSize: "10px", fontWeight: 500 }}
              variants={fadeUp}
            >
              <span aria-hidden="true" className="block h-[1px] bg-brass shrink-0" style={{ width: "26px" }} />
              Client Stories
            </motion.p>

            <motion.h2
              className="text-charcoal leading-[1.08] tracking-[-0.02em] mb-7"
              style={{
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "clamp(36px, 9vw, 52px)",
                fontWeight: 600,
              }}
              variants={fadeUp}
            >
              <span className="accent-word">
                <span className="bg-block" aria-hidden="true" />
                Made personal,
              </span>
              <br />
              from first sketch
              <br />
              to final detail.
            </motion.h2>

            <motion.p
              className="leading-[1.82] mb-8"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "clamp(13.5px, 3.5vw, 15.5px)",
                color: "rgba(20,35,30,0.56)",
              }}
              variants={fadeUp}
            >
              The best interiors begin with listening. Our clients bring the
              stories, rituals, and aspirations; we turn them into spaces that
              feel unmistakably their own.
            </motion.p>

            <motion.div className="flex items-center gap-3" variants={fadeUp} aria-label="Client story navigation">
              <button
                type="button"
                aria-label="Previous client story"
                className="flex items-center justify-center rounded-full border cursor-pointer transition-all duration-250"
                style={{ width: "46px", height: "46px", borderColor: "rgba(20,35,30,0.16)", backgroundColor: "transparent", color: "rgba(20,35,30,0.38)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(20,35,30,0.32)"; e.currentTarget.style.color = "#14231E"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(20,35,30,0.16)"; e.currentTarget.style.color = "rgba(20,35,30,0.38)"; }}
              >
                <ArrowLeft size={16} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                aria-label="Next client story"
                className="flex items-center justify-center rounded-full border cursor-pointer transition-all duration-250"
                style={{ width: "46px", height: "46px", borderColor: "#8FA394", backgroundColor: "rgba(143,163,148,0.08)", color: "#8FA394" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(143,163,148,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(143,163,148,0.08)"; }}
              >
                <ArrowRight size={16} strokeWidth={1.4} />
              </button>
            </motion.div>
          </motion.div>

          {/* Shuffled image deck */}
          <motion.div
            className="w-full min-w-0"
            variants={fadeIn}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
          >
            <div
              className="relative w-full max-w-[360px] mx-auto h-[610px] sm:h-[650px]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label="Linden House project image deck — tap or swipe to shuffle"
            >
              {LINDEN_IMAGES.map((img, i) => {
                const position = (i - activeDeckIndex + LINDEN_IMAGES.length) % LINDEN_IMAGES.length;
                const offset = DECK_OFFSETS[position];
                const isFront = position === 0;
                return (
                  <div
                    key={img.src}
                    className="absolute inset-0 flex items-start justify-center pointer-events-none"
                    style={{ zIndex: offset.zIndex }}
                  >
                    <motion.div
                      className="pointer-events-auto relative w-[86%] aspect-[9/16] rounded-[20px] overflow-hidden cursor-pointer select-none"
                      style={{
                        boxShadow: isFront
                          ? "0 22px 50px rgba(20,35,30,0.18), 0 4px 12px rgba(0,0,0,0.06)"
                          : "0 12px 30px rgba(20,35,30,0.10), 0 2px 8px rgba(0,0,0,0.04)",
                        border: "1px solid rgba(247,243,236,0.7)",
                        backgroundColor: "#EAE4D9",
                        transformOrigin: "center 88%",
                      }}
                      animate={{
                        x: shouldReduce ? 0 : offset.x,
                        y: offset.y,
                        rotate: shouldReduce ? 0 : offset.rotate,
                        scale: offset.scale,
                        opacity: offset.opacity,
                      }}
                      transition={
                        shouldReduce
                          ? { duration: 0.01 }
                          : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
                      }
                      onClick={handleNextDeck}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 767px) 86vw, 320px"
                        priority={isFront && visible}
                        loading={isFront ? "eager" : "lazy"}
                        className="object-cover"
                        style={{ objectPosition: img.objectPosition }}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Shuffle controls */}
            <div className="flex flex-col items-center mt-5 sm:mt-6">
              <button
                type="button"
                id="linden-deck-next-btn"
                onClick={handleNextDeck}
                aria-label="Show next Linden House image"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-medium tracking-[0.06em] cursor-pointer transition-all duration-200 active:scale-[0.98] hover:border-[#B78C4A]"
                style={{
                  fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                  backgroundColor: "#F7F3EC",
                  borderColor: "rgba(20,35,30,0.18)",
                  color: "#14231E",
                  boxShadow: "0 2px 10px rgba(20,35,30,0.05)",
                }}
              >
                <span>View next detail</span>
                <ArrowRight size={13} strokeWidth={1.7} className="text-sage" />
              </button>
              <span className="sr-only" aria-live="polite">
                Showing detail {activeDeckIndex + 1} of {LINDEN_IMAGES.length}:{" "}
                {LINDEN_IMAGES[activeDeckIndex].title}
              </span>
              <p
                className="text-[11px] text-sage mt-2.5 tracking-[0.1em] font-medium uppercase"
                style={{ fontFamily: "var(--font-dm-sans, system-ui, sans-serif)" }}
              >
                {activeDeckIndex + 1} of {LINDEN_IMAGES.length}
              </p>
            </div>
          </motion.div>

          {/* Quote card — sits directly below the deck */}
          <div className="w-full max-w-full min-w-0 mt-7 sm:mt-8">
            <QuoteCard visible={visible} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP / TABLET layout  (md+)
            Left: editorial copy + nav controls
            Right: 3-column masonry gallery → quote card below
        ══════════════════════════════════════════════════════ */}
        <div className="hidden md:flex flex-row items-start gap-[clamp(40px,5vw,72px)] w-full min-w-0">

          {/* Left: editorial copy */}
          <motion.div
            className="w-[36%] shrink-0 flex flex-col justify-center min-w-0"
            variants={staggerLeft}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            style={{ paddingTop: "clamp(0px,3vw,48px)" }}
          >
            <motion.p
              className="flex items-center gap-3 uppercase tracking-[0.22em] text-sage mb-6"
              style={{ fontFamily: "var(--font-dm-sans, system-ui, sans-serif)", fontSize: "10px", fontWeight: 500 }}
              variants={fadeUp}
            >
              <span aria-hidden="true" className="block h-[1px] bg-brass shrink-0" style={{ width: "26px" }} />
              Client Stories
            </motion.p>

            <motion.h2
              className="text-charcoal leading-[1.08] tracking-[-0.02em] mb-7"
              style={{
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "clamp(36px, 4.2vw, 62px)",
                fontWeight: 600,
              }}
              variants={fadeUp}
            >
              <span className="accent-word">
                <span className="bg-block" aria-hidden="true" />
                Made personal,
              </span>
              <br />
              from first sketch
              <br />
              to final detail.
            </motion.h2>

            <motion.p
              className="leading-[1.82] mb-10"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "clamp(13.5px, 1.1vw, 16px)",
                color: "rgba(20,35,30,0.56)",
                maxWidth: "400px",
              }}
              variants={fadeUp}
            >
              The best interiors begin with listening. Our clients bring the
              stories, rituals, and aspirations; we turn them into spaces that
              feel unmistakably their own.
            </motion.p>

            <motion.div className="flex items-center gap-3" variants={fadeUp} aria-label="Client story navigation">
              <button
                type="button"
                aria-label="Previous client story"
                className="flex items-center justify-center rounded-full border cursor-pointer transition-all duration-250"
                style={{ width: "46px", height: "46px", borderColor: "rgba(20,35,30,0.16)", backgroundColor: "transparent", color: "rgba(20,35,30,0.38)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(20,35,30,0.32)"; e.currentTarget.style.color = "#14231E"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(20,35,30,0.16)"; e.currentTarget.style.color = "rgba(20,35,30,0.38)"; }}
              >
                <ArrowLeft size={16} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                aria-label="Next client story"
                className="flex items-center justify-center rounded-full border cursor-pointer transition-all duration-250"
                style={{ width: "46px", height: "46px", borderColor: "#8FA394", backgroundColor: "rgba(143,163,148,0.08)", color: "#8FA394" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(143,163,148,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(143,163,148,0.08)"; }}
              >
                <ArrowRight size={16} strokeWidth={1.4} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: gallery + quote card */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            {/* 3-column asymmetric masonry */}
            <div className="grid grid-cols-3 items-start gap-4 w-full min-w-0">

              {/* Column 1: in1 — tall dominant tile */}
              <motion.div
                className="col-span-1 w-full min-w-0"
                style={{ height: "clamp(480px, 50vw, 720px)" }}
                custom={1}
                variants={galleryItemFade}
                initial="hidden"
                animate={visible ? "visible" : "hidden"}
              >
                <div
                  className="group relative w-full h-full overflow-hidden rounded-[20px]"
                  style={{ backgroundColor: "#EAE4D9", boxShadow: "0 16px 44px rgba(20,35,30,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <Image
                    src="/images/in1.png"
                    alt="Custom floor-to-ceiling wardrobe joinery around window alcove at The Linden House"
                    fill
                    sizes="(max-width: 1023px) 33vw, 22vw"
                    className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                    style={{ objectPosition: "center center" }}
                  />
                </div>
              </motion.div>

              {/* Columns 2 & 3: two stacked pairs */}
              <div className="col-span-2 grid grid-cols-2 gap-4 min-w-0" style={{ height: "clamp(480px, 50vw, 720px)" }}>

                {/* in2 top-left */}
                <motion.div
                  className="w-full min-w-0"
                  style={{ height: "calc(50% - 8px)" }}
                  custom={2}
                  variants={galleryItemFade}
                  initial="hidden"
                  animate={visible ? "visible" : "hidden"}
                >
                  <div
                    className="group relative w-full h-full overflow-hidden rounded-[20px]"
                    style={{ backgroundColor: "#EAE4D9", boxShadow: "0 16px 44px rgba(20,35,30,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    <Image
                      src="/images/in2.png"
                      alt="Integrated wardrobe joinery with full-length dressing mirror at The Linden House"
                      fill
                      sizes="(max-width: 1023px) 33vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </div>
                </motion.div>

                {/* in3 top-right */}
                <motion.div
                  className="w-full min-w-0"
                  style={{ height: "calc(50% - 8px)" }}
                  custom={3}
                  variants={galleryItemFade}
                  initial="hidden"
                  animate={visible ? "visible" : "hidden"}
                >
                  <div
                    className="group relative w-full h-full overflow-hidden rounded-[20px]"
                    style={{ backgroundColor: "#EAE4D9", boxShadow: "0 16px 44px rgba(20,35,30,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    <Image
                      src="/images/in3.png"
                      alt="Angular view of tailored wardrobe and cantilevered bedside alcove at The Linden House"
                      fill
                      sizes="(max-width: 1023px) 33vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                      style={{ objectPosition: "center center" }}
                    />
                  </div>
                </motion.div>

                {/* in4 bottom-left */}
                <motion.div
                  className="w-full min-w-0"
                  style={{ height: "calc(50% - 8px)" }}
                  custom={4}
                  variants={galleryItemFade}
                  initial="hidden"
                  animate={visible ? "visible" : "hidden"}
                >
                  <div
                    className="group relative w-full h-full overflow-hidden rounded-[20px]"
                    style={{ backgroundColor: "#EAE4D9", boxShadow: "0 16px 44px rgba(20,35,30,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    <Image
                      src="/images/in4.png"
                      alt="Contemporary kitchen cabinetry with glass display fronts and black countertop at The Linden House"
                      fill
                      sizes="(max-width: 1023px) 33vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                      style={{ objectPosition: "center center" }}
                    />
                  </div>
                </motion.div>

                {/* in5 bottom-right */}
                <motion.div
                  className="w-full min-w-0"
                  style={{ height: "calc(50% - 8px)" }}
                  custom={5}
                  variants={galleryItemFade}
                  initial="hidden"
                  animate={visible ? "visible" : "hidden"}
                >
                  <div
                    className="group relative w-full h-full overflow-hidden rounded-[20px]"
                    style={{ backgroundColor: "#EAE4D9", boxShadow: "0 16px 44px rgba(20,35,30,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    <Image
                      src="/images/in5.png"
                      alt="Kitchen sink and workstation overlooking garden window at The Linden House"
                      fill
                      sizes="(max-width: 1023px) 33vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                      style={{ objectPosition: "center center" }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quote card — right-aligned below the gallery */}
            <div className="self-end w-full max-w-[clamp(280px,42%,420px)] min-w-0">
              <QuoteCard visible={visible} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
