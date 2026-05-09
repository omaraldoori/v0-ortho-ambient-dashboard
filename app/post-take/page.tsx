"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { PatientCard } from "@/components/patient-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, FileText, Users } from "lucide-react"

const wardRoundPatients = [
  {
    id: "1",
    name: "David Kim",
    mrn: "MRN-2024-0898",
    age: 28,
    location: "Ward 4B - Bed 12",
    diagnosis: "Day 2 post external fixation for open tibial fracture. Soft tissue review today.",
    status: "urgent" as const,
    lastUpdated: "Ward round pending",
    consultant: "Mr. Thompson",
  },
  {
    id: "2",
    name: "Margaret O'Brien",
    mrn: "MRN-2024-0903",
    age: 82,
    location: "Ward 4B - Bed 8",
    diagnosis: "Day 1 post DHS. Mobilising with physio. Plan: review weight bearing status.",
    status: "in-progress" as const,
    lastUpdated: "Reviewed 08:15",
    consultant: "Mr. Thompson",
  },
  {
    id: "3",
    name: "Robert Edwards",
    mrn: "MRN-2024-0901",
    age: 71,
    location: "Ward 3A - Bed 4",
    diagnosis: "Day 3 post TKR. Good ROM. Awaiting OT home assessment.",
    status: "completed" as const,
    lastUpdated: "Reviewed 08:30",
    consultant: "Mr. Thompson",
  },
  {
    id: "4",
    name: "Sarah Mitchell",
    mrn: "MRN-2024-0891",
    age: 67,
    location: "Ward 4B - Bed 6",
    diagnosis: "Day 3 post THR. Wound check - no concerns. Plan for discharge tomorrow.",
    status: "completed" as const,
    lastUpdated: "Reviewed 08:45",
    consultant: "Mr. Thompson",
  },
]

export default function PostTakeRoundPage() {
  const reviewedCount = wardRoundPatients.filter(
    (p) => p.status === "completed" || p.status === "in-progress"
  ).length

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Post-Take Ward Round"
          subtitle="Morning ward round following on-call"
        />
        <div className="p-6">
          {/* Round Header */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-card-foreground">
                    Post-Take Round - Mr. Thompson
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>Friday, 9 May 2026</span>
                    <span>•</span>
                    <span>{wardRoundPatients.length} patients</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <FileText className="mr-1.5 h-4 w-4" />
                  Round Summary
                </Button>
                <Button size="sm" className="h-9">
                  <Play className="mr-1.5 h-4 w-4" />
                  Start Capture
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">
                  Round Progress
                </span>
                <span className="text-xs font-medium text-card-foreground">
                  {reviewedCount}/{wardRoundPatients.length} reviewed
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${(reviewedCount / wardRoundPatients.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Ward Sections */}
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Ward 4B
                </h3>
                <Badge variant="secondary" className="text-xs">
                  3 patients
                </Badge>
              </div>
              <div className="space-y-3">
                {wardRoundPatients
                  .filter((p) => p.location.includes("4B"))
                  .map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Ward 3A
                </h3>
                <Badge variant="secondary" className="text-xs">
                  1 patient
                </Badge>
              </div>
              <div className="space-y-3">
                {wardRoundPatients
                  .filter((p) => p.location.includes("3A"))
                  .map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
