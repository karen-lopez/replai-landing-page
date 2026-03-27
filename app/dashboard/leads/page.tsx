"use client"

import { useState, useMemo } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockLeads, type Lead } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const ITEMS_PER_PAGE = 10

export default function LeadsPage() {
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter leads by date range
  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const leadDate = new Date(lead.date)

      if (dateFrom && leadDate < dateFrom) return false
      if (dateTo) {
        const endOfDay = new Date(dateTo)
        endOfDay.setHours(23, 59, 59, 999)
        if (leadDate > endOfDay) return false
      }

      return true
    })
  }, [dateFrom, dateTo])

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const clearFilters = () => {
    setDateFrom(undefined)
    setDateTo(undefined)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Leads"
        description="Clientes potenciales que han mostrado interes"
      />

      {/* Date Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Desde:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !dateFrom && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? (
                  format(dateFrom, "PPP", { locale: es })
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={(date) => {
                  setDateFrom(date)
                  setCurrentPage(1)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Hasta:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !dateTo && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? (
                  format(dateTo, "PPP", { locale: es })
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={(date) => {
                  setDateTo(date)
                  setCurrentPage(1)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {(dateFrom || dateTo) && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm">
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Leads Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Telefono</TableHead>
              <TableHead className="hidden md:table-cell">Mensaje</TableHead>
              <TableHead className="w-[120px]">Fecha</TableHead>
              <TableHead className="w-[80px]">Hora</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No se encontraron leads en el rango seleccionado
                </TableCell>
              </TableRow>
            ) : (
              paginatedLeads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} -{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length)} de{" "}
              {filteredLeads.length}
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
  )
}

function LeadRow({ lead }: { lead: Lead }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{lead.customerPhone}</TableCell>
      <TableCell className="hidden md:table-cell max-w-[400px]">
        <p className="truncate text-muted-foreground">{lead.message}</p>
      </TableCell>
      <TableCell>{lead.date}</TableCell>
      <TableCell className="text-muted-foreground">{lead.time}</TableCell>
    </TableRow>
  )
}
