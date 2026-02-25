import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation";
import { PollingProvider } from "@/lib/polling-context";
import { SelectionProvider } from "@/lib/selection-context";
import VersionBadge from "@/components/version-badge";

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
  title: "Fiber Service Mapper",
  description: "Map and check fiber internet service availability across addresses",
  appleWebApp: {
    title: 'Fiber Service Mapper',
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
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
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
