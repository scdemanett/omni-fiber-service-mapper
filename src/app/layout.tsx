import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation";
import { PollingProvider } from "@/lib/polling-context";

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
  title: "Omni Fiber Service Mapper",
  description: "Map and check serviceability for Omni Fiber addresses",
  appleWebApp: {
    title: 'Omni Fiber Service Mapper',
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
        <PollingProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main>
              {children}
            </main>
          </div>
          <Toaster />
        </PollingProvider>
      </body>
    </html>
  );
}
