"use client"

import { Clock, Calendar, FileText } from "lucide-react"

const features = [
  {
    icon: Clock,
    color: "bg-[#1B3A5C]",
    title: "Respuestas automaticas 24/7",
    description: "Mientras atendes a tu clienta en silla, Replai responde a las otras que preguntan por precios, horarios y disponibilidad. Nunca se queda un mensaje sin respuesta."
  },
  {
    icon: Calendar,
    color: "bg-[#0F6E56]",
    title: "Captura de citas sin esfuerzo",
    description: "Detecta cuando un cliente quiere agendar y te notifica al instante con todos los detalles. Tu solo confirmas — nosotros hacemos el trabajo."
  },
  {
    icon: FileText,
    color: "bg-[#1B3A5C]",
    title: "Resumen diario de tu negocio",
    description: "Cada tarde recibes por WhatsApp un reporte completo: cuantas personas escribieron, que preguntaron y cuantas quieren cita."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-[#F4F7FB]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#0F6E56] font-semibold uppercase tracking-widest text-sm mb-3">Funcionalidades</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1B3A5C] md:text-4xl text-balance">
            Todo lo que necesita tu salon o spa
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 border border-[#1B3A5C]/8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 shadow-md`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
