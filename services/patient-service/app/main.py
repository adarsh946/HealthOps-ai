from fastapi import FastAPI
from app.routers import patient

app = FastAPI(title="Patient Service")

app.include_router(
    patient.router, prefix="/api/v1/patients", tags=["patients"])


@app.api_route("/health", methods=["GET", "HEAD"])
async def health():
    return {"status": "ok"}
