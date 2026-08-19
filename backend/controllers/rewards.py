from db import db


async def list_rewards():
    rows = await db.fetch("SELECT id, name, description, cost_in_coins FROM rewards ORDER BY cost_in_coins")
    return [dict(r) for r in rows]
