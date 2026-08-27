"use client"

import { useState } from "react"
import Link from "next/link"
import { HeartHandshake, ArrowRight, X } from "lucide-react"

export function LuzAmigaBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center gap-3 rounded-full border py-2 pl-4 pr-2 shadow-lg backdrop-blur"
        style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}
        role="region"
        aria-label="Iniciativa comunitaria Luz Amiga"
      >
        <span
          className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full shrink-0"
          style={{ backgroundColor: "#FBEFD6", color: "#9A5E10" }}
          aria-hidden="true"
        >
          <HeartHandshake className="h-4 w-4" />
        </span>

        <p className="text-sm leading-snug" style={{ color: "#7A5C33" }}>
          <span className="font-semibold" style={{ color: "#5C3A0E" }}>
            Luz Amiga
          </span>
          <span className="hidden sm:inline">{" — Apoyo gratuito para la comunidad afectada por el terremoto en Pereira."}</span>
        </p>

        <Link
          href="/luzamiga"
          className="inline-flex items-center gap-1.5 rounded-full font-semibold text-sm px-4 py-2 transition-colors shrink-0"
          style={{ backgroundColor: "#C77F16", color: "#FFFFFF" }}
        >
          Ver más
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors shrink-0 hover:bg-[#FBEFD6]"
          style={{ color: "#9A5E10" }}
          aria-label="Cerrar aviso"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
