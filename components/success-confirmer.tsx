"use client";

import { useEffect, useState } from "react";

export function SuccessConfirmer({ sessionId }: { sessionId?: string }) {
  const [message, setMessage] = useState(sessionId ? "Confirming payment..." : "");

  useEffect(() => {
    if (!sessionId) return;

    async function confirm() {
      const response = await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId })
      });

      if (response.ok) {
        window.dispatchEvent(new Event("donations:updated"));
        setMessage("Payment confirmed and added to the donor wall.");
      } else {
        setMessage("Payment received, but donor-wall confirmation needs a refresh.");
      }
    }

    confirm().catch(() => setMessage("Payment received, but donor-wall confirmation needs a refresh."));
  }, [sessionId]);

  if (!message) {
    return null;
  }

  return <p className="mt-4 rounded-lg bg-mint px-4 py-3 text-sm font-bold text-ink">{message}</p>;
}
