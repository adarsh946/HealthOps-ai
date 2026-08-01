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
import { DoctorTable } from "@/components/doctors/DoctorTable";
import { DoctorForm } from "@/components/doctors/DoctorForm";
import { mockDoctors } from "@/lib/mock-data";

export default function DoctorsPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "Doctors — HealthOps AI";
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors"
        description="Team roster and current availability."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" />
              }
            >
              <Plus className="h-4 w-4" /> Add Doctor
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Doctor</DialogTitle>
              </DialogHeader>
              <DoctorForm onDone={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        }
      />
      <DoctorTable rows={mockDoctors} />
    </div>
  );
}
