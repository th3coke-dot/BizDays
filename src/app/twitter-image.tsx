import { ImageResponse } from "next/og";

export const alt = "BizDays – arbeidsdager, helligdager og feriepenger";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #0f766e 100%)",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            display: "flex",
          }}
        >
          Biz
          <span style={{ color: "#5eead4" }}>Days</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            lineHeight: 1.3,
            maxWidth: 860,
            color: "#e2e8f0",
            display: "flex",
          }}
        >
          Norske arbeidsdager, helligdager og feriepenger – klart på sekunder
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: "#99f6e4",
            display: "flex",
          }}
        >
          bizdayz.com
        </div>
      </div>
    ),
    size,
  );
}
