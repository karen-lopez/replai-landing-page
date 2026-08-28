"use client"

import { MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SCOPED_MUNICIPALITIES } from "@/lib/luzamiga/municipalities"
import { useCityFilter } from "./city-filter-provider"

const ALL_CITIES_VALUE = "__all__"

export function CityFilterSwitcher() {
  const { city, setCity } = useCityFilter()

  return (
    <Select value={city ?? ALL_CITIES_VALUE} onValueChange={(value) => setCity(value === ALL_CITIES_VALUE ? null : value)}>
      <SelectTrigger
        aria-label="Elegir ciudad"
        className="h-auto gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-none"
        style={{ borderColor: "#EAD9B8", backgroundColor: "#FFFDF8", color: "#8A6D3B" }}
      >
        <MapPin className="h-4 w-4" style={{ color: "#8A6D3B" }} aria-hidden="true" />
        <SelectValue placeholder="Elegir ciudad" />
      </SelectTrigger>
      <SelectContent style={{ borderColor: "#EAD9B8", backgroundColor: "#FFFDF8" }}>
        <SelectItem value={ALL_CITIES_VALUE} style={{ color: "#3D3020" }}>
          Todas las ciudades
        </SelectItem>
        {SCOPED_MUNICIPALITIES.map((name) => (
          <SelectItem key={name} value={name} style={{ color: "#3D3020" }}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
