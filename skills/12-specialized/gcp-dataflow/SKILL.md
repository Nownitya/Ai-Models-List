---
name: gcp-dataflow
description: "Author, optimize, and troubleshoot Apache Beam streaming and batch data pipelines on Dataflow."
priority: P3
category: 12-specialized
---

# Gcp Dataflow

Author, optimize, and troubleshoot Apache Beam streaming and batch data pipelines on Dataflow.

## When to Use
- Building large-scale stream processing or batch analytics on Google Cloud.

## Core Protocol / Capabilities
1. Design Beam pipeline DAG with bounded or unbounded PCollections.
2. Optimize windowing, triggering, and stateful processing.
3. Monitor worker autoscaling and pipeline lag in Cloud Monitoring.

## Anti-Patterns & Warnings
- Unbounded grouping causing worker OOMs.
- Ignoring pipeline watermarks.
