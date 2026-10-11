import type { MetadataRoute } from "next";

import { getAllPerfumes } from "@/features/perfumes/services/perfume.service";
import { ogImagePath } from "@/lib/og-paths";
import { absoluteUrl } from "@/lib/structured-data";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const perfumes = await getAllPerfumes();
  const now = new Date();

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...perfumes.map((p) => ({
      url: absoluteUrl(`/perfumes/${p.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [absoluteUrl(ogImagePath(p.slug))],
    })),
  ];
}
