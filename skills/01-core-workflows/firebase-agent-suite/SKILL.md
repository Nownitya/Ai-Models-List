---
name: firebase-agent-suite
description: Google Firebase backend suite, Firestore security rules audit, Cloud Functions, and Firebase Auth.
---

# Firebase Agent Suite & Cloud Architecture (`/firebase-agent-suite`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`firebase/agent-skills`](https://github.com/firebase/agent-skills) (⭐ 505, 5.9k+ Installs)  
> **Slash Command:** `/firebase-agent-suite`

---

## When to Use

* When developing serverless backends powered by Google Firebase (Firestore, Cloud Functions v2, Firebase Authentication, Cloud Storage).
* When auditing and hardening Firestore and Storage Security Rules to prevent unauthorized data exposure.
* When configuring Firebase App Check, background trigger functions, and multi-environment emulators for local testing.

## Prerequisites

* Firebase CLI installed (`npm install -g firebase-tools`).
* Node.js v18+ or Python 3.11+ runtime for Cloud Functions.

## Core Capabilities

1. **Firestore Schema & Rules Hardening**: Authors declarative security rules with path-based role validation and attribute verification.
2. **Cloud Functions v2 Pipelines**: Scaffolds 2nd-gen Cloud Functions with concurrency, secrets integration, and Pub/Sub triggers.
3. **Authentication Flows**: Configures Firebase Auth with multi-factor authentication (MFA), anonymous session upgrades, and custom claims.
4. **Local Emulator Suite**: Integrates Firebase emulators for zero-cost, hermetic local testing and CI/CD integration.

## Activation Command

```bash
/firebase-agent-suite [init|rules-audit|deploy|emulators] [--project <id>]
```

## Workflow & Usage Guide

### 1. Hardened Firestore Security Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    function isAdmin() {
      return isAuthenticated() && request.auth.token.role == 'admin';
    }

    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
    }

    match /projects/{projectId} {
      allow read: if isAuthenticated() && resource.data.members[request.auth.uid] != null;
      allow write: if isAuthenticated() && request.resource.data.ownerId == request.auth.uid;
    }
  }
}
```

### 2. Cloud Functions v2 Callable Function

```typescript
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";

export const archiveProject = onCall({ cors: true }, async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }
  const { projectId } = request.data;
  const db = getFirestore();
  const projectRef = db.collection("projects").doc(projectId);
  const snap = await projectRef.get();

  if (!snap.exists || snap.data()?.ownerId !== request.auth.uid) {
    throw new HttpsError("permission-denied", "Unauthorized operation.");
  }

  await projectRef.update({ status: "archived", archivedAt: new Date() });
  return { success: true };
});
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Using permissive rules like `allow read, write: if true;` in non-ephemeral testing environments.
* **Anti-Pattern:** Making synchronous external API calls inside Firestore triggers without idempotency keys, risking duplicate writes on retries.
* **Warning:** Cloud Functions v2 scale automatically; configure max instance limits (`maxInstances: 10`) to prevent runaway costs during traffic spikes.

