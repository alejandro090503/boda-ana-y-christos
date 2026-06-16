"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const C = {
  white: "#FAFAF8",
  pureWhite: "#FFFFFF",
  wine: "#5C1A2A",
  wineLight: "#7A2E40",
  wineDark: "#3D0F1A",
  gold: "#C9A96E",
  goldLight: "#D4BA8A",
  charcoal: "#2C2C2C",
  gray: "#6B6B6B",
  graySoft: "#9A9A9A",
  cream: "#F5F0EB",
  border: "#E2DDD5",
};

/* ─── Scroll reveal wrapper ─── */
function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Countdown ─── */
function Countdown() {
  const target = new Date("2027-05-01T17:30:00-06:00").getTime();
  const [now, setNow] = useState(target);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const units = [
    { val: days, label: "Días" },
    { val: hours, label: "Horas" },
    { val: mins, label: "Min" },
    { val: secs, label: "Seg" },
  ];

  return (
    <div className="flex items-center justify-center" style={{ gap: 4 }}>
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center">
          <div className="flex flex-col items-center" style={{ minWidth: 60 }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 32,
                color: C.wine,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(u.val).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 11,
                color: C.gray,
                letterSpacing: "0.08em",
                marginTop: 6,
                textTransform: "uppercase",
              }}
            >
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <div
              style={{
                width: 1,
                height: 28,
                backgroundColor: C.wine,
                opacity: 0.2,
              }}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Ornament line ─── */
function WineOrnament({ width = 120 }: { width?: number }) {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <div
        style={{
          height: 1,
          width: width / 2,
          background: `linear-gradient(90deg, transparent, ${C.wine})`,
          opacity: 0.35,
        }}
      />
      <svg width="8" height="8" viewBox="0 0 8 8" fill={C.wine} opacity="0.5" aria-hidden="true">
        <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" />
      </svg>
      <div
        style={{
          height: 1,
          width: width / 2,
          background: `linear-gradient(90deg, ${C.wine}, transparent)`,
          opacity: 0.35,
        }}
      />
    </div>
  );
}

/* ─── Section wrapper ─── */
function Section({
  id,
  children,
  bg = C.white,
  wine: isWine = false,
  style: styleProp,
}: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
  wine?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      className="text-center"
      style={{
        position: "relative",
        backgroundColor: isWine ? C.wine : bg,
        backgroundImage: isWine ? `url(/textura-burgundy.webp)` : undefined,
        backgroundSize: isWine ? "cover" : undefined,
        backgroundPosition: isWine ? "center" : undefined,
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        ...styleProp,
      }}
    >
      {children}
    </section>
  );
}

/* ─── Section title ─── */
function SectionTitle({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  light?: boolean;
}) {
  return (
    <>
      {eyebrow && (
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: light ? "rgba(255,255,255,0.6)" : C.wine,
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 8vw, 3rem)",
            letterSpacing: "0.08em",
            color: light ? C.pureWhite : C.wine,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div style={{ marginBottom: 32 }}>
          {light ? (
            <div className="flex items-center justify-center gap-3 my-3">
              <div style={{ height: 1, width: 50, backgroundColor: "rgba(255,255,255,0.3)" }} />
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#fff" opacity="0.4" aria-hidden="true">
                <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" />
              </svg>
              <div style={{ height: 1, width: 50, backgroundColor: "rgba(255,255,255,0.3)" }} />
            </div>
          ) : (
            <WineOrnament width={100} />
          )}
        </div>
      </Reveal>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      className="flex flex-col items-center text-center"
      style={{
        position: "relative",
        minHeight: "100dvh",
        backgroundColor: C.white,
        backgroundImage: "url(/textura-embossed.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        justifyContent: "center",
        paddingTop: "clamp(48px, 8vh, 80px)",
        paddingBottom: "clamp(48px, 8vh, 80px)",
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(250,250,248,0.55)" }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.wine,
              textAlign: "center",
              marginBottom: "clamp(20px, 4vw, 36px)",
            }}
          >
            Juntos con sus familias
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h1
            style={{
              fontFamily: "var(--font-script)",
              fontWeight: 400,
              fontSize: "clamp(3.2rem, 14vw, 6.5rem)",
              color: C.wine,
              lineHeight: 0.9,
              textAlign: "center",
              margin: 0,
            }}
          >
            Ana Fernanda
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 5vw, 1.8rem)",
              color: C.gold,
              lineHeight: 1,
              margin: "clamp(4px, 1vw, 12px) 0",
              textAlign: "center",
            }}
          >
            &amp;
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <h1
            style={{
              fontFamily: "var(--font-script)",
              fontWeight: 400,
              fontSize: "clamp(3.2rem, 14vw, 6.5rem)",
              color: C.wine,
              lineHeight: 0.9,
              textAlign: "center",
              margin: 0,
            }}
          >
            Christos
          </h1>
        </Reveal>

        <Reveal delay={0.45}>
          <div style={{ margin: "clamp(20px, 4vw, 36px) auto" }}>
            <WineOrnament width={140} />
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "clamp(13px, 3.5vw, 16px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.charcoal,
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            1 de Mayo de 2027
          </p>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(14px, 3.5vw, 17px)",
              color: C.gray,
              textAlign: "center",
              marginBottom: "clamp(24px, 5vw, 40px)",
            }}
          >
            Poza Rica, Veracruz
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <Countdown />
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MENSAJE
   ═══════════════════════════════════════════════════════ */
