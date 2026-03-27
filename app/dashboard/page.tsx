"use client"

import { useState } from "react"
import { MessageSquare, Percent, UserPlus, CalendarCheck, Bot, User } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatCard } from "@/components/dashboard/stat-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockConversations, mockStats, type Conversation } from "@/lib/mock-data"

const ITEMS_PER_PAGE = 10

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<"today" | "week" | "month">("today")
  const [currentPage, setCurrentPage] = useState(1)

  const totalMessages =
    timePeriod === "today"
      ? mockStats.totalMessagesToday
      : timePeriod === "week"
        ? mockStats.totalMessagesWeek
        : mockStats.totalMessagesMonth

  const totalPages = Math.ceil(mockConversations.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedConversations = mockConversations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Resumen"
        description="Vista general de tu asistente de WhatsApp"
      >
        <Select
          value={timePeriod}
          onValueChange={(value: "today" | "week" | "month") =>
            setTimePeriod(value)
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoy</SelectItem>
            <SelectItem value="week">Esta semana</SelectItem>
            <SelectItem value="month">Este mes</SelectItem>
          </SelectContent>
        </Select>
      </DashboardHeader>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Mensajes Totales"
          value={totalMessages}
          icon={MessageSquare}
          description={
            timePeriod === "today"
              ? "Hoy"
              : timePeriod === "week"
                ? "Esta semana"
                : "Este mes"
          }
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Tasa de Automatizacion"
          value={`${mockStats.automatedResponseRate}%`}
          icon={Percent}
          description="Respuestas automaticas"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Nuevos Leads"
          value={mockStats.newLeadsToday}
          icon={UserPlus}
          description="Hoy"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Solicitudes de Cita"
          value={mockStats.appointmentRequestsToday}
          icon={CalendarCheck}
          description="Hoy"
        />
      </div>

      {/* Recent Conversations */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1B3A5C]">
          Conversaciones Recientes
        </h2>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Telefono</TableHead>
                <TableHead className="hidden md:table-cell">
                  Ultimo mensaje
                </TableHead>
                <TableHead>Tiempo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedConversations.map((conversation) => (
                <ConversationRow
                  key={conversation.id}
                  conversation={conversation}
                />
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} -{" "}
                {Math.min(startIndex + ITEMS_PER_PAGE, mockConversations.length)}{" "}
                de {mockConversations.length}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ConversationRow({ conversation }: { conversation: Conversation }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{conversation.customerPhone}</TableCell>
      <TableCell className="hidden max-w-[300px] truncate md:table-cell">
        {conversation.lastMessage}
      </TableCell>
      <TableCell className="text-muted-foreground">{conversation.time}</TableCell>
      <TableCell>
        <Badge
          variant={conversation.status === "bot" ? "default" : "secondary"}
          className={
            conversation.status === "bot"
              ? "bg-[#0F6E56] hover:bg-[#0d5f49]"
              : ""
          }
        >
          {conversation.status === "bot" ? (
            <>
              <Bot className="mr-1 h-3 w-3" />
              Bot
            </>
          ) : (
            <>
              <User className="mr-1 h-3 w-3" />
              Humano
            </>
          )}
        </Badge>
      </TableCell>
    </TableRow>
  )
}
