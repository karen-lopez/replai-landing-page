"use client"

import { useState } from "react"
import { MapPin, TriangleAlert, ShieldCheck, Construction, Loader2 } from "lucide-react"
import { useAuth } from "../auth/auth-provider"
import { useT } from "../i18n/language-provider"
import { REPORT_TYPES, REPORT_COLORS, isInsideColombia, type ReportType } from "@/lib/luzamiga/types"
import { enqueueItem } from "../offline/queue"

const REPORT_ICONS: Record<ReportType, typeof TriangleAlert> = {
  blockedRoad: Construction,
  landslideRisk: TriangleAlert,
  safeZone: ShieldCheck,
}

type Status = { kind: "idle" | "locating" | "sending" | "ok" | "queued" | "error"; message?: string }

export function UserReport() {
  const { user } = useAuth()
  const { t } = useT()
  const [selected, setSelected] = useState<ReportType | null>(null)
  const [note, setNote] = useState("")
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  if (!user) {
    // El llamado a iniciar sesión vive en el botón "Quiero reportar el
    // estado de mi ubicación" junto a "Mi ubicación" en el mapa.
    return null
  }

  async function submit() {
    if (!selected) return
    setStatus({ kind: "locating" })

    if (!("geolocation" in navigator)) {
      setStatus({ kind: "error", message: t("map.geoUnsupported") })
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        if (!isInsideColombia(lat, lng)) {
          setStatus({ kind: "error", message: t("userReport.outsideColombia") })
          return
        }
        const payload = {
          kind: "userReport",
          reportType: selected,
          title: t(`report.${selected}`),
          description: note.trim() || t(`report.${selected}`),
          lat,
          lng,
        }
        setStatus({ kind: "sending" })
        try {
          const res = await fetch("/api/luzamiga/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
          if (res.status === 401) {
            setStatus({ kind: "error", message: t("report.loginNeeded") })
            return
          }
          if (!res.ok) throw new Error("bad response")
          setStatus({ kind: "ok", message: t("userReport.success") })
          setNote("")
          setSelected(null)
        } catch {
          // sin conexión: encolar para sincronizar al reconectar
          await enqueueItem(payload)
          setStatus({ kind: "queued", message: t("userReport.queued") })
          setNote("")
          setSelected(null)
        }
      },
      () => setStatus({ kind: "error", message: t("map.geoDenied") }),
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  }

  const busy = status.kind === "locating" || status.kind === "sending"

  return (
    <div className="rounded-2xl border border-[#EAD9B8] bg-[#FFFDF8] p-6">
      <h3 className="text-lg font-bold text-[#3A2E1A]">{t("userReport.title")}</h3>
      <p className="mt-1 text-sm text-[#6B5E48] leading-relaxed">{t("userReport.subtitle")}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {REPORT_TYPES.map((r) => {
          const Icon = REPORT_ICONS[r]
          const active = selected === r
          const { color, tint } = REPORT_COLORS[r]
          return (
            <button
              key={r}
              type="button"
              onClick={() => setSelected(r)}
              aria-pressed={active}
              className="flex flex-col items-center gap-2 rounded-xl border p-4 text-center text-sm font-semibold transition"
              style={{
                borderColor: active ? color : "#EAD9B8",
                background: active ? tint : "#fff",
                color: "#3A2E1A",
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: tint, color }}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              {t(`report.${r}`)}
            </button>
          )
        })}
      </div>

      <label htmlFor="report-note" className="mt-4 block text-sm font-medium text-[#4A4030]">
        {t("userReport.detail")}
      </label>
      <textarea
        id="report-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        maxLength={280}
        placeholder={t("userReport.detailPlaceholder")}
        className="mt-1 w-full rounded-lg border border-[#EAD9B8] bg-white px-3 py-2 text-sm text-[#3A2E1A] outline-none focus:border-[#C77F16] focus:ring-2 focus:ring-[#C77F16]/30"
      />

      <button
        type="button"
        onClick={submit}
        disabled={!selected || busy}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C77F16] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A96912] disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <MapPin className="h-4 w-4" aria-hidden="true" />}
        {status.kind === "locating" ? t("userReport.gettingLocation") : t("userReport.send")}
      </button>

      {status.message ? (
        <p
          role="status"
          className="mt-3 rounded-lg px-4 py-2 text-sm"
          style={
            status.kind === "error"
              ? { background: "#FCE4E4", color: "#B4231F" }
              : status.kind === "queued"
                ? { background: "#FCEBD7", color: "#A96912" }
                : { background: "#DEF3E5", color: "#1F7A44" }
          }
        >
          {status.message}
        </p>
      ) : null}
    </div>
  )
}
