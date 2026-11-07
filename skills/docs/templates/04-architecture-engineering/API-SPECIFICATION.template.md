# API Specification — {{PROJECT_NAME}}

> **Standard:** OpenAPI 3.1 / RESTful JSON / gRPC

---

## 1. Base URL & Authentication
- **Base URL:** `https://api.{{DOMAIN_NAME}}/v1`
- **Authentication:** Bearer JWT in `Authorization` header.

---

## 2. Endpoint Index

| Method | Route | Description | Auth Required | Rate Limit |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Authenticate & exchange credentials | No | 5 req / min |
| `GET` | `/users/me` | Fetch active user profile | Yes | 60 req / min |
| `POST` | `/records` | Create new domain record | Yes | 30 req / min |
| `GET` | `/records/{id}` | Retrieve record by ID | Yes | 120 req / min |

---

## 3. Standard Error Envelope
All error responses return:
```json
{
  "error": {
    "code": "INVALID_ARGUMENT",
    "message": "Field 'email' must be a valid email format.",
    "timestamp": "2026-11-07T05:00:00Z",
    "trace_id": "req-7a8f902b"
  }
}
```
