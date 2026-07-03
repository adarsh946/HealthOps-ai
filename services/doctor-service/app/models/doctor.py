from datetime import datetime
from uuid import uuid4

from sqlalchemy import String, Integer, DateTime, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.config.database import Base


class Doctor(Base):
    __tablename__ = "doctors"
    __table_args__ = {"schema": "doctor"}

    id: Mapped[str] = mapped_column(
        String, primary_key=True, default=lambda: str(uuid4())
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    specialization: Mapped[str] = mapped_column(String, nullable=False)
    licenseNumber: Mapped[str] = mapped_column(
        String, nullable=False, unique=True)
    availabilityStatus: Mapped[str] = mapped_column(
        String,
        default="OFF_DUTY",
        nullable=False
    )
    hospitalId: Mapped[str] = mapped_column(String, nullable=False)
    createdAt: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )
