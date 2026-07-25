# Architecture notes

## Request flow: public submission

1. React Hook Form validates the visible fields.
2. The client sends JSON to `POST /api/leads`.
3. The API rate limiter checks the source network.
4. Zod independently validates and normalizes the body.
5. The service inserts a parameterized row into PostgreSQL.
6. The API returns only the new ID, initial status, and timestamp—not the submitted PII.
7. The UI replaces the form with a clear success state.

## Request flow: admin status update

1. React applies an optimistic status update.
2. The browser sends the secure session cookie automatically.
3. The auth middleware verifies the signed token.
4. The service locks the lead row inside a transaction.
5. It updates the current status and appends an activity row.
6. On success, the client refreshes leads, stats, and details.
7. On failure, React Query restores its snapshots and shows a toast.

## Scaling path

The current design is intentionally small but has a clean path forward:

- Add a background job for email acknowledgements instead of sending inside the request.
- Move rate-limit state to Redis if the API runs on multiple instances.
- Add organization IDs before supporting multiple clients.
- Add cursor pagination when lead volume makes offset pagination expensive.
- Place the API behind a managed gateway and add structured trace propagation.
