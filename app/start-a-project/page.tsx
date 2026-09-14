import Link from "next/link";
import type { Metadata } from "next";
import { WHATSAPP_CHAT_URL } from "@/config/whatsapp";

export const metadata: Metadata = {
  title: "Start a Project — The White Atelier",
  description: "Tell us about the space you are imagining. Start an interior design project with The White Atelier.",
};

export default function StartAProjectPage() {
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
        Get in Touch
      </p>
      <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#14231E", lineHeight: 1.1, margin: 0 }}>
        Start a Project
      </h1>
      <p style={{ fontSize: "16px", color: "rgba(20,35,30,0.55)", maxWidth: "420px", lineHeight: 1.7, margin: 0 }}>
        Connect directly with our studio on WhatsApp to share details about your space, ask questions, and begin the conversation.
      </p>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href={WHATSAPP_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="start-conversation-btn"
          style={{
            display: "inline-block",
            padding: "14px 30px",
            borderRadius: "999px",
            backgroundColor: "#14231E",
            color: "#F7F3EC",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.05em",
            boxShadow: "0 4px 18px rgba(20,35,30,0.18)",
          }}
        >
          Start a Conversation on WhatsApp →
        </a>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            borderRadius: "999px",
            border: "1px solid rgba(20,35,30,0.2)",
            backgroundColor: "transparent",
            color: "#14231E",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
