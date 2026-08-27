"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export interface AuthUser {
  id: string
  email: string
  name: string
  city: string
  phone: string
}

type DialogView = "login" | "register" | null

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  register: (input: {
    email: string
    name: string
    city: string
    phone: string
    password: string
  }) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  dialog: DialogView
  openLogin: () => void
  openRegister: () => void
  closeDialog: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState<DialogView>(null)

  useEffect(() => {
    let active = true
    fetch("/api/luzamiga/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (active) setUser(data.user ?? null)
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/luzamiga/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) return { ok: false, error: data.error as string }
    setUser(data.user)
    setDialog(null)
    return { ok: true }
  }, [])

  const register = useCallback(
    async (input: { email: string; name: string; city: string; phone: string; password: string }) => {
      const res = await fetch("/api/luzamiga/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      const data = await res.json()
      if (!res.ok) return { ok: false, error: data.error as string }
      setUser(data.user)
      setDialog(null)
      return { ok: true }
    },
    [],
  )

  const logout = useCallback(async () => {
    await fetch("/api/luzamiga/auth/logout", { method: "POST" })
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      dialog,
      openLogin: () => setDialog("login"),
      openRegister: () => setDialog("register"),
      closeDialog: () => setDialog(null),
    }),
    [user, loading, login, register, logout, dialog],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return ctx
}
