"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const benefits = [
  "Configuracion incluida sin costo",
  "Soporte personalizado durante el mes",
  "Tu precio se congela cuando decidas quedarte"
]

export function LaunchOfferSection() {
  return (
    <section className="py-20 md:py-28 bg-[#E1F5EE]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl mb-6">
            Primer mes completamente gratis
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl mb-10 leading-relaxed">
            Estamos buscando 5 negocios en Colombia que quieran ser los primeros en usar Replai. Sin costo, sin tarjeta de credito. A cambio solo te pedimos tu opinion honesta.
          </p>
          
          <ul className="flex flex-col gap-4 mb-10 max-w-md mx-auto">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 mb-4"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Quiero mi mes gratis
          </Button>
          
          <p className="text-sm text-primary font-semibold">
            Solo quedan 5 cupos disponibles
          </p>
        </div>
      </div>
    </section>
  )
}
