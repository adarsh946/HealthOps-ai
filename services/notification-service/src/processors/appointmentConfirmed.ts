import axios from "axios";
import { sendEmail } from "../channels/email";
import { sendSms } from "../channels/sms";

export const processAppointmentConfirmed = async (data: {
  patientId: string;
  doctorId: string;
  hospitalId: string;
  appointmentId: string;
}) => {
  const { patientId, doctorId, hospitalId, appointmentId } = data;

  try {
    const [patientResponse, doctorResponse] = await Promise.all([
      axios.get(`${process.env.PATIENT_SERVICE_URL}/patients/${patientId}`, {
        headers: { "X-Hospital-Id": hospitalId },
      }),
      axios.get(`${process.env.DOCTOR_SERVICE_URL}/doctors/${doctorId}`, {
        headers: { "X-Hospital-Id": hospitalId },
      }),
    ]);

    const patient = patientResponse.data;
    const doctor = doctorResponse.data;

    await Promise.all([
      sendEmail({
        to: patient.email,
        patientName: patient.name,
        doctorName: doctor.name,
        appointmentId,
      }),
      sendSms({
        to: patient.phone,
        patientName: patient.name,
        doctorName: doctor.name,
        appointmentId,
      }),
    ]);
  } catch (err) {
    console.error("Failed to process APPOINTMENT_CONFIRMED job:", err);
    throw err;
  }
};
