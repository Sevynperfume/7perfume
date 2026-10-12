import { LOGO_LETTERS } from "./logo-paths";

/** SVG strings of the 7EVYN logo for generated images (favicon, share images). */
const ALL_PATHS = LOGO_LETTERS.flatMap((letter) => letter.paths);

export const LOGO_SIZE = { width: 840, height: 139 } as const;

/** Full wordmark as an SVG document in the given colour. */
export function logoSvg(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO_SIZE.width}" height="${LOGO_SIZE.height}" viewBox="0 0 ${LOGO_SIZE.width} ${LOGO_SIZE.height}"><g fill="${color}">${ALL_PATHS.map((d) => `<path d="${d}"/>`).join("")}</g></svg>`;
}

/** Square app icon: the full white wordmark centred on a dark tile. Saved as src/app/icon.svg and the PNG icons. */
export function iconSvg({ rounded = true } = {}) {
  const radius = rounded ? 36 : 0;
  // Wordmark scaled to 136 of 160 px wide; the stroke thickens the thin letters so they survive at 16-32 px.
  const scale = 136 / LOGO_SIZE.width;
  const x = (160 - LOGO_SIZE.width * scale) / 2;
  const y = (160 - LOGO_SIZE.height * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="${radius}" fill="#0b0b0c"/><g transform="translate(${x} ${y}) scale(${scale})" fill="#ffffff" stroke="#ffffff" stroke-width="10" stroke-linejoin="round">${ALL_PATHS.map((d) => `<path d="${d}"/>`).join("")}</g></svg>`;
}

/** SVG string as a data URI, for <img> inside next/og ImageResponse. */
export function svgDataUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
