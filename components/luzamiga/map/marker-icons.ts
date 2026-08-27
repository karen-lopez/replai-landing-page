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

/** Icono tipo "pin" con un punto de color. Se cachea por color. */
const iconCache = new Map<string, L.DivIcon>()

export function pinIcon(color: string): L.DivIcon {
  const cached = iconCache.get(color)
  if (cached) return cached
  const icon = L.divIcon({
    className: "luzamiga-pin",
    html: `<span style="
      display:block;width:20px;height:20px;border-radius:9999px;
      background:${color};border:3px solid #fff;
      box-shadow:0 1px 4px rgba(0,0,0,0.35);"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12],
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
