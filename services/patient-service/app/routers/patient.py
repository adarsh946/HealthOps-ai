from fastapi import APIRouter, Depends
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.patient import PatientCreate, PatientResponse, PatientUpdate
from app.models.patient import Patient
from app.config.database import get_db
from sqlalchemy import select

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


@router.get("/", response_model=list[PatientResponse])
async def get_all_patients(db: AsyncSession = Depends(get_db)):
    hospital_id = "temp-hospital-id-for-testing"

    result = await db.execute(select(Patient).where(
        Patient.hospitalId == hospital_id))
    patients = result.scalars().all()

    return patients


@router.get("/{patient_id}", response_model=PatientResponse)
async def get_patient(patient_id: str, db: AsyncSession = Depends(get_db)):

    hospital_id = "temp-hospital-id-for-testing"

    result = await db.execute(select(Patient).where(Patient.id == patient_id, Patient.hospitalId == hospital_id))
    patient = result.scalar_one_or_none()

    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")

    return patient


@router.put("/{patient_id}", response_model=PatientResponse)
async def get_patient(patient_id: str, patient_update: PatientUpdate, db: AsyncSession = Depends(get_db)):
    hospital_id = "temp-hospital-id-for-testing"

    result = await db.execute(
        select(Patient).where(
            Patient.id == patient_id,
            Patient.hospitalId == hospital_id
        )
    )
    patient = result.scalar_one_or_none()

    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")

    patient_data = patient_update.model_dump(exclude_unset=True)
    for key, value in patient_data.items():
        setattr(patient, key, value)

    return {"message", "patient updated successfully"}
