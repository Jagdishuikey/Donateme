import Link from "next/link";
import { RecentDonations } from "@/components/recent-donations";
import { SuccessConfirmer } from "@/components/success-confirmer";

export default async function DonationSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ demo?: string; session_id?: string }>;
}) {
  const { demo, session_id: sessionId } = await searchParams;

  return (
    <main className="grain">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-ink/10 bg-white/85 p-8 text-center shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">
            {demo ? "Demo donation saved" : "Donation complete"}
          </p>
          <h1 className="mt-4 font-display text-5xl font-black text-ink sm:text-6xl">Your gift is on the wall.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/68">
            The donation record is now stored by the Next.js server and appears in the live donor feed.
          </p>
          <SuccessConfirmer sessionId={sessionId} />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/donate" className="rounded-full bg-ink px-6 py-4 font-bold text-cloud">Give again</Link>
            <Link href="/programs" className="rounded-full border border-ink/15 px-6 py-4 font-bold text-ink">Explore programs</Link>
          </div>
        </div>
        <div className="mt-8">
          <RecentDonations />
        </div>
      </section>
    </main>
  );
}
