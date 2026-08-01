"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
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
import { mockPatients } from "@/lib/mock-data";

export default function PatientsPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Patients — HealthOps AI";
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockPatients;
    return mockPatients.filter((p) =>
      [p.name, p.email, p.contact, p.address].some((f) =>
        f.toLowerCase().includes(q)
      )
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="All patient records across departments."
        actions={
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
