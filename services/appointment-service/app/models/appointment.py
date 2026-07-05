from datetime import datetime
from uuid import uuid4

from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.config.database import Base


class Appointment(Base):
    __tablename__ = "appointments"
    __table_args__ = {"schema": "appointment"}

    id: Mapped[str] = mapped_column(
        String, primary_key=True, default=lambda: str(uuid4())
    )
    patientId: Mapped[str] = mapped_column(String, nullable=False)
    doctorId: Mapped[str] = mapped_column(String, nullable=False)
    hospitalId: Mapped[str] = mapped_column(String, nullable=False)
    reason: Mapped[str] = mapped_column(String, nullable=False)
    urgency: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(
        String,
        nullable=False
    )
    scheduledAt: Mapped[datetime] = mapped_column(
        DateTime, nullable=False
    )
    createdAt: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )
    updatedAt: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )
