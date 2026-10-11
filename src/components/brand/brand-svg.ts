import { LOGO_LETTERS } from "./logo-paths";

/** SVG strings of the 7EVYN logo for generated images (favicon, share images). */
const ALL_PATHS = LOGO_LETTERS.flatMap((letter) => letter.paths);
const SEVEN_PATH = LOGO_LETTERS[0].paths[0];

export const LOGO_SIZE = { width: 840, height: 139 } as const;

/** Full wordmark as an SVG document in the given colour. */
export function logoSvg(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO_SIZE.width}" height="${LOGO_SIZE.height}" viewBox="0 0 ${LOGO_SIZE.width} ${LOGO_SIZE.height}"><g fill="${color}">${ALL_PATHS.map((d) => `<path d="${d}"/>`).join("")}</g></svg>`;
}

/** Square app icon: the "7" of the logo on a dark tile. Saved as src/app/icon.svg and the PNG icons. */
export function iconSvg({ rounded = true } = {}) {
  const radius = rounded ? 36 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="${radius}" fill="#0b0b0c"/><path d="${SEVEN_PATH}" transform="translate(19 13) scale(0.98)" fill="#ffffff" stroke="#ffffff" stroke-width="7" stroke-linejoin="round"/></svg>`;
}

/** SVG string as a data URI, for <img> inside next/og ImageResponse. */
export function svgDataUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
