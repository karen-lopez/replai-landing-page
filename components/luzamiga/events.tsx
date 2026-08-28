"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import type { MapItem } from "@/lib/luzamiga/types"
import { useItems } from "./map/use-items"

interface CommunityEvent {
  id: string
  title: string
  type: string
  date: string
  time: string
  location: string
  description: string
}

function itemToEvent(item: MapItem): CommunityEvent {
  return {
    id: item.id,
    title: item.title,
    type: "Comunidad",
    date: "Publicado recientemente",
    time: "Disponible ahora",
    location: item.address ?? item.city ?? "Ubicación reconocida",
    description: item.description,
  }
}

const EVENTS_PAGE_SIZE = 4

// Sample events. Can later be replaced by community-posted data from a database.
const EVENTS: CommunityEvent[] = [
  {
    id: "1",
    title: "Feria de emprendedores locales",
    type: "Feria",
    date: "Sábado 6 de septiembre",
    time: "10:00 a. m.",
    location: "Parque Sucre, Armenia",
    description:
      "Negocios del barrio se reúnen para dar a conocer sus productos y reactivar las ventas. Entrada libre.",
  },
  {
    id: "2",
    title: "Mercado nocturno de comidas",
    type: "Gastronomía",
    date: "Domingo 7 de septiembre",
    time: "6:00 p. m.",
    location: "Plaza principal, Manizales",
    description:
      "Los restaurantes locales se reúnen para una noche de sabores, música en vivo y comunidad.",
  },
  {
    id: "3",
    title: "Bazar artesanal por la reactivación",
    type: "Bazar",
    date: "Lunes 8 de septiembre",
    time: "9:00 a. m.",
    location: "Parque del Café, Armenia",
    description:
      "Artesanas y artesanos muestran su trabajo para reactivar la economía del sector.",
  },
  {
    id: "4",
    title: "Ruta de compras del comercio local",
    type: "Comercio",
    date: "Miércoles 10 de septiembre",
    time: "todo el día",
    location: "Centro comercial del barrio, Pereira",
    description:
      "Un recorrido por los negocios que reabrieron, con descuentos y sorpresas para la comunidad.",
  },
]

export function LuzAmigaEvents() {
  const [page, setPage] = useState(1)
  const { items } = useItems()
  const publishedEvents = items
    .filter((item) => item.kind === "event" || (item.kind === "help" && item.category === "events"))
    .map(itemToEvent)
  const visibleEvents = [...publishedEvents, ...EVENTS]
  const pageCount = Math.max(1, Math.ceil(visibleEvents.length / EVENTS_PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paginatedEvents = visibleEvents.slice((currentPage - 1) * EVENTS_PAGE_SIZE, currentPage * EVENTS_PAGE_SIZE)

  return (
    <section id="eventos" className="py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl" style={{ color: "#3D3020" }}>
            Eventos para reactivar el comercio
          </h2>
          <p className="mt-3 text-lg leading-relaxed" style={{ color: "#6B5B45" }}>
            Ferias, mercados y actividades organizadas por la comunidad para volver a mover la economía local.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {paginatedEvents.map((event) => (
            <article
              key={event.id}
              className="flex flex-col gap-4 rounded-2xl border p-6"
              style={{ borderColor: "#EEE1C9", backgroundColor: "#FFFFFF" }}
            >
              <span
                className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#E3EAF8", color: "#3F6BB0" }}
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

        {pageCount > 1 ? (
          <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Paginación de eventos">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior de eventos"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              style={{ borderColor: "#E4C79A", color: "#3F6BB0" }}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="text-sm font-medium" style={{ color: "#6B5B45" }} aria-live="polite">
              Página {currentPage} de {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              disabled={currentPage === pageCount}
              aria-label="Página siguiente de eventos"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              style={{ borderColor: "#E4C79A", color: "#3F6BB0" }}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  )
}
