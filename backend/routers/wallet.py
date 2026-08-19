from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from controllers import wallet as wallet_controller

router = APIRouter()


class RedeemRequest(BaseModel):
    reward_id: int


@router.get("/coins/balance")
async def coins_balance():
    return await wallet_controller.get_balance()


@router.get("/redemptions")
async def get_redemptions():
    return await wallet_controller.list_redemptions()


@router.post("/redeem")
async def redeem(payload: RedeemRequest):
    try:
        redemption, new_balance = await wallet_controller.redeem(payload.reward_id)
    except wallet_controller.RewardNotFound:
        raise HTTPException(status_code=404, detail="reward not found")
    except wallet_controller.InsufficientBalance:
        raise HTTPException(status_code=400, detail="insufficient coin balance")
    return {"redemption": redemption, "coin_balance": new_balance}


@router.post("/admin/reset")
async def admin_reset():
    await wallet_controller.reset()
    return {"status": "reset"}
