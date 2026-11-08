---
name: binance-agentic-wallet
description: Binance agentic wallet management, transaction signing, liquidity queries, and cryptographic asset workflows.
---

# Binance Agentic Wallet & Blockchain Workflows (`/binance-agentic-wallet`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`binance/binance-skills-hub`](https://github.com/binance/binance-skills-hub) (⭐ 1,151)  
> **Slash Command:** `/binance-agentic-wallet`

---

## When to Use

* When orchestrating agentic crypto wallet actions: querying asset balances, reading order books, and estimating gas fees.
* When structuring automated cross-chain swaps, limit orders, and liquidity pool staking within autonomous agent guardrails.
* When verifying smart contract addresses, ABI signatures, and transaction confirmations on BNB Chain and EVM networks.

## Prerequisites

* Node.js 18+ or Python 3.10+ runtime.
* Web3 / Ethers or Binance SDK installed:
  ```bash
  npm install ethers @binance/connector
  ```
* Binance API credentials or Web3 RPC endpoint configured via environment variables.

## Core Capabilities

1. **Deterministic Balance & Ledger Queries**: Reads token balances across Spot, Margin, and Web3 non-custodial wallets.
2. **Transaction Construction & Gas Estimation**: Constructs raw EVM transaction payloads and computes priority gas fees before submission.
3. **Smart Contract ABI Interaction**: Encodes and decodes function calls for standard ERC-20 / BEP-20 token contracts.
4. **Agent Spending Limits & Guardrails**: Enforces hardcoded daily transaction limits, whitelisted destination addresses, and slippage ceilings.

## Activation Command

```bash
/binance-agentic-wallet [get-balance|estimate-gas|quote-swap|audit-contract] [--network <bsc|eth>] [--token <symbol>]
```

## Workflow & Usage Guide

### 1. Querying Token Balance & Verifying Allowances

```typescript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const erc20Abi = ['function balanceOf(address owner) view returns (uint256)'];

export async function getBnbChainBalance(tokenAddress: string, walletAddress: string) {
  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
  const balance = await contract.balanceOf(walletAddress);
  return ethers.formatUnits(balance, 18);
}
```

### 2. Guardrail Enforcement Protocol

* **Whitelist Only**: Transactions permitted only to registered multisig treasury addresses.
* **Max Slippage**: Rejects any DEX quote with price slippage exceeding `1.0%`.
* **Hardware Approval**: Requires human approval signature for any transfer exceeding \$500 USD equivalent.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Hardcoding private keys or mnemonic seed phrases into source code or unencrypted configuration files.
* **Anti-Pattern:** Executing decentralized market swaps without setting minimum receive amounts (`amountOutMin`), risking sandwich attacks.
* **Warning:** Cryptographic transactions are irreversible; always test complex contract calls against testnets (e.g. BSC Testnet, Sepolia) first.
