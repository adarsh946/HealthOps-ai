"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
import { mockAppointments } from "@/lib/mock-data";

export default function AppointmentsPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "Appointments — HealthOps AI";
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Every scheduled visit at a glance."
        actions={
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
        }
      />
      <AppointmentTable rows={mockAppointments} />
    </div>
  );
}
