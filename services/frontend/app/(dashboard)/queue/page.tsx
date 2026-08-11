"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { OptimizeButton } from "@/components/queue/OptimizeButton";
import { QueueBoard } from "@/components/queue/QueueBoard";
import useQueue from "@/hooks/useQueue";
import { useEffect } from "react";

export default function QueuePage() {
  const { queue, isConnected, loading, error, optimizeQueue } = useQueue();

  useEffect(() => {
    document.title = "Queue Management — HealthOps AI";
  }, []);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Queue Management"
        description="Real-time triage across all waiting patients."
        actions={
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                isConnected
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isConnected ? "animate-ping bg-emerald-500" : "bg-gray-400"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    isConnected ? "bg-emerald-500" : "bg-gray-400"
                  }`}
                />
              </span>
              {isConnected ? "Live" : "Disconnected"}
            </span>
            <OptimizeButton onOptimize={optimizeQueue} />
          </div>
        }
      />
      <QueueBoard items={queue} />
    </div>
  );
}
