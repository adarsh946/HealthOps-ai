from fastapi import FastAPI
from app.routers import doctor


app = FastAPI()

app.include_router(doctor.router, prefix="/api/v1/doctors", tags=["doctors"])
