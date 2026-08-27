"use client"

import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import { MapPin, Radio, WifiOff, Loader2 } from "lucide-react"
import { useItems } from "./use-items"
import { colorForItem } from "./marker-icons"
import { CATEGORIES } from "../categories"
import { REPORT_COLORS, REPORT_TYPES, type MapItem } from "@/lib/luzamiga/types"
import { useT } from "../i18n/language-provider"

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#F3EFE6]">
      <Loader2 className="h-6 w-6 animate-spin text-[#C77F16]" aria-hidden="true" />
    </div>
  ),
})

export function NationalMap() {
  const { t, lang } = useT()
  const { items, serverTime, online } = useItems()
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)

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

        <div className="overflow-hidden rounded-2xl border border-[#EAD9B8] shadow-sm">
          <div className="h-[420px] w-full md:h-[520px]">
            <LeafletMap
              items={items}
              userPosition={userPosition}
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
