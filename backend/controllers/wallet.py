from db import db


class RewardNotFound(Exception):
    pass


class InsufficientBalance(Exception):
    pass


async def get_balance():
    row = await db.fetchrow("SELECT id, coin_balance FROM wallet LIMIT 1")
    return dict(row)


async def list_redemptions():
    rows = await db.fetch(
        "SELECT r.id, r.reward_id, rw.name, r.coins_spent, r.redeemed_at "
        "FROM redemptions r JOIN rewards rw ON rw.id = r.reward_id "
        "ORDER BY r.redeemed_at DESC"
    )
    return [dict(r) for r in rows]


async def redeem(reward_id):
    async with db.pool.acquire() as conn:
        async with conn.transaction():
            reward = await conn.fetchrow(
                "SELECT id, cost_in_coins FROM rewards WHERE id = $1", reward_id
            )
            if reward is None:
                raise RewardNotFound()

            wallet_row = await conn.fetchrow(
                "SELECT id, coin_balance FROM wallet LIMIT 1 FOR UPDATE"
            )
            if wallet_row["coin_balance"] < reward["cost_in_coins"]:
                raise InsufficientBalance()

            new_balance = wallet_row["coin_balance"] - reward["cost_in_coins"]
            await conn.execute(
                "UPDATE wallet SET coin_balance = $1 WHERE id = $2",
                new_balance,
                wallet_row["id"],
            )

            redemption = await conn.fetchrow(
                "INSERT INTO redemptions (reward_id, coins_spent) VALUES ($1, $2) "
                "RETURNING id, reward_id, coins_spent, redeemed_at",
                reward_id,
                reward["cost_in_coins"],
            )

    return dict(redemption), new_balance


async def reset():
    async with db.pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute("DELETE FROM redemptions")
            await conn.execute("UPDATE wallet SET coin_balance = seed_coin_balance")
