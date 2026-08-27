"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-provider"
import { useT } from "../i18n/language-provider"

export function LoginDialog() {
  const { dialog, closeDialog, openRegister, login } = useAuth()
  const { t } = useT()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const open = dialog === "login"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const result = await login(email, password)
    setSubmitting(false)
    if (!result.ok) setError(result.error ?? "Error")
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : closeDialog())}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}>
        <DialogHeader>
          <DialogTitle style={{ color: "#3D3020" }}>{t("login.title")}</DialogTitle>
          <DialogDescription style={{ color: "#6B5B45" }}>{t("login.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="login-email" style={{ color: "#4A3B2A" }}>
              {t("login.email")}
            </Label>
            <Input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
              style={{ borderColor: "#EEE1C9" }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-password" style={{ color: "#4A3B2A" }}>
              {t("login.password")}
            </Label>
            <Input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl"
              style={{ borderColor: "#EEE1C9" }}
            />
          </div>
          {error && (
            <p className="text-sm" style={{ color: "#C0392B" }} role="alert">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={submitting}
            className="rounded-full text-white"
            style={{ backgroundColor: "#C77F16" }}
          >
            {t("login.submit")}
          </Button>
          <p className="text-center text-sm" style={{ color: "#6B5B45" }}>
            {t("login.noAccount")}{" "}
            <button
              type="button"
              onClick={openRegister}
              className="font-semibold underline"
              style={{ color: "#C77F16" }}
            >
              {t("login.goRegister")}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
