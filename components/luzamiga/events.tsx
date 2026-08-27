import { Calendar, Clock, MapPin } from "lucide-react"

interface CommunityEvent {
  id: string
  title: string
  type: string
  date: string
  time: string
  location: string
  description: string
}

// Sample events. Can later be replaced by community-posted data from a database.
const EVENTS: CommunityEvent[] = [
  {
    id: "1",
    title: "Concierto por la esperanza",
    type: "Música",
    date: "Sábado 6 de septiembre",
    time: "5:00 p. m.",
    location: "Parque Sucre, Armenia",
    description:
      "Una tarde de música en vivo para reunirnos, respirar y recordar que no estamos solos.",
  },
  {
    id: "2",
    title: "Taller de arte para niños",
    type: "Bienestar",
    date: "Domingo 7 de septiembre",
    time: "10:00 a. m.",
    location: "Casa Cultural La Ceiba, Pereira",
    description:
      "Un espacio seguro donde los más pequeños pueden expresar sus emociones a través del dibujo y la pintura.",
  },
  {
    id: "3",
    title: "Yoga y respiración consciente",
    type: "Bienestar",
    date: "Lunes 8 de septiembre",
    time: "6:30 a. m.",
    location: "Plaza de Bolívar, Manizales",
    description:
      "Práctica suave al aire libre para liberar tensión y encontrar calma después de días difíciles.",
  },
  {
    id: "4",
    title: "Círculo de la palabra",
    type: "Comunidad",
    date: "Miércoles 10 de septiembre",
    time: "4:00 p. m.",
    location: "Salón Comunal Barrio Nuevo, Pereira",
    description:
      "Nos sentamos en círculo para compartir lo que sentimos y acompañarnos entre vecinos.",
  },
]

export function LuzAmigaEvents() {
  return (
    <section id="eventos" className="py-16 md:py-24" style={{ backgroundColor: "#FDFAF3" }}>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl" style={{ color: "#3D3020" }}>
            Eventos para sanar juntos
          </h2>
          <p className="mt-3 text-lg leading-relaxed" style={{ color: "#6B5B45" }}>
            Actividades culturales y de bienestar organizadas por la comunidad para acompañarnos en este momento.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {EVENTS.map((event) => (
            <article
              key={event.id}
              className="flex flex-col gap-4 rounded-2xl border p-6"
              style={{ borderColor: "#EEE1C9", backgroundColor: "#FFFFFF" }}
            >
              <span
                className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#FAEBB8", color: "#A16207" }}
              >
                {event.type}
              </span>

              <h3 className="text-xl font-semibold leading-snug text-balance" style={{ color: "#3D3020" }}>
                {event.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
                {event.description}
              </p>

              <div className="mt-auto space-y-2 border-t pt-4 text-sm" style={{ borderColor: "#F1E4CC", color: "#8A7659" }}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {event.location}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
