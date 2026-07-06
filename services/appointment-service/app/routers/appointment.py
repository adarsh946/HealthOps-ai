from fastapi import APIRouter, Depends, HTTPException
import httpx
import asyncio
from app.schemas.appointment import AppointmentCreate, AppointmentResponse, AppointmentUpdate, AppointmentStatus
from app.config.database import get_db
from app.models.appointment import Appointment
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


router = APIRouter()


PATIENT_SERVICE_URL = "http://localhost:8001"
DOCTOR_SERVICE_URL = "http://localhost:8002"


def get_hospital_id() -> str:
    return "temp-hospital-id-for-testing"


async def validate_patient(patient_id: str, hospital_id: str):
    async with httpx.AsyncClient(timeout=3.0) as client:
        try:
            response = await client.get(
                f"{PATIENT_SERVICE_URL}/patients/{patient_id}", headers={"X-Hospital-Id": hospital_id})
            return response.status_code == 200
        except httpx.RequestError:
            return False


async def validate_doctor(doctor_id: str, hospital_id: str):
    async with httpx.AsyncClient(timeout=3.0) as client:
        try:
            response = await client.get(f"{DOCTOR_SERVICE_URL}/doctors/{doctor_id}", headers={"X-Hospital-Id": hospital_id})
            return response.status_code == 200
        except httpx.RequestError:
            return False


@router.post("/", response_model=AppointmentResponse, status_code=201)
async def create_appointment(appointment: AppointmentCreate, db: AsyncSession = Depends(get_db), hospital_id: str = Depends(get_hospital_id)):
    patient_valid, doctor_valid = await asyncio.gather(
        validate_patient(appointment.patientId, hospital_id),
        validate_doctor(appointment.doctorId, hospital_id)
    )

    if not patient_valid:
        raise HTTPException(status_code=422, detail="Invalid patientId")
    if not doctor_valid:
        raise HTTPException(status_code=422, detail="Invalid doctorId")

    new_appointment = Appointment(
        **appointment.model_dump(), hospitalId=hospital_id, status=AppointmentStatus.SCHEDULED.value)

    db.add(new_appointment)
    await db.commit()
    await db.refresh(new_appointment)

    return new_appointment
