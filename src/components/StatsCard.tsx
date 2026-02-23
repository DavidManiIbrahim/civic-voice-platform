import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export default function StatsCard({ icon, label, value, change, positive }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-accent">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
      {change && (
        <p className={`mt-2 text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {change}
        </p>
      )}
    </div>
  );
}
