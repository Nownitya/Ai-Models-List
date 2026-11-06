# Grill-Me — Interactive Interview Few-Shot Exemplar

How an AI coding agent should conduct an interactive requirements discovery session without overwhelming the user:

---

### Agent Question Pattern
```markdown
Before implementing the offline voice caching pipeline, I need to align on 2 critical decisions:

1. **Storage Eviction Strategy**:
   - `(Recommended)` **LRU Cache with 100MB bound**: Automatically evicts oldest voice packets when disk reaches limit.
   - **Time-to-Live (TTL)**: Discard any un-transmitted audio older than 15 minutes.
   - **Manual Clear**: Retain all packets until the user manually triggers a clear.

2. **Persistence Guarantee**:
   - `(Recommended)` **Encrypted Room SQLite**: Encrypted at rest via SQLCipher; survives process kills.
   - **In-Memory RingBuffer**: Zero disk writes; lost if app is killed by Android OS.
```

