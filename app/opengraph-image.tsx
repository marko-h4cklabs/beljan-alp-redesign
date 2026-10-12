import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/content/business";
import { hero } from "@/content/home";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vrtna oaza Beljan";

export default async function OpengraphImage() {
  const [frauncesData, interData, interBoldData, logoData] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/fraunces/files/fraunces-latin-ext-600-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-ext-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-ext-600-normal.woff")),
    readFile(join(process.cwd(), "public/images/shared/logo-badge.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          backgroundColor: "#1B3A2B",
          backgroundImage: "linear-gradient(135deg, #1B3A2B 0%, #11261B 100%)",
          padding: "80px",
        }}
      >
        <img src={logoSrc} width={140} height={137} alt="" style={{ marginBottom: 36 }} />

        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 6,
            color: "#C98A3B",
            fontFamily: "Inter",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {business.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 64,
            lineHeight: 1.15,
            color: "#F6F3EC",
            fontFamily: "Fraunces",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          <span>{hero.headingLine1}</span>
          <span>{hero.headingLine2}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 26,
            color: "rgba(246,243,236,0.75)",
            fontFamily: "Inter",
            fontWeight: 400,
          }}
        >
          {business.address.city} · {business.address.region}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: frauncesData, weight: 600, style: "normal" },
        { name: "Inter", data: interData, weight: 400, style: "normal" },
        { name: "Inter", data: interBoldData, weight: 600, style: "normal" },
      ],
    },
  );
}
