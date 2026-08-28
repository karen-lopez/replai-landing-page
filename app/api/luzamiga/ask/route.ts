import { type NextRequest, NextResponse } from "next/server"

/**
 * Proxies chat questions to the Luz Amiga WhatsApp bot's /api/ask endpoint
 * (same Go service that answers on WhatsApp, running on Cloud Run). Kept
 * server-side so the bot's URL never reaches the browser and no CORS setup
 * is needed on the Go side.
 */
export async function POST(req: NextRequest) {
  const botUrl = process.env.LUZAMIGA_BOT_URL
  if (!botUrl) {
    return NextResponse.json({ error: "El asistente no está configurado todavía." }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 })
  }

  const message = String(body.message ?? "").trim()
  if (!message) {
    return NextResponse.json({ error: "Escribe una pregunta." }, { status: 400 })
  }

  const rawHistory = Array.isArray(body.history) ? body.history : []
  const history = rawHistory
    .filter((turn): turn is { role: unknown; text: unknown } => typeof turn === "object" && turn !== null)
    .map((turn) => ({ role: turn.role === "bot" ? "bot" : "user", text: String((turn as { text?: unknown }).text ?? "") }))
    .filter((turn) => turn.text.trim().length > 0)

  let upstream: Response
  try {
    upstream = await fetch(`${botUrl}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
      signal: AbortSignal.timeout(15_000),
    })
  } catch {
    return NextResponse.json({ error: "No se pudo contactar al asistente." }, { status: 502 })
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: "El asistente no pudo responder." }, { status: 502 })
  }

  const data = (await upstream.json()) as { answer: string; found: boolean }
  return NextResponse.json(data)
}
