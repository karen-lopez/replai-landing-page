import type { MapItem } from "./types"

/**
 * Store en memoria (singleton por proceso). No apto para producción:
 * los datos se reinician si el servidor se reinicia.
 * Usamos globalThis para sobrevivir al hot-reload de desarrollo.
 */
interface LuzAmigaStore {
  items: MapItem[]
  updatedAt: number
}

const g = globalThis as unknown as { __luzAmigaStore?: LuzAmigaStore }

function seed(): MapItem[] {
  const now = Date.now()
  const at = (minsAgo: number) => new Date(now - minsAgo * 60_000).toISOString()

  return [
    // ---- Ofrecimientos de ayuda (help) ----
    {
      id: "help-1",
      kind: "help",
      category: "supplies",
      title: "Mercados y agua potable",
      description: "Entregamos mercados básicos y bidones de agua para familias afectadas.",
      author: "Fundación Manos Unidas",
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
      category: "health",
      title: "Apoyo psicológico gratuito",
      description: "Psicólogas voluntarias ofrecen acompañamiento emocional sin costo.",
      author: "Colectivo Calma",
      contact: "citas@colectivocalma.org",
      city: "Manizales",
      lat: 5.07,
      lng: -75.5138,
      createdAt: at(80),
      status: "active",
    },
    {
      id: "help-3",
      kind: "help",
      category: "supplies",
      title: "Ropa y cobijas",
      description: "Donamos ropa para niños y adultos, además de cobijas para las noches frías.",
      author: "Parroquia San José",
      contact: "310 555 8899",
      city: "Bogotá",
      lat: 4.711,
      lng: -74.0721,
      createdAt: at(120),
      status: "active",
    },
    {
      id: "help-4",
      kind: "help",
      category: "search",
      title: "Búsqueda de mascota perdida",
      description: "Perro café mediano, collar azul, se perdió cerca del parque tras el sismo.",
      author: "Familia Restrepo",
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
      category: "health",
      title: "Brigada médica móvil",
      description: "Atención médica básica y curaciones para personas afectadas.",
      author: "Cruz Amarilla",
      contact: "brigadas@cruzamarilla.org",
      city: "Cali",
      lat: 3.4516,
      lng: -76.532,
      createdAt: at(200),
      status: "active",
    },
    {
      id: "help-6",
      kind: "help",
      category: "search",
      title: "Punto de reencuentro familiar",
      description: "Ayudamos a coordinar el reencuentro de familias separadas durante la emergencia.",
      author: "Defensa Civil",
      contact: "línea 144",
      city: "Armenia",
      lat: 4.5339,
      lng: -75.6811,
      createdAt: at(55),
      status: "active",
    },

    // ---- Eventos culturales / bienestar (event) ----
    {
      id: "event-1",
      kind: "event",
      category: "events",
      title: "Círculo de música para sanar",
      description: "Encuentro musical comunitario para acompañarnos y liberar tensiones. Gratis.",
      author: "Casa de la Cultura",
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
      title: "Taller de arte para niñas y niños",
      description: "Pintura y cuentos para ayudar a las infancias a procesar lo vivido.",
      author: "Colectivo Arcoíris",
      contact: "Biblioteca municipal, sábado 10:00 a.m.",
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
      title: "Yoga y respiración consciente",
      description: "Sesión al aire libre para calmar la ansiedad. Trae tu estera si puedes.",
      author: "Red de Bienestar",
      contact: "Parque del Café, domingo 7:00 a.m.",
      city: "Armenia",
      lat: 4.5289,
      lng: -75.6743,
      createdAt: at(160),
      status: "active",
    },

    // ---- Reportes ciudadanos (userReport) ----
    {
      id: "report-1",
      kind: "userReport",
      reportType: "safeZone",
      title: "Zona segura: coliseo municipal",
      description: "Espacio amplio y estable habilitado como punto de encuentro seguro.",
      city: "Pereira",
      lat: 4.8156,
      lng: -75.6944,
      createdAt: at(45),
      status: "active",
    },
    {
      id: "report-2",
      kind: "userReport",
      reportType: "blockedRoad",
      title: "Vía bloqueada por escombros",
      description: "Paso cerrado por caída de material. Buscar ruta alterna.",
      city: "Manizales",
      lat: 5.055,
      lng: -75.52,
      createdAt: at(30),
      status: "active",
    },
    {
      id: "report-3",
      kind: "userReport",
      reportType: "landslideRisk",
      title: "Riesgo de derrumbe en ladera",
      description: "Grietas visibles en el terreno. Evitar la zona y reportar a autoridades.",
      city: "Medellín",
      lat: 6.2518,
      lng: -75.5636,
      createdAt: at(15),
      status: "active",
    },
  ]
}

function getStore(): LuzAmigaStore {
  if (!g.__luzAmigaStore) {
    g.__luzAmigaStore = { items: seed(), updatedAt: Date.now() }
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