function Mensaje() {
  return (
    <Section wine style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ maxWidth: 440, margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 4.2vw, 1.3rem)",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.9,
                textAlign: "center",
              }}
            >
              Con la bendición de Dios y la alegría de nuestras familias,
              tenemos el honor de invitarles a celebrar el día en que
              uniremos nuestras vidas para siempre.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   FAMILIAS
   ═══════════════════════════════════════════════════════ */
function Familias() {
  const families = [
    { label: "Mamá de la novia", names: "Ana Vera Arrieta" },
    { label: "Padres del novio", names: "Norberto Niño Alatorre\nRosa Griselda Malagón Segundo" },
    { label: "Padrinos", names: "Enrique Solis\nAdriana Infante Briceño" },
  ];

  return (
    <Section
      style={{
        backgroundImage: "url(/textura-embossed.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(250,250,248,0.6)" }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionTitle title="NUESTRAS FAMILIAS" />

        <div
          style={{
            maxWidth: 500,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 36,
            alignItems: "center",
          }}
        >
          {families.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.15}>
              <>
                {i > 0 && (
                  <div className="flex flex-col items-center" style={{ gap: 6, marginBottom: 36 }}>
                    <div style={{ width: 1, height: 24, backgroundColor: C.wine, opacity: 0.2 }} />
                    <svg width="8" height="8" viewBox="0 0 8 8" fill={C.wine} opacity="0.4">
                      <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" />
                    </svg>
                    <div style={{ width: 1, height: 24, backgroundColor: C.wine, opacity: 0.2 }} />
                  </div>
                )}
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: C.graySoft,
                      marginBottom: 12,
                    }}
                  >
                    {f.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: 19,
                      color: C.charcoal,
                      lineHeight: 1.6,
                    }}
                  >
                    {f.names.split("\n").map((n, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {n}
                      </span>
                    ))}
                  </p>
                </div>
              </>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOTO PAREJA
   ═══════════════════════════════════════════════════════ */
