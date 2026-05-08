import { NextResponse } from "next/server";
import { createDonation, validateDonation } from "@/lib/donations";
import { getProgram } from "@/lib/programs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBaseUrl(request: Request) {
  return process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
}

export async function POST(request: Request) {
  try {
    const payload = validateDonation(await request.json());
    const program = getProgram(payload.program);
    const baseUrl = getBaseUrl(request);
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      const donation = await createDonation({ ...payload, status: "paid" });
      return NextResponse.json({
        mode: "demo",
        donation,
        redirectUrl: `${baseUrl}/donate/success?demo=1&donation=${donation.id}`
      });
    }

    const params = new URLSearchParams();
    params.set("mode", payload.cadence === "monthly" ? "subscription" : "payment");
    params.set("success_url", `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`);
    params.set("cancel_url", `${baseUrl}/donate?program=${payload.program}`);
    params.set("metadata[name]", payload.name);
    params.set("metadata[email]", payload.email ?? "");
    params.set("metadata[program]", payload.program);
    params.set("metadata[cadence]", payload.cadence);
    params.set("metadata[message]", payload.message ?? "");
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", process.env.STRIPE_CURRENCY || "usd");
    params.set("line_items[0][price_data][unit_amount]", String(payload.amount * 100));
    params.set("line_items[0][price_data][product_data][name]", program?.title ?? "KindBridge donation");
    params.set("line_items[0][price_data][product_data][description]", `Donation to ${program?.title ?? "KindBridge"}`);

    if (payload.cadence === "monthly") {
      params.set("line_items[0][price_data][recurring][interval]", "month");
    }

    if (payload.email) {
      params.set("customer_email", payload.email);
    }

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const session = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: session?.error?.message ?? "Stripe checkout could not be created." },
        { status: 400 }
      );
    }

    return NextResponse.json({ mode: "stripe", checkoutUrl: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed." },
      { status: 400 }
    );
  }
}
