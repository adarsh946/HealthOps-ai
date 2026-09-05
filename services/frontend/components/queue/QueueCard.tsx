import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { QueueItem } from "@/types";

const urgencyStyles: Record<
  number,
  { label: string; cls: string; bar: string }
> = {
  1: { label: "Low", cls: "bg-gray-100 text-gray-700", bar: "bg-gray-300" },
  2: { label: "Mild", cls: "bg-blue-100 text-blue-700", bar: "bg-blue-400" },
  3: {
    label: "Moderate",
    cls: "bg-yellow-100 text-yellow-700",
    bar: "bg-yellow-400",
  },
  4: {
    label: "High",
    cls: "bg-orange-100 text-orange-700",
    bar: "bg-orange-500",
  },
  5: { label: "Critical", cls: "bg-red-100 text-red-700", bar: "bg-red-500" },
};

export function QueueCard({ item }: { item: QueueItem }) {
  const u = urgencyStyles[item.urgency];
  return (
    <Card className="relative overflow-hidden rounded-xl border p-5 shadow-sm transition hover:shadow-md">
      <div className={cn("absolute inset-y-0 left-0 w-1", u.bar)} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Position
          </p>
          <p className="text-4xl font-bold text-gray-900">#{item.position}</p>
        </div>
        <Badge
          variant="secondary"
          className={cn("border-0 font-medium", u.cls)}
        >
          {u.label}
        </Badge>
      </div>
      <div className="mt-4">
        <p className="text-base font-semibold text-gray-900">{item.patient}</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {item.waitMinutes}m
          </span>
          <Badge
            variant="secondary"
            className={cn(
              "border-0 text-xs font-medium",
              item.status === "in_progress"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700"
            )}
          >
            {item.status === "in_progress" ? "In Progress" : "Waiting"}
          </Badge>
        </div>
      </div>
      <Button
        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        disabled={item.status === "in_progress"}
      >
        {item.status === "in_progress"
          ? "Currently Serving"
          : "Mark In Progress"}
      </Button>
    </Card>
  );
}
