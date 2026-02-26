import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation";
import { PollingProvider } from "@/lib/polling-context";
import { SelectionProvider } from "@/lib/selection-context";
import VersionBadge from "@/components/version-badge";
import { GoogleTagManager } from "@next/third-parties/google";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Fiber Service Map",
  description: "Check fiber internet service availability in your area",
  appleWebApp: {
    title: 'Fiber Service Map',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SelectionProvider>
          <PollingProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main>
                {children}
              </main>
              <VersionBadge />
            </div>
            <Toaster />
          </PollingProvider>
        </SelectionProvider>
      </body>
    </html>
  );
}
