"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Replai</h3>
            <p className="text-background/70">Tu negocio nunca para de responder</p>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="#" className="text-background/70 hover:text-background transition-colors">
              Politica de privacidad
            </Link>
            <Link href="#" className="text-background/70 hover:text-background transition-colors">
              Terminos de servicio
            </Link>
            <Link href="#" className="text-background/70 hover:text-background transition-colors">
              Contacto
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            2026 Replai. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
