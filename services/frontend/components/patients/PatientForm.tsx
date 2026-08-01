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

export function PatientForm({ onDone }: { onDone?: () => void }) {
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Jane Doe" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder="34" />
        </div>
        <div className="grid gap-2">
          <Label>Gender</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact">Contact</Label>
          <Input id="contact" placeholder="+1 555 000 0000" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="123 Main St, City" />
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
          Save Patient
        </Button>
      </div>
    </form>
  );
}
