"use client"

import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-[#1B3A5C]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Image
              src="/images/replai-logo.png"
              alt="Replai"
              width={110}
              height={36}
              className="h-7 w-auto object-contain brightness-0 invert mb-2"
            />
            <p className="text-white/60 text-sm">Tu negocio nunca para de responder</p>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="#" className="text-white/60 hover:text-white transition-colors">
              Politica de privacidad
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors">
              Terminos de servicio
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors">
              Contacto
            </Link>
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
