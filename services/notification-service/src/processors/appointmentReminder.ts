import axios from "axios";
import { sendEmail } from "../channels/email";
import { sendSms } from "../channels/sms";

export const processAppointmentReminder = async (data: {
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

    const subject = `Appointment Reminder — HealthOps`;
    const message = `Hi ${patient.name}, this is a reminder that your appointment with Dr. ${doctor.name} is tomorrow. Reference ID: ${appointmentId}. Please arrive 10 minutes early.`;

    await Promise.all([
      sendEmail({ to: patient.email, subject, message }),
      sendSms({ to: patient.phone, message }),
    ]);
  } catch (err) {
    console.error("Failed to process APPOINTMENT_REMINDER job:", err);
    throw err;
  }
};
