"use client";

import { Search, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function AppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState("All Status");

  const appointments = [
    {
      id: 1,
      patient: "Sample User",
      phone: "11111111",
      service: "Follow Up Visit",
      duration: "15 min",
      date: "May 4, 2026",
      time: "4:30 PM - 4:45 PM",
      source: "AI Widget",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Demo User",
      phone: "9999999999",
      service: "@theblockchaincoders",
      duration: "45 min",
      date: "May 4, 2026",
      time: "4:00 PM - 4:45 PM",
      source: "AI Widget",
      status: "Booked",
    },
    {
      id: 3,
      patient: "Test User",
      phone: "11111111",
      service: "General Consultation",
      duration: "30 min",
      date: "May 1, 2026",
      time: "3:30 PM - 4:00 PM",
      source: "AI Widget",
      status: "Confirmed",
    },
    {
      id: 4,
      patient: "Sample",
      phone: "11111111",
      service: "General Consultation",
      duration: "30 min",
      date: "May 1, 2026",
      time: "3:30 PM - 4:00 PM",
      source: "AI Widget",
      status: "No Show",
    },
    {
      id: 5,
      patient: "Test User",
      phone: "9999999999",
      service: "Pro Blockchain",
      duration: "50 min",
      date: "May 1, 2026",
      time: "2:45 PM - 3:15 PM",
      source: "AI Widget",
      status: "Booked",
    },
  ];

  const statuses = [
    "All Status",
    "Booked",
    "Confirmed",
    "Completed",
    "Cancelled",
    "No Show",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-[#E0F7F5] text-[var(--color-primary-action)]";
      case "Confirmed":
        return "bg-green-50 text-green-700";
      case "Completed":
        return "bg-blue-50 text-blue-700";
      case "Cancelled":
        return "bg-red-50 text-red-700";
      case "No Show":
        return "bg-amber-50 text-amber-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="p-8 bg-[var(--color-page-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#E0F7F5] rounded-lg flex items-center justify-center">
              <span className="text-[var(--color-primary-action)] font-bold">
                📅
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
              Appointments
            </h1>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            Manage and track all clinic appointments
          </p>
        </div>
        <button className="flex items-center gap-2 text-[var(--color-primary-action)] hover:bg-[#E0F7F5] px-4 py-2 rounded-lg transition-colors font-medium">
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-action)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              statusFilter === status
                ? "bg-[var(--color-primary-action)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-page-bg)]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              All Status
            </span>
            <span className="text-[var(--color-text-secondary)]">
              {appointments.length}
            </span>
          </div>
          <select className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-action)]">
            <option>All Status</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-page-bg)]">
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-page-bg)] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary-action)] text-white flex items-center justify-center text-xs font-bold">
                        {appointment.patient[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                          {appointment.patient}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          {appointment.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {appointment.service}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {appointment.duration}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      {appointment.date}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {appointment.time}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[var(--color-primary-action)] font-medium">
                      {appointment.source}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
