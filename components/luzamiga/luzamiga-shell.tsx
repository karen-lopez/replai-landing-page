"use client"

import { LanguageProvider } from "./i18n/language-provider"
import { LanguageSwitcher } from "./i18n/language-switcher"
import { AuthProvider } from "./auth/auth-provider"
import { AuthBar } from "./auth/auth-bar"
import { LoginDialog } from "./auth/login-dialog"
import { RegisterDialog } from "./auth/register-dialog"
import { OfflineSync } from "./offline/offline-sync"

/**
 * Barra superior de /luzamiga: selector de idioma (izq.) y auth (der.).
 * Envuelve la página con LanguageProvider + AuthProvider y monta los modales.
 */
export function LuzAmigaShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <OfflineSync />
        <header
          className="sticky top-0 z-40 border-b backdrop-blur"
          style={{ backgroundColor: "rgba(251,245,235,0.85)", borderColor: "#EEE1C9" }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <LanguageSwitcher />
            <AuthBar />
          </div>
        </header>

        {children}

        <LoginDialog />
        <RegisterDialog />
      </AuthProvider>
    </LanguageProvider>
  )
}
