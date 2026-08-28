import type { HelpCategory, MapItem } from "./types"
import earthquakeData from "@/data/terremoto-17-agosto-2023.json"

/**
 * Store en memoria (singleton por proceso). No apto para producción:
 * los datos se reinician si el servidor se reinicia.
 * Usamos globalThis para sobrevivir al hot-reload de desarrollo.
 */
interface LuzAmigaStore {
  items: MapItem[]
  updatedAt: number
  seedVersion?: number
}

const g = globalThis as unknown as { __luzAmigaStore?: LuzAmigaStore }
const SEED_VERSION = 5

function seed(): MapItem[] {
  const now = Date.now()
  const at = (minsAgo: number) => new Date(now - minsAgo * 60_000).toISOString()
  const reportTypes = ["landslideRisk", "blockedRoad", "safeZone"] as const

  return [
    // ---- Reactivando el comercio (help) ----
    {
      id: "help-1",
      kind: "help",
      category: "reopening",
      title: "Panadería La Espiga reabre",
      description: "Volvemos a hornear todos los días. ¡Gracias por acompañarnos en este nuevo comienzo!",
      author: "Panadería La Espiga",
      contact: "WhatsApp 300 123 4567",
      city: "Pereira",
      lat: 4.8133,
      lng: -75.6961,
      createdAt: at(35),
      status: "active",
    },
    {
      id: "help-2",
      kind: "help",
      category: "promotions",
      title: "2x1 en almuerzos esta semana",
      description: "Apoya al comercio local: pide un almuerzo y el segundo va por nuestra cuenta.",
      author: "Restaurante El Fogón",
      contact: "310 555 8899",
      city: "Manizales",
      lat: 5.07,
      lng: -75.5138,
      createdAt: at(80),
      status: "active",
    },
    {
      id: "help-3",
      kind: "help",
      category: "promotions",
      title: "20% de descuento en ropa",
      description: "Reactivamos la tienda con descuentos en toda la colección para adultos y niños.",
      author: "Almacén Vía Moda",
      contact: "312 444 7788",
      city: "Bogotá",
      lat: 4.711,
      lng: -74.0721,
      createdAt: at(120),
      status: "active",
    },
    {
      id: "help-4",
      kind: "help",
      category: "reopening",
      title: "Café Aroma vuelve a abrir",
      description: "Después del temblor, reabrimos con energía. Ven a tomarte un café con nosotros.",
      author: "Café Aroma",
      contact: "320 444 1212",
      city: "Medellín",
      lat: 6.2442,
      lng: -75.5812,
      createdAt: at(20),
      status: "active",
    },
    {
      id: "help-5",
      kind: "help",
      category: "promotions",
      title: "Ferretería con precios especiales",
      description: "Materiales de construcción y reparación con descuento para quienes reconstruyen.",
      author: "Ferretería El Tornillo",
      contact: "315 222 9090",
      city: "Cali",
      lat: 3.4516,
      lng: -76.532,
      createdAt: at(200),
      status: "active",
    },
    {
      id: "help-6",
      kind: "help",
      category: "reopening",
      title: "Mercado de barrio operando",
      description: "Nuestras tiendas del mercado ya atienden con normalidad. ¡Vuelve a visitarnos!",
      author: "Plaza de Mercado La Cosecha",
      contact: "línea 144",
      city: "Armenia",
      lat: 4.5339,
      lng: -75.6811,
      createdAt: at(55),
      status: "active",
    },

    // ---- Eventos del comercio (event) ----
    {
      id: "event-1",
      kind: "event",
      category: "events",
      title: "Feria de emprendedores locales",
      description: "Encuentro de negocios del barrio para reactivar las ventas. Entrada libre.",
      author: "Cámara de Comercio",
      contact: "Parque Bolívar, 4:00 p.m.",
      city: "Pereira",
      lat: 4.8087,
      lng: -75.69,
      createdAt: at(90),
      status: "active",
    },
    {
      id: "event-2",
      kind: "event",
      category: "events",
      title: "Mercado nocturno de comidas",
      description: "Los restaurantes locales se reúnen para una noche de sabores y música en vivo.",
      author: "Asociación de Comerciantes",
      contact: "Plaza principal, sábado 6:00 p.m.",
      city: "Manizales",
      lat: 5.0645,
      lng: -75.5074,
      createdAt: at(140),
      status: "active",
    },
    {
      id: "event-3",
      kind: "event",
      category: "events",
      title: "Bazar artesanal por la reactivación",
      description: "Artesanas y artesanos muestran su trabajo para reactivar la economía del sector.",
      author: "Colectivo Manos del Quindío",
      contact: "Parque del Café, domingo 10:00 a.m.",
      city: "Armenia",
      lat: 4.5289,
      lng: -75.6743,
      createdAt: at(160),
      status: "active",
    },
    ...earthquakeData.culturalEvents.map((event) => ({
      id: event.id,
      kind: "event" as const,
      category: "events" as const,
      title: event.title,
      description: `${event.description} Evento cultural sintetico para demostracion.`,
      author: event.organizer,
      contact: `${event.venue} · ${event.date}`,
      city: event.municipality,
      lat: event.latitude,
      lng: event.longitude,
      createdAt: event.date,
      status: "active" as const,
    })),
    ...earthquakeData.businesses.map((business) => ({
      id: business.id,
      kind: "help" as const,
      category: business.category as HelpCategory,
      title: business.name,
      description: `${business.description} Negocio sintetico para demostracion.`,
      author: business.name,
      contact: business.contact,
      city: business.municipality,
      address: business.address,
      lat: business.latitude,
      lng: business.longitude,
      createdAt: "2026-08-28T09:00:00.000Z",
      status: "active" as const,
    })),

    // ---- Reportes ciudadanos basados en el dataset historico de demo ----
    ...earthquakeData.affectedCities.map((city, index) => ({
      id: `report-earthquake-${index + 1}`,
      kind: "userReport" as const,
      reportType: reportTypes[index % reportTypes.length],
      title: `Afectacion reportada en ${city.municipality}`,
      description: `${city.reportedEffects.join(", ")}. Datos de demostracion basados en reportes del sismo del 17 de agosto de 2023.`,
      city: city.municipality,
      lat: city.latitude,
      lng: city.longitude,
      createdAt: at(15 + index * 12),
      status: "active" as const,
    })),
    ...earthquakeData.historicalEvents.flatMap((event) =>
      event.affectedCities.map((city, index) => ({
        id: `report-${event.id}-${index + 1}`,
        kind: "userReport" as const,
        reportType: reportTypes[index % reportTypes.length],
        title: `${event.title}: afectacion reportada en ${city.municipality}`,
        description: `${city.reportedEffects.join(", ")}. Registro historico usado como dato de demostracion.`,
        city: city.municipality,
        lat: city.latitude,
        lng: city.longitude,
        createdAt: event.date,
        status: "resolved" as const,
      })),
    ),
  ]
}

function getStore(): LuzAmigaStore {
  if (!g.__luzAmigaStore) {
    g.__luzAmigaStore = { items: seed(), updatedAt: Date.now(), seedVersion: SEED_VERSION }
  } else if (g.__luzAmigaStore.seedVersion !== SEED_VERSION) {
    const store = g.__luzAmigaStore
    const existingIds = new Set(store.items.map((item) => item.id))
    const missingSeedItems = seed().filter((item) => !existingIds.has(item.id))
    store.items.push(...missingSeedItems)
    store.seedVersion = SEED_VERSION
    store.updatedAt = Date.now()
  }
  return g.__luzAmigaStore
}

export function getItems(kind?: string): { items: MapItem[]; serverTime: number } {
  const store = getStore()
  const items = kind ? store.items.filter((i) => i.kind === kind) : store.items
  return { items, serverTime: Date.now() }
}

export function addItem(item: MapItem): MapItem {
  const store = getStore()
  store.items.unshift(item)
  store.updatedAt = Date.now()
  return item
}
