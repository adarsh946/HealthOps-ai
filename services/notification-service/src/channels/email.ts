import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (data: {
  to: string;
  subject: string;
  message: string;
}) => {
  const msg = {
    to: data.to,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@healthops.com",
    subject: data.subject,
    text: data.message,
    html: `<p>${data.message}</p>`,
  };
  await sgMail.send(msg);
};
