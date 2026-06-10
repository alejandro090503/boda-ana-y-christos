"use client";

import { useState } from "react";

export function EnvelopeLoader({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  if (open) return <>{children}</>;

  return (
    <>
      {children}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#5C1A2A",
          backgroundImage: "url(/textura-burgundy.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: 24,
        }}
      >
        {/* Monograma */}
        <p
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(4rem, 16vw, 7rem)",
            color: "#FFFFFF",
            lineHeight: 1,
            textAlign: "center",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          C &amp; A
        </p>

        <div
          style={{
            height: 1,
            width: 60,
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
          }}
        >
          Ana Fernanda & Christos
        </p>

        <button
          onClick={() => setOpen(true)}
          style={{
            marginTop: 16,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#5C1A2A",
            backgroundColor: "#FFFFFF",
            border: "none",
            padding: "16px 40px",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          Abrir invitación
        </button>
      </div>
    </>
  );
}
