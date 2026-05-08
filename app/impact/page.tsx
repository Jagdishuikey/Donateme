const metrics = [
  ["1.8M", "people reached"],
  ["243", "local partners"],
  ["37", "countries served"],
  ["$0.91", "of every dollar to programs"]
];

export default function ImpactPage() {
  return (
    <main>
      <section className="border-b border-ink/10 bg-ink text-cloud">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sun">Impact and about</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-tight sm:text-7xl">
            The template turns nonprofit proof into something donors can scan.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cloud/68">
            A strong nonprofit site should make mission, money movement, and human outcomes understandable without making people dig.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label]) => (
            <div key={label} className="rounded-lg border border-ink/10 bg-white p-6">
              <p className="font-display text-4xl font-black text-ink">{value}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-ink/50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Operating model</p>
            <h2 className="mt-3 font-display text-4xl font-black text-ink">Designed for teams that need trust before scale.</h2>
          </div>
          <div className="grid gap-4">
            {[
              ["Local-first delivery", "Every program page centers community operators, maintenance plans, and measurable local outcomes."],
              ["Radical clarity", "Donation progress, field updates, and financial allocation stay visible across the experience."],
              ["Mobile-first action", "The main calls to action remain thumb-friendly, fast, and readable from first visit to checkout."]
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg bg-cloud p-6">
                <h3 className="font-display text-2xl font-black text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-ink/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
