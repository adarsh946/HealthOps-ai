from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class AppointmentStatus(str, Enum):
    SCHEDULED = "scheduled"
    CHECKED_IN = "checked_in"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    NO_SHOW = "no_show"
    CANCELLED = "cancelled"


class AppointmentCreate(BaseModel):
    patientId: str
    doctorId: str
    reason: str
    urgency: int
    scheduled_at: datetime


class AppointmentUpdate(BaseModel):
    status: Optional[AppointmentStatus] = None
    scheduled_at: Optional[datetime] = None
    urgency: Optional[int] = None


class AppointmentResponse(BaseModel):
    id: str
    hospitalId: str
    patientId: str
    doctorId: str
    reason: str
    urgency: int
    status: AppointmentStatus
    scheduled_at: datetime
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
