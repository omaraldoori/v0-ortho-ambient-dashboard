"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Calendar,
  Users,
  FileText,
  Clock,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react"

const traumaCases = [
  {
    id: "1",
    patient: "David Kim",
    age: 28,
    mrn: "MRN-2024-0898",
    injury: "Open tibial fracture (Gustilo IIIb) + Unstable pelvic fracture",
    mechanism: "Motorcycle vs car, high-speed impact",
    presenter: "Dr. Davis",
    imaging: ["CT Pelvis", "XR Tibia", "CT Angio"],
    status: "urgent" as const,
    discussion: "Pending",
  },
  {
    id: "2",
    patient: "James Wilson",
    age: 45,
    mrn: "MRN-2024-0892",
    injury: "Schatzker VI tibial plateau fracture",
    mechanism: "Fall from ladder, axial loading",
    presenter: "Dr. Smith",
    imaging: ["CT Knee", "XR Tibia"],
    status: "pending" as const,
    discussion: "Pending",
  },
  {
    id: "3",
    patient: "Patricia Holmes",
    age: 78,
    mrn: "MRN-2024-0895",
    injury: "Intracapsular NOF fracture (Garden IV)",
    mechanism: "Mechanical fall at home",
    presenter: "Dr. Davis",
    imaging: ["XR Pelvis", "XR Hip"],
    status: "scheduled" as const,
    discussion: "Hemi vs THR - consider comorbidities",
  },
  {
    id: "4",
    patient: "Margaret O'Brien",
    age: 82,
    mrn: "MRN-2024-0903",
    injury: "Extracapsular NOF fracture",
    mechanism: "Fall in care home",
    presenter: "Dr. Chen",
    imaging: ["XR Pelvis"],
    status: "completed" as const,
    discussion: "DHS planned. Theatre tomorrow PM.",
  },
]

export default function TraumaMeetingPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Trauma Meeting"
          subtitle="Daily trauma case discussion"
        />
        <div className="p-6">
          {/* Meeting Header */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-card-foreground">
                    Morning Trauma Meeting
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      08:00 - 08:45
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      12 attendees
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <FileText className="mr-1.5 h-4 w-4" />
                  View Minutes
                </Button>
                <Button size="sm" className="h-9">
                  <Play className="mr-1.5 h-4 w-4" />
                  Start Meeting
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 flex items-center gap-6 rounded-md bg-muted/50 p-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="h-6 px-2 text-xs">
                  1 Urgent
                </Badge>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-xs text-muted-foreground">
                <strong className="text-card-foreground">{traumaCases.length}</strong> cases to discuss
              </span>
              <div className="h-4 w-px bg-border" />
              <span className="text-xs text-muted-foreground">
                <strong className="text-card-foreground">2</strong> require theatre slots
              </span>
            </div>
          </div>

          {/* Case List */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Today&apos;s Cases
              </h3>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Reorder Cases
              </Button>
            </div>

            {traumaCases.map((item, index) => (
              <div
                key={item.id}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                <div className="flex items-start gap-4 p-4">
                  {/* Case Number */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground shrink-0">
                    {index + 1}
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-card-foreground">
                        {item.patient}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {item.age}y • {item.mrn}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-1 text-sm text-card-foreground">
                      {item.injury}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Mechanism: {item.mechanism}
                    </p>

                    {/* Imaging */}
                    <div className="mt-2 flex items-center gap-2">
                      <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="flex gap-1">
                        {item.imaging.map((img) => (
                          <Badge
                            key={img}
                            variant="secondary"
                            className="h-5 text-[10px]"
                          >
                            {img}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Discussion Notes */}
                    {item.discussion !== "Pending" && (
                      <div className="mt-2 rounded-md bg-muted/50 p-2">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-card-foreground">
                            Discussion:
                          </span>{" "}
                          {item.discussion}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Presenter */}
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-card-foreground">
                      {item.presenter}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Presenting
                    </p>
                  </div>

                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
