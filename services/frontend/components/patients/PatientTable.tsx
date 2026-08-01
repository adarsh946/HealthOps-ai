import { Eye, Pencil, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Patient } from "@/lib/mock-data";

export function PatientTable({ rows }: { rows: Patient[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
        <UserRound className="h-10 w-10 text-gray-300" />
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          No patients found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try a different search or add a new patient.
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
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium text-gray-900">
                {p.name}
              </TableCell>
              <TableCell className="text-gray-600">{p.age}</TableCell>
              <TableCell className="text-gray-600">{p.gender}</TableCell>
              <TableCell className="text-gray-600">{p.contact}</TableCell>
              <TableCell className="max-w-60 truncate text-gray-600">
                {p.address}
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
