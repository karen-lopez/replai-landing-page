export type ItemKind = "help" | "event" | "userReport"

export type ReportType = "blockedRoad" | "landslideRisk" | "safeZone"

// Etiquetas de la sección Reactivando el Comercio
export type HelpCategory = "reopening" | "events" | "promotions"

export interface MapItem {
  id: string
  kind: ItemKind
  /** Para kind="help": categoría; para kind="event": "events" */
  category?: HelpCategory
  /** Para kind="userReport": tipo de reporte ciudadano */
  reportType?: ReportType
  title: string
  description: string
  /** Nombre o persona/organización que publica */
  author?: string
  /** Contacto (whatsapp, teléfono, correo) opcional */
  contact?: string
  /** Usuario de Instagram opcional, sin @ ni URL (p. ej. "panaderialaespiga") */
  instagram?: string
  /** Ciudad o municipio */
  city?: string
  /** Dirección reconocida a partir de las coordenadas del negocio */
  address?: string
  lat: number
  lng: number
  createdAt: string
  status: "active" | "resolved"
  /** id del usuario autor cuando aplica (help / userReport) */
  authorId?: string
}

/** Bounding box aproximado de Colombia continental + insular */
export const COLOMBIA_BOUNDS = {
  minLat: -4.5,
  maxLat: 13.5,
  minLng: -79.5,
  maxLng: -66.5,
}

export function isInsideColombia(lat: number, lng: number): boolean {
  return (
    lat >= COLOMBIA_BOUNDS.minLat &&
    lat <= COLOMBIA_BOUNDS.maxLat &&
    lng >= COLOMBIA_BOUNDS.minLng &&
    lng <= COLOMBIA_BOUNDS.maxLng
  )
}

export const REPORT_TYPES: ReportType[] = ["blockedRoad", "landslideRisk", "safeZone"]

/** Colores propios de los reportes ciudadanos */
export const REPORT_COLORS: Record<ReportType, { color: string; tint: string }> = {
  landslideRisk: { color: "#DC2626", tint: "#FCE4E4" }, // rojo
  blockedRoad: { color: "#EA7317", tint: "#FCEBD7" }, // naranja
  safeZone: { color: "#2E9E5B", tint: "#DEF3E5" }, // verde
}
