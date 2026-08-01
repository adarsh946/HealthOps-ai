import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const textColor = variant === "light" ? "text-white" : "text-gray-900";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="28" height="28" rx="7" fill="#10B981" />
        <path d="M11 6h6v5h5v6h-5v5h-6v-5H6v-6h5V6z" fill="white" />
      </svg>
      <span className={cn("text-lg font-bold tracking-tight", textColor)}>
        HealthOps<span style={{ color: "#10B981" }}>AI</span>
      </span>
    </div>
  );
}
