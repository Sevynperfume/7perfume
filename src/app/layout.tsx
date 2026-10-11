import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist_Mono, Jost } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider, themeInitScript } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/features/cart/store/cart-context";
import { OG_SIZE, SITE_OG_NAME, ogImagePath } from "@/lib/og-paths";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

// Body and UI: clean geometric sans that matches the thin, round strokes of the logo.
const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Headings: high-contrast luxury serif.
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const shareImage = { url: ogImagePath(SITE_OG_NAME), ...OG_SIZE, alt: `${siteConfig.name}, luxury Extrait de Parfum` };

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Extrait de Parfum Online in India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "shopping",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.ogLocale,
    url: "/",
    title: `${siteConfig.name} | Luxury Extrait de Parfum`,
    description: siteConfig.description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Luxury Extrait de Parfum`,
    description: siteConfig.description,
    images: [shareImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Paste the code from Google Search Console here to verify the site, e.g. { google: "abc123" }.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#12100d" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${jost.variable} ${geistMono.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
      // themeInitScript adds the "dark" class before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Home page: stop the browser restoring the old scroll position on reload (before first paint),
            so the hero always starts from the top instead of jumping. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname==="/"&&!location.hash){history.scrollRestoration="manual";window.scrollTo(0,0)}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <ThemeProvider>
          <TooltipProvider>
            <CartProvider>
              <ScrollProgress />
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </CartProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
