"use client"

import { LanguageProvider } from "./i18n/language-provider"
import { LanguageSwitcher } from "./i18n/language-switcher"
import { AuthProvider } from "./auth/auth-provider"
import { AuthBar } from "./auth/auth-bar"
import { LoginDialog } from "./auth/login-dialog"
import { RegisterDialog } from "./auth/register-dialog"
import { OfflineSync } from "./offline/offline-sync"
import { AccessibilityWidget } from "@/components/accessibility-widget"
import { CityFilterProvider } from "./city-filter-provider"
import { CityFilterSwitcher } from "./city-filter-switcher"
import { ChatWidget } from "./chat/chat-widget"

/**
 * Barra superior de /luzamiga: selector de idioma + ciudad (izq.) y auth
 * (der.). Envuelve la página con los providers y monta los modales.
 */
export function LuzAmigaShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CityFilterProvider>
          <OfflineSync />
          <header
            className="sticky top-0 z-40 border-b backdrop-blur"
            style={{ backgroundColor: "rgba(251,245,235,0.85)", borderColor: "#EEE1C9" }}
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <CityFilterSwitcher />
              </div>
              <AuthBar />
            </div>
          </header>

          {children}

          <LoginDialog />
          <RegisterDialog />
          <AccessibilityWidget />
          <ChatWidget />
        </CityFilterProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
