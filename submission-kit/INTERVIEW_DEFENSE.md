# Interview defense notes

## Why React + Express instead of one full-stack framework?

The job description explicitly emphasizes React, Node, Express, REST APIs, and database work. Separating the applications makes each layer visible to the reviewer and forces a real deployment boundary, explicit CORS, independent server validation, and a documented API contract.

## Why PostgreSQL?

The data is relational: admins own changes, leads have one current state, and leads have many activity records. PostgreSQL gives transactions, constraints, indexes, and a clean audit relationship without adding complexity for its own sake.

## Why not MongoDB?

MongoDB could store the flow, but the core correctness requirement is the atomic update of a current status and its history entry. A relational transaction expresses that requirement directly.

## Why JWT in a cookie?

A signed token keeps the API stateless for this small task, while the HTTP-only cookie prevents browser JavaScript from reading it. The trade-off is that immediate revocation is harder; a production version could use server-side sessions or a refresh-token table.

## Why SameSite=None in production?

The React client and Express API may be deployed on different sites. Cross-site cookies need `SameSite=None` and `Secure`. Local development stays on `Lax` without HTTPS.

## Why an audit table?

A status toggle without history meets the surface requirement but loses handoff context. The audit table demonstrates database design, transactions, and a practical agency concern: knowing when and by whom a lead moved.

## Why no chart?

With a small lead set, a chart adds visual weight but little decision value. Counts and recent volume answer the immediate operational questions. A conversion trend should be added only when there is enough history and a real review cadence.

## What happens if two admins update the same lead?

The service uses `SELECT ... FOR UPDATE` inside a transaction. PostgreSQL serializes the changes on that row, then records each completed transition. A larger system could also add an optimistic version column and show a conflict message.

## How is SQL injection prevented?

All user values are passed as query parameters. Dynamic SQL is limited to server-controlled condition fragments; user input is never concatenated into a SQL expression.

## What would you test next?

- Integration tests against a disposable PostgreSQL database
- Browser tests for submission, authentication, search, and optimistic rollback
- Cookie behavior on the actual deployment domains
- Accessibility checks with keyboard and automated tooling
- Load behavior for public submissions and indexed search
