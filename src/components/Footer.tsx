// Minimal themed footer with legal links.

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row mt-auto items-center justify-center gap-2 sm:gap-4 pt-4 pb-8 text-lg text-slate-600">
      <Link href="/privacy" className="hover:text-black hover:underline transition-colors">
        Privacy Policy
      </Link>
      <span className="hidden sm:inline">·</span>
      <Link href="/terms" className="hover:text-black hover:underline transition-colors">
        Terms of Service
      </Link>
      <span className="hidden sm:inline">·</span>
      <span>© {new Date().getFullYear()} Eric Zhang · What the Sketch?</span>
    </footer>
  );
}
