import { ProgramCard } from "@/components/program-card";
import { programs } from "@/lib/programs";

export default function ProgramsPage() {
  return (
    <main>
      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Program discovery</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-tight text-ink sm:text-6xl">
            Browse causes by outcome, urgency, and donor confidence.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
            Each program is built as a compact decision page with clear needs, proof, and a frictionless path to give or share.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>
    </main>
  );
}
