"use client";

import { useEffect, useMemo, useState } from "react";
import { formatMoney, getProgram } from "@/lib/programs";
import type { Donation } from "@/lib/donations";

type DonationFeed = {
  donations: Donation[];
  totals: {
    totalRaised: number;
    totalDonors: number;
    monthlyDonors: number;
  };
};

const fallback: DonationFeed = {
  donations: [],
  totals: {
    totalRaised: 0,
    totalDonors: 0,
    monthlyDonors: 0
  }
};

function timeAgo(date: string) {
  const seconds = Math.max(1, Math.round((Date.now() - +new Date(date)) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function RecentDonations({ compact = false }: { compact?: boolean }) {
  const [feed, setFeed] = useState<DonationFeed>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/donations", { cache: "no-store" });
        const data = (await response.json()) as DonationFeed;
        if (active) {
          setFeed(data);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();
    window.addEventListener("donations:updated", load);
    const interval = window.setInterval(load, 15000);

    return () => {
      active = false;
      window.removeEventListener("donations:updated", load);
      window.clearInterval(interval);
    };
  }, []);

  const visibleDonations = useMemo(
    () => feed.donations.slice(0, compact ? 4 : 8),
    [compact, feed.donations]
  );

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-line sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Live donations</p>
          <h2 className="mt-2 font-display text-3xl font-black text-ink">Who gave just now</h2>
        </div>
        <span className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">
          {loading ? "Syncing" : "Live"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-cloud p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Raised</p>
          <p className="mt-1 font-display text-2xl font-black text-ink">{formatMoney(feed.totals.totalRaised)}</p>
        </div>
        <div className="rounded-lg bg-cloud p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Donors</p>
          <p className="mt-1 font-display text-2xl font-black text-ink">{feed.totals.totalDonors}</p>
        </div>
        <div className="rounded-lg bg-cloud p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Monthly</p>
          <p className="mt-1 font-display text-2xl font-black text-ink">{feed.totals.monthlyDonors}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {visibleDonations.map((donation) => {
          const program = getProgram(donation.program);
          return (
            <article key={donation.id} className="flex items-center justify-between gap-4 rounded-lg border border-ink/10 p-4">
              <div className="min-w-0">
                <p className="truncate font-bold text-ink">
                  {donation.name} donated {formatMoney(donation.amount)}
                </p>
                <p className="mt-1 truncate text-sm text-ink/58">
                  {program?.title ?? "KindBridge"} · {donation.cadence === "monthly" ? "monthly" : "one-time"} · {timeAgo(donation.createdAt)}
                </p>
                {donation.message ? <p className="mt-2 text-sm italic text-ink/65">"{donation.message}"</p> : null}
              </div>
              <span className="hidden rounded-full bg-ink px-3 py-1 text-xs font-black text-cloud sm:inline-flex">
                paid
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
