from datetime import datetime
from uuid import uuid4
from enum import Enum

from sqlalchemy import String, Integer, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from app.config.database import Base


class AvailabilityStatus(Enum):
    ON_DUTY = "ON_DUTY"
    OFF_DUTY = "OFF_DUTY"
    ON_LEAVE = "ON_LEAVE"


class Doctor(Base):
    __tablename__ = "doctors"
    __table_args__ = {"schema": "doctor"}

    id: Mapped[str] = mapped_column(
        String, primary_key=True, default=lambda: str(uuid4))
    name: Mapped[str] = mapped_column(String, nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    specialization: Mapped[str] = mapped_column(String, nullable=False)
    licensenumber: Mapped[str] = mapped_column(
        String, nullable=False, unique=True)
    availabilityStatus: Mapped[AvailabilityStatus] = mapped_column(
        String, default=AvailabilityStatus.OFF_DUTY)
    hospitalId: Mapped[str] = mapped_column(
        String, ForeignKey("hosptial.id", ondelete="CASCADE"))
    createdAt: Mapped[datetime] = mapped_column(
        server_default=func.now())
