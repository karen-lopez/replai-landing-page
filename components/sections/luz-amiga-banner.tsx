"use client"

import { useState } from "react"
import Link from "next/link"
import { HeartHandshake, ArrowRight, X } from "lucide-react"

export function LuzAmigaBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] w-80">
      <div
        className="relative rounded-2xl border p-4 pr-9 shadow-xl backdrop-blur"
        style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}
        role="region"
        aria-label="Iniciativa comunitaria Luz Amiga"
      >
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[#FBEFD6]"
          style={{ color: "#9A5E10" }}
          aria-label="Cerrar aviso"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full shrink-0"
            style={{ backgroundColor: "#FBEFD6", color: "#9A5E10" }}
            aria-hidden="true"
          >
            <HeartHandshake className="h-5 w-5" />
          </span>

          <div>
            <p className="font-semibold text-sm" style={{ color: "#5C3A0E" }}>
              Luz Amiga
            </p>
            <p className="mt-1 text-sm leading-snug" style={{ color: "#7A5C33" }}>
              {"Apoyo gratuito para las comunidades afectadas por el terremoto en Colombia."}
            </p>
          </div>
        </div>

        <Link
          href="/luzamiga"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full font-semibold text-sm px-4 py-2 transition-colors"
          style={{ backgroundColor: "#C77F16", color: "#FFFFFF" }}
        >
          Ver más
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
