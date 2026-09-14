import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — The White Atelier",
  description: "Residential interiors, renovation & spatial planning, and hospitality & commercial design services by The White Atelier.",
};

export default function ServicesPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        backgroundColor: "#F7F3EC",
        fontFamily: "system-ui, sans-serif",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8FA394" }}>
        Coming Soon
      </p>
      <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#14231E", lineHeight: 1.1, margin: 0 }}>
        Services
      </h1>
      <p style={{ fontSize: "16px", color: "rgba(20,35,30,0.55)", maxWidth: "420px", lineHeight: 1.7, margin: 0 }}>
        The Services page is being designed. It will detail The White Atelier&rsquo;s residential, renovation, hospitality, and commercial offerings.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          display: "inline-block",
          padding: "12px 28px",
          borderRadius: "999px",
          backgroundColor: "#14231E",
          color: "#F7F3EC",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.05em",
        }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}
