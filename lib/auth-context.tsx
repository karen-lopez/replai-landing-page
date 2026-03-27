"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

// Usuario de prueba por defecto
const DEFAULT_USER = {
  email: "hello@tryreplai.com",
  password: "234kswZ",
  name: "Usuario Replai",
}

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay una sesion guardada
    const savedUser = localStorage.getItem("replai_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("replai_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Validar credenciales con el usuario por defecto
    if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
      const userData = { email: DEFAULT_USER.email, name: DEFAULT_USER.name }
      setUser(userData)
      localStorage.setItem("replai_user", JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: "Credenciales incorrectas" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("replai_user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
