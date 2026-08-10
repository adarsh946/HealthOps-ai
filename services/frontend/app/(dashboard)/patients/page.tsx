"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/layout/PageHeader";
import { PatientTable } from "@/components/patients/PatientTable";
import { PatientForm } from "@/components/patients/PatientForm";
import usePatients from "@/hooks/usePatients";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types";

export default function PatientsPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { patients, loading, error } = usePatients();
  const { role } = useAuthStore();

  useEffect(() => {
    document.title = "Patients — HealthOps AI";
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );

  if (error) return <div className="p-6 text-sm text-red-500">{error}</div>;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) =>
      [p.name, p.email, p.contact, p.address].some((f) =>
        f?.toLowerCase().includes(q)
      )
    );
  }, [query, patients]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="All patient records across departments."
        actions={
          (role === Role.ADMIN || role === Role.RECEPTIONIST) && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                render={
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" />
                }
              >
                <Plus className="h-4 w-4" /> Add Patient
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add Patient</DialogTitle>
                </DialogHeader>
                <PatientForm onDone={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          )
        }
      />
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients..."
          className="pl-9"
        />
      </div>
      <PatientTable rows={rows} />
    </div>
  );
}
