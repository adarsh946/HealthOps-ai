from langchain_core.tools import tool
import httpx
import os
from datetime import datetime

APPOINTMENT_URL = os.getenv("APPOINTMENT_SERVICE_URL")


@tool
def get_waiting_patients(hospital_id: str) -> list:
    """
    Fetch all appointments with status 'checked_in' for the given hospital.
    Use this tool to get the current waiting queue before optimizing order.
    Returns a list of appointments with patientId, urgency, scheduledAt, and status.
    """
    with httpx.Client() as client:
        response = client.get(
            f"{APPOINTMENT_URL}/appointments",
            params={"status": "checked_in"},
            headers={"X-Hospital-Id": hospital_id}
        )
        return response.json()


@tool
def get_current_time() -> str:
    """
    Returns the current time in ISO format.
    Use this tool to calculate how long each patient has been waiting
    by comparing their scheduledAt time against the current time.
    """
    return datetime.now().isoformat()
