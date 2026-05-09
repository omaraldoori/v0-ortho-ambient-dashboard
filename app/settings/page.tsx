"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  User,
  Bell,
  Shield,
  Mic,
  FileText,
  Building2,
  ChevronDown,
  Save,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const settingsSections = [
  {
    id: "profile",
    title: "Profile Settings",
    icon: User,
    description: "Manage your account information and preferences",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Configure how you receive alerts and updates",
  },
  {
    id: "capture",
    title: "Capture Settings",
    icon: Mic,
    description: "Audio capture and transcription preferences",
  },
  {
    id: "documentation",
    title: "Documentation",
    icon: FileText,
    description: "Templates and auto-generation settings",
  },
  {
    id: "organisation",
    title: "Organisation",
    icon: Building2,
    description: "Hospital and department configuration",
    admin: true,
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    description: "Authentication and data protection settings",
    admin: true,
  },
]

export default function SettingsPage() {
  const [expandedSection, setExpandedSection] = useState<string>("profile")
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = () => {
    setHasChanges(true)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader
          title="Settings"
          subtitle="Manage your preferences and configuration"
          actions={
            hasChanges && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setHasChanges(false)}
                >
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setHasChanges(false)}
                >
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </div>
            )
          }
        />
        <div className="p-6">
          <div className="mx-auto max-w-3xl space-y-4">
            {settingsSections.map((section) => (
              <Collapsible
                key={section.id}
                open={expandedSection === section.id}
                onOpenChange={(open) =>
                  setExpandedSection(open ? section.id : "")
                }
              >
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg",
                          section.admin
                            ? "bg-destructive/10"
                            : "bg-primary/10"
                        )}
                      >
                        <section.icon
                          className={cn(
                            "h-4.5 w-4.5",
                            section.admin
                              ? "text-destructive"
                              : "text-primary"
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-card-foreground">
                            {section.title}
                          </h3>
                          {section.admin && (
                            <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          expandedSection === section.id && "rotate-180"
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t border-border p-4">
                      {section.id === "profile" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label className="text-xs">Full Name</Label>
                              <Input
                                defaultValue="Dr. James Davis"
                                className="h-9 text-sm"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Email</Label>
                              <Input
                                defaultValue="j.davis@nhs.uk"
                                className="h-9 text-sm"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Role</Label>
                              <Select
                                defaultValue="registrar"
                                onValueChange={handleChange}
                              >
                                <SelectTrigger className="h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="consultant">
                                    Consultant
                                  </SelectItem>
                                  <SelectItem value="registrar">
                                    Registrar
                                  </SelectItem>
                                  <SelectItem value="sho">SHO</SelectItem>
                                  <SelectItem value="fy">FY Doctor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Specialty</Label>
                              <Select
                                defaultValue="ortho"
                                onValueChange={handleChange}
                              >
                                <SelectTrigger className="h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ortho">
                                    Orthopaedic Surgery
                                  </SelectItem>
                                  <SelectItem value="trauma">
                                    Trauma Surgery
                                  </SelectItem>
                                  <SelectItem value="spine">
                                    Spine Surgery
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Dark Mode
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Enable dark theme for the interface
                              </p>
                            </div>
                            <Switch onCheckedChange={handleChange} />
                          </div>
                        </div>
                      )}

                      {section.id === "notifications" && (
                        <div className="space-y-4">
                          {[
                            {
                              title: "Review Queue Alerts",
                              description:
                                "Notify when new items require review",
                              defaultChecked: true,
                            },
                            {
                              title: "Theatre Updates",
                              description:
                                "Real-time theatre status notifications",
                              defaultChecked: true,
                            },
                            {
                              title: "Urgent Patient Alerts",
                              description:
                                "Immediate notifications for urgent cases",
                              defaultChecked: true,
                            },
                            {
                              title: "Daily Summary",
                              description:
                                "End of day summary email",
                              defaultChecked: false,
                            },
                            {
                              title: "Sound Alerts",
                              description:
                                "Play sound for high-priority notifications",
                              defaultChecked: false,
                            },
                          ].map((item) => (
                            <div
                              key={item.title}
                              className="flex items-center justify-between"
                            >
                              <div>
                                <p className="text-sm font-medium text-card-foreground">
                                  {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                              <Switch
                                defaultChecked={item.defaultChecked}
                                onCheckedChange={handleChange}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === "capture" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label className="text-xs">
                                Default Microphone
                              </Label>
                              <Select
                                defaultValue="default"
                                onValueChange={handleChange}
                              >
                                <SelectTrigger className="h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">
                                    System Default
                                  </SelectItem>
                                  <SelectItem value="headset">
                                    USB Headset
                                  </SelectItem>
                                  <SelectItem value="laptop">
                                    Laptop Microphone
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Audio Quality</Label>
                              <Select
                                defaultValue="high"
                                onValueChange={handleChange}
                              >
                                <SelectTrigger className="h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">
                                    Low (faster processing)
                                  </SelectItem>
                                  <SelectItem value="medium">
                                    Medium (balanced)
                                  </SelectItem>
                                  <SelectItem value="high">
                                    High (best accuracy)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Auto-punctuation
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Automatically add punctuation to transcripts
                              </p>
                            </div>
                            <Switch
                              defaultChecked
                              onCheckedChange={handleChange}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Medical Terminology
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Enhanced recognition for medical terms
                              </p>
                            </div>
                            <Switch
                              defaultChecked
                              onCheckedChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      {section.id === "documentation" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Default Template</Label>
                            <Select
                              defaultValue="ortho-standard"
                              onValueChange={handleChange}
                            >
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ortho-standard">
                                  Orthopaedic Standard
                                </SelectItem>
                                <SelectItem value="trauma">
                                  Trauma Assessment
                                </SelectItem>
                                <SelectItem value="post-op">
                                  Post-Operative Note
                                </SelectItem>
                                <SelectItem value="clinic">
                                  Clinic Letter
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Auto-generate Op Notes
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Automatically draft operative notes from
                                captures
                              </p>
                            </div>
                            <Switch
                              defaultChecked
                              onCheckedChange={handleChange}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Include Timestamps
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Add timestamps to generated documentation
                              </p>
                            </div>
                            <Switch onCheckedChange={handleChange} />
                          </div>
                        </div>
                      )}

                      {section.id === "organisation" && (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label className="text-xs">Hospital</Label>
                              <Input
                                defaultValue="Royal Orthopaedic Hospital"
                                className="h-9 text-sm"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Department</Label>
                              <Input
                                defaultValue="Orthopaedic Surgery"
                                className="h-9 text-sm"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <Separator />
                          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
                            <p className="text-xs font-medium text-destructive">
                              Admin Access Required
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Contact your system administrator to modify
                              organisation settings.
                            </p>
                          </div>
                        </div>
                      )}

                      {section.id === "security" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Two-Factor Authentication
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Require 2FA for login
                              </p>
                            </div>
                            <Switch
                              defaultChecked
                              onCheckedChange={handleChange}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Session Timeout
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Auto-logout after inactivity
                              </p>
                            </div>
                            <Select
                              defaultValue="30"
                              onValueChange={handleChange}
                            >
                              <SelectTrigger className="h-8 w-32 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Separator />
                          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
                            <p className="text-xs font-medium text-destructive">
                              Admin Access Required
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Security policies are managed by your IT
                              department.
                            </p>
                          </div>
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
