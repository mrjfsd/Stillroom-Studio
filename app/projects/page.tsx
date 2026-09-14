import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — The White Atelier",
  description: "Browse the complete collection of The White Atelier residential and commercial interior projects.",
};

export default function ProjectsPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        backgroundColor: "#101A15",
        fontFamily: "system-ui, sans-serif",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8FA394" }}>
        Coming Soon
      </p>
      <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#F7F3EC", lineHeight: 1.1, margin: 0 }}>
        Projects
      </h1>
      <p style={{ fontSize: "16px", color: "rgba(247,243,236,0.50)", maxWidth: "420px", lineHeight: 1.7, margin: 0 }}>
        The Projects portfolio page is being designed. It will showcase the full collection of The White Atelier projects.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          display: "inline-block",
          padding: "12px 28px",
          borderRadius: "999px",
          backgroundColor: "#F7F3EC",
          color: "#14231E",
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
