# Tablytics

A credit-card transactions and rewards dashboard for analyzing spend across
categories and time, redeeming loyalty coins, and managing rewards.

Users can browse and filter a large transaction history, see spend broken
down by category and by month, and redeem loyalty coins earned from
successful transactions against a small rewards catalogue.

## Stack

**Backend:** FastAPI, `asyncpg`, PostgreSQL (hosted on Neon). Layered as
`routers/` (thin HTTP layer — request/response only) and `controllers/`
(business logic and SQL, no FastAPI imports).

**Frontend:** Next.js (App Router, TypeScript), Tailwind CSS v4, TanStack
React Query for server state, Recharts for charts, `react-day-picker` for the
date-range calendar. The transactions table is hand-built from plain HTML
table elements — no component library — per the assignment's constraint.

## Local setup

Should take under 5 minutes if you already have a Postgres connection string
(a free [Neon](https://neon.tech) project works fine).

### 1. Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r ../requirements.txt
```

Create a `.env` file in the project root (see `.env.example`):

```
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
ALLOWED_ORIGINS=http://localhost:3000
COIN_CAP_PER_TRANSACTION=500
```

Apply the schema and load the seed data (this also computes the starting
wallet balance and inserts the reward catalogue):

```bash
python seed.py
```

Start the API:

```bash
uvicorn main:app --reload
```

The API is now running at `http://localhost:8000`.

### 2. Frontend

```bash
cd client
npm install
```

Create `.env.local` in `client/`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
npm run dev
```

The app is now running at `http://localhost:3000`.

## Live URLs

- App: https://digital-alpha-1.onrender.com

## What's done

- Transactions table (hand-built, no component library): server-side
  pagination, sorting, and combinable filters (search, category, status,
  date range, amount range), all resolved via parameterized SQL.
- Two interactive charts (spend by category, monthly trend) with
  click-to-filter behaviour, built following a documented color/form
  methodology (see the chart components' use of the `dataviz` guidelines).
- Rewards catalogue with a select → confirm → redeem flow, real backend
  validation (insufficient balance, unknown reward), and a "My
  subscriptions" redemption history.
- Wallet / coin balance derived from successful transactions.
- Settings page with a confirm-gated reset of rewards and wallet state.
- Responsive layout down to 360px, including a hamburger nav and a
  dedicated mobile filters modal.

## Known issues / not done

- The hand-built modal (`components/ui/Modal.tsx`) closes on Escape and
  backdrop click but does not implement a focus trap.
- No automated tests yet.
