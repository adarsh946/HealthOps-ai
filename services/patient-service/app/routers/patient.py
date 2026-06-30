from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.patient import PatientCreate, PatientResponse
from app.models.patient import Patient
from app.config.database import get_db

router = APIRouter()


@router.post("/", response_model=PatientResponse)
async def create_patient(patient: PatientCreate, db: AsyncSession = Depends(get_db)):
    # TODO: replace hardcoded hospitalId once API Gateway forwards it
    hospital_id = "temp-hospital-id-for-testing"

    new_patient = Patient(
        **patient.model_dump(),
        hospitalId=hospital_id,
    )

    db.add(new_patient)
    await db.commit()
    await db.refresh(new_patient)

    return new_patient
