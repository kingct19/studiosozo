import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Custom Software, CRM & AI Automation`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const MESH_GRADIENT =
  "linear-gradient(112deg, #474ed7 0%, #635bff 26%, #ea4c89 68%, #ffbe7b 100%)";

const CAPABILITY_PILLS = [
  "Custom CRMs & Portals",
  "AI & Workflow Automation",
  "100% Owned Software",
];

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(
    join(
      process.cwd(),
      "public",
      "brand",
      "SVG",
      "studio-sozo_primary-horizontal_black.svg",
    ),
  );
  const logoDataUri = `data:image/svg+xml;base64,${logoBuffer.toString("base64")}`;

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
            "radial-gradient(circle at center, rgba(10,37,64,0.085) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          padding: "56px 76px",
          color: "#0a2540",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Shader Mesh Gradient Accent Bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundImage: MESH_GRADIENT,
            display: "flex",
          }}
        />

        {/* Soft Atmospheric Mesh Glow (Top Right) */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-140px",
            width: "620px",
            height: "620px",
            borderRadius: "9999px",
            backgroundImage:
              "radial-gradient(circle, rgba(234,76,137,0.12) 0%, rgba(99,91,255,0.08) 45%, rgba(255,239,194,0) 72%)",
            display: "flex",
          }}
        />

        {/* Soft Atmospheric Mesh Glow (Bottom Left) */}
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            left: "-140px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            backgroundImage:
              "radial-gradient(circle, rgba(99,91,255,0.10) 0%, rgba(71,78,215,0.05) 45%, rgba(255,255,255,0) 70%)",
            display: "flex",
          }}
        />

        {/* Architectural Technical Grid Lines */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "rgba(10,37,64,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "rgba(10,37,64,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "44px",
            width: "1px",
            backgroundColor: "rgba(10,37,64,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: "44px",
            width: "1px",
            backgroundColor: "rgba(10,37,64,0.08)",
            display: "flex",
          }}
        />

        {/* Top-Left Brand Crosshair */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: "37px",
            width: "15px",
            height: "1px",
            backgroundColor: "#635bff",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "29px",
            left: "44px",
            width: "1px",
            height: "15px",
            backgroundColor: "#635bff",
            display: "flex",
          }}
        />

        {/* Bottom-Right Brand Crosshair */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            right: "37px",
            width: "15px",
            height: "1px",
            backgroundColor: "#635bff",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "29px",
            right: "44px",
            width: "1px",
            height: "15px",
            backgroundColor: "#635bff",
            display: "flex",
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1.5px solid #e3e8ee",
            paddingBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logoDataUri}
              alt="Studio Sozo"
              width={182}
              height={66}
              style={{
                width: "182px",
                height: "66px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "9px 18px",
              border: "1.5px solid rgba(99,91,255,0.45)",
              backgroundColor: "rgba(99,91,255,0.06)",
              color: "#635bff",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            // CUSTOM SOFTWARE • CRM • AI AUTOMATION
          </div>
        </div>

        {/* Center Hero Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "1020px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                fontSize: "66px",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                color: "#0a2540",
                display: "flex",
              }}
            >
              Your Business Is Unique.
            </div>
            <div
              style={{
                fontSize: "66px",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                backgroundImage: MESH_GRADIENT,
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              Your Software Should Be Too.
            </div>
          </div>

          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: 1.38,
              color: "#425466",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            We design and build custom software that replaces disconnected tools,
            automates workflows, and gives your business 100% ownership.
          </div>

          {/* Hero Capability Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "4px",
            }}
          >
            {CAPABILITY_PILLS.map((pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  border: "1px solid #e3e8ee",
                  backgroundColor: "rgba(10,37,64,0.03)",
                  color: "#425466",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1.5px solid #e3e8ee",
            paddingTop: "20px",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#6b7c93",
          }}
        >
          <span>LOUISIANA • TEXAS • MISSOURI • REMOTE NATIONWIDE</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundImage: MESH_GRADIENT,
                display: "flex",
              }}
            />
            <span style={{ color: "#0a2540", fontWeight: 800 }}>
              STUDIOSOZO.DEV
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
