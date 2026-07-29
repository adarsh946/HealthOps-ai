export type Patient = {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  contact: string;
  address: string;
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  license: string;
  status: "available" | "busy" | "off_duty";
};

export type AppointmentStatus =
  | "scheduled"
  | "checked_in"
  | "in_progress"
  | "completed"
  | "no_show"
  | "cancelled";

export type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  scheduledAt: string;
  urgency: 1 | 2 | 3 | 4 | 5;
  status: AppointmentStatus;
  reason: string;
};

export type QueueItem = {
  id: string;
  position: number;
  patient: string;
  urgency: 1 | 2 | 3 | 4 | 5;
  waitMinutes: number;
  status: "waiting" | "in_progress";
};

export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Amara Okafor",
    email: "amara@example.com",
    age: 34,
    gender: "Female",
    contact: "+1 415 555 0132",
    address: "221 Oak St, San Francisco, CA",
  },
  {
    id: "p2",
    name: "Liam Chen",
    email: "liam@example.com",
    age: 52,
    gender: "Male",
    contact: "+1 415 555 0187",
    address: "88 Pine Ave, Oakland, CA",
  },
  {
    id: "p3",
    name: "Sofia Alvarez",
    email: "sofia@example.com",
    age: 27,
    gender: "Female",
    contact: "+1 510 555 0144",
    address: "17 Maple Rd, Berkeley, CA",
  },
  {
    id: "p4",
    name: "Noah Williams",
    email: "noah@example.com",
    age: 41,
    gender: "Male",
    contact: "+1 650 555 0111",
    address: "402 Elm Dr, Palo Alto, CA",
  },
  {
    id: "p5",
    name: "Priya Patel",
    email: "priya@example.com",
    age: 63,
    gender: "Female",
    contact: "+1 408 555 0173",
    address: "9 Cedar Ln, San Jose, CA",
  },
  {
    id: "p6",
    name: "Ethan Kim",
    email: "ethan@example.com",
    age: 19,
    gender: "Male",
    contact: "+1 415 555 0198",
    address: "55 Birch Ct, Daly City, CA",
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Elena Rossi",
    email: "elena@healthops.ai",
    specialization: "Cardiology",
    license: "MD-48291",
    status: "available",
  },
  {
    id: "d2",
    name: "Dr. Marcus Johnson",
    email: "marcus@healthops.ai",
    specialization: "Emergency Medicine",
    license: "MD-52104",
    status: "busy",
  },
  {
    id: "d3",
    name: "Dr. Aisha Rahman",
    email: "aisha@healthops.ai",
    specialization: "Pediatrics",
    license: "MD-39876",
    status: "available",
  },
  {
    id: "d4",
    name: "Dr. Samuel Park",
    email: "samuel@healthops.ai",
    specialization: "Orthopedics",
    license: "MD-61453",
    status: "off_duty",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patient: "Amara Okafor",
    doctor: "Dr. Elena Rossi",
    scheduledAt: "2026-07-18T09:30",
    urgency: 3,
    status: "scheduled",
    reason: "Chest pain follow-up",
  },
  {
    id: "a2",
    patient: "Liam Chen",
    doctor: "Dr. Marcus Johnson",
    scheduledAt: "2026-07-18T10:00",
    urgency: 5,
    status: "in_progress",
    reason: "Severe abdominal pain",
  },
  {
    id: "a3",
    patient: "Sofia Alvarez",
    doctor: "Dr. Aisha Rahman",
    scheduledAt: "2026-07-18T10:45",
    urgency: 2,
    status: "checked_in",
    reason: "Annual physical",
  },
  {
    id: "a4",
    patient: "Noah Williams",
    doctor: "Dr. Elena Rossi",
    scheduledAt: "2026-07-18T11:15",
    urgency: 4,
    status: "scheduled",
    reason: "Post-op cardiac review",
  },
  {
    id: "a5",
    patient: "Priya Patel",
    doctor: "Dr. Samuel Park",
    scheduledAt: "2026-07-17T14:00",
    urgency: 1,
    status: "completed",
    reason: "Knee consultation",
  },
  {
    id: "a6",
    patient: "Ethan Kim",
    doctor: "Dr. Aisha Rahman",
    scheduledAt: "2026-07-17T15:30",
    urgency: 2,
    status: "no_show",
    reason: "Vaccination",
  },
  {
    id: "a7",
    patient: "Amara Okafor",
    doctor: "Dr. Marcus Johnson",
    scheduledAt: "2026-07-16T09:00",
    urgency: 3,
    status: "cancelled",
    reason: "Rescheduled",
  },
];

export const mockQueue: QueueItem[] = [
  {
    id: "q1",
    position: 1,
    patient: "Liam Chen",
    urgency: 5,
    waitMinutes: 4,
    status: "in_progress",
  },
  {
    id: "q2",
    position: 2,
    patient: "Noah Williams",
    urgency: 4,
    waitMinutes: 12,
    status: "waiting",
  },
  {
    id: "q3",
    position: 3,
    patient: "Amara Okafor",
    urgency: 3,
    waitMinutes: 22,
    status: "waiting",
  },
  {
    id: "q4",
    position: 4,
    patient: "Sofia Alvarez",
    urgency: 2,
    waitMinutes: 38,
    status: "waiting",
  },
];

export const dashboardStats = {
  totalPatients: { value: 1284, trend: "+8.2%" },
  todaysAppointments: { value: 42, trend: "+3" },
  doctorsAvailable: { value: 12, trend: "3 busy" },
  queueLength: { value: 4, trend: "avg 19m" },
};
