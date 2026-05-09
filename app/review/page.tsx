"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Filter,
  ChevronRight,
} from "lucide-react"

const reviewItems = [
  {
    id: "1",
    patient: "Sarah Mitchell",
    mrn: "MRN-2024-0891",
    type: "Ward Round Note",
    capturedBy: "Dr. J. Davis",
    capturedAt: "Today, 09:15",
    wordCount: 342,
    status: "pending" as const,
    priority: "normal",
  },
  {
    id: "2",
    patient: "James Wilson",
    mrn: "MRN-2024-0892",
    type: "Admission Note",
    capturedBy: "Dr. A. Smith",
    capturedAt: "Today, 08:45",
    wordCount: 512,
    status: "urgent" as const,
    priority: "high",
  },
  {
    id: "3",
    patient: "Emily Brown",
    mrn: "MRN-2024-0893",
    type: "Operative Note",
    capturedBy: "Dr. J. Davis",
    capturedAt: "Yesterday, 16:30",
    wordCount: 876,
    status: "pending" as const,
    priority: "normal",
  },
  {
    id: "4",
    patient: "Robert Edwards",
    mrn: "MRN-2024-0901",
    type: "Operative Note",
    capturedBy: "Mr. Thompson",
    capturedAt: "Today, 10:30",
    wordCount: 654,
    status: "draft" as const,
    priority: "normal",
  },
  {
    id: "5",
    patient: "Amit Singh",
    mrn: "MRN-2024-0902",
    type: "Pre-Op Assessment",
    capturedBy: "Dr. J. Davis",
    capturedAt: "Yesterday, 14:00",
    wordCount: 298,
    status: "completed" as const,
    priority: "normal",
  },
]

export default function ReviewQueuePage() {
  const pendingCount = reviewItems.filter(
    (item) => item.status === "pending" || item.status === "urgent"
  ).length

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Review Queue"
          subtitle={`${pendingCount} items awaiting review`}
        />
        <div className="p-6">
          {/* Stats Strip */}
          <div className="flex items-center gap-6 rounded-lg border border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-lg font-semibold text-card-foreground">
                  {pendingCount}
                </p>
                <p className="text-[10px] text-muted-foreground">Pending</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-lg font-semibold text-card-foreground">1</p>
                <p className="text-[10px] text-muted-foreground">Urgent</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-lg font-semibold text-card-foreground">12</p>
                <p className="text-[10px] text-muted-foreground">
                  Completed Today
                </p>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-4 flex items-center justify-between">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList className="h-8">
                <TabsTrigger value="all" className="h-7 px-3 text-xs">
                  All
                  <Badge variant="secondary" className="ml-1.5 h-4 px-1.5 text-[10px]">
                    {reviewItems.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending" className="h-7 px-3 text-xs">
                  Pending
                  <Badge variant="secondary" className="ml-1.5 h-4 px-1.5 text-[10px]">
                    {pendingCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="h-7 px-3 text-xs">
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <Select defaultValue="all-types">
                <SelectTrigger className="h-8 w-36 text-xs">
                  <Filter className="mr-1.5 h-3.5 w-3.5" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="op-note">Operative Notes</SelectItem>
                  <SelectItem value="ward-round">Ward Round Notes</SelectItem>
                  <SelectItem value="admission">Admission Notes</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Review List */}
          <div className="mt-4 rounded-lg border border-border bg-card">
            <div className="divide-y divide-border">
              {reviewItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                >
                  <Checkbox className="h-4 w-4" />
                  
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary shrink-0">
                    {item.patient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-card-foreground">
                        {item.patient}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {item.mrn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        • {item.wordCount} words
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-card-foreground">
                      {item.capturedBy}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {item.capturedAt}
                    </p>
                  </div>

                  <StatusBadge status={item.status} />

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs shrink-0"
                  >
                    Review
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <Checkbox className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">
                Select all on this page
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                disabled
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Approve Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                disabled
              >
                <XCircle className="mr-1.5 h-3.5 w-3.5" />
                Request Changes
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
