import { type NextRequest, NextResponse } from "next/server"
import { loginUser, SESSION_COOKIE } from "@/lib/luzamiga/auth-store"

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 })
  }

  const email = String(body.email ?? "").trim()
  const password = String(body.password ?? "")

  if (!email || !password) {
    return NextResponse.json({ error: "Ingresa tu correo y contraseña." }, { status: 400 })
  }

  const result = loginUser(email, password)
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 401 })
  }

  const res = NextResponse.json({ user: result.user })
  res.cookies.set(SESSION_COOKIE, result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
