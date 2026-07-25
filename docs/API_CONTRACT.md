# API contract examples

## Create lead

`POST /api/leads`

```json
{
  "name": "Maya Chen",
  "email": "maya@example.com",
  "budgetRange": "5000-10000",
  "message": "We need a responsive customer portal before our September campaign."
}
```

Response: `201 Created`

```json
{
  "message": "Thanks — your project brief is in our queue.",
  "lead": {
    "id": "uuid",
    "status": "new",
    "createdAt": "2026-07-25T10:00:00.000Z"
  }
}
```

## List leads

`GET /api/admin/leads?search=maya&status=new&page=1&limit=10`

Response:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 1
  }
}
```

## Update status

`PATCH /api/admin/leads/:id/status`

```json
{
  "status": "contacted"
}
```

The update and audit-log insert occur in one transaction. A missing lead returns `404 LEAD_NOT_FOUND`; an unsupported status returns `400 VALIDATION_ERROR`.
