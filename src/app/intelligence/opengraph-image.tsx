import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Synthetic Advisory — CrowdTest + Think Tank by Motion Ventures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
            padding: "8px 20px",
            borderRadius: "999px",
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span style={{ color: "#a5b4fc", fontSize: "18px", fontWeight: 600 }}>
            Motion Ventures
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Synthetic Advisory
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#a1a1aa",
            textAlign: "center",
            marginBottom: "48px",
            maxWidth: "800px",
          }}
        >
          Consulting-grade intelligence at SaaS prices
        </div>

        {/* Two product cards */}
        <div style={{ display: "flex", gap: "24px" }}>
          {/* CrowdTest */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 40px",
              borderRadius: "16px",
              background: "rgba(14, 165, 233, 0.08)",
              border: "1px solid rgba(14, 165, 233, 0.25)",
              width: "340px",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>👥</div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#38bdf8",
                marginBottom: "8px",
              }}
            >
              CrowdTest
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#94a3b8",
                textAlign: "center",
              }}
            >
              AI Focus Groups from $49
            </div>
          </div>

          {/* Think Tank */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 40px",
              borderRadius: "16px",
              background: "rgba(139, 92, 246, 0.08)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              width: "340px",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🧠</div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#a78bfa",
                marginBottom: "8px",
              }}
            >
              Think Tank
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#94a3b8",
                textAlign: "center",
              }}
            >
              Expert Debate Simulation from $99
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
