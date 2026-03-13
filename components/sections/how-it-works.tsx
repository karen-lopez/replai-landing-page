"use client"

import { MessageCircle, Zap, Bell } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Un cliente te escribe por WhatsApp",
    description: "Tu cliente pregunta por precios, disponibilidad o servicios, a cualquier hora del dia o de la noche."
  },
  {
    icon: Zap,
    step: "02",
    title: "Replai responde al instante",
    description: "El asistente contesta las preguntas frecuentes automaticamente. Tu no tienes que hacer nada."
  },
  {
    icon: Bell,
    step: "03",
    title: "Tu solo apareces cuando importa",
    description: "Cuando un cliente quiere agendar una cita, te avisamos de inmediato. Lo demas lo manejamos nosotros."
  }
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#0F6E56] font-semibold uppercase tracking-widest text-sm mb-3">Proceso simple</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1B3A5C] md:text-4xl text-balance">
            Como funciona Replai
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line between steps */}
              {index < 2 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%+1px)] w-full h-px bg-[#1B3A5C]/10 z-0" style={{width: 'calc(100% - 4rem)', left: 'calc(50% + 2.5rem)'}} />
              )}
              <div className="flex flex-col items-center text-center gap-5 p-8 rounded-2xl border border-[#1B3A5C]/10 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#1B3A5C] flex items-center justify-center shadow-lg">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1B3A5C] leading-snug">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
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
