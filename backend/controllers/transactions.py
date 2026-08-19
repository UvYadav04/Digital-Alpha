from db import db


def build_where(category, status, date_from, date_to, amount_min, amount_max, search):
    clauses = []
    params = []

    if category:
        params.append(category)
        clauses.append(f"category = ${len(params)}")
    if status:
        params.append(status)
        clauses.append(f"status = ${len(params)}")
    if date_from:
        params.append(date_from)
        clauses.append(f"date >= ${len(params)}")
    if date_to:
        params.append(date_to)
        clauses.append(f"date <= ${len(params)}")
    if amount_min is not None:
        params.append(amount_min)
        clauses.append(f"amount >= ${len(params)}")
    if amount_max is not None:
        params.append(amount_max)
        clauses.append(f"amount <= ${len(params)}")
    if search:
        params.append(f"%{search}%")
        clauses.append(f"merchant ILIKE ${len(params)}")

    where_sql = ("WHERE " + " AND ".join(clauses)) if clauses else ""
    return where_sql, params


async def fetch_transactions(
    category,
    status,
    date_from,
    date_to,
    amount_min,
    amount_max,
    search,
    sort_by,
    sort_dir,
    page,
    limit,
    include_summary,
):
    where_sql, params = build_where(category, status, date_from, date_to, amount_min, amount_max, search)

    total_count = await db.fetchval(f"SELECT COUNT(*) FROM transactions {where_sql}", *params)

    sort_col = "amount" if sort_by == "amount" else "date"
    sort_dir_sql = "ASC" if sort_dir == "asc" else "DESC"
    offset = (page - 1) * limit

    row_params = params + [limit, offset]
    rows = await db.fetch(
        f"SELECT id, merchant, amount, date, category, status, description FROM transactions {where_sql} "
        f"ORDER BY {sort_col} {sort_dir_sql}, id {sort_dir_sql} LIMIT ${len(params) + 1} OFFSET ${len(params) + 2}",
        *row_params,
    )

    summary = None
    if include_summary:
        by_category = await db.fetch(
            f"SELECT category, SUM(amount) AS total, COUNT(*) AS count FROM transactions {where_sql} "
            f"GROUP BY category ORDER BY total DESC",
            *params,
        )
        by_month = await db.fetch(
            f"SELECT to_char(date, 'YYYY-MM') AS month, SUM(amount) AS total FROM transactions {where_sql} "
            f"GROUP BY month ORDER BY month",
            *params,
        )
        summary = {
            "by_category": [dict(r) for r in by_category],
            "by_month": [dict(r) for r in by_month],
        }

    transactions_payload = {
        "rows": [dict(r) for r in rows],
        "page": page,
        "limit": limit,
        "total_count": total_count,
    }

    return transactions_payload, summary
