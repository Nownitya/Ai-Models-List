---
name: stripe-payments
description: Official Stripe payment integrations, Checkout sessions, webhook verification, subscription lifecycles, and API upgrades.
---

# Stripe Payments & Financial Engineering (`stripe/ai`)

> **Priority:** `P0` | **Framework:** `stripe/ai` | **Domain:** `12-specialized-domains` | **Stars:** `⭐ 2.0k+`

Official Stripe payment integrations, Checkout sessions, webhook verification, subscription lifecycles, and API upgrades.

---

## 🧭 When to Use

* When accepting credit cards, Apple Pay, Google Pay, or bank transfers via Stripe Checkout and PaymentIntents.
* When managing recurring SaaS subscriptions, tiered billing, and automated invoice generation.
* When verifying cryptographically signed Stripe webhooks to handle asynchronous payment events.
* When upgrading Stripe SDK versions and handling deprecation breaking changes.

---

## 🎯 Core Capabilities

1. **Stripe Checkout Sessions**: Creates pre-built, hosted payment pages optimized for global conversion and fraud detection (Radar).
2. **Cryptographic Webhook Verification**: Validates `Stripe-Signature` headers with endpoint secrets to prevent spoofed payment confirmations.
3. **Idempotency Guarantees**: Sends unique `Idempotency-Key` headers on mutation requests to avoid double-charging during network drops.
4. **Subscription State Machine**: Handles recurring billing events (`invoice.payment_succeeded`, `customer.subscription.deleted`, trial expirations).

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/stripe-payments
```

### Server Checkout Endpoint (`api/checkout.ts`)
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function createCheckoutSession(customerId: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: 'https://example.com/billing?success=true',
    cancel_url: 'https://example.com/billing?canceled=true',
  }, {
    idempotencyKey: `sub_${customerId}_${priceId}`,
  });

  return session.url;
}
```

### Webhook Verification Pattern
```typescript
export async function handleWebhook(rawBody: string, signature: string) {
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'checkout.session.completed':
      // Provision user subscription access
      break;
    case 'invoice.payment_failed':
      // Trigger dunning notifications
      break;
  }
}
```

---

## 📋 Prerequisites

* Stripe Developer Account with Test & Live API Keys (`pk_test`, `sk_test`)
* Stripe CLI for local webhook forwarding (`stripe listen --forward-to localhost:3000/api/webhooks`)
* Target runtime SDK (`stripe` for Node.js, Python, or Ruby)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Storing raw credit card numbers on your servers (violates PCI-DSS Level 1 compliance); always use Stripe Elements or Checkout.
* **Anti-Pattern:** Fulfilling orders without cryptographically verifying incoming webhook signatures.
* **Anti-Pattern:** Omitting idempotency keys on payment creation calls.
