"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { StatCard } from "@/components/stat-card"
import { PatientCard } from "@/components/patient-card"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  Clock,
  AlertTriangle,
  ChevronRight,
  Calendar,
  Mic,
} from "lucide-react"

const stats = [
  {
    title: "Active Patients",
    value: 24,
    subtitle: "Across all wards",
    icon: Users,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Pending Reviews",
    value: 8,
    subtitle: "Awaiting sign-off",
    icon: FileText,
    trend: { value: 5, isPositive: false },
  },
  {
    title: "Today's Theatre",
    value: 6,
    subtitle: "Cases scheduled",
    icon: Calendar,
  },
  {
    title: "Urgent Actions",
    value: 3,
    subtitle: "Requires attention",
    icon: AlertTriangle,
  },
]

const recentPatients = [
  {
    id: "1",
    name: "Sarah Mitchell",
    mrn: "MRN-2024-0891",
    age: 67,
    location: "Ward 4B",
    diagnosis: "Left hip arthroplasty - Day 2 post-op. Mobilising with frame.",
    status: "in-progress" as const,
    lastUpdated: "10 mins ago",
    consultant: "Mr. Thompson",
  },
  {
    id: "2",
    name: "James Wilson",
    mrn: "MRN-2024-0892",
    age: 45,
    location: "Ward 3A",
    diagnosis: "Right tibial plateau fracture. Awaiting surgery.",
    status: "urgent" as const,
    lastUpdated: "25 mins ago",
    consultant: "Ms. Patel",
  },
  {
    id: "3",
    name: "Emily Brown",
    mrn: "MRN-2024-0893",
    age: 72,
    location: "ICU",
    diagnosis: "Polytrauma with pelvic fracture. Stable condition.",
    status: "pending" as const,
    lastUpdated: "1 hour ago",
    consultant: "Mr. Thompson",
  },
  {
    id: "4",
    name: "Michael Chen",
    mrn: "MRN-2024-0894",
    age: 34,
    location: "Ward 4B",
    diagnosis: "ACL reconstruction - Day 1 post-op. Good recovery.",
    status: "completed" as const,
    lastUpdated: "2 hours ago",
    consultant: "Ms. Patel",
  },
]

const upcomingTheatre = [
  {
    time: "08:30",
    patient: "R. Edwards",
    procedure: "Total Knee Replacement",
    theatre: "Theatre 2",
    status: "scheduled" as const,
  },
  {
    time: "10:00",
    patient: "A. Singh",
    procedure: "ORIF Ankle",
    theatre: "Theatre 1",
    status: "in-progress" as const,
  },
  {
    time: "13:30",
    patient: "M. O'Brien",
    procedure: "Hip Hemiarthroplasty",
    theatre: "Theatre 2",
    status: "scheduled" as const,
  },
  {
    time: "15:00",
    patient: "L. Garcia",
    procedure: "Carpal Tunnel Release",
    theatre: "Theatre 3",
    status: "scheduled" as const,
  },
]

const quickActions = [
  { label: "Start Bedside Capture", icon: Mic, href: "/bedside" },
  { label: "View Review Queue", icon: FileText, href: "/review" },
  { label: "Today's Take List", icon: Clock, href: "/take-list" },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Command Centre"
          subtitle="Friday, 9 May 2026 • Ward Round Complete"
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

          {/* Quick Actions Strip */}
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <span className="text-xs font-medium text-muted-foreground">
              Quick Actions:
            </span>
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="secondary"
                size="sm"
                className="h-8 gap-1.5 text-xs"
              >
                <action.icon className="h-3.5 w-3.5" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Recent Patients - 2 columns */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h2 className="text-sm font-semibold text-card-foreground">
                    Recent Patients
                  </h2>
                  <Tabs defaultValue="all" className="w-auto">
                    <TabsList className="h-7">
                      <TabsTrigger value="all" className="h-6 px-2.5 text-xs">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="urgent" className="h-6 px-2.5 text-xs">
                        Urgent
                      </TabsTrigger>
                      <TabsTrigger value="pending" className="h-6 px-2.5 text-xs">
                        Pending
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="divide-y divide-border">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="p-4">
                      <PatientCard patient={patient} />
                    </div>
                  ))}
                </div>
                <div className="border-t border-border p-3">
                  <Button variant="ghost" className="w-full justify-center gap-1 text-xs">
                    View All Patients
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Theatre Schedule - 1 column */}
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h2 className="text-sm font-semibold text-card-foreground">
                    Today&apos;s Theatre
                  </h2>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View All
                  </Button>
                </div>
                <div className="divide-y divide-border">
                  {upcomingTheatre.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-muted/50"
                    >
                      <div className="text-center">
                        <p className="text-sm font-semibold text-card-foreground">
                          {item.time}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.theatre}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">
                          {item.patient}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.procedure}
                        </p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="rounded-lg border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <h2 className="text-sm font-semibold text-card-foreground">
                    Recent Activity
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { action: "Note signed", patient: "S. Mitchell", time: "5m" },
                    { action: "Capture completed", patient: "J. Wilson", time: "15m" },
                    { action: "Review requested", patient: "E. Brown", time: "32m" },
                    { action: "Op note generated", patient: "M. Chen", time: "1h" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3">
                      <div>
                        <p className="text-xs font-medium text-card-foreground">
                          {activity.action}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {activity.patient}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
