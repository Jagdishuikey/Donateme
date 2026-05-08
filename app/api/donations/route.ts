import { NextResponse } from "next/server";
import { createDonation, donationTotals, listDonations, validateDonation } from "@/lib/donations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [donations, totals] = await Promise.all([listDonations(12), donationTotals()]);
  return NextResponse.json({ donations, totals });
}

export async function POST(request: Request) {
  try {
    const payload = validateDonation(await request.json());
    const donation = await createDonation({ ...payload, status: "paid" });
    return NextResponse.json({ donation }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save donation." },
      { status: 400 }
    );
  }
}
