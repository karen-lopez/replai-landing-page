"use client"

import { createContext, useContext, useMemo, useState } from "react"

interface CityFilterContextValue {
  /** null = todas las ciudades */
  city: string | null
  setCity: (city: string | null) => void
}

const CityFilterContext = createContext<CityFilterContextValue | null>(null)

/** Filtro global de ciudad: se elige una vez en el header y filtra las
 * publicaciones (comercio) y los eventos culturales en toda la página. */
export function CityFilterProvider({ children }: { children: React.ReactNode }) {
  const [city, setCity] = useState<string | null>(null)

  const value = useMemo(() => ({ city, setCity }), [city])

  return <CityFilterContext.Provider value={value}>{children}</CityFilterContext.Provider>
}

export function useCityFilter() {
  const ctx = useContext(CityFilterContext)
  if (!ctx) {
    throw new Error("useCityFilter debe usarse dentro de CityFilterProvider")
  }
  return ctx
}
