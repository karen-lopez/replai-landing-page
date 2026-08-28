"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CATEGORIES, CATEGORY_MAP, type CategoryId } from "./categories"
import { ChevronLeft, ChevronRight, Instagram, Map, MapPin, Phone, Store, UserPlus } from "lucide-react"
import { useItems } from "./map/use-items"
import { useAuth } from "./auth/auth-provider"
import { useT } from "./i18n/language-provider"
import { MunicipalityAutocomplete } from "./municipality-autocomplete"
import { PublishListingDialog } from "./publish-listing-dialog"
import { BusinessVerificationDialog } from "./business-verification-dialog"
import { SCOPED_MUNICIPALITIES } from "@/lib/luzamiga/municipalities"

const PAGE_SIZE = 3

export function LuzAmigaCommerce() {
  const { user, openRegister } = useAuth()
  const { t } = useT()
  const [filter, setFilter] = useState<CategoryId | "all">("all")
  const [page, setPage] = useState(1)
  const [municipality, setMunicipality] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [publishOpen, setPublishOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const { items, refresh } = useItems()

  const listings = items.filter((item) => item.kind === "help" || item.kind === "event")
  const normalizedMunicipality = municipality.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[̀-ͯ]/g, "")
  const filtered = listings.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter
    const searchableLocation = `${item.city ?? ""} ${item.address ?? ""}`.toLocaleLowerCase("es").normalize("NFD").replace(/[̀-ͯ]/g, "")
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

  function handlePublishClick() {
    if (!user) {
      openRegister()
      return
    }
    if (!user.businessVerified) {
      setVerifyOpen(true)
      return
    }
    setPublishOpen(true)
  }

  return (
    <section id="comercio" className="py-16 md:py-24" style={{ backgroundColor: "#FBF1E1" }}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl" style={{ color: "#3D3020" }}>
              Reactivando el Comercio
            </h2>
            <p className="mt-3 text-lg leading-relaxed" style={{ color: "#6B5B45" }}>
              Descubre los negocios de la comunidad que se están reactivando: reaperturas, eventos y promociones.
              Filtra por etiqueta o municipio para encontrarlos.
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
              {user ? <Store className="h-5 w-5" aria-hidden="true" /> : <UserPlus className="h-5 w-5" aria-hidden="true" />}
            </span>
            <div className="max-w-xs text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
              {user
                ? user.businessVerified
                  ? "¿Tienes un negocio? Comparte tu reapertura, evento o promoción."
                  : "¿Tienes un negocio? Verifica tu comercio con el CCB para poder publicar."
                : t("offer.needAccountBody")}
            </div>
            <Button
              type="button"
              onClick={handlePublishClick}
              className="w-full shrink-0 rounded-full px-6 text-sm font-semibold text-white sm:w-auto"
              style={{ backgroundColor: "#C77F16" }}
            >
              {user ? (user.businessVerified ? "Publicar mi negocio" : "Verificar mi comercio") : t("offer.registerCta")}
            </Button>
          </div>
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
          <label htmlFor="municipality-filter" className="mb-2 block text-sm font-semibold" style={{ color: "#3A2E1A" }}>
            Filtrar por municipio de Colombia
          </label>
          <MunicipalityAutocomplete
            id="municipality-filter"
            value={municipality}
            onChange={changeMunicipality}
            municipalities={SCOPED_MUNICIPALITIES}
            placeholder="Buscar municipio de Colombia"
          />
          <p className="mt-2 text-xs text-[#8A7659]">
            {SCOPED_MUNICIPALITIES.length} municipios disponibles
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((listing) => {
            const category = listing.category ?? "events"
            const cat = CATEGORY_MAP[category]
            const Icon = cat.icon
            const isExpanded = expandedId === listing.id
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

                <div className="flex items-center gap-1.5 text-sm" style={{ color: "#8A7659" }}>
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {listing.address ?? listing.city ?? "Ubicación reconocida"}
                </div>
                {listing.contact ? (
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: "#8A7659" }}>
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>{listing.contact}</span>
                  </div>
                ) : null}
                {listing.instagram ? (
                  <a
                    href={`https://www.instagram.com/${listing.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: "#C1367B" }}
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                    <span>@{listing.instagram}</span>
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={() => setExpandedId((id) => (id === listing.id ? null : listing.id))}
                  aria-expanded={isExpanded}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#4A7C59] underline-offset-4 hover:underline"
                >
                  <Map className="h-4 w-4" aria-hidden="true" />
                  {isExpanded ? "Ocultar mapa" : "Ver mapa"}
                </button>
                {isExpanded ? (
                  <div className="overflow-hidden rounded-xl border" style={{ borderColor: "#EAD9B8" }}>
                    <iframe
                      title={`Mapa de Google de ${listing.title}`}
                      src={`https://www.google.com/maps?q=${listing.lat},${listing.lng}&z=16&output=embed`}
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

      <BusinessVerificationDialog
        open={verifyOpen}
        onOpenChange={setVerifyOpen}
        onVerified={() => setPublishOpen(true)}
      />
      <PublishListingDialog open={publishOpen} onOpenChange={setPublishOpen} onPublished={refresh} />
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
