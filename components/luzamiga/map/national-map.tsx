"use client"

import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import { AlertTriangle, BarChart3, Building2, Loader2, MapPin, Radio, WifiOff } from "lucide-react"
import { useItems } from "./use-items"
import { colorForItem } from "./marker-icons"
import { CATEGORIES } from "../categories"
import { REPORT_COLORS, REPORT_TYPES, type MapItem } from "@/lib/luzamiga/types"
import { useT } from "../i18n/language-provider"
import { useAuth } from "../auth/auth-provider"
import { MunicipalityAutocomplete } from "../municipality-autocomplete"

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#F3EFE6]">
      <Loader2 className="h-6 w-6 animate-spin text-[#C77F16]" aria-hidden="true" />
    </div>
  ),
})

const MUNICIPALITIES_URL = "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json"
const FALLBACK_MUNICIPALITIES = ["Bogotá", "Manizales", "Medellín", "Pereira", "Cali", "Armenia"]

function normalize(value: string) {
  return value.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function NationalMap() {
  const { t, lang } = useT()
  const { user, openLogin } = useAuth()
  const { items, serverTime, online } = useItems()
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)
  const [municipality, setMunicipality] = useState("")
  const [activeMunicipality, setActiveMunicipality] = useState("")
  const [municipalities, setMunicipalities] = useState(FALLBACK_MUNICIPALITIES)
  const [localityPosition, setLocalityPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetch(MUNICIPALITIES_URL)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("catalog-failed"))))
      .then((departments: Array<{ ciudades?: string[] }>) => {
        const names = [...new Set(departments.flatMap((department) => department.ciudades ?? []))].sort((a, b) => a.localeCompare(b, "es"))
        if (active && names.length) setMunicipalities(names)
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const labelForItem = useMemo(
    () => (item: MapItem) => {
      if (item.kind === "userReport" && item.reportType) return t(`report.${item.reportType}`)
      if (item.kind === "event") return t("cat.events")
      if (item.category) return t(`cat.${item.category}`)
      return ""
    },
    [t],
  )

  function locate() {
    if (!("geolocation" in navigator)) {
      setGeoError(t("map.geoUnsupported"))
      return
    }
    setLocating(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocating(false)
      },
      () => {
        setGeoError(t("map.geoDenied"))
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  }

  async function analyzeLocality() {
    const selected = municipality.trim()
    if (!selected) {
      setAnalysisError("Escribe o selecciona un municipio para analizarlo.")
      return
    }
    setAnalyzing(true)
    setAnalysisError(null)
    try {
      const params = new URLSearchParams({ format: "jsonv2", q: `${selected}, Colombia`, limit: "1", countrycodes: "co" })
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`)
      if (!response.ok) throw new Error("geocode-failed")
      const results = await response.json()
      if (!results[0]) throw new Error("municipality-not-found")
      setActiveMunicipality(selected)
      setLocalityPosition({ lat: Number(results[0].lat), lng: Number(results[0].lon) })
    } catch {
      setAnalysisError("No pudimos ubicar ese municipio. Revisa el nombre e inténtalo de nuevo.")
    } finally {
      setAnalyzing(false)
    }
  }

  function reportStatus() {
    if (!user) {
      openLogin("Debes iniciar sesión para reportar el estado de tu zona.")
      return
    }
    document.getElementById("reportar-estado")?.scrollIntoView({ behavior: "smooth" })
  }

  function updateMunicipality(value: string) {
    setMunicipality(value)
    if (!value) {
      setActiveMunicipality("")
      setLocalityPosition(null)
      setAnalysisError(null)
    }
  }

  const mapItems = activeMunicipality
    ? items.filter((item) => normalize(`${item.city ?? ""} ${item.address ?? ""}`).includes(normalize(activeMunicipality)))
    : items
  const localityReports = mapItems.filter((item) => item.kind === "userReport")
  const localityBusinesses = mapItems.filter((item) => item.kind === "help")
  const localityEvents = mapItems.filter((item) => item.kind === "event" || item.category === "events")

  const lastUpdate = serverTime
    ? new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(serverTime))
    : null

  return (
    <section className="bg-[#FFFDF8] py-16 md:py-20" aria-labelledby="map-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 id="map-heading" className="text-balance text-3xl font-bold tracking-tight text-[#3A2E1A] md:text-4xl">
            {t("map.title")}
          </h2>
          <p className="mt-3 text-pretty text-[#6B5E48] leading-relaxed">{t("map.subtitle")}</p>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={locate}
              disabled={locating}
              className="inline-flex items-center gap-2 rounded-full bg-[#C77F16] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A96912] disabled:opacity-60"
            >
              {locating ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <MapPin className="h-4 w-4" aria-hidden="true" />
              )}
              {t("map.myLocation")}
            </button>
            <button
              type="button"
              onClick={reportStatus}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[#F6ECD8]"
              style={{ borderColor: "#E4C79A", color: "#8A6D3B", backgroundColor: "#FFFDF8" }}
            >
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Quiero reportar el estado de mi ubicación
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium">
            {online ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DEF3E5] px-3 py-1 text-[#1F7A44]">
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                {lastUpdate ? t("map.updatedAt").replace("{time}", lastUpdate) : t("map.live")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCEBD7] px-3 py-1 text-[#A96912]">
                <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
                {t("map.offline")}
              </span>
            )}
          </div>
        </div>

        {geoError ? (
          <p role="alert" className="mb-3 rounded-lg bg-[#FCE4E4] px-4 py-2 text-sm text-[#B4231F]">
            {geoError}
          </p>
        ) : null}

        <div className="mb-4 rounded-2xl border border-[#EAD9B8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="min-w-0 flex-1">
              <label htmlFor="locality-analysis" className="mb-2 block text-sm font-semibold text-[#3A2E1A]">
                Analizar por localidad
              </label>
              <MunicipalityAutocomplete
                id="locality-analysis"
                value={municipality}
                onChange={updateMunicipality}
                municipalities={municipalities}
                placeholder="Busca un municipio de Colombia"
                onEnter={analyzeLocality}
              />
            </div>
            <button
              type="button"
              onClick={analyzeLocality}
              disabled={analyzing}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2E7D61] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24664F] disabled:opacity-60"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <BarChart3 className="h-4 w-4" aria-hidden="true" />}
              {analyzing ? "Analizando..." : "Analizar localidad"}
            </button>
          </div>
          {analysisError ? <p className="mt-3 rounded-lg bg-[#FCE4E4] px-3 py-2 text-sm text-[#B4231F]" role="alert">{analysisError}</p> : null}
        </div>

        {activeMunicipality ? (
          <div className="mb-4" aria-label={`Análisis de ${activeMunicipality}`}>
            <div className="grid gap-3 sm:grid-cols-3">
              <AnalysisCard icon={<Building2 className="h-5 w-5" aria-hidden="true" />} label="Comercios" value={localityBusinesses.length} />
              <AnalysisCard icon={<MapPin className="h-5 w-5" aria-hidden="true" />} label="Eventos" value={localityEvents.length} />
              <AnalysisCard icon={<AlertTriangle className="h-5 w-5" aria-hidden="true" />} label="Reportes" value={localityReports.length} />
            </div>
            <div className="mt-3 rounded-xl border border-[#EAD9B8] bg-white p-4">
              <h3 className="text-sm font-bold text-[#3A2E1A]">Lugares reportados en {activeMunicipality}</h3>
              {localityReports.length ? (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {localityReports.map((report) => (
                    <li key={report.id} className="rounded-lg bg-[#FFF8EC] px-3 py-2 text-sm">
                      <p className="font-semibold text-[#3A2E1A]">{report.title}</p>
                      <p className="mt-1 text-[#6B5E48]">{report.address ?? report.city ?? "Ubicación reconocida"}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-[#6B5E48]">No hay reportes registrados en este municipio.</p>
              )}
            </div>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-[#EAD9B8] shadow-sm">
          <div className="h-[420px] w-full md:h-[520px]">
            <LeafletMap
              items={mapItems}
              userPosition={userPosition}
              mapCenter={localityPosition}
              labelForItem={labelForItem}
              contactLabel={t("map.contact")}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {CATEGORIES.map((c) => (
            <span key={c.id} className="inline-flex items-center gap-2 text-sm text-[#4A4030]">
              <span className="h-3 w-3 rounded-full" style={{ background: c.color }} aria-hidden="true" />
              {t(`cat.${c.id}`)}
            </span>
          ))}
          {REPORT_TYPES.map((r) => (
            <span key={r} className="inline-flex items-center gap-2 text-sm text-[#4A4030]">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: REPORT_COLORS[r].color }}
                aria-hidden="true"
              />
              {t(`report.${r}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnalysisCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#EAD9B8] bg-white px-4 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E5F2EC] text-[#2E7D61]">{icon}</span>
      <div><p className="text-xs text-[#8A7659]">{label}</p><p className="text-xl font-bold text-[#3A2E1A]">{value}</p></div>
    </div>
  )
}
