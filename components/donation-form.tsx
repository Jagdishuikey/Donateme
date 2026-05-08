"use client";

import { useMemo, useState } from "react";
import { programs } from "@/lib/programs";
import { ShieldIcon } from "./icons";

const amounts = [25, 50, 100, 250];

export function DonationForm({ initialProgram = programs[0].slug }: { initialProgram?: string }) {
  const [amount, setAmount] = useState(50);
  const [monthly, setMonthly] = useState(true);
  const [program, setProgram] = useState(initialProgram);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");

  const impact = useMemo(() => {
    const multiplier = monthly ? 12 : 1;
    return Math.max(1, Math.round((amount * multiplier) / 18));
  }, [amount, monthly]);

  async function submitDonation() {
    setStatus("loading");
    setNotice("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          amount,
          program,
          cadence: monthly ? "monthly" : "once",
          message
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Donation could not be processed.");
      }

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }

      window.dispatchEvent(new Event("donations:updated"));
      setStatus("success");
      setNotice("Demo donation recorded. Add Stripe keys to turn this into real checkout.");

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Donation failed.");
    }
  }

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft sm:p-7">
      <div className="flex rounded-full bg-cloud p-1">
        <button type="button" onClick={() => setMonthly(true)} className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition ${monthly ? "bg-ink text-cloud" : "text-ink/65"}`}>
          Monthly
        </button>
        <button type="button" onClick={() => setMonthly(false)} className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition ${!monthly ? "bg-ink text-cloud" : "text-ink/65"}`}>
          Once
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="donorName" className="block text-sm font-bold text-ink">Name</label>
          <input
            id="donorName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="mt-2 w-full rounded-lg border border-ink/10 bg-cloud px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-ink/40"
          />
        </div>
        <div>
          <label htmlFor="donorEmail" className="block text-sm font-bold text-ink">Email</label>
          <input
            id="donorEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="receipt@email.com"
            className="mt-2 w-full rounded-lg border border-ink/10 bg-cloud px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-ink/40"
          />
        </div>
      </div>

      <label className="mt-6 block text-sm font-bold text-ink">Choose amount</label>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {amounts.map((value) => (
          <button type="button" key={value} onClick={() => setAmount(value)} className={`rounded-lg border px-4 py-4 text-lg font-black transition ${amount === value ? "border-ink bg-mint text-ink" : "border-ink/10 bg-white text-ink/70 hover:border-ink/40"}`}>
            ${value}
          </button>
        ))}
      </div>

      <label htmlFor="customAmount" className="mt-5 block text-sm font-bold text-ink">Custom amount</label>
      <div className="mt-2 flex items-center rounded-lg border border-ink/10 bg-cloud px-4">
        <span className="text-lg font-black text-ink">$</span>
        <input
          id="customAmount"
          type="number"
          min="1"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          className="w-full bg-transparent px-3 py-4 text-lg font-black text-ink outline-none"
        />
      </div>

      <label htmlFor="program" className="mt-5 block text-sm font-bold text-ink">Direct your gift</label>
      <select id="program" value={program} onChange={(event) => setProgram(event.target.value)} className="mt-2 w-full rounded-lg border border-ink/10 bg-cloud px-4 py-4 text-sm font-semibold text-ink outline-none">
        {programs.map((item) => (
          <option value={item.slug} key={item.slug}>{item.title}</option>
        ))}
      </select>

      <label htmlFor="message" className="mt-5 block text-sm font-bold text-ink">Public note</label>
      <textarea
        id="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Optional message for the donor wall"
        rows={3}
        className="mt-2 w-full resize-none rounded-lg border border-ink/10 bg-cloud px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-ink/40"
      />

      <div className="mt-5 rounded-lg bg-ink p-4 text-cloud">
        <p className="text-sm text-cloud/70">Estimated yearly impact</p>
        <p className="mt-1 font-display text-3xl font-black">{impact} people supported</p>
      </div>

      <button
        type="button"
        onClick={submitDonation}
        disabled={status === "loading"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-coral px-5 py-4 font-black text-white transition hover:bg-[#d95f49] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
      >
        {status === "loading" ? "Processing..." : "Continue securely"} <ShieldIcon className="h-5 w-5" />
      </button>
      {notice ? (
        <p className={`mt-4 rounded-lg px-4 py-3 text-sm font-semibold ${status === "error" ? "bg-red-50 text-red-700" : "bg-mint text-ink"}`}>
          {notice}
        </p>
      ) : null}
      <p className="mt-4 text-center text-xs leading-5 text-ink/55">
        Works in demo mode now. Add Stripe keys to activate real payments without changing code.
      </p>
    </div>
  );
}
