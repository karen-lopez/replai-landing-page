"use client"

import { MapContainer, CircleMarker, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface MiniLocationMapProps {
  lat: number
  lng: number
  label: string
}

export function MiniLocationMap({ lat, lng, label }: MiniLocationMapProps) {
  return (
    <div className="h-32 overflow-hidden rounded-xl border border-[#EAD9B8]" aria-label={`Mapa de ${label}`}>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        minZoom={12}
        maxZoom={17}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={[lat, lng]}
          radius={8}
          pathOptions={{ color: "#FFFFFF", weight: 3, fillColor: "#D97706", fillOpacity: 1 }}
        />
      </MapContainer>
    </div>
  )
}