import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DoctorForm({ onDone }: { onDone?: () => void }) {
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="dname">Name</Label>
          <Input id="dname" placeholder="Dr. Jane Doe" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="demail">Email</Label>
          <Input id="demail" type="email" placeholder="doctor@healthops.ai" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="spec">Specialization</Label>
          <Input id="spec" placeholder="Cardiology" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="license">License Number</Label>
          <Input id="license" placeholder="MD-00000" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label>Availability Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="off_duty">Off Duty</SelectItem>
            </SelectContent>
          </Select>
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
          Save Doctor
        </Button>
      </div>
    </form>
  );
}
