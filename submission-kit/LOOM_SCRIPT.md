# Three-minute Loom walkthrough

Use this as a structure, not a speech to read mechanically. Show the product while speaking and keep the cursor moving with your explanation.

## 0:00–0:20 — Open with the product judgment

“Hi, I’m Shreya. This is LeadDesk Mini, my submission for the Full Stack Development task. My core decision was not to build a miniature enterprise CRM. I built a focused loop—capture a useful brief, make ownership visible, and preserve the handoff. The design principle is ‘signal, not CRM clutter.’”

## 0:20–0:55 — Public form and validation

Show the landing page at desktop width, then briefly resize it.

“The public page keeps the required form close to the main value proposition. I stayed with the four requested fields instead of collecting unnecessary information. Validation runs in the React client for immediate feedback and again in Express before anything reaches PostgreSQL. I also built loading, success, malformed-input, rate-limit, and network-failure states. The footer contains the required Digital Heroes credit.”

Trigger one validation error, then submit a valid lead.

## 0:55–1:30 — Real authentication

Open an incognito window or sign out first, then try `/admin`.

“The admin route is actually protected, not hidden. Passwords are bcrypt-hashed in PostgreSQL. On login, the server creates a signed eight-hour session token in an HTTP-only cookie, so JavaScript cannot read it. Every admin endpoint verifies the token before returning lead data.”

Sign in using the demo account.

## 1:30–2:15 — Admin workflow

“The dashboard starts with operational counts rather than decorative charts. Search covers name, email, and project language. The same information becomes mobile cards on small screens. Status can be changed in place, and the UI updates optimistically so it feels immediate.”

Change a lead from New to Contacted. Open the lead drawer.

“The important backend decision is here: the current status and the activity history are separate. The API locks the lead row, updates it, and writes this audit entry in the same PostgreSQL transaction. That makes team handoffs defensible and prevents a partial update.”

## 2:15–2:40 — Code and reliability

Show `server/src/services/lead.service.ts`, then the tests.

“I used parameterized SQL, Zod schemas, request IDs, security headers, explicit CORS, payload limits, and rate limiting. The repository includes validation tests, UI tests, migration and seed scripts, Docker Compose, an API contract, and deployment instructions.”

## 2:40–3:00 — Honest self-critique

“With another day, I would add Playwright coverage for the full public-to-admin flow and a revocable server-side session store. I deliberately did not add charts, export, or scoring until there is evidence the team needs them. The current version completes the required flow and leaves a clear scaling path. Thank you.”
