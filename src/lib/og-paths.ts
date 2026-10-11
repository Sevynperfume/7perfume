/** Share image paths, built by src/app/og/[image]/route.tsx (rendering lives in og-images.tsx). */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const SITE_OG_NAME = "site";

export const ogImagePath = (name: string) => `/og/${name}.png`;
