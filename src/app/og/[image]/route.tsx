import { getAllPerfumeSlugs, getPerfumeBySlug } from "@/features/perfumes/services/perfume.service";
import { perfumeOgImage, siteOgImage } from "@/lib/og-images";
import { SITE_OG_NAME } from "@/lib/og-paths";

// Builds /og/site.png and /og/<slug>.png as real .png files in the static export.
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPerfumeSlugs();
  return [SITE_OG_NAME, ...slugs].map((name) => ({ image: `${name}.png` }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[image]">) {
  const name = (await params).image.replace(/\.png$/, "");
  if (name === SITE_OG_NAME) return siteOgImage();

  const perfume = await getPerfumeBySlug(name);
  return perfume ? perfumeOgImage(perfume) : new Response("Not found", { status: 404 });
}
