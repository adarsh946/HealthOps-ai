import { Users } from "lucide-react";
import { QueueCard } from "./QueueCard";
import type { QueueItem } from "@/lib/mock-data";

export function QueueBoard({ items }: { items: QueueItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
        <Users className="h-10 w-10 text-gray-300" />
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          No patients waiting
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          The queue is clear. New arrivals will appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <QueueCard key={item.id} item={item} />
      ))}
    </div>
  );
}
