"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { PatientCard } from "@/components/patient-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Download, RefreshCw } from "lucide-react"

const takePatients = [
  {
    id: "1",
    name: "James Wilson",
    mrn: "MRN-2024-0892",
    age: 45,
    location: "A&E Majors",
    diagnosis: "Right tibial plateau fracture following RTC. CT awaited. Neurovascularly intact.",
    status: "urgent" as const,
    lastUpdated: "25 mins ago",
    consultant: "Ms. Patel",
  },
  {
    id: "2",
    name: "Patricia Holmes",
    mrn: "MRN-2024-0895",
    age: 78,
    location: "Ward 4B",
    diagnosis: "Left NOF fracture. For theatre tomorrow AM. Pre-op bloods sent.",
    status: "scheduled" as const,
    lastUpdated: "1 hour ago",
    consultant: "Mr. Thompson",
  },
  {
    id: "3",
    name: "Thomas Wright",
    mrn: "MRN-2024-0896",
    age: 62,
    location: "A&E",
    diagnosis: "Displaced distal radius fracture. Suitable for MUA in plaster room.",
    status: "pending" as const,
    lastUpdated: "2 hours ago",
    consultant: "Ms. Patel",
  },
  {
    id: "4",
    name: "Rachel Green",
    mrn: "MRN-2024-0897",
    age: 34,
    location: "Ambulatory Care",
    diagnosis: "Suspected scaphoid fracture. XR NAD. For MRI OP.",
    status: "pending" as const,
    lastUpdated: "3 hours ago",
    consultant: "Mr. Thompson",
  },
  {
    id: "5",
    name: "David Kim",
    mrn: "MRN-2024-0898",
    age: 28,
    location: "A&E Resus",
    diagnosis: "Polytrauma - open tibial fracture, pelvic fracture. Currently in CT.",
    status: "urgent" as const,
    lastUpdated: "5 mins ago",
    consultant: "Mr. Thompson",
  },
]

export default function TakeListPage() {
  const urgentCount = takePatients.filter((p) => p.status === "urgent").length

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Take List"
          subtitle="On-call admissions and referrals"
        />
        <div className="p-6">
          {/* Status Bar */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  On Take:
                </span>
                <Badge variant="secondary" className="text-xs">
                  Mr. Thompson / Ms. Patel
                </Badge>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Patients:
                </span>
                <Badge className="text-xs">{takePatients.length}</Badge>
                {urgentCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {urgentCount} Urgent
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Export
              </Button>
              <Button size="sm" className="h-8 text-xs">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Add Patient
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-36 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-36 text-xs">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="ae">A&E</SelectItem>
                <SelectItem value="ward">Ward</SelectItem>
                <SelectItem value="ambulatory">Ambulatory</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-40 text-xs">
                <SelectValue placeholder="Consultant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Consultants</SelectItem>
                <SelectItem value="thompson">Mr. Thompson</SelectItem>
                <SelectItem value="patel">Ms. Patel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Patient List */}
          <div className="mt-4 space-y-3">
            {takePatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
