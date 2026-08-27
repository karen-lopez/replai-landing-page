import { type NextRequest, NextResponse } from "next/server"
import { addItem, getItems } from "@/lib/luzamiga/store"
import { getUserByToken, SESSION_COOKIE } from "@/lib/luzamiga/auth-store"
import {
  type HelpCategory,
  type ItemKind,
  type MapItem,
  type ReportType,
  isInsideColombia,
  REPORT_TYPES,
} from "@/lib/luzamiga/types"

const HELP_CATEGORIES: HelpCategory[] = ["reopening", "events", "promotions"]
const MAX_TITLE = 120
const MAX_DESC = 600

export async function GET(req: NextRequest) {
  const kind = req.nextUrl.searchParams.get("kind") ?? undefined
  const { items, serverTime } = getItems(kind)
  return NextResponse.json({ items, serverTime }, { headers: { "Cache-Control": "no-store" } })
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 })
  }

  const kind = body.kind as ItemKind
  if (!["help", "event", "userReport"].includes(kind)) {
    return NextResponse.json({ error: "Tipo de ítem no válido." }, { status: 400 })
  }

  // Publicar ofertas de ayuda y reportes ciudadanos exige sesión.
  const token = req.cookies.get(SESSION_COOKIE)?.value
  const user = getUserByToken(token)
  if ((kind === "help" || kind === "event" || kind === "userReport") && !user) {
    return NextResponse.json(
      { error: "Necesitas iniciar sesión para publicar." },
      { status: 401 },
    )
  }

  const lat = Number(body.lat)
  const lng = Number(body.lng)
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !isInsideColombia(lat, lng)) {
    return NextResponse.json(
      { error: "La ubicación debe estar dentro de Colombia." },
      { status: 400 },
    )
  }

  const title = String(body.title ?? "").trim()
  const description = String(body.description ?? "").trim()
  if (!title || title.length > MAX_TITLE) {
    return NextResponse.json({ error: "Título requerido (máx. 120 caracteres)." }, { status: 400 })
  }
  if (description.length > MAX_DESC) {
    return NextResponse.json({ error: "Descripción demasiado larga." }, { status: 400 })
  }

  let category: HelpCategory | undefined
  let reportType: ReportType | undefined

  if (kind === "userReport") {
    reportType = body.reportType as ReportType
    if (!REPORT_TYPES.includes(reportType)) {
      return NextResponse.json({ error: "Tipo de reporte no válido." }, { status: 400 })
    }
  } else if (kind === "event") {
    category = "events"
  } else {
    category = body.category as HelpCategory
    if (!HELP_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Categoría no válida." }, { status: 400 })
    }
  }

  const item: MapItem = {
    id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind,
    category,
    reportType,
    title,
    description,
    author: body.author ? String(body.author).slice(0, 120) : user?.name,
    contact: body.contact ? String(body.contact).slice(0, 160) : undefined,
    city: body.city ? String(body.city).slice(0, 80) : user?.city,
    lat,
    lng,
    createdAt: new Date().toISOString(),
    status: "active",
    authorId: user?.id,
  }

  addItem(item)
  return NextResponse.json({ item }, { status: 201 })
}
