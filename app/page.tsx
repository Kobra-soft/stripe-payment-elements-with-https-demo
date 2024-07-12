"use client";
import React, { useEffect, useState } from "react";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const amount = 9.99;
  // Random amount between £10 and £30
  /// & fixed to 2 decimal places
  /* const [amount] = useState(() =>
    parseFloat((Math.random() * (30 - 10) + 10).toFixed(2))
  ); */

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });
        const data = await response.json();
        console.log("Payment Intent Created:", data);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };
    createPaymentIntent();
  }, []);

  return (
    <main
      className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr
   from-rose-600 to bg-orange-500"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Kobra-soft</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> £{amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "gbp",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
