import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { siteMeta } from "@/lib/content";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
};

const StarfieldBackground = dynamic(
  () => import("@/components/visuals/StarfieldBackground"),
  { ssr: false }
);

const AudioToggle = dynamic(
  () => import("@/components/ui/AudioToggle"),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden">
        <StarfieldBackground />
        <div className="relative z-10">{children}</div>
        <AudioToggle />
      </body>
    </html>
  );
}
