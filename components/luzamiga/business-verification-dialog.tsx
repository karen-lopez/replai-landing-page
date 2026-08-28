"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BadgeCheck, CheckCircle2, FileCheck, Loader2, ShieldCheck, Upload } from "lucide-react"
import { useAuth } from "./auth/auth-provider"

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"]
const MAX_FILE_BYTES = 5 * 1024 * 1024

/**
 * Sin backend real de validación todavía: esta espera y estos mensajes solo
 * simulan que se está consultando el CCB, para que la verificación no se
 * sienta instantánea. El día que haya validación real, esto se reemplaza por
 * el resultado efectivo de esa consulta.
 */
const VERIFYING_DURATION_MS = 5000
const VERIFYING_STEPS = [
  "Validando el certificado…",
  "Consultando la Cámara de Comercio…",
  "Confirmando la titularidad del negocio…",
]

type Phase = "form" | "verifying" | "verified"

interface BusinessVerificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Se dispara justo después de verificar con éxito. */
  onVerified: () => void
}

export function BusinessVerificationDialog({ open, onOpenChange, onVerified }: BusinessVerificationDialogProps) {
  const { updateUser } = useAuth()
  const [businessName, setBusinessName] = useState("")
  const [ccbNumber, setCcbNumber] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>("form")
  const [stepIndex, setStepIndex] = useState(0)
  const timers = useRef<{ timeout?: ReturnType<typeof setTimeout>; interval?: ReturnType<typeof setInterval> }>({})

  useEffect(() => {
    if (phase !== "verifying") return
    setStepIndex(0)
    timers.current.interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, VERIFYING_STEPS.length - 1))
    }, VERIFYING_DURATION_MS / VERIFYING_STEPS.length)
    timers.current.timeout = setTimeout(() => setPhase("verified"), VERIFYING_DURATION_MS)
    return () => {
      clearInterval(timers.current.interval)
      clearTimeout(timers.current.timeout)
    }
  }, [phase])

  function resetForm() {
    setBusinessName("")
    setCcbNumber("")
    setFile(null)
    setError(null)
    setPhase("form")
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null
    if (!selected) {
      setFile(null)
      return
    }
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError("El certificado debe ser un archivo PDF, JPG o PNG.")
      setFile(null)
      return
    }
    if (selected.size > MAX_FILE_BYTES) {
      setError("El archivo supera el tamaño máximo de 5 MB.")
      setFile(null)
      return
    }
    setError(null)
    setFile(selected)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) {
      setError("Adjunta el certificado de Cámara de Comercio.")
      return
    }
    setSending(true)
    setError(null)

    const formData = new FormData()
    formData.set("businessName", businessName.trim())
    formData.set("ccbNumber", ccbNumber.trim())
    formData.set("file", file)

    try {
      const res = await fetch("/api/luzamiga/auth/verify-business", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "No pudimos verificar tu comercio. Inténtalo de nuevo.")
        return
      }
      updateUser(data.user)
      setPhase("verifying")
    } catch {
      setError("No pudimos enviar el certificado. Revisa tu conexión e inténtalo de nuevo.")
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) resetForm()
      }}
    >
      <DialogContent
        className="max-h-[85vh] overflow-y-auto sm:max-w-lg"
        style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "#3D3020" }}>Verifica tu comercio</DialogTitle>
          <DialogDescription style={{ color: "#6B5B45" }}>
            Antes de publicar por primera vez necesitamos confirmar que eres el propietario o representante del
            negocio. Este trámite se hace una sola vez.
          </DialogDescription>
        </DialogHeader>

        {phase === "verified" ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12" style={{ color: "#D97706" }} aria-hidden="true" />
            <h3 className="text-xl font-semibold" style={{ color: "#3D3020" }}>
              ¡Comercio verificado!
            </h3>
            <p className="max-w-md" style={{ color: "#6B5B45" }}>
              Ya puedes publicar reaperturas, eventos y promociones de tu negocio.
            </p>
            <Button
              type="button"
              size="lg"
              onClick={() => {
                onOpenChange(false)
                onVerified()
              }}
              className="rounded-full px-8 py-6 text-base font-semibold text-white"
              style={{ backgroundColor: "#D97706" }}
            >
              Continuar a publicar
            </Button>
          </div>
        ) : phase === "verifying" ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: "#FBEBD1" }}
            >
              <BadgeCheck className="h-7 w-7 animate-pulse" style={{ color: "#C77F16" }} aria-hidden="true" />
            </span>
            <h3 className="text-xl font-semibold" style={{ color: "#3D3020" }}>
              Verificando tu comercio…
            </h3>
            <p className="flex items-center gap-2 text-sm" style={{ color: "#6B5B45" }} role="status" aria-live="polite">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {VERIFYING_STEPS[stepIndex]}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div
              className="flex items-start gap-3 rounded-2xl border border-dashed p-4"
              style={{ borderColor: "#E4C79A", backgroundColor: "#FFFDF8" }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#FBEBD1", color: "#C77F16" }}
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
                Necesitamos tu <strong>Certificado de Cámara de Comercio (CCB)</strong> vigente para validar que el
                comercio existe y que quien publica es su propietario.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ccb-business-name" style={{ color: "#4A3B2A" }}>
                Nombre o razón social del comercio
              </Label>
              <Input
                id="ccb-business-name"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ej. Panadería La Espiga S.A.S."
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ccb-number" style={{ color: "#4A3B2A" }}>
                Número de matrícula mercantil o NIT
              </Label>
              <Input
                id="ccb-number"
                required
                value={ccbNumber}
                onChange={(e) => setCcbNumber(e.target.value)}
                placeholder="Ej. 900123456-7"
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ccb-file" style={{ color: "#4A3B2A" }}>
                Certificado de Cámara de Comercio
              </Label>
              <label
                htmlFor="ccb-file"
                className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition hover:bg-[#FBF1E1]"
                style={{ borderColor: "#D4B27A" }}
              >
                {file ? (
                  <>
                    <FileCheck className="h-6 w-6" style={{ color: "#2E9E5B" }} aria-hidden="true" />
                    <span className="text-sm font-medium" style={{ color: "#3D3020" }}>
                      {file.name}
                    </span>
                    <span className="text-xs" style={{ color: "#8A7659" }}>
                      Haz clic para cambiar el archivo
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="h-6 w-6" style={{ color: "#8A6D3B" }} aria-hidden="true" />
                    <span className="text-sm font-medium" style={{ color: "#3D3020" }}>
                      Adjuntar certificado (PDF, JPG o PNG)
                    </span>
                    <span className="text-xs" style={{ color: "#8A7659" }}>
                      Tamaño máximo 5 MB
                    </span>
                  </>
                )}
              </label>
              <input
                id="ccb-file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-lg px-4 py-2 text-sm" style={{ background: "#FCE4E4", color: "#B4231F" }}>
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="justify-self-start rounded-full px-8 py-6 text-base font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#C77F16" }}
            >
              {sending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Enviando…
                </span>
              ) : (
                "Enviar para verificación"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
