import { Worker, Job } from "bullmq";
import { redisConnection } from "./config/redis";

const worker = new Worker(
  "notifications",
  async (job: Job) => {
    switch (job.data.type) {
      case "APPOINTMENT_CONFIRMED":
        await processAppointmentConfirmed(job.data);
        break;
      default:
        console.warn(`Unknown job type: ${job.data.type}`);
    }
  },
  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});
