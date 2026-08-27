"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CATEGORIES, type CategoryId } from "./categories"
import { CheckCircle2 } from "lucide-react"

export function LuzAmigaOfferHelp() {
  const [selected, setSelected] = useState<CategoryId>("supplies")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Placeholder: this can later persist to a database.
    setSubmitted(true)
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

        {/* Form */}
        <div
          className="rounded-3xl border p-6 md:p-8"
          style={{ borderColor: "#EEE1C9", backgroundColor: "#FFFFFF" }}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <CheckCircle2 className="h-12 w-12" style={{ color: "#D97706" }} aria-hidden="true" />
              <h3 className="text-xl font-semibold" style={{ color: "#3D3020" }}>
                ¡Gracias por tu generosidad!
              </h3>
              <p className="max-w-md" style={{ color: "#6B5B45" }}>
                Tu ofrecimiento ha sido recibido. Pronto aparecerá en la sección{" "}
                <span className="font-medium">Encontrar ayuda</span> para quienes lo necesiten.
              </p>
              <Button
                variant="outline"
                className="rounded-full"
                style={{ borderColor: "#E4C79A", color: "#8A6D3B" }}
                onClick={() => setSubmitted(false)}
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
                  placeholder="Cuéntanos con calma qué puedes ofrecer y cómo ayudará."
                  className="rounded-xl"
                  style={{ borderColor: "#EEE1C9" }}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="justify-self-start rounded-full px-8 py-6 text-base font-semibold text-white"
                style={{ backgroundColor: "#D97706" }}
              >
                Publicar ofrecimiento
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
