"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OptimizeButton({
  onOptimize,
}: {
  onOptimize: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onOptimize();
    setLoading(false);
  };
  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700 text-white"
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {loading ? "Optimizing..." : "Optimize Queue"}
    </Button>
  );
}
