from fastapi import APIRouter, Depends
from fastapi import HTTPException
from app.schemas.doctor import DoctorCreate, DoctorResponse, DoctorUpdate
from app.config.database import get_db
from app.models.doctor import Doctor
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


router = APIRouter()


@router.post("/", response_model=DoctorResponse)
async def create_doctor(doctor: DoctorCreate, db: AsyncSession = Depends(get_db)):
    # TODO: replace hardcoded hospitalId once API Gateway forwards it
    hospital_id = "temp-hospital-id-for-testing"

    new_doctor = Doctor(
        **doctor.model_dump(),
        hospitalId=hospital_id
    )

    db.add(new_doctor)
    await db.commit()
    await db.refresh(new_doctor)

    return new_doctor


@router.get("/", response_model=list[DoctorResponse])
async def get_all_doctor(db: AsyncSession = Depends(get_db)):
    hospital_id = "temp-hospital-id-for-testing"

    result = await db.execute(select(Doctor).where(
        Doctor.hospitalId == hospital_id))
    doctors = result.scalars().all()

    return doctors


@router.get("/{doctor_id}", response_model=DoctorResponse)
async def get_doctor(doctor_id: str, db: AsyncSession = Depends(get_db)):
    hospital_id = "temp-hospital-id-for-testing"

    result = await db.execute(select(Doctor).where(Doctor.id == doctor_id, Doctor.hospitalId == hospital_id))
    doctor = result.scalar_one_or_none()

    if doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return doctor


@router.put("/{doctor_id}", response_model=DoctorResponse)
async def update_doctor(doctor_id: str, update_doctor: DoctorUpdate, db: AsyncSession = Depends(get_db)):
    hospital_id = "temp-hospital-id-for-testing"

    result = await db.execute(select(Doctor).where(Doctor.id == doctor_id, Doctor.hospitalId == hospital_id))
    doctor = result.scalar_one_or_none()

    if doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")

    doctor_data = update_doctor.model_dump(exclude_unset=True)
    for key, value in doctor_data.items():
        setattr(doctor, key, value)

    await db.commit()
    await db.refresh(doctor)

    return doctor
