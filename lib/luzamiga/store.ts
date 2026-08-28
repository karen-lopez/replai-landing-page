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

    // ---- Eventos culturales (event) ----
    // Eventos reales y verificables (no ficticios), uno por cada municipio
    // habilitado. La fecha/lugar exactos viven en "contact" (mismo campo que
    // usa el formulario de publicación de eventos para "Fecha y hora").
    {
      id: "event-1",
      kind: "event",
      category: "events",
      title: "Caifanes en concierto",
      description:
        "El legendario grupo mexicano de rock regresa a Colombia en su gira 2026, con parada en Cali en la Arena Cañaveralejo.",
      author: "Gira Caifanes 2026",
      contact: "Arena Cañaveralejo, viernes 11 de septiembre, 8:00 p.m.",
      city: "Cali",
      lat: 3.4372,
      lng: -76.5325,
      createdAt: at(90),
      status: "active",
    },
    {
      id: "event-2",
      kind: "event",
      category: "events",
      title: "Fiestas de San Pacho",
      description:
        "Patrimonio Cultural Inmaterial de la Humanidad (Unesco). Los doce barrios franciscanos de Quibdó celebran con chirimía, comparsas y desfiles en honor a San Francisco de Asís.",
      author: "Barrios franciscanos de Quibdó",
      contact: "Del 20 de septiembre al 5 de octubre",
      city: "Quibdó",
      lat: 5.6923,
      lng: -76.6611,
      createdAt: at(140),
      status: "active",
    },
    {
      id: "event-3",
      kind: "event",
      category: "events",
      title: "Hoy no estrenamos",
      description: "Puesta en escena teatral en el Teatro Los Fundadores, con funciones para toda la familia.",
      author: "Teatro Los Fundadores",
      contact: "Miércoles 30 de septiembre, 3:00 p.m. y 7:00 p.m.",
      city: "Manizales",
      lat: 5.07,
      lng: -75.518,
      createdAt: at(160),
      status: "active",
    },
    {
      id: "event-4",
      kind: "event",
      category: "events",
      title: "Pim Pau Lúdico",
      description:
        "Concierto en vivo para toda la familia: música, movimiento, danza y humor, sin pantallas de por medio, con juegos y coreografías que invitan a participar.",
      author: "Pim Pau",
      contact: "Teatro Santiago Londoño, domingo 27 de septiembre, 3:00 p.m.",
      city: "Pereira",
      lat: 4.8143,
      lng: -75.6946,
      createdAt: at(200),
      status: "active",
    },
    {
      id: "event-5",
      kind: "event",
      category: "events",
      title: "Fiestas Aniversarias de Armenia — Desfile del Yipao",
      description:
        "135 años de Armenia: el tradicional Desfile del Yipao, música, cultura cafetera y actividades para toda la familia.",
      author: "Alcaldía de Armenia",
      contact: "Del 2 al 14 de octubre",
      city: "Armenia",
      lat: 4.5339,
      lng: -75.6811,
      createdAt: at(230),
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
