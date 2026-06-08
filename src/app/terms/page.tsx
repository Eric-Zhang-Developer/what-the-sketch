import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | What the Sketch?",
  description: "The rules for playing What the Sketch?",
};

const CONTACT_EMAIL = "ericzhangdeveloper@gmail.com";

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-3xl flex flex-col gap-4 pt-12 pb-24 px-4 text-lg sm:text-xl text-slate-800">
      <h1 className="text-5xl sm:text-6xl text-center text-black">Terms of Service</h1>
      <p className="text-base text-slate-600 text-center mb-4">Last updated: June 7, 2026</p>

      <div className="flex flex-col gap-4 bg-white px-4 md:px-8 py-6 border-2 border-black shadow-[6px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
        <h2 className="text-3xl text-black mt-2">The short version</h2>
        <p>
          What the Sketch? is a free browser game: you draw a prompt and an AI guesses it. By
          playing, you agree to these terms. If you don&apos;t agree, please don&apos;t use the game.
          You must be at least 13 to play.
        </p>

        <h2 className="text-3xl text-black mt-2">Acceptable use</h2>
        <p>Don&apos;t use the game to:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>submit illegal, hateful, harassing, sexually explicit, or abusive content;</li>
          <li>break the law or infringe anyone&apos;s rights;</li>
          <li>overload, attack, or reverse-engineer the game or its AI; or</li>
          <li>bypass the rate limit, scrape, copy, or resell it.</li>
        </ul>
        <p>We may block access for misuse.</p>

        <h2 className="text-3xl text-black mt-2">Your drawings</h2>
        <p>
          You&apos;re responsible for what you draw, and you keep ownership of it. By submitting a
          drawing, you allow us to send it to our AI provider to generate a guess. See our{" "}
          <Link href="/privacy" className="underline hover:text-black">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>

        <h2 className="text-3xl text-black mt-2">AI guesses</h2>
        <p>
          Guesses are generated automatically and are just part of the game. They may be wrong,
          nonsensical, or unintentionally offensive, and are provided for entertainment only.
          Don&apos;t rely on them, and they don&apos;t reflect our views.
        </p>

        <h2 className="text-3xl text-black mt-2">No warranties, no liability</h2>
        <p>
          What the Sketch? is a free hobby project, provided &quot;as is&quot; and &quot;as
          available&quot; with no warranties. We may change or shut it down at any time, and to the
          fullest extent allowed by law, we&apos;re not liable for any damages from using it. You
          play at your own risk.
        </p>

        <h2 className="text-3xl text-black mt-2">Our content</h2>
        <p>
          The game&apos;s name, code, artwork, and design belong to Eric Zhang; please don&apos;t
          copy or redistribute it. Your drawings stay yours.
        </p>

        <h2 className="text-3xl text-black mt-2">Third-party services</h2>
        <p>
          The game runs on OpenRouter, Google, Supabase, and Vercel, whose terms also apply.
          We&apos;re not responsible for their services.
        </p>

        <h2 className="text-3xl text-black mt-2">Changes &amp; contact</h2>
        <p>
          We may update these terms; we&apos;ll change the date above, and continued play means you
          accept the changes. Questions? What the Sketch? is operated by Eric Zhang. Reach me at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
      <Link
        href="/"
        className="underline hover:text-black text-center mt-6 hover:scale-105 transition"
      >
        ← Back to game
      </Link>
    </main>
  );
}
