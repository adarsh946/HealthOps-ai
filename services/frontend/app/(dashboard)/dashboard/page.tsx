"use client";
import Link from "next/link";
import {
  Users,
  Calendar,
  Stethoscope,
  Activity,
  UserPlus,
  CalendarPlus,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppointmentTable } from "@/components/appointments/AppointmentTable";
import { dashboardStats } from "@/lib/mock-data";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import useAppointments from "@/hooks/useAppointments";

const stats = [
  {
    label: "Total Patients",
    value: dashboardStats.totalPatients.value,
    trend: dashboardStats.totalPatients.trend,
    icon: Users,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Today's Appointments",
    value: dashboardStats.todaysAppointments.value,
    trend: dashboardStats.todaysAppointments.trend,
    icon: Calendar,
    tint: "bg-blue-100 text-blue-600",
  },
  {
    label: "Doctors Available",
    value: dashboardStats.doctorsAvailable.value,
    trend: dashboardStats.doctorsAvailable.trend,
    icon: Stethoscope,
    tint: "bg-purple-100 text-purple-600",
  },
  {
    label: "Queue Length",
    value: dashboardStats.queueLength.value,
    trend: dashboardStats.queueLength.trend,
    icon: Activity,
    tint: "bg-orange-100 text-orange-600",
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { appointments } = useAppointments();

  useEffect(() => {
    document.title = "Dashboard — HealthOps AI";
  }, []);
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name ?? "Admin"}`}
        description="Here's what's happening across your hospital today."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-xl border p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.tint}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                <ArrowUpRight className="h-3 w-3" /> {s.trend}
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-gray-900">
              {s.value.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </Card>
        ))}
      </div>
      <Card className="rounded-xl border p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Quick actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button render={<Link href="/patients" />} variant="outline">
            <UserPlus className="h-4 w-4" /> Add Patient
          </Button>
          <Button render={<Link href="/appointments" />} variant="outline">
            <CalendarPlus className="h-4 w-4" /> Book Appointment
          </Button>
          <Button
            render={<Link href="/queue" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Sparkles className="h-4 w-4" /> Optimize Queue
          </Button>
        </div>
      </Card>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Recent appointments
          </h3>
          <Link
            href="/appointments"
            className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all
          </Link>
        </div>
        <AppointmentTable rows={appointments.slice(0, 5)} />
      </div>
    </div>
  );
}
