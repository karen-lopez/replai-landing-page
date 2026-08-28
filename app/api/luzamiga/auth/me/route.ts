import { type NextRequest, NextResponse } from "next/server"
import { getUserByToken, SESSION_COOKIE } from "@/lib/luzamiga/auth-store"

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  const user = getUserByToken(token)
  return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } })
}
