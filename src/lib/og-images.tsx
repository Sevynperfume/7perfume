import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { logoSvg, svgDataUri } from "@/components/brand/brand-svg";
import type { Perfume } from "@/features/perfumes/types";
import { formatPrice } from "@/lib/format";
import { OG_SIZE } from "@/lib/og-paths";

/**
 * Share images (WhatsApp, Instagram, Facebook, X, Google). Social apps do not show SVG previews,
 * so these render PNGs at build time. Served from /og/<name>.png by src/app/og/[image]/route.tsx.
 */

export function siteOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          background: "radial-gradient(ellipse at 50% 35%, #2b2418 0%, #12100d 65%)",
          color: "#e8d3a2",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUri(logoSvg("#ffffff"))} width={720} height={119} alt="" />
        <div style={{ width: 120, height: 2, background: "#e8d3a2" }} />
        <div style={{ fontSize: 40, letterSpacing: 8, textTransform: "uppercase" }}>Extrait de Parfum</div>
        <div style={{ fontSize: 28, color: "#cfc6b8" }}>Long-lasting luxury fragrances. Order on WhatsApp.</div>
      </div>
    ),
    OG_SIZE,
  );
}

/** Bottle photo embedded in the 50 ml cover image (/public/images/perfumes/<slug>/1.svg). */
async function bottlePhoto(slug: string) {
  const svg = await readFile(join(process.cwd(), "public/images/perfumes", slug, "1.svg"), "utf8");
  return svg.match(/data:image\/(?:jpeg|png);base64,[A-Za-z0-9+/=]+/)?.[0] ?? null;
}

export async function perfumeOgImage(perfume: Perfume) {
  // Photo kept small: it dominates the PNG size, and WhatsApp skips previews much over 300 KB.
  const photo = await bottlePhoto(perfume.slug);
  // The bundled font has no rupee sign.
  const from = formatPrice(Math.min(...perfume.variants.map((v) => v.price))).replace("₹", "Rs ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          // Flat colours compress far better than a gradient.
          background: "#12100d",
          borderLeft: `12px solid ${perfume.tint}`,
          color: "#f4efe7",
        }}
      >
        <div style={{ width: 440, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} width={330} height={440} style={{ objectFit: "cover", borderRadius: 24 }} alt="" />
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, paddingRight: 64 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgDataUri(logoSvg("#e8d3a2"))} width={260} height={43} alt="" />
          <div style={{ fontSize: 80, fontWeight: 600, lineHeight: 1.05 }}>{perfume.name}</div>
          <div style={{ fontSize: 32, color: "#cfc6b8" }}>{perfume.tagline}</div>
          <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#e8d3a2", textTransform: "uppercase", letterSpacing: 4 }}>
            <span>{perfume.concentration}</span>
            <span>|</span>
            <span>{perfume.gender}</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 600 }}>{`From ${from}`}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
