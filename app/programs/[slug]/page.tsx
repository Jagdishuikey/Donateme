import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, ShareIcon } from "@/components/icons";
import { formatMoney, getProgram, programs } from "@/lib/programs";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);

  if (!program) {
    notFound();
  }

  const progress = Math.round((program.raised / program.goal) * 100);

  return (
    <main>
      <section className={`bg-gradient-to-br ${program.bg} border-b border-ink/10`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">{program.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-tight text-ink sm:text-7xl">{program.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">{program.summary}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={`/donate?program=${program.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-bold text-cloud transition hover:bg-moss">
                Donate to this program <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <a href={`mailto:?subject=Support ${program.title}&body=I found this impact program worth supporting: /programs/${program.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 px-6 py-4 font-bold text-ink">
                Share <ShareIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <aside className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-ink/55">{program.location}</p>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-sm text-ink/55">Raised</p>
                <p className="font-display text-4xl font-black">{formatMoney(program.raised)}</p>
              </div>
              <p className="text-sm font-black text-leaf">{progress}%</p>
            </div>
            <div className="mt-4 h-3 rounded-full bg-ink/10">
              <div className="h-3 rounded-full bg-leaf" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-4 text-sm text-ink/58">Goal: {formatMoney(program.goal)} with {program.donors.toLocaleString()} donors</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">The need</p>
          <h2 className="mt-3 font-display text-4xl font-black text-ink">A focused challenge with measurable next steps.</h2>
          <p className="mt-5 text-lg leading-8 text-ink/68">{program.problem}</p>
        </div>
        <div className="grid gap-4">
          {program.plan.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-lg border border-ink/10 bg-white p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mint font-black text-ink">{index + 1}</span>
              <p className="leading-7 text-ink/70">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Evidence</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {program.outcomes.map((outcome) => (
              <div key={outcome} className="rounded-lg bg-cloud p-6">
                <p className="font-display text-3xl font-black text-ink">{outcome.split(" ").slice(0, 2).join(" ")}</p>
                <p className="mt-2 text-sm font-semibold text-ink/58">{outcome.split(" ").slice(2).join(" ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
