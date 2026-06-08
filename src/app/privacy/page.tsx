import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | What the Sketch?",
  description: "How What the Sketch? handles your drawings and data.",
};

const CONTACT_EMAIL = "ericzhangdeveloper@gmail.com";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-black">
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-3xl flex flex-col gap-4 pt-12 pb-24 px-4 text-lg sm:text-xl text-slate-800">
      <h1 className="text-5xl sm:text-6xl text-center text-black">Privacy Policy</h1>
      <p className="text-base text-slate-600 text-center mb-4">Last updated: June 6, 2026</p>

      <div className="flex flex-col gap-4 bg-white px-4 md:px-8 py-6 border-2 border-black shadow-[6px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
        <h2 className="text-3xl text-black mt-2">The short version</h2>
        <p>
          What the Sketch? is a game where you draw a prompt and an AI tries to guess it. We built
          it to be fun and lightweight, so we collect as little as possible:{" "}
          <strong>you don&apos;t need an account</strong>, and we never ask for your name or email
          to play. This policy explains what little we do collect, why, and who else is involved
          when you play.
        </p>

        <h2 className="text-3xl text-black mt-2">Information we collect</h2>
        <p>When you play, two things are processed:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Your drawings.</strong> The image you draw on the canvas is sent to our AI
            provider so it can make a guess.
          </li>
          <li>
            <strong>Your IP address.</strong> We read your IP address to enforce a daily usage limit
            and prevent abuse of the AI service.
          </li>
        </ul>
        <p>
          We do <strong>not </strong>collect names, email addresses, or account credentials, and we
          don&apos;t use advertising or tracking cookies.
        </p>

        <h2 className="text-3xl text-black mt-2">How we use it</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Drawings </strong>are used only to generate the AI&apos;s guess during your
            game.
          </li>
          <li>
            <strong>Your IP address </strong>is used only to count requests against a limit of 50
            per 24 hours, so one person can&apos;t run up the AI bill for everyone.
          </li>
        </ul>

        <h2 className="text-3xl text-black mt-2">Services we share data with</h2>
        <p>
          To run the game we rely on a few third-party services. When you play, the relevant data
          passes through them:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>OpenRouter</strong> routes your drawing to the AI model.{" "}
            <ExternalLink href="https://openrouter.ai/privacy">Privacy policy</ExternalLink>
          </li>
          <li>
            <strong>Google (Gemini)</strong> is the AI model that analyzes your drawing and produces
            a guess.{" "}
            <ExternalLink href="https://policies.google.com/privacy">Privacy policy</ExternalLink>
          </li>
          <li>
            <strong>Supabase</strong> stores the per-IP request counter used for rate limiting.{" "}
            <ExternalLink href="https://supabase.com/privacy">Privacy policy</ExternalLink>
          </li>
          <li>
            <strong>Vercel</strong> hosts the game and provides your IP address for rate limiting.{" "}
            <ExternalLink href="https://vercel.com/legal/privacy-policy">
              Privacy policy
            </ExternalLink>
          </li>
        </ul>
        <p>We don&apos;t sell your data, and we don&apos;t share it for advertising.</p>

        <h2 className="text-3xl text-black mt-2">Data retention</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Drawings </strong> are not stored on our servers. They&apos;re sent to the AI
            provider to produce a guess and are not saved by us afterward. Their handling by
            OpenRouter and Google is governed by the policies linked above.
          </li>
          <li>
            <strong>Rate-limit records</strong> (your IP and a request count) are kept only as long
            as needed to enforce the daily limit and are periodically cleared.
          </li>
        </ul>

        <h2 className="text-3xl text-black mt-2">Cookies &amp; local storage</h2>
        <p>
          We don&apos;t use advertising or analytics tracking cookies. Your game progress lives in
          your browser&apos;s memory during a session. Our hosting and infrastructure providers may
          set essential cookies needed for the site to function.
        </p>

        <h2 className="text-3xl text-black mt-2">Children&apos;s privacy</h2>
        <p>
          What the Sketch? is not directed to children under 13, and we don&apos;t knowingly collect
          personal information from them.
        </p>

        <h2 className="text-3xl text-black mt-2">Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access or delete your personal data.
          Because we hold so little, essentially a temporary counter tied to your IP address, there
          is usually nothing personal to return or erase. If you have a request or question,
          contact us and we&apos;ll help.
        </p>

        <h2 className="text-3xl text-black mt-2">Changes to this policy</h2>
        <p>
          If we update this policy, we&apos;ll change the &quot;Last updated&quot; date at the top
          of this page. Continuing to play after a change means you accept the updated policy.
        </p>

        <h2 className="text-3xl text-black mt-2">Contact</h2>
        <div>
          <p>Questions about this policy? </p>
          <p>
            What the Sketch? is operated by Eric Zhang. You can reach me at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
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
