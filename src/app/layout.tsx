import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatthesketch.io"),
  title: "What the Sketch? — AI Drawing Game",
  description:
    "Draw a prompt and see if AI can guess your sketch. Play five rounds with different categories and AI personalities.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "What the Sketch?",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick-hand",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={patrickHand.className}>{children}</body>
    </html>
  );
}
