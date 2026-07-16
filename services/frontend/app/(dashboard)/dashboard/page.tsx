"use client";

import {
  Clock,
  AlertCircle,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "TODAY",
      value: "3",
      subtext: "Scheduled today",
      icon: Clock,
      color: "bg-teal-50",
      iconColor: "text-[var(--color-primary-action)]",
    },
    {
      label: "UPCOMING",
      value: "3",
      subtext: "Booked & confirmed",
      icon: Clock,
      color: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "PATIENTS",
      value: "7",
      subtext: "↑ All time",
      icon: Users,
      color: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      label: "CANCELLATIONS",
      value: "0",
      subtext: "All clear",
      icon: AlertCircle,
      color: "bg-red-50",
      iconColor: "text-red-400",
    },
    {
      label: "COMPLETION",
      value: "50%",
      subtext: "↑ vs. total",
      icon: CheckCircle,
      color: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      label: "NO-SHOWS",
      value: "50%",
      subtext: "↓ Missed visits",
      icon: AlertTriangle,
      color: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  ];

  const schedules = [
    {
      patient: "Test User",
      phone: "9999999999",
      service: "Pro Blockchain",
      duration: "50 min",
      date: "May 1, 2026",
      time: "2:45 PM - 3:15 PM",
      source: "AI Widget",
      status: "Booked",
    },
    {
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
      patient: "Sample",
      phone: "11111111",
      service: "General Consultation",
      duration: "30 min",
      date: "May 1, 2026",
      time: "3:30 PM - 4:00 PM",
      source: "AI Widget",
      status: "No Show",
    },
  ];

  const upcomingAppointments = [
    {
      patient: "Test User",
      service: "Pro Blockchain",
      date: "May 1, 2:45 PM",
    },
    {
      patient: "Test User",
      service: "General Consultation",
      date: "May 1, 3:30 PM",
    },
    {
      patient: "Demo User",
      service: "@theblockchaincoders",
      date: "May 4, 4:00 PM",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-[#E0F7F5] text-[var(--color-primary-action)]";
      case "Confirmed":
        return "bg-green-50 text-green-700";
      case "No Show":
        return "bg-amber-50 text-amber-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[var(--color-page-bg)] min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--color-primary-action)] uppercase tracking-wide mb-2">
            Live Dashboard
          </p>
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
            Good morning, Dr. Demo
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Friday, May 1, 2026 — theblockchaincoders
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--color-primary-action)] hover:bg-[#0F8C7F] text-white px-6 py-3 rounded-lg font-medium transition-colors">
          <TrendingUp className="w-5 h-5" />
          View All Appointments
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wide">
                  {stat.label}
                </p>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E0F7F5] rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[var(--color-primary-action)]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Today&apos;s Schedule
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Friday, May 1
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-primary-action)] font-semibold">
              3 appointments
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                    Patient
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                    Service
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                    Source
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr
                    key={index}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-page-bg)] transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary-action)] text-white flex items-center justify-center text-xs font-bold">
                          {schedule.patient[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">
                            {schedule.patient}
                          </p>
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            {schedule.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">
                        {schedule.service}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {schedule.duration}
                      </p>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm text-[var(--color-text-primary)]">
                        {schedule.date}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {schedule.time}
                      </p>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm text-[var(--color-primary-action)] font-medium">
                        {schedule.source}
                      </p>
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          schedule.status
                        )}`}
                      >
                        {schedule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming & AI Assistant */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[var(--color-text-secondary)]" />
                <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Upcoming
                </h2>
              </div>
              <p className="text-sm text-[var(--color-primary-action)] font-semibold cursor-pointer">
                See all →
              </p>
            </div>

            <div className="space-y-3">
              {upcomingAppointments.map((appt, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-3 border-b border-[var(--color-border)] last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary-action)] mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {appt.patient}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {appt.service}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      {appt.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-[var(--color-primary-action)] rounded-lg p-6 text-white shadow-md">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide opacity-90">
                  AI Assistant
                </p>
                <h3 className="text-lg font-bold mt-1">Smart Booking Active</h3>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Your AI widget is live and accepting patient bookings 24/7.
            </p>
            <button className="text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              Configure AI →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
