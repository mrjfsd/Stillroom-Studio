"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { WHATSAPP_CHAT_URL } from "@/config/whatsapp";

/* ── Animation variants ───────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

/* ── Material swatch SVGs for CTA decoration ─────────────── */
function MaterialCircle({
  label,
  style,
  children,
  className = "",
}: {
  label: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full overflow-hidden shrink-0 ${className}`}
      style={{
        width: "clamp(48px, 5vw, 72px)",
        height: "clamp(48px, 5vw, 72px)",
        boxShadow: "0 4px 20px rgba(20,35,30,0.10)",
        border: "2px solid rgba(143,163,148,0.2)",
        ...style,
      }}
      aria-label={label}
      role="img"
    >
      {children}
    </div>
  );
}

/* ── Architectural arc lines (SVG) ───────────────────────── */
function ArchLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <style>{`
          .arc-line { fill: none; stroke: #8FA394; stroke-width: 0.6; opacity: 0.10; }
        `}</style>
      </defs>
      {/* Concentric arcs centered around bottom middle */}
      {[180, 260, 340, 420, 500, 580, 660].map((r, i) => (
        <ellipse
          key={i}
          className="arc-line"
          cx="50%"
          cy="115%"
          rx={r}
          ry={r * 0.7}
        />
      ))}
      {/* A few drafting tick marks */}
      <line className="arc-line" x1="12%" y1="20%" x2="14%" y2="20%" strokeDasharray="2 4" />
      <line className="arc-line" x1="12%" y1="21.5%" x2="11%" y2="21.5%" strokeDasharray="2 4" />
      <line className="arc-line" x1="85%" y1="25%" x2="88%" y2="25%" strokeDasharray="2 4" />
      <circle className="arc-line" cx="88%" cy="24.5%" r="4" />
    </svg>
  );
}

/* ── Material swatches using CSS backgrounds ─────────────── */
const materialSwatches: Array<{
  label: string;
  bg: string;
  pos: React.CSSProperties;
  hasLines?: boolean;
}> = [
  {
    label: "Travertine texture",
    bg: "linear-gradient(135deg, #DDD3C4 0%, #C8BAA8 50%, #E3D9CC 100%)",
    pos: { top: "14%", left: "7%" },
  },
  {
    label: "Timber grain",
    bg: "linear-gradient(160deg, #C49A6C 0%, #A3784A 40%, #B8895A 100%)",
    pos: { top: "62%", left: "4%" },
  },
  {
    label: "Linen fabric",
    bg: "linear-gradient(120deg, #E8E0D4 0%, #F0E8DC 60%, #DDD4C4 100%)",
    pos: { top: "18%", right: "6%" },
  },
  {
    label: "Brushed brass",
    bg: "linear-gradient(145deg, #C9A063 0%, #B78C4A 50%, #D4AD72 100%)",
    pos: { top: "65%", right: "5%" },
  },
  {
    label: "Hand-drawn floor-plan detail",
    bg: "linear-gradient(180deg, #EAE6DF 0%, #F0EDE6 100%)",
    pos: { top: "50%", left: "50%", transform: "translate(-50%,-50%)", marginTop: "-120px" },
    hasLines: true,
  },
];

/* ── Footer nav links ─────────────────────────────────────── */
const footerNav = [
  {
    heading: "Studio",
    links: [
      { label: "About",    href: "/studio" },
      { label: "Approach", href: "/studio" },
      { label: "Journal",  href: "/journal" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Residential",  href: "/services" },
      { label: "Hospitality",  href: "/services" },
      { label: "Commercial",   href: "/services" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Start a Project", href: "/start-a-project" },
      { label: "Instagram",       href: "#" },
      { label: "Contact",         href: "/start-a-project" },
    ],
  },
];

/* ── Social icon components ──────────────────────────────── */
function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1C4.134 1 1 4.134 1 8c0 2.966 1.787 5.52 4.36 6.68-.06-.525-.114-1.33.024-1.904.126-.519.839-3.557.839-3.557s-.214-.43-.214-1.067c0-1.001.58-1.75 1.3-1.75.614 0 .911.46.911 1.012 0 .617-.393 1.541-.596 2.397-.17.715.359 1.297 1.065 1.297 1.277 0 2.262-1.347 2.262-3.293 0-1.722-1.237-2.927-3.002-2.927-2.044 0-3.245 1.533-3.245 3.119 0 .617.238 1.278.534 1.64a.214.214 0 0 1 .05.205l-.2.814c-.031.133-.106.16-.244.097-1.01-.47-1.64-1.946-1.64-3.133 0-2.549 1.852-4.893 5.341-4.893 2.804 0 4.98 1.997 4.98 4.664 0 2.782-1.754 5.02-4.187 5.02-.818 0-1.587-.425-1.85-.927l-.503 1.876c-.182.7-.673 1.576-1.003 2.11.755.233 1.558.359 2.39.359C11.866 15 15 11.866 15 8S11.866 1 8 1Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 1A1.5 1.5 0 1 0 2.5 4 1.5 1.5 0 0 0 2.5 1ZM1 5.5h3V15H1V5.5ZM5.5 5.5h2.9v1.3h.04c.4-.76 1.4-1.56 2.88-1.56C14.24 5.24 15 7.3 15 9.9V15h-2.98v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.38V15H5.5V5.5Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

/* ── Studio Monogram (same as Header) ─────────────────────── */
function StudioMonogram({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="0.5" y="0.5" width="33" height="33" rx="3.5" stroke="#B78C4A" strokeOpacity="0.7" />
      <path
        d="M7 8L12 26L17 14L22 26L27 8"
        stroke="#F7F3EC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="7" y1="17" x2="27" y2="17" stroke="#B78C4A" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/* ── CTA Section ─────────────────────────────────────────── */
function ConsultationCTA({ shouldReduce }: { shouldReduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const visible = shouldReduce || inView;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden scroll-mt-20 section-pad-x w-full max-w-full box-border"
      aria-label="Begin your project — consultation"
      style={{
        background: "linear-gradient(160deg, #EAF0EC 0%, #E8EDEA 50%, #ECF0EC 100%)",
        paddingTop: "clamp(72px,10vw,140px)",
        paddingBottom: "clamp(72px,10vw,140px)",
      }}
    >
      {/* Architectural arc lines */}
      <ArchLines />

      {/* Material swatches */}
      {materialSwatches.map((s) => (
        <MaterialCircle
          key={s.label}
          label={s.label}
          style={{ ...s.pos, background: s.bg }}
        >
          {/* Floor plan swatch has subtle lines */}
          {s.hasLines && (
            <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
              <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#8FA394" strokeWidth="0.7" />
              <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#8FA394" strokeWidth="0.7" />
              <rect x="30%" y="30%" width="40%" height="40%" stroke="#8FA394" strokeWidth="0.7" fill="none" />
            </svg>
          )}
        </MaterialCircle>
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center mx-auto w-full min-w-0"
        style={{ maxWidth: "640px" }}
        variants={stagger}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
      >
        {/* Eyebrow */}
        <motion.p
          className="flex items-center justify-center gap-3 uppercase tracking-[0.22em] text-sage mb-6"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "10px",
            fontWeight: 500,
          }}
          variants={fadeUp}
        >
          <span aria-hidden="true" className="block h-[1px] bg-sage opacity-60 shrink-0" style={{ width: "26px" }} />
          Begin Your Project
          <span aria-hidden="true" className="block h-[1px] bg-sage opacity-60 shrink-0" style={{ width: "26px" }} />
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="text-charcoal leading-[1.08] tracking-[-0.02em] mb-6"
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(40px, 5.2vw, 76px)",
            fontWeight: 600,
          }}
          variants={fadeUp}
        >
          Can you see yourself
          <br />
          <span className="accent-word">
            <span className="bg-block" aria-hidden="true" />
            living here?
          </span>
        </motion.h2>

        {/* Body */}
        <motion.p
          className="leading-[1.82] mb-10 mx-auto"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "clamp(13.5px, 1.1vw, 16px)",
            color: "rgba(20,35,30,0.56)",
            maxWidth: "480px",
          }}
          variants={fadeUp}
        >
          Tell us about the space you are imagining. We will help turn its
          potential into an interior with lasting meaning.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-5"
          variants={fadeUp}
        >
          <motion.a
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="start-conversation-btn"
            aria-label="Start a conversation about your project on WhatsApp"
            className="inline-block rounded-full whitespace-nowrap no-underline font-medium tracking-[0.05em] cursor-pointer"
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "13px",
              padding: "15px 32px",
              backgroundColor: "#14231E",
              color: "#F7F3EC",
              boxShadow: "0 4px 20px rgba(20,35,30,0.20)",
            }}
            whileHover={
              shouldReduce
                ? {}
                : {
                    y: -3,
                    backgroundColor: "#0D2A21",
                    boxShadow: "0 14px 36px rgba(20,35,30,0.28)",
                  }
            }
            transition={{ duration: 0.25 }}
          >
            Start a Conversation
          </motion.a>

          <motion.a
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start a conversation about your project on WhatsApp"
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
              className="flex items-center justify-center pointer-events-none"
            >
              <ArrowUpRight size={18} strokeWidth={1.4} />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Helper text */}
        <motion.p
          className="uppercase tracking-[0.15em]"
          style={{
            fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
            fontSize: "9.5px",
            fontWeight: 500,
            color: "rgba(20,35,30,0.36)",
          }}
          variants={fadeUp}
        >
          Residential, hospitality, and commercial inquiries
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function SiteFooter({ shouldReduce }: { shouldReduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });
  const visible = shouldReduce || inView;

  return (
    <footer
      ref={ref}
      className="w-full max-w-full overflow-hidden box-border"
      style={{ backgroundColor: "#101A15" }}
      aria-label="Site footer"
    >
      <div
        className="mx-auto w-full max-w-[1340px] section-pad-x min-w-0 box-border"
        style={{
          paddingTop: "clamp(56px,7vw,96px)",
        }}
      >
        <motion.div
          className="flex flex-col lg:flex-row gap-[clamp(40px,5vw,72px)] mb-[clamp(40px,5vw,64px)]"
          variants={stagger}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
        >
          {/* Brand block */}
          <motion.div
            className="lg:w-[34%] shrink-0 flex flex-col"
            variants={fadeUp}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <StudioMonogram size={34} />
              <span
                className="text-ivory tracking-[-0.01em]"
                style={{
                  fontFamily: "var(--font-cormorant, Georgia, serif)",
                  fontSize: "clamp(16px, 1.4vw, 20px)",
                  fontWeight: 600,
                }}
              >
                The White Atelier
              </span>
            </div>

            {/* Tagline */}
            <p
              className="mb-7 leading-[1.72]"
              style={{
                fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                fontSize: "clamp(12.5px, 1vw, 14px)",
                color: "rgba(235,229,220,0.48)",
                maxWidth: "280px",
              }}
            >
              Thoughtful interiors shaped by material, light, and the lives
              lived within them.
            </p>

            {/* Social icons */}
            <div
              className="flex items-center gap-4"
              role="list"
              aria-label="Social media links"
            >
              {[
                {
                  label: "Instagram",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="1" y="1" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.1" />
                      <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.1" />
                      <circle cx="11.8" cy="4.2" r="0.9" fill="currentColor" />
                    </svg>
                  ),
                },
                { label: "Pinterest", icon: <PinterestIcon /> },
                { label: "LinkedIn", icon: <LinkedInIcon /> },
                { label: "Email The White Atelier", icon: <Mail size={16} strokeWidth={1.4} /> },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  role="listitem"
                  className="flex items-center justify-center rounded-full no-underline transition-colors duration-250"
                  style={{
                    width: "38px",
                    height: "38px",
                    border: "1px solid rgba(247,243,236,0.14)",
                    color: "rgba(235,229,220,0.44)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(183,140,74,0.38)";
                    e.currentTarget.style.color = "#B78C4A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(247,243,236,0.14)";
                    e.currentTarget.style.color = "rgba(235,229,220,0.44)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation columns */}
          <motion.div
            className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-[clamp(32px,4vw,56px)]"
            variants={stagger}
          >
            {footerNav.map((col) => (
              <motion.div key={col.heading} variants={fadeUp}>
                <h3
                  className="uppercase tracking-[0.18em] mb-5"
                  style={{
                    fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                    fontSize: "9.5px",
                    fontWeight: 600,
                    color: "rgba(143,163,148,0.85)",
                  }}
                >
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-[11px]" role="list">
                  {col.links.map((link) => (
                    <li key={link.label} role="listitem">
                      <a
                        href={link.href}
                        className="no-underline transition-colors duration-250"
                        style={{
                          fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                          fontSize: "clamp(12.5px, 1vw, 14.5px)",
                          color: "rgba(235,229,220,0.52)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "rgba(247,243,236,0.88)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "rgba(235,229,220,0.52)";
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(247,243,236,0.10) 20%, rgba(247,243,236,0.10) 80%, transparent 100%)",
          }}
        />

        {/* Bottom legal row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ padding: "clamp(20px,2.5vw,28px) 0 clamp(28px,3.5vw,40px)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
              fontSize: "11.5px",
              color: "rgba(235,229,220,0.32)",
            }}
          >
            &copy; 2026 The White Atelier. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <a
                key={item}
                href="#"
                className="no-underline transition-colors duration-250"
                style={{
                  fontFamily: "var(--font-dm-sans, system-ui, sans-serif)",
                  fontSize: "11.5px",
                  color: "rgba(235,229,220,0.32)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(235,229,220,0.70)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(235,229,220,0.32)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Combined export ─────────────────────────────────────── */
export default function FooterSection() {
  const shouldReduce = useReducedMotion();
  return (
    <>
      <ConsultationCTA shouldReduce={shouldReduce} />
      <SiteFooter shouldReduce={shouldReduce} />
    </>
  );
}
