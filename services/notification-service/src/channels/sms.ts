import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSms = async (data: { to: string; message: string }) => {
  try {
    const msg = await client.messages.create({
      body: data.message,
      from: process.env.TWILIO_PHONE_NUMBER || "",
      to: data.to,
    });
    console.log(`SMS sent! SID: ${msg.sid}`);
  } catch (error: any) {
    console.error(`Failed to send SMS: ${error.message}`);
    throw error;
  }
};
