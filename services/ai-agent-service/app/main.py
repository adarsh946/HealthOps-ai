from fastapi import FastAPI
from app.routers.queue import router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(redirect_slashes=False)

app.include_router(router, prefix="/api")


@app.api_route("/health", methods=["GET", "HEAD"])
async def health():
    return {"status": "ok"}
