from fastapi import APIRouter

from controllers import rewards as rewards_controller

router = APIRouter()


@router.get("/rewards")
async def get_rewards():
    return await rewards_controller.list_rewards()
