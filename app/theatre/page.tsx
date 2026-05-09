"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Play,
  Pause,
  FileText,
  Mic,
  MoreHorizontal,
  User,
  Timer,
} from "lucide-react"
import { cn } from "@/lib/utils"

const theatres = [
  { id: "1", name: "Theatre 1", status: "active" },
  { id: "2", name: "Theatre 2", status: "active" },
  { id: "3", name: "Theatre 3", status: "idle" },
  { id: "4", name: "Theatre 4", status: "cleaning" },
]

const theatreSchedule = [
  {
    id: "1",
    theatre: "Theatre 1",
    time: "08:00 - 10:30",
    patient: "Robert Edwards",
    mrn: "MRN-2024-0901",
    age: 71,
    procedure: "Total Knee Replacement (L)",
    surgeon: "Mr. Thompson",
    anaesthetist: "Dr. Williams",
    status: "completed" as const,
    phases: [
      { name: "Pre-op", status: "completed", duration: "15 min" },
      { name: "Anaesthesia", status: "completed", duration: "20 min" },
      { name: "Surgery", status: "completed", duration: "1h 45m" },
      { name: "Recovery", status: "completed", duration: "30 min" },
    ],
    notes: "Uneventful procedure. Standard medial parapatellar approach.",
  },
  {
    id: "2",
    theatre: "Theatre 1",
    time: "10:45 - 12:30",
    patient: "Amit Singh",
    mrn: "MRN-2024-0902",
    age: 34,
    procedure: "ORIF Right Ankle - Bimalleolar Fracture",
    surgeon: "Ms. Patel",
    anaesthetist: "Dr. Chen",
    status: "in-progress" as const,
    currentPhase: "Surgery",
    elapsedTime: "45 min",
    phases: [
      { name: "Pre-op", status: "completed", duration: "10 min" },
      { name: "Anaesthesia", status: "completed", duration: "15 min" },
      { name: "Surgery", status: "in-progress", duration: "45 min" },
      { name: "Recovery", status: "pending", duration: "-" },
    ],
  },
  {
    id: "3",
    theatre: "Theatre 2",
    time: "08:30 - 11:00",
    patient: "Margaret O'Brien",
    mrn: "MRN-2024-0903",
    age: 82,
    procedure: "Hip Hemiarthroplasty (R) - NOF #",
    surgeon: "Mr. Thompson",
    anaesthetist: "Dr. Williams",
    status: "in-progress" as const,
    currentPhase: "Anaesthesia",
    elapsedTime: "18 min",
    phases: [
      { name: "Pre-op", status: "completed", duration: "12 min" },
      { name: "Anaesthesia", status: "in-progress", duration: "18 min" },
      { name: "Surgery", status: "pending", duration: "-" },
      { name: "Recovery", status: "pending", duration: "-" },
    ],
  },
  {
    id: "4",
    theatre: "Theatre 2",
    time: "13:30 - 15:00",
    patient: "Lisa Garcia",
    mrn: "MRN-2024-0904",
    age: 45,
    procedure: "Carpal Tunnel Release (Bilateral)",
    surgeon: "Ms. Patel",
    anaesthetist: "Dr. Chen",
    status: "scheduled" as const,
    phases: [
      { name: "Pre-op", status: "pending", duration: "-" },
      { name: "Anaesthesia", status: "pending", duration: "-" },
      { name: "Surgery", status: "pending", duration: "-" },
      { name: "Recovery", status: "pending", duration: "-" },
    ],
  },
  {
    id: "5",
    theatre: "Theatre 3",
    time: "14:00 - 16:30",
    patient: "David Thompson",
    mrn: "MRN-2024-0905",
    age: 28,
    procedure: "ACL Reconstruction with Hamstring Graft",
    surgeon: "Mr. Thompson",
    anaesthetist: "Dr. Williams",
    status: "scheduled" as const,
    phases: [
      { name: "Pre-op", status: "pending", duration: "-" },
      { name: "Anaesthesia", status: "pending", duration: "-" },
      { name: "Surgery", status: "pending", duration: "-" },
      { name: "Recovery", status: "pending", duration: "-" },
    ],
  },
]

