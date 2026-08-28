"use client"

import { useEffect, useMemo, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { MapItem } from "@/lib/luzamiga/types"
import { COLOMBIA_BOUNDS } from "@/lib/luzamiga/types"
import { colorForItem, pinIcon, userLocationIcon } from "./marker-icons"

interface LeafletMapProps {
  items: MapItem[]
  userPosition: { lat: number; lng: number } | null
  mapCenter: { lat: number; lng: number } | null
  labelForItem: (item: MapItem) => string
  contactLabel: string
}

const COLOMBIA_CENTER: [number, number] = [4.6, -74.1]

const maxBounds = L.latLngBounds(
  [COLOMBIA_BOUNDS.minLat - 1, COLOMBIA_BOUNDS.minLng - 1],
  [COLOMBIA_BOUNDS.maxLat + 1, COLOMBIA_BOUNDS.maxLng + 1],
)

/** Recentra el mapa en la ubicación del usuario cuando aparece. */
function FlyToUser({ position }: { position: { lat: number; lng: number } | null }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 13, { duration: 1.2 })
    }
  }, [position, map])
  return null
}

function FlyToLocation({ position }: { position: { lat: number; lng: number } | null }) {
  const map = useMap()
  useEffect(() => {
    if (position) map.flyTo([position.lat, position.lng], 12, { duration: 1.2 })
  }, [position, map])
  return null
}

export default function LeafletMap({ items, userPosition, mapCenter, labelForItem, contactLabel }: LeafletMapProps) {
  const markers = useMemo(
    () =>
      items.map((item) => (
        <Marker key={item.id} position={[item.lat, item.lng]} icon={pinIcon(colorForItem(item))}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13 }}>{item.title}</p>
              <p style={{ margin: "0 0 6px", fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.4 }}>
                {labelForItem(item)}
                {item.city ? ` · ${item.city}` : ""}
              </p>
              <p style={{ margin: "0 0 6px", fontSize: 12, color: "#374151", lineHeight: 1.4 }}>{item.description}</p>
              {item.address ? (
                <p style={{ margin: "0 0 8px", fontSize: 12, color: "#374151", lineHeight: 1.4 }}>
                  <strong>Dirección:</strong> {item.address}
                </p>
              ) : null}
              {item.author ? (
                <p style={{ margin: 0, fontSize: 12, color: "#111827" }}>
                  <strong>{item.author}</strong>
                </p>
              ) : null}
              {item.contact ? (
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#111827" }}>
                  {contactLabel}: {item.contact}
                </p>
              ) : null}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                <a
                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${item.lat},${item.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1769AA", fontSize: 12, fontWeight: 700 }}
                >
                  Street View
                </a>
                <a
                  href={`https://www.mapillary.com/app/?lat=${item.lat}&lng=${item.lng}&z=17`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1769AA", fontSize: 12, fontWeight: 700 }}
                >
                  Mapillary
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      )),
    [items, labelForItem, contactLabel],
  )

  return (
    <MapContainer
      center={COLOMBIA_CENTER}
      zoom={6}
      minZoom={5}
      maxBounds={maxBounds}
      maxBoundsViscosity={0.8}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
      {userPosition ? (
        <Marker position={[userPosition.lat, userPosition.lng]} icon={userLocationIcon()} />
      ) : null}
      <FlyToLocation position={mapCenter} />
      <FlyToUser position={userPosition} />
    </MapContainer>
  )
}
