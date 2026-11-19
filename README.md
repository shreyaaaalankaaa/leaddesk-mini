# LeadDesk Mini

A production-style full-stack lead management application built with **React**, **Express**, **TypeScript**, and **PostgreSQL**. The application enables potential clients to submit project inquiries through a modern landing page while providing administrators with a secure dashboard to manage, search, and track leads efficiently.

> Built as a full-stack engineering assignment with a focus on clean architecture, responsive UI, security, and production-ready engineering practices.

---

# Live Demo

### Frontend
https://leaddesk-mini-client-amber.vercel.app

### Admin Dashboard
https://leaddesk-mini-client-amber.vercel.app/admin

### Backend API
https://leaddesk-mini-pcu8.onrender.com

### API Health Check
https://leaddesk-mini-pcu8.onrender.com/api/health

### GitHub Repository
https://github.com/shreyaaaalankaaa/leaddesk-mini

---

# Demo Credentials

**Email**

```
admin@leaddesk.dev
```

**Password**

```
(Shared privately in submission)
```

---

# Features

## Public Website

- Responsive landing page (Desktop, Tablet & Mobile)
- Lead submission form
- Budget selection
- Project requirement description
- Client-side validation using React Hook Form + Zod
- Server-side validation using Zod
- Success & error handling
- Rate limiting support
- Accessible UI
- Responsive design using Tailwind CSS

---

## Admin Dashboard

- Secure authentication
- JWT-based session management
- HTTP-only cookie authentication
- Protected routes
- Lead analytics dashboard
- Search leads by name, email, or message
- Status filtering
- Pagination
- Lead detail drawer
- Status history tracking
- Optimistic UI updates
- Fully responsive admin interface

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Hook Form
- Zod

## Backend

- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt
- Helmet
- CORS
- Rate Limiting
- Zod

---

# Architecture

```
React Client
        │
        ▼
REST API (Express)
        │
        ▼
PostgreSQL Database
```

The frontend and backend are deployed independently, following a production-style architecture commonly used in modern web applications.

---

# Project Structure

```
.
├── client/
│   ├── src/
│   ├── public/
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   ├── tests/
│   └── package.json
│
├── docs/
├── docker-compose.yml
├── render.yaml
└── README.md
```

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/shreyaaaalankaaa/leaddesk-mini.git

cd leaddesk-mini
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Generate local environment files:

```bash
npm run setup
```

---

## Start PostgreSQL

```bash
docker compose up -d postgres
```

---

## Run Database Migrations

```bash
npm run db:migrate --workspace server
```

---

## Seed Demo Data

```bash
npm run db:seed --workspace server

npm run db:seed-demo --workspace server
```

---

## Run Development Server

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:4000
```

Admin

```
http://localhost:5173/admin
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/health` | Health Check |
| POST | `/api/leads` | Submit Lead |
| POST | `/api/auth/login` | Admin Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current User |
| GET | `/api/admin/stats` | Dashboard Statistics |
| GET | `/api/admin/leads` | List Leads |
| GET | `/api/admin/leads/:id` | Lead Details |
| PATCH | `/api/admin/leads/:id/status` | Update Lead Status |

---

# Security Features

- HTTP-only cookies
- JWT Authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS protection
- Rate limiting
- Request IDs
- Parameterized SQL queries
- Input validation using Zod

---

# Testing

Run unit tests

```bash
npm run test
```

Run type checking

```bash
npm run typecheck
```

Build project

```bash
npm run build
```

---

# Documentation

Additional project documentation is available inside the **docs/** directory.

- Architecture
- API Contract
- Design Decisions
- Testing Strategy

---

# Future Enhancements

- Refresh token rotation
- End-to-end testing with Playwright
- CSV export
- SLA tracking
- Email notifications
- Audit dashboards

---

# AI Assistance

AI-assisted tooling was used to accelerate implementation, documentation, and code refinement. All generated code was manually reviewed, modified, debugged, tested, and integrated before deployment.

---

# Author

**Shreya Lanka**

GitHub

https://github.com/shreyaaaalankaaa

---

## License

This project was created for educational and assessment purposes.
