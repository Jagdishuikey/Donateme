import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getProgram } from "./programs";

export type DonationCadence = "once" | "monthly";
export type DonationStatus = "paid" | "pending";

export type Donation = {
  id: string;
  name: string;
  email?: string;
  amount: number;
  program: string;
  cadence: DonationCadence;
  message?: string;
  status: DonationStatus;
  stripeSessionId?: string;
  createdAt: string;
};

export type DonationInput = {
  name: string;
  email?: string;
  amount: number;
  program: string;
  cadence: DonationCadence;
  message?: string;
  status?: DonationStatus;
  stripeSessionId?: string;
};

const dataFile = path.join(process.cwd(), "data", "donations.json");

async function readDonationsFile(): Promise<Donation[]> {
  try {
    const value = await readFile(dataFile, "utf8");
    return JSON.parse(value) as Donation[];
  } catch {
    return [];
  }
}

async function writeDonationsFile(donations: Donation[]) {
  await mkdir(path.dirname(dataFile), { recursive: true });
  await writeFile(dataFile, `${JSON.stringify(donations, null, 2)}\n`, "utf8");
}

export function validateDonation(input: Partial<DonationInput>): Omit<DonationInput, "status" | "stripeSessionId"> {
  const name = String(input.name ?? "").trim().slice(0, 80);
  const email = String(input.email ?? "").trim().slice(0, 120);
  const message = String(input.message ?? "").trim().slice(0, 180);
  const amount = Number(input.amount);
  const cadence = input.cadence === "monthly" ? "monthly" : "once";
  const program = String(input.program ?? "");

  if (!name) {
    throw new Error("Please enter your name.");
  }

  if (!Number.isFinite(amount) || amount < 1 || amount > 50000) {
    throw new Error("Please enter a valid donation amount.");
  }

  if (!getProgram(program)) {
    throw new Error("Please choose a valid program.");
  }

  return {
    name,
    email,
    amount: Math.round(amount),
    program,
    cadence,
    message
  };
}

export async function listDonations(limit = 20) {
  const donations = await readDonationsFile();
  return donations
    .filter((donation) => donation.status === "paid")
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit);
}

export async function donationTotals() {
  const donations = await listDonations(1000);
  return {
    totalRaised: donations.reduce((sum, donation) => sum + donation.amount, 0),
    totalDonors: donations.length,
    monthlyDonors: donations.filter((donation) => donation.cadence === "monthly").length
  };
}

export async function createDonation(input: DonationInput) {
  const donation: Donation = {
    id: input.stripeSessionId ?? `don_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    email: input.email,
    amount: input.amount,
    program: input.program,
    cadence: input.cadence,
    message: input.message,
    status: input.status ?? "paid",
    stripeSessionId: input.stripeSessionId,
    createdAt: new Date().toISOString()
  };

  const donations = await readDonationsFile();
  const existingIndex = donation.stripeSessionId
    ? donations.findIndex((item) => item.stripeSessionId === donation.stripeSessionId)
    : -1;

  if (existingIndex >= 0) {
    donations[existingIndex] = { ...donations[existingIndex], ...donation };
  } else {
    donations.unshift(donation);
  }

  await writeDonationsFile(donations);
  return donation;
}
