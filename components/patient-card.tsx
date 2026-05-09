"use client"

import { MoreHorizontal, FileText, Mic, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PatientCardProps {
  patient: {
    id: string
    name: string
    mrn: string
    age: number
    location: string
    diagnosis: string
    status: "pending" | "in-progress" | "completed" | "urgent" | "scheduled" | "draft"
    lastUpdated: string
    consultant?: string
  }
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-card-foreground">
                {patient.name}
              </h3>
              <StatusBadge status={patient.status} />
            </div>
            <p className="text-xs text-muted-foreground">
              MRN: {patient.mrn} • Age: {patient.age} • {patient.location}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Record</DropdownMenuItem>
            <DropdownMenuItem>Generate Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3 space-y-2">
        <p className="text-sm text-card-foreground">{patient.diagnosis}</p>
        {patient.consultant && (
          <p className="text-xs text-muted-foreground">
            Consultant: {patient.consultant}
          </p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {patient.lastUpdated}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs">
            <FileText className="h-3 w-3" />
            Notes
          </Button>
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs">
            <Mic className="h-3 w-3" />
            Capture
          </Button>
        </div>
      </div>
    </div>
  )
}
