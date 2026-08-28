"use client"

import { useEffect, useState } from "react"
import { CATEGORIES, CATEGORY_MAP, type CategoryId } from "./categories"
import { ChevronLeft, ChevronRight, ExternalLink, Map, MapPin, Phone, Search, X } from "lucide-react"
import type { MapItem } from "@/lib/luzamiga/types"
import { useItems } from "./map/use-items"
import dynamic from "next/dynamic"

const MiniLocationMap = dynamic(() => import("./map/mini-location-map").then((module) => module.MiniLocationMap), {
  ssr: false,
})

const PAGE_SIZE = 3
const MUNICIPALITIES_URL = "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json"
const FALLBACK_MUNICIPALITIES = ["Bogotá", "Manizales", "Medellín", "Pereira", "Cali", "Armenia"]

export function LuzAmigaFindHelp() {
  const [filter, setFilter] = useState<CategoryId | "all">("all")
  const [page, setPage] = useState(1)
  const [municipality, setMunicipality] = useState("")
  const [municipalities, setMunicipalities] = useState(FALLBACK_MUNICIPALITIES)
  const { items } = useItems()

  useEffect(() => {
    let active = true
    fetch(MUNICIPALITIES_URL)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("catalog-failed"))))
      .then((departments: Array<{ ciudades?: string[] }>) => {
        const names = [...new Set(departments.flatMap((department) => department.ciudades ?? []))].sort((a, b) =>
          a.localeCompare(b, "es"),
        )
        if (active && names.length) setMunicipalities(names)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const listings = items.filter((item) => item.kind === "help" || item.kind === "event")
  const normalizedMunicipality = municipality.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const filtered = listings.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter
    const searchableLocation = `${item.city ?? ""} ${item.address ?? ""}`.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return matchesCategory && (!normalizedMunicipality || searchableLocation.includes(normalizedMunicipality))
  })
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function changeFilter(nextFilter: CategoryId | "all") {
    setFilter(nextFilter)
    setPage(1)
  }

  function changeMunicipality(value: string) {
    setMunicipality(value)
    setPage(1)
  }

  return (
    <section id="encontrar-ayuda" className="py-16 md:py-24" style={{ backgroundColor: "#FBF1E1" }}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl" style={{ color: "#3D3020" }}>
            Explora el comercio
          </h2>
          <p className="mt-3 text-lg leading-relaxed" style={{ color: "#6B5B45" }}>
            Descubre los negocios de la comunidad que se están reactivando. Filtra por etiqueta para ver reaperturas,
            eventos y promociones.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} color="#8A6D3B" tint="#F1E4CC" onClick={() => changeFilter("all")}>
            Todo
          </FilterChip>
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat.id}
              active={filter === cat.id}
              color={cat.color}
              tint={cat.tint}
              onClick={() => changeFilter(cat.id)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>

        <div className="mb-8 max-w-xl">
          <label htmlFor="municipality-filter" className="sr-only">
            Filtrar por municipio de Colombia
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7659]" aria-hidden="true" />
            <input
              id="municipality-filter"
              list="colombia-municipalities"
              value={municipality}
              onChange={(event) => changeMunicipality(event.target.value)}
              placeholder="Buscar municipio de Colombia"
              className="h-11 w-full rounded-full border bg-white pl-11 pr-11 text-sm text-[#4A3B2A] outline-none transition focus:ring-2 focus:ring-[#4A7C59]"
              style={{ borderColor: "#E4C79A" }}
            />
            <datalist id="colombia-municipalities">
              {municipalities.map((name) => <option key={name} value={name} />)}
            </datalist>
            {municipality ? (
              <button
                type="button"
                onClick={() => changeMunicipality("")}
                className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#8A7659] hover:bg-[#F1E4CC]"
                aria-label="Limpiar filtro de municipio"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-[#8A7659]">
            {municipalities.length > FALLBACK_MUNICIPALITIES.length
              ? `${municipalities.length} municipios disponibles`
              : "Cargando municipios de Colombia..."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((listing) => {
            const category = listing.category ?? "events"
            const cat = CATEGORY_MAP[category]
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
                    {listing.author ?? "Comercio de la comunidad"}
                  </p>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
                  {listing.description}
                </p>

                <MiniLocationMap lat={listing.lat} lng={listing.lng} label={listing.title} />

                <div className="mt-auto flex items-center gap-1.5 text-sm" style={{ color: "#8A7659" }}>
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {listing.address ?? listing.city ?? "Ubicación reconocida"}
                </div>
                {listing.contact ? (
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: "#8A7659" }}>
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>{listing.contact}</span>
                  </div>
                ) : null}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${listing.address ?? listing.city ?? ""} ${listing.lat},${listing.lng}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#4A7C59] underline-offset-4 hover:underline"
                >
                  <Map className="h-4 w-4" aria-hidden="true" />
                  Ver mapa
                </a>
                <a
                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${listing.lat},${listing.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#1769AA] underline-offset-4 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Ver Street View
                </a>
              </article>
            )
          })}
        </div>

        {pageCount > 1 ? (
          <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Paginación de comercios">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              style={{ borderColor: "#E4C79A", color: "#4A7C59" }}
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
              aria-label="Página siguiente"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              style={{ borderColor: "#E4C79A", color: "#4A7C59" }}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        ) : null}
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
