from fastapi import APIRouter, Depends, HTTPException
import httpx
import asyncio
from app.schemas.appointment import AppointmentCreate, AppointmentResponse, AppointmentUpdate, AppointmentStatus
from app.config.database import get_db
from app.models.appointment import Appointment
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from bullmq import Queue

notification_queue = Queue(
    "notifications",
    {"connection": {"host": "localhost", "port": 6379}}
)

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

    await notification_queue.add(
        "APPOINTMENT_CONFIRMED",
        {
            "appointmentId": new_appointment.id,
            "patientId": new_appointment.patientId,
            "doctorId": new_appointment.doctorId,
            "hospitalId": new_appointment.hospitalId,
            "type": "APPOINTMENT_CONFIRMED"
        }
    )

    return new_appointment


@router.get("/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(
    appointment_id: str,
    db: AsyncSession = Depends(get_db),
    hospitalId: str = Depends(get_hospital_id)
):
    result = await db.execute(
        select(Appointment).where(
            Appointment.id == appointment_id,
            Appointment.hospitalId == hospitalId
        )
    )
    appointment = result.scalar_one_or_none()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment


@router.get("/", response_model=list[AppointmentResponse])
async def get_all_appointments(
    db: AsyncSession = Depends(get_db),
    hospitalId: str = Depends(get_hospital_id)
):
    result = await db.execute(
        select(Appointment).where(Appointment.hospitalId == hospitalId)
    )
    return result.scalars().all()


@router.put("/{appointment_id}", response_model=AppointmentResponse)
async def update_appointment(appointment_id: str,
                             appointment_update: AppointmentUpdate,
                             db: AsyncSession = Depends(get_db),
                             hospitalId: str = Depends(get_hospital_id)):

    result = await db.execute(select(Appointment).where(Appointment.id == appointment_id, Appointment.hospitalId == hospitalId))
    appointment = result.scalar_one_or_none()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_data = appointment_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(appointment, key, value)

    await db.commit()
    await db.refresh(appointment)
    return appointment
