from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

from db import db
from routers import rewards, transactions, wallet


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()


app = FastAPI(lifespan=lifespan)


@app.get("/health")
async def health():
    result = await db.fetchval("SELECT 1")
    return {"status": "ok", "db": result == 1}


app.include_router(transactions.router)
app.include_router(wallet.router)
app.include_router(rewards.router)
