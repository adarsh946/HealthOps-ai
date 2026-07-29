import { Badge } from "@/components/ui/badge";
import type { AppointmentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const styles: Record<AppointmentStatus, string> = {
  scheduled: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  checked_in: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  in_progress: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  completed: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  no_show: "bg-gray-100 text-gray-600 hover:bg-gray-100",
  cancelled: "bg-red-100 text-red-700 hover:bg-red-100",
};

const labels: Record<AppointmentStatus, string> = {
  scheduled: "Scheduled",
  checked_in: "Checked In",
  in_progress: "In Progress",
  completed: "Completed",
  no_show: "No Show",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn("border-0 font-medium", styles[status])}
    >
      {labels[status]}
    </Badge>
  );
}
