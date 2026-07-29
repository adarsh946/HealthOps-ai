import { Eye, Pencil, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import type { Appointment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const urgencyCls: Record<number, string> = {
  1: "bg-gray-100 text-gray-700",
  2: "bg-blue-100 text-blue-700",
  3: "bg-yellow-100 text-yellow-700",
  4: "bg-orange-100 text-orange-700",
  5: "bg-red-100 text-red-700",
};

function formatDT(v: string) {
  const d = new Date(v);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function AppointmentTable({ rows }: { rows: Appointment[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
        <Calendar className="h-10 w-10 text-gray-300" />
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          No appointments
        </h3>
        <p className="mt-1 text-sm text-gray-500">Book one to see it here.</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date / Time</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium text-gray-900">
                {r.patient}
              </TableCell>
              <TableCell className="text-gray-600">{r.doctor}</TableCell>
              <TableCell className="text-gray-600">
                {formatDT(r.scheduledAt)}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn("border-0 font-medium", urgencyCls[r.urgency])}
                >
                  Level {r.urgency}
                </Badge>
              </TableCell>
              <TableCell>
                <StatusBadge status={r.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" aria-label="View">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Edit">
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
