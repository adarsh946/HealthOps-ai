"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppointmentTable } from "@/components/appointments/AppointmentTable";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import useAppointments from "@/hooks/useAppointments";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types";

export default function AppointmentsPage() {
  const [open, setOpen] = useState(false);
  const { appointments, loading, error } = useAppointments();
  const { role } = useAuthStore();

  useEffect(() => {
    document.title = "Appointments — HealthOps AI";
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );

  if (error) return <div className="p-6 text-sm text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Every scheduled visit at a glance."
        actions={
          (role === Role.ADMIN || role === Role.RECEPTIONIST) && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="h-4 w-4" /> Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Book Appointment</DialogTitle>
                </DialogHeader>
                <AppointmentForm onDone={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          )
        }
      />
      <AppointmentTable rows={appointments} />
    </div>
  );
}
