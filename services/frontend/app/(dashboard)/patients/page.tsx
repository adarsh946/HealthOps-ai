"use client";

import { Search, Plus } from "lucide-react";

export default function PatientsPage() {
  const patients = [
    {
      id: 1,
      name: "Sample",
      initials: "S",
      color: "bg-[var(--color-primary-action)]",
      phone: "11111111",
      email: "sample.user@example.com",
      since: "Since May 2026",
    },
    {
      id: 2,
      name: "Sample User",
      initials: "S",
      color: "bg-purple-500",
      phone: "11111111",
      email: "sample.user@example.com",
      since: "Since May 2026",
    },
    {
      id: 3,
      name: "Test User",
      initials: "T",
      color: "bg-pink-500",
      phone: "9999999999",
      email: "demo@example.com",
      since: "Since May 2026",
    },
    {
      id: 4,
      name: "Demo User",
      initials: "D",
      color: "bg-amber-500",
      phone: "9999999999",
      email: "demo.patient@example.com",
      since: "Since May 2026",
    },
    {
      id: 5,
      name: "Test User",
      initials: "T",
      color: "bg-blue-500",
      phone: "11111111",
      email: "demo.patient@example.com",
      since: "Since May 2026",
    },
    {
      id: 6,
      name: "Test User",
      initials: "T",
      color: "bg-[var(--color-primary-action)]",
      phone: "9999999999",
      email: "test.user@example.com",
      since: "Since May 2026",
    },
    {
      id: 7,
      name: "Demo User",
      initials: "D",
      color: "bg-purple-500",
      phone: "11111111",
      email: "demo.patient@example.com",
      since: "Since May 2026",
    },
  ];

  return (
    <div className="p-8 bg-[var(--color-page-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#E0F7F5] rounded-lg flex items-center justify-center">
              <span className="text-[var(--color-primary-action)] font-bold">
                👥
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
              Patients
            </h1>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            7 patients registered
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--color-primary-action)] hover:bg-[#0F8C7F] text-white px-6 py-3 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-action)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-lg border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 ${patient.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}
              >
                {patient.initials}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
              {patient.name}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              {patient.since}
            </p>
            <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="text-green-500">☎</span>
                <p className="text-sm text-[var(--color-text-primary)]">
                  {patient.phone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-primary-action)]">✉</span>
                <p className="text-sm text-[var(--color-text-primary)]">
                  {patient.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
