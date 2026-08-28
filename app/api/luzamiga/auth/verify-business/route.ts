import { type NextRequest, NextResponse } from "next/server"
import { getUserByToken, submitBusinessVerification, SESSION_COOKIE } from "@/lib/luzamiga/auth-store"

const MAX_FILE_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"]

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  const user = getUserByToken(token)
  if (!user) {
    return NextResponse.json({ error: "Necesitas iniciar sesión." }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }

  const businessName = String(formData.get("businessName") ?? "").trim()
  const ccbNumber = String(formData.get("ccbNumber") ?? "").trim()
  const file = formData.get("file")

  if (businessName.length < 2 || businessName.length > 160) {
    return NextResponse.json({ error: "Ingresa el nombre o razón social del comercio." }, { status: 400 })
  }
  if (ccbNumber.length < 2 || ccbNumber.length > 40) {
    return NextResponse.json({ error: "Ingresa el número de matrícula mercantil o NIT." }, { status: 400 })
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Adjunta el certificado de Cámara de Comercio." }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "El certificado debe ser un archivo PDF, JPG o PNG." }, { status: 400 })
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "El archivo supera el tamaño máximo de 5 MB." }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const result = submitBusinessVerification(user.id, {
    businessName,
    ccbNumber,
    fileName: file.name,
    fileType: file.type,
    fileDataBase64: buffer.toString("base64"),
  })
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ user: result.user }, { status: 200 })
}
