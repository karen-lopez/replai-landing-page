"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CATEGORIES, type CategoryId } from "./categories"
import { CheckCircle2, Loader2, UserPlus } from "lucide-react"
import { useAuth } from "./auth/auth-provider"
import { useT } from "./i18n/language-provider"
import { enqueueItem } from "./offline/queue"

// Centro aproximado de Colombia como respaldo si no hay geolocalización.
const FALLBACK_COORDS = { lat: 4.6, lng: -74.08 }

function getPosition(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve) => {
    if (!("geolocation" in navigator)) {
      resolve(FALLBACK_COORDS)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(FALLBACK_COORDS),
      { enableHighAccuracy: true, timeout: 8_000 },
    )
  })
}

export function LuzAmigaOfferHelp() {
  const { user, openRegister } = useAuth()
  const { t } = useT()
  const [selected, setSelected] = useState<CategoryId>("supplies")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [queued, setQueued] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [contact, setContact] = useState("")
  const [details, setDetails] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(null)
    setQueued(false)

    const coords = await getPosition()
    const payload = {
      kind: "help",
      category: selected,
      title: `${CATEGORIES.find((c) => c.id === selected)?.label}: ${name}`.slice(0, 120),
      description: details.trim(),
      author: name.trim(),
      contact: contact.trim(),
      city: location.trim(),
      lat: coords.lat,
      lng: coords.lng,
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
    <section id="ofrecer-ayuda" className="py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl" style={{ color: "#3D3020" }}>
            Ofrece tu ayuda
          </h2>
          <p className="mt-3 text-lg leading-relaxed" style={{ color: "#6B5B45" }}>
            Publica lo que puedes ofrecer. Cada gesto cuenta. Elige una categoría y cuéntanos los detalles.
          </p>
        </div>

        {/* Category chooser */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isActive = selected === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelected(cat.id)}
                aria-pressed={isActive}
                className="flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all"
                style={{
                  borderColor: isActive ? cat.color : "#EEE1C9",
                  backgroundColor: isActive ? cat.tint : "#FFFFFF",
                  boxShadow: isActive ? `0 8px 24px -12px ${cat.color}` : "none",
                }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: cat.tint, color: cat.color }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-semibold" style={{ color: "#3D3020" }}>
                  {cat.label}
                </span>
                <span className="text-sm leading-snug" style={{ color: "#8A7659" }}>
                  {cat.description}
                </span>
              </button>
            )
          })}
        </div>

        {/* Gate: requiere cuenta para publicar */}
        {!user ? (
          <div
            className="flex flex-col items-center gap-4 rounded-3xl border border-dashed p-8 text-center md:p-12"
            style={{ borderColor: "#E4C79A", backgroundColor: "#FFFDF8" }}
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: "#FBEBD1", color: "#C77F16" }}
            >
              <UserPlus className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-semibold" style={{ color: "#3D3020" }}>
              {t("offer.needAccountTitle")}
            </h3>
            <p className="max-w-md leading-relaxed" style={{ color: "#6B5B45" }}>
              {t("offer.needAccountBody")}
            </p>
            <Button
              type="button"
              size="lg"
              onClick={openRegister}
              className="rounded-full px-8 py-6 text-base font-semibold text-white"
              style={{ backgroundColor: "#C77F16" }}
            >
              {t("offer.registerCta")}
            </Button>
          </div>
        ) : (
          <div className="rounded-3xl border p-6 md:p-8" style={{ borderColor: "#EEE1C9", backgroundColor: "#FFFFFF" }}>
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle2 className="h-12 w-12" style={{ color: "#D97706" }} aria-hidden="true" />
                <h3 className="text-xl font-semibold" style={{ color: "#3D3020" }}>
                  ¡Gracias por tu generosidad!
                </h3>
                <p className="max-w-md" style={{ color: "#6B5B45" }}>
                  {queued
                    ? "Estás sin conexión: tu ofrecimiento se publicará automáticamente cuando vuelva la señal."
                    : "Tu ofrecimiento ha sido recibido y ya aparece en el mapa y en la sección Encontrar ayuda."}
                </p>
                <Button
                  variant="outline"
                  className="rounded-full"
                  style={{ borderColor: "#E4C79A", color: "#8A6D3B" }}
                  onClick={() => {
                    setSubmitted(false)
                    setQueued(false)
                    setName("")
                    setLocation("")
                    setContact("")
                    setDetails("")
                  }}
                >
                  Publicar otro ofrecimiento
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="offer-name" style={{ color: "#4A3B2A" }}>
                    Tu nombre o el de tu organización
                  </Label>
                  <Input
                    id="offer-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. María López / Fundación Manos Unidas"
                    className="rounded-xl"
                    style={{ borderColor: "#EEE1C9" }}
                  />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="offer-location" style={{ color: "#4A3B2A" }}>
                      Ubicación
                    </Label>
                    <Input
                      id="offer-location"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ciudad o municipio"
                      className="rounded-xl"
                      style={{ borderColor: "#EEE1C9" }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="offer-contact" style={{ color: "#4A3B2A" }}>
                      Contacto
                    </Label>
                    <Input
                      id="offer-contact"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="WhatsApp, teléfono o correo"
                      className="rounded-xl"
                      style={{ borderColor: "#EEE1C9" }}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="offer-details" style={{ color: "#4A3B2A" }}>
                    ¿Qué ofreces?{" "}
                    <span className="font-normal" style={{ color: "#8A7659" }}>
                      (categoría: {CATEGORIES.find((c) => c.id === selected)?.label})
                    </span>
                  </Label>
                  <Textarea
                    id="offer-details"
                    required
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Cuéntanos con calma qué puedes ofrecer y cómo ayudará."
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
                    "Publicar ofrecimiento"
                  )}
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
