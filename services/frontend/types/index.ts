// Enums
export enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  RECEPTIONIST = "RECEPTIONIST",
}
export enum Status {
  ACTIVE = "active",
  DEACTIVATED = "deactivated",
}

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  CHECKED_IN = "checked_in",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  NO_SHOW = "no_show",
  CANCELLED = "cancelled",
}

// Entities
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  hospitalId: string;
  createdAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contact: string;
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  email?: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  hospitalId: string;
  createdAt: string;
  updatedAt: string;
}

export type DoctorStatus = "ON_DUTY" | "OFF_DUTY" | "ON_LEAVE";

export interface Doctor {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  availabilityStatus: DoctorStatus;
  hospitalId: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  reason: string;
  urgency: number;
  status: AppointmentStatus;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

// export interface QueueItem {
//   appointmentId: string;
//   patientId: string;
//   patientName: string;
//   urgency: number;
//   status: AppointmentStatus;
//   scheduledAt: string;
//   waitTime: number;
//   position: number;
// }

export interface QueueItem {
  appointmentId: string;
  patientId: string;
  patientName: string;
  urgency: number;
  status: string;
  scheduledAt: string;
  waitTime: number;
  position: number;
  // fields QueueCard uses:
  patient: string;
  waitMinutes: number;
  id: string;
}
export interface QueueUpdate {
  orderedQueue: QueueItem[];
  reasoning: string;
  timestamp: string;
}

// Auth
export interface AuthState {
  token: string | null;
  hospitalId: string | null;
  role: Role | null;
  user: User | null;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  hospitalName: string;
  address: string;
  contact: string;
  adminName: string;
  adminEmail: string;
  password: string;
}

export interface AppointmentForm {
  patientId: string;
  doctorId: string;
  reason: string;
  urgency: number;
  scheduledAt: string;
}
