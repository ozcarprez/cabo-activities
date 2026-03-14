// src/lib/stripe.ts
// Stripe integration utilities - uncomment and configure when ready

/*
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, string> = {}
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe uses cents
    currency,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}

export async function confirmPayment(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return {
    status: paymentIntent.status,
    amount: paymentIntent.amount / 100,
    receiptUrl: paymentIntent.charges?.data[0]?.receipt_url || null,
  };
}

export async function createRefund(
  paymentIntentId: string,
  amount?: number // partial refund amount in dollars
) {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? Math.round(amount * 100) : undefined,
  });

  return {
    refundId: refund.id,
    status: refund.status,
    amount: refund.amount / 100,
  };
}

// Webhook handler for Stripe events
export async function handleWebhook(body: string, signature: string) {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update booking status to CONFIRMED
      // Send confirmation email
      break;
    case 'payment_intent.payment_failed':
      // Update booking status to FAILED
      // Notify user
      break;
    case 'charge.refunded':
      // Update payment status to REFUNDED
      break;
  }

  return { received: true };
}
*/

// Placeholder exports for development
export function createPaymentIntent(amount: number) {
  return Promise.resolve({
    clientSecret: `pi_demo_${Date.now()}_secret`,
    paymentIntentId: `pi_demo_${Date.now()}`,
  });
}

export function confirmPayment(paymentIntentId: string) {
  return Promise.resolve({
    status: 'succeeded',
    amount: 0,
    receiptUrl: null,
  });
}
