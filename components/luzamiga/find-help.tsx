"use client"

import { useState } from "react"
import { CATEGORIES, CATEGORY_MAP, type CategoryId } from "./categories"
import { MapPin } from "lucide-react"

interface HelpListing {
  id: string
  category: CategoryId
  title: string
  provider: string
  location: string
  description: string
}

// Sample listings. This array can later be replaced by data fetched from a database.
const LISTINGS: HelpListing[] = [
  {
    id: "1",
    category: "supplies",
    title: "Mercados y agua potable",
    provider: "Fundación Manos Unidas",
    location: "Armenia, Quindío",
    description: "Entrega de mercados básicos, agua embotellada y kits de aseo para familias afectadas.",
  },
  {
    id: "2",
    category: "supplies",
    title: "Ropa y cobijas",
    provider: "Colectivo Barrio Nuevo",
    location: "Pereira, Risaralda",
    description: "Ropa para adultos y niños, cobijas y colchonetas en buen estado.",
  },
  {
    id: "3",
    category: "search",
    title: "Apoyo en búsqueda de personas",
    provider: "Red de Voluntarios Café",
    location: "Manizales, Caldas",
    description: "Coordinamos reportes y difusión de personas y mascotas desaparecidas.",
  },
  {
    id: "4",
    category: "health",
    title: "Consulta médica gratuita",
    provider: "Brigada Salud Sin Fronteras",
    location: "Armenia, Quindío",
    description: "Atención médica general y curaciones sin costo para personas afectadas.",
  },
  {
    id: "5",
    category: "health",
    title: "Acompañamiento psicológico",
    provider: "Colectivo Mente Serena",
    location: "En línea y presencial",
    description: "Espacios de escucha y contención emocional, gratuitos, para adultos y niños.",
  },
  {
    id: "6",
    category: "events",
    title: "Círculo de la palabra",
    provider: "Casa Cultural La Ceiba",
    location: "Pereira, Risaralda",
    description: "Encuentro comunitario para compartir, sanar y acompañarnos entre vecinos.",
  },
]

export function LuzAmigaFindHelp() {
  const [filter, setFilter] = useState<CategoryId | "all">("all")

  const visible = filter === "all" ? LISTINGS : LISTINGS.filter((l) => l.category === filter)

  return (
    <section id="encontrar-ayuda" className="py-16 md:py-24" style={{ backgroundColor: "#FBF1E1" }}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl" style={{ color: "#3D3020" }}>
            Encuentra ayuda
          </h2>
          <p className="mt-3 text-lg leading-relaxed" style={{ color: "#6B5B45" }}>
            Explora el apoyo disponible en la comunidad. Filtra por categoría para encontrar lo que necesitas.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} color="#8A6D3B" tint="#F1E4CC" onClick={() => setFilter("all")}>
            Todo
          </FilterChip>
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat.id}
              active={filter === cat.id}
              color={cat.color}
              tint={cat.tint}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((listing) => {
            const cat = CATEGORY_MAP[listing.category]
            const Icon = cat.icon
            return (
              <article
                key={listing.id}
                className="flex flex-col gap-4 rounded-2xl border p-6 transition-shadow hover:shadow-md"
                style={{ borderColor: "#EEE1C9", backgroundColor: "#FFFFFF" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: cat.tint, color: cat.color }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: cat.tint, color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-snug text-balance" style={{ color: "#3D3020" }}>
                    {listing.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#8A6D3B" }}>
                    {listing.provider}
                  </p>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
                  {listing.description}
                </p>

                <div className="mt-auto flex items-center gap-1.5 text-sm" style={{ color: "#8A7659" }}>
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {listing.location}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FilterChip({
  active,
  color,
  tint,
  onClick,
  children,
}: {
  active: boolean
  color: string
  tint: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
      style={{
        borderColor: active ? color : "#E4C79A",
        backgroundColor: active ? tint : "transparent",
        color: active ? color : "#8A6D3B",
      }}
    >
      {children}
    </button>
  )
}
