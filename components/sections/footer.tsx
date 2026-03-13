"use client"

import Link from "next/link"
import { ReplaiLogo } from "@/components/replai-logo"

export function Footer() {
  return (
    <footer className="py-12 bg-[#1B3A5C]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <ReplaiLogo className="h-8 w-auto mb-2" invert />
            <p className="text-white/60 text-sm">Tu negocio nunca para de responder</p>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/politica-de-privacidad" className="text-white/60 hover:text-white transition-colors">
              Politica de privacidad
            </Link>
            <Link href="/terminos-de-servicio" className="text-white/60 hover:text-white transition-colors">
              Terminos de servicio
            </Link>
            <a href="https://wa.me/573182872249" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              Contacto
            </a>
          </nav>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/40">
            &copy; 2026 Replai. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
