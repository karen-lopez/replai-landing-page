import Link from "next/link"
import { Sun } from "lucide-react"

export function LuzAmigaFooter() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#F3E6CE" }}>
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "#FDEBCF", color: "#D97706" }}
        >
          <Sun className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-pretty" style={{ color: "#5C4A32" }}>
          Luz Amiga es una iniciativa de Replai para todas las comunidades afectadas por el terremoto en Colombia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold underline-offset-4 hover:underline"
          style={{ color: "#B45309" }}
        >
          Volver al inicio
        </Link>
      </div>
    </footer>
  )
}
