from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PatientCreate(BaseModel):

    name: str
    email: Optional[str] = None
    age: int
    gender: str
    address: str
    contact: str


class PatientResponse(BaseModel):
    id: str
    name: str
    age: int
    gender: str
    contact: str
    address: str
    email: Optional[str] = None
    hospitalId: str
    createdAt: datetime

    class Config:
        from_attributes = True


class PatientUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    contact: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
