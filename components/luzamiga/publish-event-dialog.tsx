"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, MapPin, Search } from "lucide-react"
import { useT } from "./i18n/language-provider"
import { enqueueItem } from "./offline/queue"

type EventLocation = { lat: number; lng: number; address: string; city: string }

interface PlaceSearchResult {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
}

function getPosition(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("geolocation-unsupported"))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => reject(new Error("geolocation-denied")),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 },
    )
  })
}

async function reverseGeocode(coords: { lat: number; lng: number }): Promise<EventLocation> {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(coords.lat),
    lon: String(coords.lng),
    "accept-language": "es",
  })
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`)
  if (!response.ok) throw new Error("reverse-geocode-failed")
  const data = await response.json()
  const address = data.address ?? {}
  return {
    ...coords,
    address: data.display_name ?? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`,
    city: address.city ?? address.town ?? address.municipality ?? address.village ?? "",
  }
}

/** Busca lugares/sitios por nombre en Colombia usando el catálogo abierto de OpenStreetMap. */
async function searchPlaces(query: string): Promise<PlaceSearchResult[]> {
  const params = new URLSearchParams({
    format: "jsonv2",
    q: query,
    countrycodes: "co",
    addressdetails: "1",
    limit: "6",
  })
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`)
  if (!response.ok) throw new Error("place-search-failed")
  const data = await response.json()
  return (data as Array<Record<string, any>>).map((result) => {
    const address = result.address ?? {}
    return {
      id: String(result.place_id),
      name: result.namedetails?.name ?? result.display_name.split(",")[0],
      address: result.display_name,
      city: address.city ?? address.town ?? address.municipality ?? address.village ?? "",
      lat: Number(result.lat),
      lng: Number(result.lon),
    }
  })
}

interface PublishEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PublishEventDialog({ open, onOpenChange }: PublishEventDialogProps) {
  const { t } = useT()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [queued, setQueued] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locating, setLocating] = useState(false)

  const [title, setTitle] = useState("")
  const [organizer, setOrganizer] = useState("")
  const [when, setWhen] = useState("")
  const [address, setAddress] = useState("")
  const [eventPosition, setEventPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [city, setCity] = useState("")
  const [details, setDetails] = useState("")

  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  function resetForm() {
    setSubmitted(false)
    setQueued(false)
    setTitle("")
    setOrganizer("")
    setWhen("")
    setAddress("")
    setEventPosition(null)
    setCity("")
    setDetails("")
    setError(null)
    setSearchQuery("")
    setSearchResults([])
    setSearchError(null)
  }

  async function handleSearch() {
    const query = searchQuery.trim()
    if (!query) return
    setSearching(true)
    setSearchError(null)
    try {
      const results = await searchPlaces(query)
      setSearchResults(results)
      if (!results.length) setSearchError("No encontramos ese lugar. Intenta con otra búsqueda.")
    } catch {
      setSearchError("No pudimos buscar en este momento. Inténtalo de nuevo.")
    } finally {
      setSearching(false)
    }
  }

  function selectPlace(result: PlaceSearchResult) {
    setAddress(result.address)
    setEventPosition({ lat: result.lat, lng: result.lng })
    if (result.city) setCity(result.city)
    setSearchResults([])
    setSearchQuery(result.name)
  }

  async function locateEvent() {
    setLocating(true)
    setError(null)
    try {
      const resolved = await reverseGeocode(await getPosition())
      setEventPosition({ lat: resolved.lat, lng: resolved.lng })
      setAddress(resolved.address)
      if (resolved.city) setCity(resolved.city)
      setSearchQuery("")
      return resolved
    } catch {
      setError("No pudimos reconocer la ubicación del evento. Activa el permiso de ubicación e inténtalo de nuevo.")
      throw new Error("location-required")
    } finally {
      setLocating(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(null)
    setQueued(false)

    let resolved: EventLocation
    try {
      resolved = eventPosition ? { ...eventPosition, address, city } : await locateEvent()
    } catch {
      setSending(false)
      return
    }
    const payload = {
      kind: "event",
      title: title.trim(),
      description: details.trim(),
      author: organizer.trim(),
      contact: when.trim(),
      city: resolved.city || city.trim(),
      address: resolved.address,
      lat: resolved.lat,
      lng: resolved.lng,
    }

    try {
      const res = await fetch("/api/luzamiga/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.status === 401) {
        setError(t("offer.needAccountBody"))
        setSending(false)
        return
      }
      if (!res.ok) throw new Error("bad response")
      setSubmitted(true)
    } catch {
      await enqueueItem(payload)
      setQueued(true)
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) resetForm()
      }}
    >
      <DialogContent
        className="max-h-[85vh] overflow-y-auto sm:max-w-2xl"
        style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "#3D3020" }}>Publicar evento cultural</DialogTitle>
          <DialogDescription style={{ color: "#6B5B45" }}>
            Comparte una feria, un concierto, un taller o un encuentro comunitario para reactivar la vida cultural del
            barrio.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12" style={{ color: "#D97706" }} aria-hidden="true" />
            <h3 className="text-xl font-semibold" style={{ color: "#3D3020" }}>
              ¡Gracias por compartir tu evento!
            </h3>
            <p className="max-w-md" style={{ color: "#6B5B45" }}>
              {queued
                ? "Estás sin conexión: tu evento se enviará automáticamente cuando vuelva la señal."
                : "Tu evento fue recibido y ya aparece en la sección de eventos culturales."}
            </p>
            <Button
              variant="outline"
              className="rounded-full"
              style={{ borderColor: "#E4C79A", color: "#8A6D3B" }}
              onClick={resetForm}
            >
              Publicar otro evento
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="event-title" style={{ color: "#4A3B2A" }}>
                Nombre del evento
              </Label>
              <Input
                id="event-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Bazar artesanal por la reactivación"
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="event-organizer" style={{ color: "#4A3B2A" }}>
                  Organiza
                </Label>
                <Input
                  id="event-organizer"
                  required
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="Ej. Colectivo Manos del Quindío"
                  className="rounded-xl"
                  style={{ borderColor: "#EEE1C9" }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-when" style={{ color: "#4A3B2A" }}>
                  Fecha y hora
                </Label>
                <Input
                  id="event-when"
                  required
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  placeholder="Ej. Sábado 6 de septiembre, 10:00 a. m."
                  className="rounded-xl"
                  style={{ borderColor: "#EEE1C9" }}
                />
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl border border-[#EAD9B8] bg-[#FFFDF8] p-4">
              <div>
                <Label style={{ color: "#4A3B2A" }}>Ubicación del evento</Label>
                <p className="mt-1 text-sm text-[#8A7659]">
                  Busca el lugar del evento para autocompletar su dirección, o usa tu ubicación actual.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7659]" aria-hidden="true" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSearch()
                      }
                    }}
                    placeholder="Busca el lugar del evento"
                    className="rounded-xl pl-9"
                    style={{ borderColor: "#EEE1C9" }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSearch}
                  disabled={searching || !searchQuery.trim()}
                  className="shrink-0 rounded-full border-[#D4B27A] text-[#8A6D3B]"
                >
                  {searching ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Buscar"}
                </Button>
              </div>

              {searchError ? (
                <p role="alert" className="text-sm" style={{ color: "#B4231F" }}>
                  {searchError}
                </p>
              ) : null}

              {searchResults.length > 0 ? (
                <ul className="grid gap-1.5 rounded-xl border border-[#EEE1C9] bg-white p-1.5">
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <button
                        type="button"
                        onClick={() => selectPlace(result)}
                        className="flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition hover:bg-[#FBF1E1]"
                      >
                        <span className="text-sm font-semibold" style={{ color: "#3D3020" }}>
                          {result.name}
                        </span>
                        <span className="text-xs" style={{ color: "#8A7659" }}>
                          {result.address}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex items-center gap-3 text-xs" style={{ color: "#8A7659" }}>
                <span className="h-px flex-1" style={{ backgroundColor: "#EEE1C9" }} />
                o
                <span className="h-px flex-1" style={{ backgroundColor: "#EEE1C9" }} />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={locateEvent}
                disabled={locating}
                className="w-fit rounded-full border-[#D4B27A] text-[#8A6D3B]"
              >
                {locating ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <MapPin className="h-4 w-4" aria-hidden="true" />}
                {locating ? "Reconociendo..." : "Usar mi ubicación actual"}
              </Button>

              {address ? (
                <p className="flex items-start gap-2 text-sm text-[#4A4030]" role="status">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2E9E5B]" aria-hidden="true" />
                  <span><strong>Dirección reconocida:</strong> {address}</span>
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="event-details" style={{ color: "#4A3B2A" }}>
                Cuéntanos sobre el evento
              </Label>
              <Textarea
                id="event-details"
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe la actividad y por qué vale la pena participar."
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-lg px-4 py-2 text-sm" style={{ background: "#FCE4E4", color: "#B4231F" }}>
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="justify-self-start rounded-full px-8 py-6 text-base font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#D97706" }}
            >
              {sending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Publicando…
                </span>
              ) : (
                "Publicar evento"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
