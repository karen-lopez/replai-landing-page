import { Store, CalendarHeart, BadgePercent, type LucideIcon } from "lucide-react"

export type CategoryId = "reopening" | "events" | "promotions"

export interface Category {
  id: CategoryId
  label: string
  description: string
  icon: LucideIcon
  /** Warm accent color for the category */
  color: string
  tint: string
}

export const CATEGORIES: Category[] = [
  {
    id: "reopening",
    label: "Reapertura",
    description: "Negocios que vuelven a abrir sus puertas después del temblor.",
    icon: Store,
    // Verde salvia (nuevo comienzo, puertas abiertas)
    color: "#3E8E76",
    tint: "#DDF0E9",
  },
  {
    id: "events",
    label: "Eventos",
    description: "Actividades y encuentros para reactivar la vida del comercio local.",
    icon: CalendarHeart,
    // Azul suave (sereno y amable)
    color: "#3F6BB0",
    tint: "#E3EAF8",
  },
  {
    id: "promotions",
    label: "Promociones",
    description: "Ofertas y descuentos para apoyar a los negocios de la comunidad.",
    icon: BadgePercent,
    // Miel cálido
    color: "#C77F16",
    tint: "#FBEFD6",
  },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>
