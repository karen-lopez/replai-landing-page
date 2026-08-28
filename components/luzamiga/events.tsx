"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarHeart, Instagram, Map, MapPin, Sparkles, UserPlus } from "lucide-react"
import { useItems } from "./map/use-items"
import { useAuth } from "./auth/auth-provider"
import { PublishEventDialog } from "./publish-event-dialog"

export function LuzAmigaEvents() {
  const { user, openRegister } = useAuth()
  const { items, refresh } = useItems()
  const [publishOpen, setPublishOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const events = items.filter((item) => item.kind === "event")

  function handlePublishClick() {
    if (!user) {
      openRegister()
      return
    }
    setPublishOpen(true)
  }

  return (
    <section id="eventos" className="py-16 md:py-24" style={{ backgroundColor: "#FDFAF3" }}>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl" style={{ color: "#3D3020" }}>
              Eventos culturales
            </h2>
            <p className="mt-3 text-lg leading-relaxed" style={{ color: "#6B5B45" }}>
              Ferias, conciertos, talleres y encuentros comunitarios organizados por la comunidad para reactivar la
              vida cultural del barrio.
            </p>
          </div>

          <div
            className="flex shrink-0 flex-col items-start gap-3 rounded-2xl border border-dashed p-4 sm:flex-row sm:items-center"
            style={{ borderColor: "#E4C79A", backgroundColor: "#FFFDF8" }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "#FBEBD1", color: "#C77F16" }}
            >
              {user ? <Sparkles className="h-5 w-5" aria-hidden="true" /> : <UserPlus className="h-5 w-5" aria-hidden="true" />}
            </span>
            <div className="max-w-xs text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
              {user
                ? "¿Organizas algo para la comunidad? Compártelo aquí."
                : "Para publicar un evento cultural necesitas una cuenta. Es rápido y gratuito."}
            </div>
            <Button
              type="button"
              onClick={handlePublishClick}
              className="w-full shrink-0 rounded-full px-6 text-sm font-semibold text-white sm:w-auto"
              style={{ backgroundColor: "#C77F16" }}
            >
              {user ? "Publicar evento cultural" : "Registrarse"}
            </Button>
          </div>
        </div>

        {events.length === 0 ? (
          <div
            className="rounded-2xl border border-dashed p-8 text-center"
            style={{ borderColor: "#E4C79A", backgroundColor: "#FFFDF8" }}
          >
            <p style={{ color: "#6B5B45" }}>
              Todavía no hay eventos publicados. ¡Sé la primera persona en compartir uno!
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {events.map((event) => {
              const isExpanded = expandedId === event.id
              return (
                <article
                  key={event.id}
                  className="flex flex-col gap-4 rounded-2xl border p-6"
                  style={{ borderColor: "#EEE1C9", backgroundColor: "#FFFFFF" }}
                >
                  <span
                    className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: "#F1E4CC", color: "#8A6D3B" }}
                  >
                    <CalendarHeart className="h-3.5 w-3.5" aria-hidden="true" />
                    Evento cultural
                  </span>

                  <h3 className="text-xl font-semibold leading-snug text-balance" style={{ color: "#3D3020" }}>
                    {event.title}
                  </h3>
                  {event.author ? (
                    <p className="text-sm font-medium" style={{ color: "#8A6D3B" }}>
                      {event.author}
                    </p>
                  ) : null}

                  <p className="text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
                    {event.description}
                  </p>

                  <div className="mt-auto space-y-2 border-t pt-4 text-sm" style={{ borderColor: "#F1E4CC", color: "#8A7659" }}>
                    {event.contact ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {event.contact}
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {event.address ?? event.city ?? "Ubicación reconocida"}
                    </div>
                  </div>

                  {event.instagram ? (
                    <a
                      href={`https://www.instagram.com/${event.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium hover:underline"
                      style={{ color: "#C1367B" }}
                    >
                      <Instagram className="h-4 w-4" aria-hidden="true" />
                      <span>@{event.instagram}</span>
                    </a>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setExpandedId((id) => (id === event.id ? null : event.id))}
                    aria-expanded={isExpanded}
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#4A7C59] underline-offset-4 hover:underline"
                  >
                    <Map className="h-4 w-4" aria-hidden="true" />
                    {isExpanded ? "Ocultar mapa" : "Ver mapa"}
                  </button>
                  {isExpanded ? (
                    <div className="overflow-hidden rounded-xl border" style={{ borderColor: "#EAD9B8" }}>
                      <iframe
                        title={`Mapa de Google de ${event.title}`}
                        src={`https://www.google.com/maps?q=${event.lat},${event.lng}&z=16&output=embed`}
                        className="h-56 w-full"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        )}
      </div>

      <PublishEventDialog open={publishOpen} onOpenChange={setPublishOpen} onPublished={refresh} />
    </section>
  )
}
