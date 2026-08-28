"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-provider"
import { useT } from "../i18n/language-provider"

export function RegisterDialog() {
  const { dialog, closeDialog, openLogin, register } = useAuth()
  const { t } = useT()
  const [form, setForm] = useState({ name: "", email: "", city: "", phone: "", password: "" })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const open = dialog === "register"

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const result = await register(form)
    setSubmitting(false)
    if (!result.ok) setError(result.error ?? "Error")
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : closeDialog())}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}>
        <DialogHeader>
          <DialogTitle style={{ color: "#3D3020" }}>{t("register.title")}</DialogTitle>
          <DialogDescription style={{ color: "#6B5B45" }}>{t("register.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="reg-name" style={{ color: "#4A3B2A" }}>
              {t("register.name")}
            </Label>
            <Input
              id="reg-name"
              required
              autoComplete="name"
              value={form.name}
              onChange={update("name")}
              className="rounded-xl"
              style={{ borderColor: "#EEE1C9" }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reg-email" style={{ color: "#4A3B2A" }}>
              {t("register.email")}
            </Label>
            <Input
              id="reg-email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
              className="rounded-xl"
              style={{ borderColor: "#EEE1C9" }}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="reg-city" style={{ color: "#4A3B2A" }}>
                {t("register.city")}
              </Label>
              <Input
                id="reg-city"
                required
                autoComplete="address-level2"
                value={form.city}
                onChange={update("city")}
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-phone" style={{ color: "#4A3B2A" }}>
                {t("register.phone")}
              </Label>
              <Input
                id="reg-phone"
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={update("phone")}
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reg-password" style={{ color: "#4A3B2A" }}>
              {t("register.password")}
            </Label>
            <Input
              id="reg-password"
              type="password"
              required
              autoComplete="new-password"
              value={form.password}
              onChange={update("password")}
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
            {t("register.submit")}
          </Button>
          <p className="text-center text-sm" style={{ color: "#6B5B45" }}>
            {t("register.haveAccount")}{" "}
            <button
              type="button"
              onClick={() => openLogin()}
              className="font-semibold underline"
              style={{ color: "#C77F16" }}
            >
              {t("register.goLogin")}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
