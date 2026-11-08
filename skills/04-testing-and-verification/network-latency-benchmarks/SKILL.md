---
name: network-latency-benchmarks
description: Network latency analysis, DNS/TCP/TLS handshake profiling, TTFB breakdown, and API throughput stress-testing.
---

# Network Latency Analysis & Benchmarking (`/network-latency-benchmarks`)

> **Domain:** 04 Testing and Verification  
> **Upstream Authority:** [`jeremylongshore/tons-of-skills-marketplace`](https://github.com/jeremylongshore/tons-of-skills-marketplace) (⭐ 2,907)  
> **Slash Command:** `/network-latency-benchmarks`

---

## When to Use

* When diagnosing high p95/p99 API latency, connection timeouts, or sluggish edge function responses.
* When dissecting network timing phases: DNS lookup, TCP connect, TLS handshake, Time to First Byte (TTFB), and content transfer.
* When benchmarking HTTP/2 vs HTTP/3 multiplexing and comparing connection reuse across global points of presence (PoPs).

## Prerequisites

* `curl` CLI or Python `httpx` / Node.js `undici` installed.
* Network access to target API endpoints.

## Core Capabilities

1. **Granular Handshake Timing Breakdown**: Decomposes request lifecycles using `curl -w` formatted timing probes.
2. **Global Edge TTFB Profiling**: Measures response latency across distributed regions to evaluate CDN caching efficacy.
3. **Keep-Alive & Connection Pooling Audit**: Detects premature socket closures, excessive TCP handshakes, and missing TLS session tickets.
4. **Throughput & Concurrency Stress-Testing**: Assesses throughput degradation under escalating concurrent worker loads.

## Activation Command

```bash
/network-latency-benchmarks [probe-endpoint|ttfb-breakdown|ssl-handshake|stress-test] [--url <url>] [--concurrency <n>]
```

## Workflow & Usage Guide

### 1. Granular Timing Dissection via Curl Format

Create `curl-format.txt`:

```text
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
   time_pretransfer:  %{time_pretransfer}s\n
      time_redirect:  %{time_redirect}s\n
 time_starttransfer:  %{time_starttransfer}s\n
                    ----------\n
         time_total:  %{time_total}s\n
```

Execute probe:

```bash
curl -w "@curl-format.txt" -o /dev/null -s "https://api.example.com/v1/health"
```

### 2. Metric Evaluation Thresholds

* **DNS Resolution**: `< 20ms` (Cached / GeoDNS)
* **TLS Handshake**: `< 50ms` (TLS 1.3 with 0-RTT resumption)
* **TTFB (Time to First Byte)**: `< 150ms` on edge; `< 300ms` on origin database query
* **Total Request Time**: `< 500ms` (p95 target for interactive APIs)

## Anti-Patterns & Warnings

* **Anti-Pattern:** Running benchmarks over erratic Wi-Fi connections; always execute network benchmarks from wired or cloud VPC runners.
* **Anti-Pattern:** Conflating server processing delay with network transit time; measure TTFB independently from download duration.
* **Warning:** Ensure stress-test load levels stay within cloud provider Acceptable Use Policies to avoid DDoS mitigation blacklisting.
