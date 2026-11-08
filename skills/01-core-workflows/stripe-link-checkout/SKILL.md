---
name: stripe-link-checkout
description: Stripe Link 1-click checkout, payment credentials auto-fill, identity verification, and Link CLI automation.
---

# Stripe Link 1-Click Checkout & Payment Credentials (`/stripe-link-checkout`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`stripe/link-cli`](https://github.com/stripe/link-cli) (⭐ 894, 1.3k+ Installs)  
> **Slash Command:** `/stripe-link-checkout`

---

## When to Use

* When optimizing e-commerce conversion rates by implementing Stripe Link's 1-click checkout experience.
* When handling automated payment method autofill, customer SMS authentication, and saved shipping addresses.
* When managing and testing Link integrations programmatically using the official Stripe Link CLI.

## Prerequisites

* Stripe account with API keys (`STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`).
* Node.js v18+ runtime and `@stripe/stripe-js` package.

## Core Capabilities

1. **1-Click Checkout Optimization**: Automatically recognizes returning Link customers via email, accelerating checkout by up to 9x.
2. **Link Authentication Element**: Embeds self-contained email input fields with instantaneous OTP verification.
3. **Payment Method Autofill**: Seamlessly populates saved credit cards, debit cards, and bank account credentials.
4. **Link CLI Automation**: Diagnoses checkout integration health, simulates Link customer states, and tests webhooks.

## Activation Command

```bash
/stripe-link-checkout [test|audit|elements|webhook] [--mode <test|live>]
```

## Workflow & Usage Guide

### 1. Stripe Link Integration with React Elements

```tsx
import React from 'react';
import { Elements, PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <form>
        {/* Link Authentication Element collects email and triggers 1-click autofill */}
        <LinkAuthenticationElement />
        <PaymentElement />
        <button type="submit">Pay with 1-Click</button>
      </form>
    </Elements>
  );
}
```

### 2. Verify Link Integration via CLI

```bash
# Audit Stripe Link configuration on test account
stripe link check --api-key sk_test_...
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Manually parsing or storing Link customer authentication OTP tokens, which violates PCI-DSS compliance boundaries.
* **Anti-Pattern:** Disabling Link in the Stripe Dashboard while leaving the frontend Link element mounted, causing UI load warnings.
* **Warning:** Always test Link payment flows in Stripe Test Mode using the test phone number `+1 000 000 0000` and OTP `000000`.

