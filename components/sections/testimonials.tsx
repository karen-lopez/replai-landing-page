"use client"

const summaries = [
  {
    contact: "Salon Valentina",
    time: "6:02 p.m.",
    lines: [
      "📊 *Resumen del dia — Salon Valentina*",
      "",
      "📨 Mensajes recibidos: 23",
      "👥 Clientes nuevos: 8",
      "📅 Citas solicitadas: 6",
      "",
      "💬 *Preguntas mas frecuentes:*",
      "- Precio manicure (7 veces)",
      "- Horario de atencion (5 veces)",
      "- Disponibilidad sabado (4 veces)",
      "",
      "⚡ Respondido automaticamente: 18 de 23 mensajes",
      "",
      "Hasta manana 👋 — *Replai*",
    ],
  },
  {
    contact: "Spa Serenity",
    time: "6:01 p.m.",
    lines: [
      "📊 *Resumen del dia — Spa Serenity*",
      "",
      "📨 Mensajes recibidos: 19",
      "👥 Clientes nuevos: 7",
      "📅 Citas solicitadas: 5",
      "",
      "💬 *Preguntas mas frecuentes:*",
      "- Precio masaje relajante (6 veces)",
      "- Duracion de los tratamientos (4 veces)",
      "- Disponibilidad fin de semana (4 veces)",
      "",
      "⚡ Respondido automaticamente: 16 de 19 mensajes",
      "",
      "Hasta manana 👋 — *Replai*",
    ],
  },
  {
    contact: "Consultorio Dra. Ramirez",
    time: "6:03 p.m.",
    lines: [
      "📊 *Resumen del dia — Consultorio Dra. Ramirez*",
      "",
      "📨 Mensajes recibidos: 31",
      "👥 Clientes nuevos: 12",
      "📅 Citas solicitadas: 9",
      "",
      "💬 *Preguntas mas frecuentes:*",
      "- Precio blanqueamiento (9 veces)",
      "- Atencion urgencias (6 veces)",
      "- Convenios y seguros (5 veces)",
      "",
      "⚡ Respondido automaticamente: 26 de 31 mensajes",
      "",
      "Hasta manana 👋 — *Replai*",
    ],
  },
]

function renderLine(line: string, index: number) {
  if (line === "") return <br key={index} />
  // Bold segments wrapped in *...*
  const parts = line.split(/(\*[^*]+\*)/g)
  return (
    <p key={index} className="leading-snug text-[13px]">
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <strong key={i}>{part.slice(1, -1)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  )
}

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
            Un mensaje de WhatsApp con todo lo que paso en tu negocio. Sin apps extra, sin complicaciones.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {summaries.map((summary, index) => (
            /* WhatsApp phone mockup */
            <div key={index} className="mx-auto w-full max-w-[300px]">
              {/* Phone shell */}
              <div className="rounded-[2rem] border-[6px] border-[#1B3A5C]/80 bg-[#1B3A5C]/80 shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="bg-[#1B3A5C] px-4 py-1.5 flex items-center justify-between">
                  <span className="text-white text-[10px] font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                  </div>
                </div>

                {/* WhatsApp chat header */}
                <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0F6E56] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">Replai</p>
                    <p className="text-white/70 text-[10px]">en linea</p>
                  </div>
                </div>

                {/* Chat body */}
                <div
                  className="px-3 py-3 min-h-[320px] flex flex-col justify-end gap-2"
                  style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23128C7E' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\") #ECE5DD" }}
                >
                  {/* Incoming bubble from Replai */}
                  <div className="flex flex-col items-start">
                    <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[90%] shadow-sm relative">
                      {/* Bubble tail */}
                      <div className="absolute -left-2 top-0 w-2 h-3 overflow-hidden">
                        <div className="w-4 h-4 bg-white rotate-45 translate-x-1 -translate-y-0.5" />
                      </div>
                      <div className="space-y-0.5 text-[#1a1a1a]">
                        {summary.lines.map((line, li) => renderLine(line, li))}
                      </div>
                      <p className="text-[10px] text-[#999] text-right mt-1.5 flex items-center justify-end gap-1">
                        {summary.time}
                        <svg viewBox="0 0 16 11" className="w-3.5 h-3.5 fill-[#4FC3F7]"><path d="M11.071.653a.75.75 0 0 1 1.06 1.06l-6.75 6.75a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47 6.22-6.22z"/><path d="M14.571.653a.75.75 0 0 1 1.06 1.06l-6.75 6.75a.75.75 0 0 1-.53.22.75.75 0 0 1-.53-1.28l6.75-6.75z"/></svg>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="bg-[#F0F0F0] px-2 py-1.5 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full px-3 py-1">
                    <span className="text-[11px] text-gray-400">Escribe un mensaje</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                  </div>
                </div>
              </div>

              {/* Contact label below phone */}
              <p className="text-center text-sm font-semibold text-[#1B3A5C] mt-4">{summary.contact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
