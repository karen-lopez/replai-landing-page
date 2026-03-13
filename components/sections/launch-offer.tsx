"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const benefits = [
  "Configuracion incluida sin ningun costo adicional",
  "Soporte personalizado durante todo el primer mes",
  "Tu precio se congela cuando decidas quedarte"
]

export function LaunchOfferSection() {
  return (
    <section className="py-20 md:py-28 bg-[#1B3A5C] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#0F6E56]/15 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#0F6E56]/10 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#0F6E56]/20 border border-[#0F6E56]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#4ECBA5] animate-pulse" />
            <span className="text-[#4ECBA5] text-sm font-medium">Oferta de lanzamiento — Solo 5 cupos</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl mb-6 text-balance">
            Primer mes{" "}
            <span className="text-[#4ECBA5]">completamente gratis</span>
          </h2>
          <p className="text-lg text-white/70 md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            Estamos buscando 5 negocios en Colombia que quieran ser los primeros en usar Replai. Sin costo, sin tarjeta de credito. Solo te pedimos tu opinion honesta.
          </p>
          
          <ul className="flex flex-col gap-4 mb-10 max-w-md mx-auto">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-[#0F6E56] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            size="lg" 
            className="text-base px-10 py-6 bg-[#0F6E56] hover:bg-[#0d5f49] text-white rounded-full font-semibold shadow-lg mb-4"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Quiero mi mes gratis
          </Button>
          
          <p className="text-sm text-[#4ECBA5] font-semibold">
            Solo quedan 5 cupos disponibles
          </p>
        </div>
      </div>
    </section>
  )
}
