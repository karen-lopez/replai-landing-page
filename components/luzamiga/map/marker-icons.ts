import L from "leaflet"
import { CATEGORIES } from "../categories"
import { REPORT_COLORS, type MapItem } from "@/lib/luzamiga/types"

/** Color representativo de un ítem según su tipo */
export function colorForItem(item: MapItem): string {
  if (item.kind === "userReport" && item.reportType) {
    return REPORT_COLORS[item.reportType].color
  }
  if (item.kind === "event") {
    return CATEGORIES.find((c) => c.id === "events")?.color ?? "#3B82C4"
  }
  if (item.category) {
    return CATEGORIES.find((c) => c.id === item.category)?.color ?? "#C77F16"
  }
  return "#C77F16"
}

/** Icono tipo "pin" (gota) con la punta anclada en la ubicación. Se cachea por color. */
const iconCache = new Map<string, L.DivIcon>()

export function pinIcon(color: string): L.DivIcon {
  const cached = iconCache.get(color)
  if (cached) return cached
  // Pin tipo gota: círculo relleno que se estrecha en una punta inferior.
  const html = `
    <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg"
      style="filter:drop-shadow(0 3px 4px rgba(0,0,0,0.35))">
      <path d="M15 39C15 39 27 22.5 27 13.5C27 6.6 21.6 1 15 1C8.4 1 3 6.6 3 13.5C3 22.5 15 39 15 39Z"
        fill="${color}" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round" />
      <circle cx="15" cy="13.5" r="4.6" fill="#ffffff" />
    </svg>`
  const icon = L.divIcon({
    className: "luzamiga-pin",
    html,
    iconSize: [30, 40],
    iconAnchor: [15, 39],
    popupAnchor: [0, -34],
  })
  iconCache.set(color, icon)
  return icon
}

/** Icono pulsante para la ubicación del usuario */
export function userLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: "luzamiga-userloc",
    html: `<span style="
      display:block;width:18px;height:18px;border-radius:9999px;
      background:#1D4ED8;border:3px solid #fff;
      box-shadow:0 0 0 6px rgba(29,78,216,0.25);"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}
