import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (data: {
  to: string;
  patientName: string;
  doctorName: string;
  appointmentId: string;
}) => {
  const msg = {
    to: data.to,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@healthops.com",
    subject: `Appointment Confirmed — HealthOps`,
    text: `Hi ${data.patientName}, your appointment with Dr. ${data.doctorName} has been confirmed. Reference ID: ${data.appointmentId}`,
    html: `
            <h2>Appointment Confirmed</h2>
            <p>Hi <strong>${data.patientName}</strong>,</p>
            <p>Your appointment with <strong>Dr. ${data.doctorName}</strong> has been confirmed.</p>
            <p>Reference ID: <code>${data.appointmentId}</code></p>
            <p>Please arrive 10 minutes early.</p>
        `,
  };

  await sgMail.send(msg);
};
