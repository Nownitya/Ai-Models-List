---
name: solana-agent-kit
description: Solana Foundation blockchain development, Anchor smart contracts, SPL tokens, and AI agent on-chain actions.
---

# Solana Agent Kit & On-Chain Development (`/solana-agent-kit`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`solana-foundation/solana-dev-skill`](https://github.com/solana-foundation/solana-dev-skill) (⭐ 589)  
> **Slash Command:** `/solana-agent-kit`

---

## When to Use

* When developing decentralized applications (dApps) and smart contracts on Solana using the Anchor framework.
* When equipping autonomous AI agents with wallet capabilities to query on-chain balances, transfer SOL, and swap tokens (Jupiter/Raydium).
* When deploying SPL tokens, managing PDA (Program Derived Address) accounts, and executing atomic transaction instructions.

## Prerequisites

* Rust toolchain and Solana CLI (`solana-cli`).
* Anchor CLI (`avm` / `@coral-xyz/anchor`).
* Node.js v18+ for TypeScript client scripts (`@solana/web3.js`).

## Core Capabilities

1. **Anchor Smart Contract Scaffolding**: Structured development of Solana programs with account validation and serialized state.
2. **AI Agent Tool Actions**: Pre-built tools for balance checks, token swaps, staking, and NFT minting for LangChain and AI SDKs.
3. **PDA Management & Rent Exemption**: Deterministic address generation and rent calculation for state storage.
4. **Transaction Batching & Priority Fees**: Dynamic compute unit pricing and transaction simulation to avoid dropped blocks.

## Activation Command

```bash
/solana-agent-kit [contract|wallet|swap|pda] [--cluster <devnet|mainnet-beta>]
```

## Workflow & Usage Guide

### 1. Anchor Program State & Instruction (`programs/escrow/src/lib.rs`)

```rust
use anchor_lang::prelude::*;

declare_id!("TokenEscrow1111111111111111111111111111111111");

#[program]
pub mod token_escrow {
    use super::*;

    pub fn initialize_escrow(ctx: Context<InitializeEscrow>, amount: u64) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow_account;
        escrow.initializer = *ctx.accounts.initializer.key;
        escrow.amount = amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(init, payer = initializer, space = 8 + 32 + 8)]
    pub escrow_account: Account<'info, EscrowState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct EscrowState {
    pub initializer: Pubkey,
    pub amount: u64,
}
```

### 2. TypeScript Agent Wallet Query

```typescript
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export async function getSolBalance(address: string): Promise<number> {
  const pubkey = new PublicKey(address);
  const balance = await connection.getBalance(pubkey);
  return balance / LAMPORTS_PER_SOL;
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Committing raw private key strings or seed phrases to git repositories; always use secure environment variables or hardware key stores.
* **Anti-Pattern:** Omitting priority fees during network congestion, causing transaction timeout drops.
* **Warning:** Program upgrades on Solana mainnet-beta are irreversible if authority is relinquished; always test thoroughly on Devnet first.

