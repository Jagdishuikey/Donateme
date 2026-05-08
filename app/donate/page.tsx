import { DonationForm } from "@/components/donation-form";
import { ShieldIcon } from "@/components/icons";
import { RecentDonations } from "@/components/recent-donations";
import { getProgram, programs } from "@/lib/programs";

export default async function DonatePage({ searchParams }: { searchParams: Promise<{ program?: string }> }) {
  const { program } = await searchParams;
  const initialProgram = program && getProgram(program) ? program : programs[0].slug;

  return (
    <main>
      <section className="grain">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_460px] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Donate</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-tight text-ink sm:text-7xl">
              A giving flow that makes confidence feel immediate.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              Donors choose cadence, amount, and exact program while seeing a simple impact estimate before checkout.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Secure checkout", "Transparent fees", "Monthly updates"].map((item) => (
                <div key={item} className="rounded-lg border border-ink/10 bg-white/70 p-4">
                  <ShieldIcon className="h-5 w-5 text-leaf" />
                  <p className="mt-3 text-sm font-black text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <DonationForm initialProgram={initialProgram} />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <RecentDonations />
      </section>
    </main>
  );
}
