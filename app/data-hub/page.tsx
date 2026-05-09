"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Mic,
  Clock,
  TrendingUp,
  Download,
  Calendar,
} from "lucide-react"

const stats = [
  {
    title: "Total Captures",
    value: "1,247",
    subtitle: "This month",
    icon: Mic,
    trend: { value: 18, isPositive: true },
  },
  {
    title: "Documents Generated",
    value: "892",
    subtitle: "This month",
    icon: FileText,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Avg. Processing Time",
    value: "2.4s",
    subtitle: "Per capture",
    icon: Clock,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Time Saved",
    value: "47h",
    subtitle: "This month",
    icon: TrendingUp,
  },
]

const recentExports = [
  { name: "Theatre Activity Report", date: "May 8, 2026", type: "PDF" },
  { name: "Monthly Capture Summary", date: "May 1, 2026", type: "CSV" },
  { name: "Consultant Workload", date: "Apr 30, 2026", type: "PDF" },
  { name: "Documentation Audit", date: "Apr 28, 2026", type: "PDF" },
]

export default function DataHubPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Data Hub"
          subtitle="Analytics and reporting dashboard"
        />
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>

          {/* Reports Section */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Quick Reports */}
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold text-card-foreground">
                  Quick Reports
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: "Daily Activity Summary", icon: Calendar },
                  { label: "Theatre Utilisation", icon: TrendingUp },
                  { label: "Documentation Compliance", icon: FileText },
                  { label: "Capture Analytics", icon: Mic },
                ].map((report) => (
                  <Button
                    key={report.label}
                    variant="outline"
                    className="w-full justify-start h-10"
                  >
                    <report.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {report.label}
                    <Download className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Exports */}
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold text-card-foreground">
                  Recent Exports
                </h2>
              </div>
              <div className="divide-y divide-border">
                {recentExports.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Download className="mr-1.5 h-3 w-3" />
                      {item.type}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
