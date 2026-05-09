"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Mic,
  FileText,
  ClipboardList,
  Scissors,
  AlertTriangle,
  Activity,
  Settings,
  Database,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const navigation = [
  {
    group: "Clinical",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Bedside Capture", href: "/bedside", icon: Mic },
      { name: "Review Queue", href: "/review", icon: FileText },
      { name: "Take List", href: "/take-list", icon: ClipboardList },
    ],
  },
  {
    group: "Theatre",
    items: [
      { name: "Theatre Workflow", href: "/theatre", icon: Scissors },
    ],
  },
  {
    group: "Meetings",
    items: [
      { name: "Trauma Meeting", href: "/trauma", icon: AlertTriangle },
      { name: "Post-Take Round", href: "/post-take", icon: Activity },
    ],
  },
  {
    group: "Admin",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Data Hub", href: "/data-hub", icon: Database },
      { name: "Help", href: "/help", icon: HelpCircle },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-56 flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <Activity className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">Ortho Ambient</span>
          <span className="text-[10px] text-sidebar-muted">Clinical Documentation</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {navigation.map((section) => (
          <Collapsible key={section.group} defaultOpen className="space-y-1">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-sidebar-muted hover:text-sidebar-foreground">
              {section.group}
              <ChevronDown className="h-3 w-3 transition-transform duration-200 [[data-state=closed]>&]:rotate-[-90deg]" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive && "text-sidebar-primary")} />
                    {item.name}
                  </Link>
                )
              })}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium text-sidebar-accent-foreground">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-sidebar-foreground">Dr. J. Davis</span>
            <span className="text-[10px] text-sidebar-muted">Orthopaedic Registrar</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
