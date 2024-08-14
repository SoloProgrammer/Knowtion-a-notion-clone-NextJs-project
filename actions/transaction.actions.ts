"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { BRAND_NAME } from "@/app/constants";

export const checkout = async (transaction: CheckoutTransactionParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = transaction.amount * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          unit_amount: price,
          currency: "usd",
          product_data: {
            name: `${BRAND_NAME} ${transaction.plan}`,
            images: [`${process.env.NEXT_PUBLIC_HOST_URL!}/upgrade.png`],
          },
        },
      },
    ],
    metadata: {
      plan: transaction.plan,
      buyerId: transaction.buyerId,
      amount: "$" + price,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST_URL!}/documents`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL!}`,
  });
  redirect(session.url!);
};
