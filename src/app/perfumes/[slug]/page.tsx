import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { PerfumeDetails } from "@/features/perfumes/components/perfume-details";
import { getAllPerfumeSlugs, getPerfumeBySlug } from "@/features/perfumes/services/perfume.service";
import { ReviewSection } from "@/features/reviews/components/review-section";
import { getRatingSummary, getReviewsByPerfumeId } from "@/features/reviews/services/review.service";
import { formatPrice } from "@/lib/format";
import { OG_SIZE, ogImagePath } from "@/lib/og-paths";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";

// Pre-render every perfume at build time. With a database, switch to ISR
// (`export const revalidate = 60`) or remove `dynamicParams = false`.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPerfumeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/perfumes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);
  if (!perfume) return {};

  const from = formatPrice(Math.min(...perfume.variants.map((v) => v.price)));
  const audience = perfume.gender === "For Her" ? "perfume for women" : "unisex perfume";
  const title = `${perfume.name} ${perfume.concentration}, ${perfume.gender}`;
  const description = `${perfume.name} by ${perfume.brand}: ${perfume.tagline.toLowerCase()}. Long-lasting ${audience} with notes of ${perfume.notes
    .slice(0, 4)
    .map((n) => n.name.toLowerCase())
    .join(", ")}. 50 ml, 30 ml and pocket sizes from ${from}. Order on WhatsApp.`;
  const path = `/perfumes/${perfume.slug}`;

  const image = { url: ogImagePath(perfume.slug), ...OG_SIZE, alt: `${perfume.name} by ${perfume.brand}` };
  return {
    title,
    description,
    keywords: [
      perfume.name,
      `${perfume.brand} ${perfume.name}`,
      `${perfume.name} perfume`,
      audience,
      perfume.concentration,
      ...perfume.notes.map((n) => `${n.name.toLowerCase()} perfume`),
      ...siteConfig.keywords.slice(0, 3),
    ],
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: `${perfume.name} | ${siteConfig.name}`, description, images: [image] },
    twitter: { card: "summary_large_image", title: `${perfume.name} | ${siteConfig.name}`, description, images: [image] },
  };
}

export default async function PerfumePage({ params }: PageProps<"/perfumes/[slug]">) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);
  if (!perfume) notFound();

  const [reviews, summary] = await Promise.all([getReviewsByPerfumeId(perfume.id), getRatingSummary(perfume)]);

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(perfume, reviews),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Perfumes", path: "/#perfumes" },
            { name: perfume.name, path: `/perfumes/${perfume.slug}` },
          ]),
        ]}
      />
      <PerfumeDetails perfume={perfume} />
      <ReviewSection reviews={reviews} summary={summary} />
    </>
  );
}
