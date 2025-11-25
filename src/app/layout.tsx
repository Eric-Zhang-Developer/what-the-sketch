import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Pictionary",
  description: "Guess that Picture!",
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
