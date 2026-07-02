from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class AvailabilityStatus(str, Enum):
    ON_DUTY = "ON_DUTY"
    OFF_DUTY = "OFF_DUTY"
    ON_LEAVE = "ON_LEAVE"


class DoctorCreate(BaseModel):

    name: str
    age: int
    gender: str
    email: str
    specialization: str
    licensenumber: str
    availabilityStatus: AvailabilityStatus


class DoctorResponse(BaseModel):

    id: str
    name: str
    age: int
    gender: str
    email: str
    specialization: str
    licensenumber: str
    availabilityStatus: AvailabilityStatus
    hospitalId: str
    createdAt: datetime


class DoctorUpdate(BaseModel):

    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    email: Optional[str] = None
    specialization: Optional[str] = None
    licensenumber: Optional[str] = None
    availabilityStatus: Optional[AvailabilityStatus] = None
