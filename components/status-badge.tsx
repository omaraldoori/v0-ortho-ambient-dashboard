import { cn } from "@/lib/utils"

type StatusVariant = "pending" | "in-progress" | "completed" | "urgent" | "scheduled" | "draft"

const statusConfig: Record<StatusVariant, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-info/15 text-info border-info/30",
  },
  completed: {
    label: "Completed",
    className: "bg-success/15 text-success border-success/30",
  },
  urgent: {
    label: "Urgent",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  },
}

interface StatusBadgeProps {
  status: StatusVariant
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        config.className,
        className
      )}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  )
}
