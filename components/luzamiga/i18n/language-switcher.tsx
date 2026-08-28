"use client"

import { Languages } from "lucide-react"
import { useT } from "./language-provider"

export function LanguageSwitcher() {
  const { lang, setLang } = useT()

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border p-1"
      style={{ borderColor: "#EAD9B8", backgroundColor: "#FFFDF8" }}
      role="group"
      aria-label="Idioma / Language"
    >
      <Languages className="ml-1 h-4 w-4" style={{ color: "#8A6D3B" }} aria-hidden="true" />
      {(["es", "en"] as const).map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className="rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors"
            style={{
              backgroundColor: active ? "#C77F16" : "transparent",
              color: active ? "#FFFFFF" : "#8A6D3B",
            }}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
