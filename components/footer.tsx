import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cloud">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold">KindBridge</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-cloud/70">
            A production-ready nonprofit template for fast discovery, trustworthy donations, and visible impact.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-cloud">Explore</p>
          <div className="mt-3 grid gap-2 text-cloud/70">
            <Link href="/programs">Programs</Link>
            <Link href="/impact">Impact report</Link>
            <Link href="/donate">Donate</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-cloud">Trust signals</p>
          <p className="mt-3 leading-6 text-cloud/70">Transparent fees, repair reserves, field updates, and monthly donor receipts.</p>
        </div>
      </div>
    </footer>
  );
}
