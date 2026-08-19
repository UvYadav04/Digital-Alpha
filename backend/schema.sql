CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    merchant TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    date DATE NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL,
    description TEXT
);

CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions (category);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions (date);
CREATE INDEX IF NOT EXISTS idx_transactions_amount ON transactions (amount);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions (status);
CREATE INDEX IF NOT EXISTS idx_transactions_merchant ON transactions (merchant);

CREATE TABLE IF NOT EXISTS wallet (
    id SERIAL PRIMARY KEY,
    coin_balance INTEGER NOT NULL DEFAULT 0,
    seed_coin_balance INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS rewards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    cost_in_coins INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS redemptions (
    id SERIAL PRIMARY KEY,
    reward_id INTEGER NOT NULL REFERENCES rewards (id),
    coins_spent INTEGER NOT NULL,
    redeemed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
