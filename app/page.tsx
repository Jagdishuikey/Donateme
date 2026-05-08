import Link from "next/link";
import { ArrowRightIcon, HeartIcon, ShareIcon, ShieldIcon } from "@/components/icons";
import { ProgramCard } from "@/components/program-card";
import { RecentDonations } from "@/components/recent-donations";
import { featuredProgram, formatMoney, programs } from "@/lib/programs";

const trust = [
  { value: "91%", label: "funds to field work" },
  { value: "48h", label: "average update time" },
  { value: "0", label: "hidden platform fees" }
];

const features = [
  {
    Icon: ShieldIcon,
    title: "Trust is visible",
    copy: "Every campaign shows funding progress, location, reserved maintenance funds, and measurable outcomes."
  },
  {
    Icon: ShareIcon,
    title: "Sharing is effortless",
    copy: "Program pages are designed as crisp stories people can understand and forward in under a minute."
  },
  {
    Icon: HeartIcon,
    title: "Giving feels human",
    copy: "Donation defaults, microcopy, and impact math reduce hesitation without manipulating the donor."
  }
];

export default function Home() {
  return (
    <main>
      <section className="grain overflow-hidden border-b border-ink/10">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-bold text-moss">
              Built for international nonprofits
            </p>
            <h1 className="font-display text-5xl font-black leading-[0.96] tracking-normal text-ink sm:text-7xl lg:text-8xl">
              Give people a reason to believe before they give.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
              KindBridge is a high-conversion nonprofit website template with fast program discovery, transparent impact proof, and a donation journey designed around trust.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/donate" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-bold text-cloud transition hover:bg-moss">
                Start donating <HeartIcon className="h-5 w-5" />
              </Link>
              <Link href="/programs" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 px-6 py-4 font-bold text-ink transition hover:bg-white">
                Explore programs <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {trust.map((item) => (
                <div key={item.label} className="border-l border-ink/15 pl-4">
                  <p className="font-display text-3xl font-black text-ink">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink/52">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="impact-grid rounded-lg border border-ink/10 bg-white/80 p-4 shadow-soft">
              <div className="rounded-lg bg-ink p-5 text-cloud">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-cloud/70">Live campaign</p>
                  <span className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">74% funded</span>
                </div>
                <h2 className="mt-5 font-display text-4xl font-black">{featuredProgram.title}</h2>
                <p className="mt-3 text-sm leading-6 text-cloud/68">{featuredProgram.summary}</p>
                <div className="mt-6 h-3 rounded-full bg-white/15">
                  <div className="h-3 rounded-full bg-sun" style={{ width: "74%" }} />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-cloud/55">Raised</p>
                    <p className="mt-1 text-xl font-black">{formatMoney(featuredProgram.raised)}</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-cloud/55">Supporters</p>
                    <p className="mt-1 text-xl font-black">{featuredProgram.donors.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  ["Choose", "Program-first giving"],
                  ["Trust", "Receipts and updates"],
                  ["Share", "One-tap campaign links"]
                ].map(([title, label]) => (
                  <div key={title} className="rounded-lg bg-white p-4 shadow-line">
                    <p className="font-display text-xl font-black text-ink">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-ink/58">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Programs</p>
            <h2 className="mt-3 font-display text-4xl font-black text-ink sm:text-5xl">Find the story you can move forward.</h2>
          </div>
          <Link href="/programs" className="inline-flex items-center gap-2 font-bold text-ink">
            View all <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {features.map(({ Icon, title, copy }) => (
            <div key={title} className="rounded-lg border border-ink/10 p-6">
              <Icon className="h-7 w-7 text-coral" />
              <h3 className="mt-5 font-display text-2xl font-black text-ink">{title}</h3>
              <p className="mt-3 leading-7 text-ink/65">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <RecentDonations compact />
      </section>
    </main>
  );
}
