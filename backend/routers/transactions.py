from datetime import date as date_type

from fastapi import APIRouter

from controllers import transactions as transactions_controller

router = APIRouter()


@router.get("/transactions")
async def get_transactions(
    category: str | None = None,
    status: str | None = None,
    date_from: date_type | None = None,
    date_to: date_type | None = None,
    amount_min: float | None = None,
    amount_max: float | None = None,
    search: str | None = None,
    sort_by: str = "date",
    sort_dir: str = "desc",
    page: int = 1,
    limit: int = 50,
    include_summary: bool = False,
):
    rows_payload, summary = await transactions_controller.fetch_transactions(
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
    )
    return {"transactions": rows_payload, "summary": summary}
