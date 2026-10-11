import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/structured-data";

// Static export needs metadata routes to be explicitly static.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
