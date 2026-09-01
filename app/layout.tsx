import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isIntranetRequest } from "@/lib/intranet";
import { primaryNav } from "@/lib/nav";
import { organizationJsonLd } from "@/lib/seo";
import { siteMeta, siteUrl } from "@/lib/site";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMeta.title,
    template: siteMeta.titleTemplate,
  },
  description: siteMeta.description,
  openGraph: {
    type: "website",
    locale: siteMeta.locale,
    siteName: siteMeta.title,
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f9fafb",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const intranet = isIntranetRequest(await headers());
  const navItems = primaryNav.filter((item) => intranet || !item.intranetOnly);

  return (
    <html lang="ko" className={`${pretendard.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <a
          href="#main"
          className="focus:bg-heading sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-white"
        >
          본문으로 건너뛰기
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader navItems={navItems} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter navItems={navItems} />
        </div>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
