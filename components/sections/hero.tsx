"use client"

import { Button } from "@/components/ui/button"
import { WhatsAppMockup } from "@/components/whatsapp-mockup"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Nunca pierdas un cliente por no responder a tiempo
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-xl leading-relaxed">
              Replai responde tus mensajes de WhatsApp automaticamente 24/7, captura citas y te envia un resumen diario de tu negocio
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Quiero probarlo gratis
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl transform -rotate-6"></div>
            <div className="relative">
              <WhatsAppMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
