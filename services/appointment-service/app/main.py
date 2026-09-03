from fastapi import FastAPI
from app.routers import appointment


app = FastAPI()

app.include_router(
    appointment.router, prefix="/api/v1/appointments", tags=["appointments"])


@app.get("/health")
async def health():
    return {"status": "ok", "service": "patient-service"}
