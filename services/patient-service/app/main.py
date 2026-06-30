from fastapi import FastAPI
from app.routers import patient

app = FastAPI(title="Patient Service")

app.include_router(
    patient.router, prefix="/api/v1/patients", tags=["patients"])


@app.get("/health")
def healthCheck():
    return {"status": "ok", "service": "patient service"}
