import asyncio
import json
import os
import pathlib
from datetime import datetime, timezone

import asyncpg
from dotenv import load_dotenv

load_dotenv()

DATA_PATH = pathlib.Path(__file__).resolve().parent.parent / "data" / "transactions.json"
SCHEMA_PATH = pathlib.Path(__file__).resolve().parent / "schema.sql"
COIN_CAP = int(os.environ.get("COIN_CAP_PER_TRANSACTION", 500))

REWARDS = [
    ("₹100 Amazon Voucher", "Redeem for a ₹100 Amazon gift voucher", 1000),
    ("₹250 Amazon Voucher", "Redeem for a ₹250 Amazon gift voucher", 2400),
    ("5% Cashback", "5% cashback credited to your next statement", 800),
    ("1 Month Netflix", "One month Netflix subscription", 1500),
    ("1 Month Spotify Premium", "One month Spotify Premium subscription", 900),
    ("₹500 Flipkart Voucher", "Redeem for a ₹500 Flipkart gift voucher", 4800),
]


def normalize(row):
    merchant = row.get("merchant") or row.get("merchant_name") or row.get("name")
    amount = row.get("amount") or row.get("value")
    date = row.get("date") or row.get("transaction_date") or row.get("timestamp")
    category = row.get("category") or row.get("type")
    status = row.get("status") or "success"
    description = row.get("description") or row.get("note")
    return merchant, amount, date, category, status, description


def parse_date(value):
    if isinstance(value, (int, float)):
        if value > 1e11:
            value = value / 1000
        return datetime.fromtimestamp(value, tz=timezone.utc).date()
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%SZ", "%d-%m-%Y", "%d/%m/%Y"):
        try:
            return datetime.strptime(value, fmt).date()
        except ValueError:
            continue
    return datetime.fromisoformat(value).date()


async def main():
    if not DATA_PATH.exists():
        raise SystemExit(f"missing {DATA_PATH}, place transactions.json in data/")

    raw = json.loads(DATA_PATH.read_text())
    if isinstance(raw, dict):
        raw = raw.get("transactions", raw.get("data", []))

    conn = await asyncpg.connect(dsn=os.environ["DATABASE_URL"])
    await conn.execute(SCHEMA_PATH.read_text())
    await conn.execute("TRUNCATE redemptions, wallet, rewards, transactions RESTART IDENTITY")

    rows = []
    for r in raw:
        merchant, amount, date, category, status, description = normalize(r)
        if merchant is None or amount is None or date is None:
            raise SystemExit(f"unrecognized transaction shape, keys={list(r.keys())}")
        rows.append((merchant, float(amount), parse_date(date), category or "uncategorized", status, description))

    await conn.executemany(
        "INSERT INTO transactions (merchant, amount, date, category, status, description) VALUES ($1,$2,$3,$4,$5,$6)",
        rows,
    )

    coin_balance = 0
    for _, amount, _, _, status, _ in rows:
        if str(status).lower() != "success":
            continue
        coin_balance += min(int(amount // 100), COIN_CAP)

    await conn.execute(
        "INSERT INTO wallet (coin_balance, seed_coin_balance) VALUES ($1, $1)",
        coin_balance,
    )

    await conn.executemany(
        "INSERT INTO rewards (name, description, cost_in_coins) VALUES ($1,$2,$3)",
        REWARDS,
    )

    await conn.close()
    print(f"seeded {len(rows)} transactions, wallet.coin_balance={coin_balance}")


if __name__ == "__main__":
    asyncio.run(main())
