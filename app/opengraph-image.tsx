import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Custom Software, CRM & AI Automation`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at center, rgba(10,37,64,0.10) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          padding: "64px 72px",
          color: "#0a2540",
          fontFamily: "sans-serif",
          border: "16px solid #0a2540",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #e3e8ee",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "#0a2540",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              S
            </div>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0a2540",
              }}
            >
              studio sozo.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              border: "1.5px solid #635bff",
              backgroundColor: "rgba(99,91,255,0.08)",
              color: "#635bff",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            // CUSTOM SOFTWARE • CRM • AI AUTOMATION
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#0a2540",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Your Business Is Unique. Your Software Should Be Too.
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 600,
              lineHeight: 1.35,
              color: "#425466",
              maxWidth: "880px",
            }}
          >
            We design and build custom software that replaces disconnected tools,
            automates workflows, and gives your business 100% ownership.
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e3e8ee",
            paddingTop: "24px",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#6b7c93",
          }}
        >
          <span>LOUISIANA • TEXAS • MISSOURI • REMOTE NATIONWIDE</span>
          <span style={{ color: "#0a2540" }}>STUDIOSOZO.DEV</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
