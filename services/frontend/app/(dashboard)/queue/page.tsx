import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { OptimizeButton } from "@/components/queue/OptimizeButton";
import { QueueBoard } from "@/components/queue/QueueBoard";
import { mockQueue } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Queue Management — HealthOps AI",
  description: "Live patient queue with AI-driven prioritization.",
};

export default function QueuePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Queue Management"
        description="Real-time triage across all waiting patients."
        actions={
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
            <OptimizeButton />
          </div>
        }
      />
      <QueueBoard items={mockQueue} />
    </div>
  );
}
