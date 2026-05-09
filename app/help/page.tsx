"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Mail,
  ChevronRight,
  Mic,
  FileText,
  Settings,
  Shield,
} from "lucide-react"

const helpTopics = [
  {
    icon: Mic,
    title: "Bedside Capture",
    description: "Learn how to record patient encounters",
    articles: 8,
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Templates, auto-generation, and review",
    articles: 12,
  },
  {
    icon: Settings,
    title: "Settings & Setup",
    description: "Configure your account and preferences",
    articles: 6,
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Data protection and compliance",
    articles: 4,
  },
]

const popularArticles = [
  "How to start a bedside capture",
  "Understanding the review queue",
  "Customizing documentation templates",
  "Exporting reports to EPR",
  "Managing team access",
]

export default function HelpPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 pl-56">
        <AppHeader title="Help Centre" subtitle="Guides, tutorials, and support" />
        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            {/* Search */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-card-foreground text-center">
                How can we help you?
              </h2>
              <div className="relative mt-4 max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles..."
                  className="h-11 pl-10"
                />
              </div>
            </div>

            {/* Topics Grid */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {helpTopics.map((topic) => (
                <button
                  key={topic.title}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 text-left hover:border-primary/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-card-foreground">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {topic.description}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {topic.articles} articles
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
                </button>
              ))}
            </div>

            {/* Popular Articles & Support */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* Popular Articles */}
              <div className="rounded-lg border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-card-foreground">
                      Popular Articles
                    </h2>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {popularArticles.map((article) => (
                    <button
                      key={article}
                      className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-sm text-card-foreground">
                        {article}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Support Options */}
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-card-foreground">
                        Video Tutorials
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Watch step-by-step guides
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Watch
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-card-foreground">
                        Live Chat
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Chat with our support team
                      </p>
                    </div>
                    <Button size="sm" className="h-8 text-xs">
                      Start Chat
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-card-foreground">
                        Email Support
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        support@orthoambient.com
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
