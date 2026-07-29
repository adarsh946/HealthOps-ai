import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockDoctors, mockPatients } from "@/lib/mock-data";

const urgencyLabels: Record<string, string> = {
  "1": "1 — Low",
  "2": "2 — Mild",
  "3": "3 — Moderate",
  "4": "4 — High",
  "5": "5 — Critical",
};

export function AppointmentForm({ onDone }: { onDone?: () => void }) {
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          onDone?.();
        }, 900);
      }}
    >
      <div className="grid gap-2">
        <Label>Patient</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select patient" />
          </SelectTrigger>
          <SelectContent>
            {mockPatients.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Doctor</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>
          <SelectContent>
            {mockDoctors.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.name} · {d.specialization}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reason">Reason</Label>
        <Textarea id="reason" placeholder="Brief reason for visit" rows={3} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Urgency</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(urgencyLabels).map(([v, l]) => (
                <SelectItem key={v} value={v}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="scheduledAt">Scheduled At</Label>
          <Input id="scheduledAt" type="datetime-local" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={loading}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Book Appointment
        </Button>
      </div>
    </form>
  );
}
