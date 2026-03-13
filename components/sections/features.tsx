"use client"

import { Clock, Calendar, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Clock,
    title: "Respuestas automaticas 24/7",
    description: "Responde preguntas frecuentes sobre precios, horarios y servicios sin que estes conectada"
  },
  {
    icon: Calendar,
    title: "Captura de citas",
    description: "Detecta cuando un cliente quiere agendar y te notifica de inmediato para que no pierdas ninguna venta"
  },
  {
    icon: FileText,
    title: "Resumen diario de tu negocio",
    description: "Cada tarde recibes un reporte por WhatsApp: cuantos clientes escribieron, que preguntaron y cuantos querian cita"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Todo lo que necesitas
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
