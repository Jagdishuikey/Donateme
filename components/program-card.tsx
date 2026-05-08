import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import { formatMoney, type Program } from "@/lib/programs";

export function ProgramCard({ program }: { program: Program }) {
  const progress = Math.round((program.raised / program.goal) * 100);

  return (
    <article className="group overflow-hidden rounded-lg border border-ink/10 bg-white shadow-line transition hover:-translate-y-1 hover:shadow-soft">
      <div className={`h-40 bg-gradient-to-br ${program.bg} p-5`}>
        <div className="flex h-full flex-col justify-between">
          <span className="w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
            {program.eyebrow}
          </span>
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className={`h-12 rounded-t-full ${item % 2 ? "bg-white/55" : program.accent}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm font-medium text-leaf">{program.location}</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink">{program.title}</h2>
        <p className="mt-3 text-sm leading-6 text-ink/68">{program.summary}</p>
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm font-semibold text-ink">
            <span>{formatMoney(program.raised)}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-ink/10">
            <div className="h-2 rounded-full bg-leaf" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Link href={`/programs/${program.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink">
          View program <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
