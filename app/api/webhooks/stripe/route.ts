/* eslint-disable camelcase */
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";
import stripe from "stripe";
import { fetchMutation, fetchQuery } from "convex/nextjs";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    const eventType = event.type;

    // CHECKING FOR STRIPE WEBHOOK EVENT
    if (eventType === "checkout.session.completed") {
      const { metadata, id, amount_total } = event.data.object;
      const sub = await fetchQuery(api.subscriptions.get, {
        userId: metadata?.buyerId || "",
      });
      // updating existing user subscription to plan he is purchasing!
      await fetchMutation(api.subscriptions.update, {
        id: sub._id,
        amount: amount_total ? amount_total / 100 : 0,
        buyerId: metadata?.buyerId || "",
        createdAt: new Date().getTime(),
        plan: metadata?.plan || "",
        stripeId: id,
      });
      return NextResponse.json({ message: "Payment succeed!" });
    }
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }
  // Get the ID and type

  return new Response("", { status: 200 });
}
