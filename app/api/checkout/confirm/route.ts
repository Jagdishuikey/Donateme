import { NextResponse } from "next/server";
import { createDonation } from "@/lib/donations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { sessionId } = await request.json();
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey || !sessionId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${stripeKey}`
    }
  });
  const session = await response.json();

  if (!response.ok || (session.payment_status !== "paid" && session.status !== "complete")) {
    return NextResponse.json({ ok: false, error: "Payment is not complete yet." }, { status: 400 });
  }

  const metadata = session.metadata ?? {};
  const donation = await createDonation({
    name: metadata.name || "Anonymous",
    email: metadata.email || session.customer_email,
    amount: Math.round(Number(session.amount_total || 0) / 100),
    program: metadata.program,
    cadence: metadata.cadence === "monthly" ? "monthly" : "once",
    message: metadata.message,
    status: "paid",
    stripeSessionId: session.id
  });

  return NextResponse.json({ ok: true, donation });
}
