"use client"

import { MessageCircle, Zap, Bell } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    title: "Un cliente te escribe por WhatsApp",
    description: "Tu cliente pregunta por precios, disponibilidad o servicios a cualquier hora"
  },
  {
    icon: Zap,
    title: "Replai responde al instante",
    description: "El asistente contesta las preguntas frecuentes automaticamente, sin que tu hagas nada"
  },
  {
    icon: Bell,
    title: "Tu solo apareces cuando importa",
    description: "Cuando un cliente quiere agendar una cita, te avisamos de inmediato. Lo demas lo manejamos nosotros."
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Como funciona
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
