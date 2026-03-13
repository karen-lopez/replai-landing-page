"use client"

const summaries = [
  {
    business: "Salon Valentina",
    type: "Salon de belleza",
    color: "from-[#1B3A5C] to-[#0F6E56]",
    stats: {
      messages: 23,
      newClients: 8,
      appointments: 6,
      autoReplied: 18,
    },
    topQuestions: [
      { question: "Precio manicure", count: 7 },
      { question: "Horario de atencion", count: 5 },
      { question: "Disponibilidad sabado", count: 4 },
    ]
  },
  {
    business: "Spa Serenity",
    type: "Spa",
    color: "from-[#0F6E56] to-[#1B3A5C]",
    stats: {
      messages: 19,
      newClients: 7,
      appointments: 5,
      autoReplied: 16,
    },
    topQuestions: [
      { question: "Precio masaje relajante", count: 6 },
      { question: "Duracion de los tratamientos", count: 4 },
      { question: "Disponibilidad fin de semana", count: 4 },
    ]
  },
  {
    business: "Consultorio Dra. Ramirez",
    type: "Consultorio odontologico",
    color: "from-[#1B3A5C] to-[#0d5f49]",
    stats: {
      messages: 31,
      newClients: 12,
      appointments: 9,
      autoReplied: 26,
    },
    topQuestions: [
      { question: "Precio blanqueamiento", count: 9 },
      { question: "Atencion urgencias", count: 6 },
      { question: "Convenios y seguros", count: 5 },
    ]
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#0F6E56] font-semibold uppercase tracking-widest text-sm mb-3">Resumen diario</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1B3A5C] md:text-4xl text-balance">
            Cada tarde, Replai te envia esto
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            Un reporte completo de tu negocio directo a tu WhatsApp. Sin apps extra, sin complicaciones.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {summaries.map((summary, index) => (
            <div key={index} className="rounded-2xl overflow-hidden border border-[#1B3A5C]/10 shadow-lg hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className={`bg-gradient-to-r ${summary.color} p-4 text-white`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">📊</span>
                  <span className="font-bold text-sm">Resumen del dia</span>
                </div>
                <p className="text-white font-extrabold text-lg leading-tight">{summary.business}</p>
                <p className="text-white/70 text-xs mt-0.5">{summary.type}</p>
              </div>

              {/* Stats */}
              <div className="bg-[#F4F7FB] p-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-[#1B3A5C]">{summary.stats.messages}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Mensajes</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-[#0F6E56]">{summary.stats.newClients}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Clientes nuevos</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-[#1B3A5C]">{summary.stats.appointments}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Citas solicitadas</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-[#0F6E56]">{summary.stats.autoReplied}/{summary.stats.messages}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Auto-respondidos</div>
                </div>
              </div>

              {/* Top questions */}
              <div className="bg-white p-4">
                <p className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-3">Preguntas frecuentes</p>
                <ul className="space-y-2">
                  {summary.topQuestions.map((q, qi) => (
                    <li key={qi} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{q.question}</span>
                      <span className="bg-[#1B3A5C]/10 text-[#1B3A5C] font-semibold rounded-full px-2 py-0.5 text-xs">{q.count}x</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-[#1B3A5C]/8 flex items-center gap-2">
                  <span className="text-sm">👋</span>
                  <span className="text-xs text-muted-foreground italic">Hasta manana — <span className="font-semibold text-[#0F6E56]">Replai</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
