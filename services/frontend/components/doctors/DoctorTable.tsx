import { Eye, Pencil, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Doctor } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusCls: Record<Doctor["status"], string> = {
  available: "bg-emerald-100 text-emerald-700",
  busy: "bg-orange-100 text-orange-700",
  off_duty: "bg-gray-100 text-gray-600",
};
const statusLabel: Record<Doctor["status"], string> = {
  available: "Available",
  busy: "Busy",
  off_duty: "Off Duty",
};

export function DoctorTable({ rows }: { rows: Doctor[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
        <Stethoscope className="h-10 w-10 text-gray-300" />
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          No doctors yet
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Add your first doctor to get started.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>License</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((d) => (
            <TableRow key={d.id}>
              <TableCell className="font-medium text-gray-900">
                {d.name}
              </TableCell>
              <TableCell className="text-gray-600">
                {d.specialization}
              </TableCell>
              <TableCell className="text-gray-600">{d.license}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn("border-0 font-medium", statusCls[d.status])}
                >
                  {statusLabel[d.status]}
                </Badge>
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