function FotoPareja() {
  return (
    <div
      style={{
        backgroundColor: C.wine,
        padding: "48px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Reveal>
        <figure style={{ margin: 0, width: "100%", maxWidth: 340, position: "relative" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              border: `3px solid rgba(255,255,255,0.25)`,
              boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/foto-pareja.jpg"
              alt="Ana Fernanda y Christos"
              loading="lazy"
              width={340}
              height={425}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </figure>
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RECEPCIÓN
   ═══════════════════════════════════════════════════════ */
function Recepcion() {
  return (
    <Section
      id="recepcion"
      style={{
        backgroundImage: "url(/textura-embossed.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(250,250,248,0.6)" }}
      />
      <div style={{ maxWidth: 440, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionTitle eyebrow="Celebración" title="RECEPCIÓN" />

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 8vw, 2.8rem)",
              color: C.wine,
              letterSpacing: "0.04em",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            5:30 p.m.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(15px, 4vw, 18px)",
              color: C.gray,
              lineHeight: 1.7,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Poza Rica, Veracruz
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <a
            href="https://maps.app.goo.gl/GCi4zL1zKRQxS8Eh6?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: C.pureWhite,
              textDecoration: "none",
              backgroundColor: C.wine,
              padding: "14px 28px",
              transition: "opacity 0.2s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Ver ubicación
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   RSVP
   ═══════════════════════════════════════════════════════ */
function RSVP() {
  const waNumber = "";
  const waMessage = encodeURIComponent(
    "¡Hola! Con mucho gusto confirmo mi asistencia a la celebración de Ana Fernanda Gómez Vera y Christos Norberto Niño Malagon. 🎉\n¡Nos vemos pronto! 💫"
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <Section
      id="rsvp"
      style={{
        backgroundColor: C.wine,
        backgroundImage: "url(/textura-embossed.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(92,26,42,0.88)" }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionTitle eyebrow="Esperamos contar contigo" title="CONFIRMA TU ASISTENCIA" light />

        <Reveal delay={0.15}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(15px, 4vw, 17px)",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.75,
              textAlign: "center",
              maxWidth: 380,
              margin: "0 auto 16px",
            }}
          >
            Confirma tu asistencia antes del
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "clamp(14px, 3.5vw, 16px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.pureWhite,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            12 de Abril de 2027
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <button
            onClick={() => window.open(waUrl, "_blank")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.wine,
              backgroundColor: C.pureWhite,
              border: "none",
              padding: "16px 36px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={C.wine}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Confirmar asistencia
          </button>
        </Reveal>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   VINYL MUSIC PLAYER — adapted from boda-samantha-y-alexander
   ═══════════════════════════════════════════════════════ */
function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.volume = 0.5;
      a.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/audio/boda-ana-y-christos/cancion.mp3"
        preload="none"
        loop
      />
      <style>{`
        .vinyl-btn {
          position: fixed; bottom: 20px; right: 20px; z-index: 100;
          width: 72px; height: 72px; border-radius: 50%; padding: 0;
          border: none; cursor: pointer; background: transparent;
          opacity: 0; transform: scale(0.6); pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.2,0.7,0.2,1), opacity 0.35s;
          box-shadow: 0 4px 18px rgba(92,26,42,0.45), 0 0 0 1px rgba(201,169,110,0.12);
        }
        .vinyl-btn.is-ready { opacity: 1; transform: scale(1); pointer-events: auto; }
        @media (hover:hover) { .vinyl-btn:hover { transform: scale(1.1); } }
        .vinyl-spin {
          width: 100%; height: 100%; border-radius: 50%; position: relative;
        }
        .vinyl-btn.is-playing .vinyl-spin {
          animation: vinylSpin 1.8s linear infinite;
        }
        @keyframes vinylSpin { to { transform: rotate(360deg); } }
        .vinyl-disc {
          width: 100%; height: 100%; border-radius: 50%; overflow: hidden; position: relative;
          background:
            radial-gradient(circle, ${C.wineDark} 4%, transparent 4.5%),
            radial-gradient(circle, ${C.gold} 0%, ${C.wine} 17%, ${C.wineDark} 19%, transparent 19.5%),
            repeating-radial-gradient(circle,
              transparent 20%, rgba(255,255,255,0.055) 20.8%, transparent 21.5%,
              transparent 24%, rgba(255,255,255,0.04) 24.8%, transparent 25.5%,
              transparent 28%, rgba(255,255,255,0.055) 28.8%, transparent 29.5%,
              transparent 32%, rgba(255,255,255,0.04) 32.8%, transparent 33.5%,
              transparent 36%, rgba(255,255,255,0.055) 36.8%, transparent 37.5%,
              transparent 40%, rgba(255,255,255,0.04) 40.8%, transparent 41.5%,
              transparent 44%, rgba(255,255,255,0.055) 44.8%, transparent 45.5%,
              transparent 48%, rgba(255,255,255,0.04) 48.8%, transparent 49.5%,
              transparent 52%, rgba(255,255,255,0.055) 52.8%, transparent 53.5%,
              transparent 56%, rgba(255,255,255,0.04) 56.8%, transparent 57.5%,
              transparent 60%, rgba(255,255,255,0.055) 60.8%, transparent 61.5%,
              transparent 64%, rgba(255,255,255,0.04) 64.8%, transparent 65.5%,
              transparent 68%, rgba(255,255,255,0.055) 68.8%, transparent 69.5%,
              transparent 72%, rgba(255,255,255,0.04) 72.8%, transparent 73.5%,
              transparent 76%, rgba(255,255,255,0.055) 76.8%, transparent 77.5%,
              transparent 80%, rgba(255,255,255,0.04) 80.8%, transparent 81.5%,
              transparent 84%, rgba(255,255,255,0.055) 84.8%, transparent 85.5%,
              transparent 88%, rgba(255,255,255,0.04) 88.8%, transparent 89.5%,
              transparent 92%, rgba(255,255,255,0.055) 92.8%, transparent 93.5%,
              transparent 96%, rgba(255,255,255,0.04) 96.8%, transparent 97.5%
            ),
            radial-gradient(circle, ${C.wineDark} 0%, ${C.wine} 60%, ${C.wineDark} 100%);
          box-shadow: inset 0 0 8px rgba(0,0,0,0.4);
        }
        .vinyl-sheen {
          position: absolute; inset: 0; border-radius: 50%;
          background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.09) 42%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.09) 54%, transparent 66%);
          pointer-events: none;
        }
        .vinyl-label-text {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          font-family: var(--font-script); font-size: 11px; color: ${C.wineDark};
          text-align: center; line-height: 1.1; opacity: 0.7;
          pointer-events: none; width: 26px;
        }
        .vinyl-label-text small {
          font-family: var(--font-body); font-size: 5px; letter-spacing: 0.15em;
          display: block; margin-top: 1px; opacity: 0.6;
        }
        .vinyl-hole {
          position: absolute; top: 50%; left: 50%; width: 6px; height: 6px;
          transform: translate(-50%,-50%); border-radius: 50%;
          background: ${C.wineDark};
          box-shadow: 0 0 0 1.5px rgba(201,169,110,0.4);
        }
        .vinyl-icons {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 18px; height: 18px; pointer-events: none; z-index: 2;
        }
        .vinyl-icons svg { width: 100%; height: 100%; display: block; }
        .vinyl-icon-pause { display: none; }
        .vinyl-btn.is-playing .vinyl-icon-play { display: none; }
        .vinyl-btn.is-playing .vinyl-icon-pause { display: block; }
        .vinyl-btn::after {
          content: ""; position: absolute; inset: -5px; border-radius: 50%;
          border: 1px solid ${C.gold}; opacity: 0.3;
          animation: vinylPulse 3s ease-in-out infinite;
        }
        .vinyl-btn.is-playing::after { animation-duration: 1.6s; }
        @keyframes vinylPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.12); opacity: 0.05; }
        }
        .vinyl-tonearm {
          position: absolute; top: -4px; right: -2px; width: 24px; height: 34px;
          transform-origin: top right; transform: rotate(-28deg);
          transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1);
          pointer-events: none; z-index: 1;
        }
        .vinyl-btn.is-playing .vinyl-tonearm { transform: rotate(-12deg); }
        .vinyl-tonearm-line {
          position: absolute; top: 2px; right: 4px; width: 2px; height: 28px;
          background: linear-gradient(to bottom, ${C.wine}, ${C.gold} 40%, ${C.wine});
          border-radius: 1px; transform: rotate(-5deg); transform-origin: top center;
        }
        .vinyl-tonearm-head {
          position: absolute; bottom: 0; right: 2px; width: 5px; height: 6px;
          background: ${C.gold}; border-radius: 0 0 2px 2px;
        }
        .vinyl-tonearm-pivot {
          position: absolute; top: 0; right: 2px; width: 7px; height: 7px;
          background: radial-gradient(circle, ${C.goldLight}, ${C.wine});
          border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          .vinyl-btn.is-playing .vinyl-spin { animation: none; }
          .vinyl-btn::after { animation: none; }
        }
      `}</style>
      <button
        className={`vinyl-btn${ready ? " is-ready" : ""}${playing ? " is-playing" : ""}`}
        onClick={toggle}
        type="button"
        aria-label={playing ? "Pausar música" : "Reproducir música"}
      >
        <div className="vinyl-tonearm">
          <div className="vinyl-tonearm-pivot" />
          <div className="vinyl-tonearm-line" />
          <div className="vinyl-tonearm-head" />
        </div>
        <div className="vinyl-spin">
          <div className="vinyl-disc">
            <div className="vinyl-sheen" />
            <div className="vinyl-label-text">
              C&amp;A<small>2027</small>
            </div>
            <div className="vinyl-hole" />
          </div>
        </div>
        <div className="vinyl-icons">
          <svg className="vinyl-icon-play" viewBox="0 0 24 24" fill={C.wineDark} aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg className="vinyl-icon-pause" viewBox="0 0 24 24" fill={C.wineDark} aria-hidden="true">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        </div>
      </button>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <section
      className="text-center"
      style={{
        backgroundColor: C.charcoal,
        paddingTop: 64,
        paddingBottom: 64,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <Reveal>
        <p
          style={{
            fontFamily: "var(--font-script)",
            color: C.pureWhite,
            fontSize: "clamp(2.4rem, 9vw, 4rem)",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          C &amp; A
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          style={{
            height: 1,
            width: 36,
            backgroundColor: "rgba(255,255,255,0.2)",
            margin: "20px auto",
          }}
        />
      </Reveal>

      <Reveal delay={0.2}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
          }}
        >
          01 · Mayo · 2027
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            marginTop: 14,
          }}
        >
          @elysium.invitaciones
        </p>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */
export function InvitationClient({
  pases,
  nombre,
}: {
  pases: number;
  nombre: string;
}) {
  return (
    <main style={{ backgroundColor: C.white, width: "100%" }}>
      <Hero />
      <Mensaje />
      <Familias />
      <FotoPareja />
      <Recepcion />
      <RSVP />
      <Footer />
      <VinylPlayer />
    </main>
  );
}
