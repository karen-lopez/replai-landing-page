import { type NextRequest, NextResponse } from "next/server"
import { registerUser, SESSION_COOKIE } from "@/lib/luzamiga/auth-store"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 })
  }

  const email = String(body.email ?? "").trim()
  const name = String(body.name ?? "").trim()
  const city = String(body.city ?? "").trim()
  const phone = String(body.phone ?? "").trim()
  const password = String(body.password ?? "")

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ingresa un correo válido." }, { status: 400 })
  }
  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "El nombre debe tener entre 2 y 80 caracteres." }, { status: 400 })
  }
  if (city.length < 2 || city.length > 80) {
    return NextResponse.json({ error: "Indica tu ciudad." }, { status: 400 })
  }
  if (phone.length < 7 || phone.length > 20) {
    return NextResponse.json({ error: "Ingresa un número de celular válido." }, { status: 400 })
  }
  if (password.length < 6 || password.length > 100) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 })
  }

  const result = registerUser({ email, name, city, phone, password })
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 })
  }

  const res = NextResponse.json({ user: result.user }, { status: 201 })
  res.cookies.set(SESSION_COOKIE, result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
