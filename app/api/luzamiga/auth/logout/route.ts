import { type NextRequest, NextResponse } from "next/server"
import { destroySession, SESSION_COOKIE } from "@/lib/luzamiga/auth-store"

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  destroySession(token)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 })
  return res
}
