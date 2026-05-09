"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Mic,
  MicOff,
  Square,
  Search,
  Clock,
  User,
  FileText,
  Volume2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const recentPatients = [
  { id: "1", name: "Sarah Mitchell", mrn: "MRN-2024-0891", ward: "Ward 4B" },
  { id: "2", name: "James Wilson", mrn: "MRN-2024-0892", ward: "Ward 3A" },
  { id: "3", name: "Emily Brown", mrn: "MRN-2024-0893", ward: "ICU" },
  { id: "4", name: "Michael Chen", mrn: "MRN-2024-0894", ward: "Ward 4B" },
]

export default function BedsidePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Bedside Capture"
          subtitle="Record patient encounters in real-time"
        />
        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            {/* Patient Selection */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="text-sm font-semibold text-card-foreground mb-3">
                Select Patient
              </h2>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or MRN..."
                    className="h-10 pl-9"
                  />
                </div>
                <Select defaultValue="ward-4b">
                  <SelectTrigger className="h-10 w-40">
                    <SelectValue placeholder="Filter by ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Wards</SelectItem>
                    <SelectItem value="ward-4b">Ward 4B</SelectItem>
                    <SelectItem value="ward-3a">Ward 3A</SelectItem>
                    <SelectItem value="icu">ICU</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Recent Patients */}
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">
                  Recent Patients
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {recentPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                        selectedPatient === patient.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">
                          {patient.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {patient.mrn} • {patient.ward}
                        </p>
                      </div>
                      {selectedPatient === patient.id && (
                        <Badge className="h-5 text-[10px]">Selected</Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recording Interface */}
            <div className="mt-6 rounded-lg border border-border bg-card p-6">
              <div className="flex flex-col items-center">
                {/* Recording Status */}
                <div
                  className={cn(
                    "mb-6 flex items-center gap-2 rounded-full px-4 py-2",
                    isRecording
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isRecording ? (
                    <>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
                      <span className="text-sm font-medium">Recording</span>
                      <span className="text-sm font-mono">
                        {formatTime(recordingTime)}
                      </span>
                    </>
                  ) : (
                    <>
                      <MicOff className="h-4 w-4" />
                      <span className="text-sm">Ready to record</span>
                    </>
                  )}
                </div>

                {/* Main Record Button */}
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  disabled={!selectedPatient}
                  className={cn(
                    "flex h-32 w-32 items-center justify-center rounded-full transition-all",
                    isRecording
                      ? "bg-destructive hover:bg-destructive/90"
                      : selectedPatient
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-muted cursor-not-allowed"
                  )}
                >
                  {isRecording ? (
                    <Square className="h-10 w-10 text-white" fill="white" />
                  ) : (
                    <Mic
                      className={cn(
                        "h-12 w-12",
                        selectedPatient ? "text-white" : "text-muted-foreground"
                      )}
                    />
                  )}
                </button>

                <p className="mt-4 text-sm text-muted-foreground">
                  {!selectedPatient
                    ? "Select a patient to start recording"
                    : isRecording
                      ? "Tap to stop recording"
                      : "Tap to start bedside capture"}
                </p>

                {/* Audio Level Indicator */}
                {isRecording && (
                  <div className="mt-6 flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-0.5">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-4 w-1 rounded-full transition-all",
                            i < 7 ? "bg-primary" : "bg-muted"
                          )}
                          style={{
                            height: `${Math.random() * 16 + 8}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Capture Options */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-card-foreground">
                    Template
                  </p>
                </div>
                <Select defaultValue="ward-round">
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ward-round">Ward Round Note</SelectItem>
                    <SelectItem value="admission">Admission Note</SelectItem>
                    <SelectItem value="discharge">Discharge Summary</SelectItem>
                    <SelectItem value="procedure">Procedure Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-card-foreground">
                    Attendees
                  </p>
                </div>
                <Select defaultValue="solo">
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo Review</SelectItem>
                    <SelectItem value="team">Team Round</SelectItem>
                    <SelectItem value="mdt">MDT Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-card-foreground">
                    Max Duration
                  </p>
                </div>
                <Select defaultValue="15">
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
