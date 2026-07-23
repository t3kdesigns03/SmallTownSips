import type { Metadata } from "next";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline} in ${site.town}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Loaded teas packed with real nutrition and good energy — no sugar crash. Local pickup, pop-ups, and 12-packs shipped anywhere. Made in Truro, Iowa.",
  keywords: ["loaded teas", "nutrition", "Truro Iowa", "energy tea", "Small Town Sips"],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: "Good energy, made in a small town. Loaded teas & nutrition from Truro, Iowa.",
    url: `https://${site.domain}`,
    siteName: site.name,
    images: [{ url: "/brand/logo.png", width: 800, height: 632, alt: site.name }],
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/brand/logo-icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <footer className="border-t border-charcoal/10 bg-sand/50 py-10">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <p className="text-sm text-charcoal-soft">
              © {new Date().getFullYear()} {site.name} · {site.town}
            </p>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-charcoal-soft/80">
              {site.legal}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
