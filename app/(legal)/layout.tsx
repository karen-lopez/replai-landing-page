import Link from "next/link"
import { ReplaiLogo } from "@/components/replai-logo"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-[#1B3A5C]/10 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" aria-label="Volver al inicio">
            <ReplaiLogo className="h-8 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        {children}
      </main>

      <footer className="border-t border-[#1B3A5C]/10 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 Replai. Todos los derechos reservados.</p>
          <nav className="flex gap-6">
            <Link href="/politica-de-privacidad" className="hover:text-[#1B3A5C] transition-colors">
              Politica de privacidad
            </Link>
            <Link href="/terminos-de-servicio" className="hover:text-[#1B3A5C] transition-colors">
              Terminos de servicio
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
