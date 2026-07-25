# Test plan

## Automated tests included

| Area | Case | Expected result |
|---|---|---|
| Lead validation | Valid values with whitespace and uppercase email | Values are trimmed and email is normalized |
| Lead validation | Malformed email | Rejected before persistence |
| Lead validation | Message under 20 characters | Rejected as insufficient context |
| Query validation | Page and limit passed as strings | Safely coerced to integers |
| Query validation | Limit above 50 | Rejected to protect API/database |
| Login validation | Uppercase email | Normalized before lookup |
| UI | Contacted status | Human-readable label is rendered |

## Manual acceptance test

1. Verify layouts at 360px, 768px, and 1440px.
2. Tab through the public page and admin controls.
3. Submit each invalid field independently.
4. Submit a valid lead and confirm it persists after refresh.
5. Attempt more submissions than the rate-limit threshold in a test environment.
6. Sign in with incorrect and correct credentials.
7. Open `/admin` while signed out.
8. Search by name, email, and words from the message.
9. Filter by each status.
10. Change status and confirm both current state and history.
11. Simulate an API outage during a status update and confirm optimistic rollback.
12. Sign out, refresh, and confirm session removal.
