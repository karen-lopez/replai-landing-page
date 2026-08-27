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
    color: "#D97706",
    tint: "#FDEBCF",
  },
  {
    id: "search",
    label: "Búsqueda",
    description: "Ayuda a encontrar personas o mascotas desaparecidas.",
    icon: Search,
    color: "#C2410C",
    tint: "#FBDFD0",
  },
  {
    id: "health",
    label: "Servicios de salud",
    description: "Atención física y mental, gratuita para personas afectadas.",
    icon: HeartPulse,
    color: "#B45309",
    tint: "#FBE3C4",
  },
  {
    id: "events",
    label: "Eventos culturales",
    description: "Actividades para acompañar en momentos de incertidumbre.",
    icon: CalendarHeart,
    color: "#A16207",
    tint: "#FAEBB8",
  },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>
