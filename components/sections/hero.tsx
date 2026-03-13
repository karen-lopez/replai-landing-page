"use client"

import { Button } from "@/components/ui/button"
import { WhatsAppMockup } from "@/components/whatsapp-mockup"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1B3A5C] py-16 md:py-24">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, #0F6E56 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0F6E56 0%, transparent 50%)'}} />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F6E56] animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Para salones de belleza, spas y consultorios</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl text-balance leading-tight">
              Tu negocio nunca para de{" "}
              <span className="text-[#4ECBA5]">responder</span>
            </h1>
            <p className="text-lg text-white/70 md:text-xl max-w-xl leading-relaxed">
              Replai atiende tus mensajes de WhatsApp automaticamente 24/7, captura citas y te envia un resumen diario de todo lo que paso en tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 bg-[#0F6E56] hover:bg-[#0d5f49] text-white rounded-full font-semibold shadow-lg"
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Quiero el primer mes gratis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-full font-semibold"
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Como funciona
              </Button>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-[#0F6E56]/20 rounded-3xl blur-3xl" />
            <div className="relative">
              <WhatsAppMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
