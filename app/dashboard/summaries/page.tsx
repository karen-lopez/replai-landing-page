"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  MessageSquare,
  Percent,
  UserPlus,
  CalendarCheck,
  AlertCircle,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { mockDailySummaries, type DailySummary } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function SummariesPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Resumenes Diarios"
        description="Historial de actividad diaria de tu asistente"
      />

      {/* Summaries List */}
      <div className="space-y-4">
        {mockDailySummaries.map((summary) => (
          <SummaryCard key={summary.id} summary={summary} />
        ))}
      </div>
    </div>
  )
}

function SummaryCard({ summary }: { summary: DailySummary }) {
  const formattedDate = format(new Date(summary.date), "EEEE, d 'de' MMMM", {
    locale: es,
  })

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="border-b bg-muted/30 px-6 py-4">
          <h3 className="font-semibold capitalize text-[#1B3A5C]">
            {formattedDate}
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-5">
          <StatItem
            icon={MessageSquare}
            label="Mensajes Recibidos"
            value={summary.messagesReceived}
          />
          <StatItem
            icon={Percent}
            label="Tasa Automatizacion"
            value={`${summary.automatedRate}%`}
            highlight={summary.automatedRate >= 90}
          />
          <StatItem
            icon={UserPlus}
            label="Leads"
            value={summary.leads}
          />
          <StatItem
            icon={CalendarCheck}
            label="Citas"
            value={summary.appointments}
          />
          <StatItem
            icon={AlertCircle}
            label="Sin Responder"
            value={summary.unansweredMessages}
            warning={summary.unansweredMessages > 5}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  highlight?: boolean
  warning?: boolean
}

function StatItem({
  icon: Icon,
  label,
  value,
  highlight,
  warning,
}: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          warning
            ? "bg-red-100 text-red-600"
            : highlight
              ? "bg-emerald-100 text-emerald-600"
              : "bg-[#0F6E56]/10 text-[#0F6E56]"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={cn(
            "text-xl font-bold",
            warning
              ? "text-red-600"
              : highlight
                ? "text-emerald-600"
                : "text-foreground"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  )
}
