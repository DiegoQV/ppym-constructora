import { ImageResponse } from "next/og";

export const alt = "PPYM E.I.R.L. — Construcción y consultoría en Chachapoyas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#111315",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.2,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -90,
          top: -150,
          display: "flex",
          width: 560,
          height: 560,
          border: "2px solid rgba(231,185,40,.3)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "68px 78px 62px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 52, height: 4, background: "#e7b928" }} />
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, letterSpacing: 4, color: "#e7b928" }}>
            PPYM E.I.R.L.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            Soluciones técnicas para
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            <span style={{ color: "#e7b928" }}>construir</span>&nbsp;con seguridad.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 23, color: "rgba(255,255,255,.72)" }}>
            Construcción · Consultoría · Ingeniería
          </div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 2.5, color: "rgba(255,255,255,.55)" }}>
            CHACHAPOYAS · AMAZONAS
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, display: "flex", width: "100%", height: 8, background: "#e7b928" }} />
    </div>,
    size,
  );
}
