"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { defaultBusinessSettings, type BusinessSettings } from "@/lib/mock-data"
import { toast } from "sonner"

// Generate time options (00:00 to 23:30 in 30-minute intervals)
const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2)
  const minutes = i % 2 === 0 ? "00" : "30"
  return `${hours.toString().padStart(2, "0")}:${minutes}`
})

export default function SettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings>(defaultBusinessSettings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success("Configuracion guardada correctamente")
  }

  const updateSchedule = (
    dayIndex: number,
    field: "isOpen" | "openTime" | "closeTime",
    value: boolean | string
  ) => {
    setSettings((prev) => ({
      ...prev,
      schedule: prev.schedule.map((day, i) =>
        i === dayIndex ? { ...day, [field]: value } : day
      ),
    }))
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Configuracion"
        description="Ajusta la configuracion de tu asistente de WhatsApp"
      >
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#0F6E56] hover:bg-[#0d5f49]"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </DashboardHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1B3A5C]">Datos del Negocio</CardTitle>
            <CardDescription>
              Informacion basica de tu negocio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del Negocio</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                placeholder="Ej: Mi Empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Telefono del Propietario</Label>
              <Input
                id="ownerPhone"
                value={settings.ownerPhone}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    ownerPhone: e.target.value,
                  }))
                }
                placeholder="Ej: +57 300 000 0000"
              />
            </div>
          </CardContent>
        </Card>

        {/* Assistant Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1B3A5C]">Configuracion del Asistente</CardTitle>
            <CardDescription>
              Personaliza tu asistente virtual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assistantName">Nombre del Asistente</Label>
              <Input
                id="assistantName"
                value={settings.assistantName}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    assistantName: e.target.value,
                  }))
                }
                placeholder="Ej: Asistente Virtual"
              />
              <p className="text-xs text-muted-foreground">
                Este nombre se usara cuando el bot se presente a los clientes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#1B3A5C]">Horario de Atencion</CardTitle>
            <CardDescription>
              Define los horarios en que tu asistente estara activo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.schedule.map((day, index) => (
                <div
                  key={day.day}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={day.isOpen}
                      onCheckedChange={(checked) =>
                        updateSchedule(index, "isOpen", checked)
                      }
                      aria-label={`Activar ${day.day}`}
                    />
                    <span
                      className={`w-24 font-medium ${
                        day.isOpen ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {day.day}
                    </span>
                  </div>

                  {day.isOpen ? (
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm text-muted-foreground sr-only">
                          Apertura
                        </Label>
                        <Select
                          value={day.openTime}
                          onValueChange={(value) =>
                            updateSchedule(index, "openTime", value)
                          }
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={`open-${time}`} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <span className="text-muted-foreground">a</span>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm text-muted-foreground sr-only">
                          Cierre
                        </Label>
                        <Select
                          value={day.closeTime}
                          onValueChange={(value) =>
                            updateSchedule(index, "closeTime", value)
                          }
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={`close-${time}`} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Cerrado
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
