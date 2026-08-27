import { Package, Search, HeartPulse, CalendarHeart, type LucideIcon } from "lucide-react"

export type CategoryId = "supplies" | "search" | "health" | "events"

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
    id: "supplies",
    label: "Insumos",
    description: "Comida, agua, medicinas y ropa para quienes lo necesitan.",
    icon: Package,
    // Miel cálido
    color: "#C77F16",
    tint: "#FBEFD6",
  },
  {
    id: "search",
    label: "Búsqueda",
    description: "Ayuda a encontrar personas o mascotas desaparecidas.",
    icon: Search,
    // Coral suave
    color: "#C85A38",
    tint: "#FBE4DB",
  },
  {
    id: "health",
    label: "Servicios de salud",
    description: "Atención física y mental, gratuita para personas afectadas.",
    icon: HeartPulse,
    // Verde salvia (transmite calma y salud)
    color: "#3E8E76",
    tint: "#DDF0E9",
  },
  {
    id: "events",
    label: "Eventos culturales",
    description: "Actividades para acompañar en momentos de incertidumbre.",
    icon: CalendarHeart,
    // Azul suave (sereno y amable)
    color: "#3F6BB0",
    tint: "#E3EAF8",
  },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>
