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
import { DoctorTable } from "@/components/doctors/DoctorTable";
import { DoctorForm } from "@/components/doctors/DoctorForm";
import useDoctors from "@/hooks/useDoctors";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types";

export default function DoctorsPage() {
  const [open, setOpen] = useState(false);
  const { doctors, error, loading } = useDoctors();
  const { role } = useAuthStore();

  useEffect(() => {
    document.title = "Doctors — HealthOps AI";
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
        title="Doctors"
        description="Team roster and current availability."
        actions={
          role === Role.ADMIN && (
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
          )
        }
      />
      <DoctorTable rows={doctors} />
    </div>
  );
}
