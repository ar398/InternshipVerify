
# InternshipVerify

### AICTE Internship Fraud Detection Platform

InternshipVerify helps students identify, verify, and report potentially fraudulent internship opportunities.

## Features

- Student registration and login
- Organization verification
- Internship fraud reporting
- Complaint tracking using Case ID
- Student dashboard
- Admin dashboard
- Risk assessment indicators
- Organization management

## Technology Stack

- **Frontend:** Next.js, JavaScript, CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT and bcryptjs
- **Tools:** Git, GitHub, VS Code

## Project Structure

- `app/` – Application pages and API routes
- `components/` – Reusable UI components
- `lib/` – Authentication and database utilities
- `prisma/` – Database schema and migrations
- `public/` – Static assets

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ar398/InternshipVerify.git
cd InternshipVerify
```

Install dependencies:

```bash
npm install
```

Configure your environment variables in `.env`.

Generate Prisma Client:

```bash
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Project Purpose

To help students identify suspicious internship opportunities and report potential internship fraud.

## Developer

**Arvind Kumar**

GitHub: https://github.com/ar398

## License

No license has been specified yet.