function PhaseIndicator({ 
  phases 
}: { 
  phases: Array<{ name: string; status: string; duration: string }> 
}) {
  return (
    <div className="flex items-center gap-1">
      {phases.map((phase, index) => (
        <div key={phase.name} className="flex items-center">
          <div
            className={cn(
              "flex h-6 items-center gap-1 rounded-full px-2 text-[10px] font-medium",
              phase.status === "completed" && "bg-success/15 text-success",
              phase.status === "in-progress" && "bg-primary/15 text-primary",
              phase.status === "pending" && "bg-muted text-muted-foreground"
            )}
          >
            {phase.status === "completed" && <CheckCircle2 className="h-3 w-3" />}
            {phase.status === "in-progress" && <Play className="h-3 w-3" />}
            {phase.name}
          </div>
          {index < phases.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-3",
                phase.status === "completed" ? "bg-success" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function TheatreWorkflowPage() {
  const [selectedTheatre, setSelectedTheatre] = useState("all")
  const [expandedCase, setExpandedCase] = useState<string | null>("2")

  const filteredSchedule =
    selectedTheatre === "all"
      ? theatreSchedule
      : theatreSchedule.filter((item) => item.theatre === selectedTheatre)

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Theatre Workflow"
          subtitle="Live surgical schedule and case tracking"
        />
        <div className="p-6">
          {/* Theatre Status Strip */}
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <span className="text-xs font-medium text-muted-foreground">
              Theatre Status:
            </span>
            {theatres.map((theatre) => (
              <div
                key={theatre.id}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                  theatre.status === "active" &&
                    "border-success/30 bg-success/10 text-success",
                  theatre.status === "idle" &&
                    "border-border bg-muted text-muted-foreground",
                  theatre.status === "cleaning" &&
                    "border-warning/30 bg-warning/10 text-warning-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    theatre.status === "active" && "bg-success",
                    theatre.status === "idle" && "bg-muted-foreground",
                    theatre.status === "cleaning" && "bg-warning"
                  )}
                />
                {theatre.name}
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
                <SelectTrigger className="h-8 w-40 text-xs">
                  <SelectValue placeholder="All Theatres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Theatres</SelectItem>
                  {theatres.map((theatre) => (
                    <SelectItem key={theatre.id} value={theatre.name}>
                      {theatre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="text-xs">
                {filteredSchedule.length} cases
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <FileText className="mr-1.5 h-3.5 w-3.5" />
                Export List
              </Button>
              <Button size="sm" className="h-8 text-xs">
                <Mic className="mr-1.5 h-3.5 w-3.5" />
                Start Capture
              </Button>
            </div>
          </div>

          {/* Case List */}
          <div className="mt-4 space-y-3">
            {filteredSchedule.map((item) => (
              <Collapsible
                key={item.id}
                open={expandedCase === item.id}
                onOpenChange={(open) => setExpandedCase(open ? item.id : null)}
              >
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors">
                      {/* Time Block */}
                      <div className="w-24 shrink-0">
                        <p className="text-sm font-semibold text-card-foreground">
                          {item.time.split(" - ")[0]}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.theatre}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="w-24 shrink-0">
                        <StatusBadge status={item.status} />
                      </div>

                      {/* Patient & Procedure */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-card-foreground truncate">
                            {item.patient}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {item.mrn}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.procedure}
                        </p>
                      </div>

                      {/* Surgeon */}
                      <div className="w-32 shrink-0 text-right">
                        <p className="text-xs font-medium text-card-foreground">
                          {item.surgeon}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.anaesthetist}
                        </p>
                      </div>

                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          expandedCase === item.id && "rotate-180"
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t border-border bg-muted/20 p-4">
                      {/* Phase Progress */}
                      <div className="flex items-center justify-between">
                        <PhaseIndicator phases={item.phases} />
                        {"currentPhase" in item && (
                          <div className="flex items-center gap-2 text-xs text-primary">
                            <Timer className="h-3.5 w-3.5" />
                            <span className="font-medium">
                              {item.currentPhase}: {item.elapsedTime}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Details Grid */}
                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Patient Details
                          </p>
                          <div className="rounded-md border border-border bg-card p-3">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-card-foreground">
                                  {item.patient}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Age: {item.age} • {item.mrn}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Timing
                          </p>
                          <div className="rounded-md border border-border bg-card p-3">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-card-foreground">
                                  {item.time}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Estimated duration
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Actions
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 flex-1 text-xs"
                            >
                              <FileText className="mr-1.5 h-3.5 w-3.5" />
                              Op Note
                            </Button>
                            <Button size="sm" className="h-8 flex-1 text-xs">
                              <Mic className="mr-1.5 h-3.5 w-3.5" />
                              Capture
                            </Button>
                          </div>
                        </div>
                      </div>

                      {"notes" in item && item.notes && (
                        <div className="mt-4 rounded-md border border-border bg-card p-3">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Surgical Notes
                          </p>
                          <p className="mt-1 text-sm text-card-foreground">
                            {item.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
