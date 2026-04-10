import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia", // Upgraded to local 2026 standard
});

// Client-side Stripe loader
export const getStripeLoader = () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
