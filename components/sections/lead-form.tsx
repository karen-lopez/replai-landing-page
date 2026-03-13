"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Check } from "lucide-react"

export function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    whatsapp: "",
    city: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.businessName && formData.whatsapp && formData.city) {
      setSubmitted(true)
    }
  }

  return (
    <section id="lead-form" className="py-20 md:py-28 bg-[#F4F7FB]">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {submitted ? (
            <div className="text-center bg-white rounded-3xl p-12 shadow-lg border border-[#1B3A5C]/10">
              <div className="w-16 h-16 rounded-full bg-[#0F6E56]/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-[#0F6E56]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1B3A5C] mb-4">
                Recibimos tu solicitud!
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Te contactaremos por WhatsApp en las proximas 24 horas para configurar tu asistente.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#1B3A5C]/10">
              <div className="text-center mb-8">
                <p className="text-[#0F6E56] font-semibold uppercase tracking-widest text-sm mb-3">Empieza hoy</p>
                <h2 className="text-3xl font-extrabold tracking-tight text-[#1B3A5C] md:text-4xl mb-3 text-balance">
                  Listo para no perder mas clientes?
                </h2>
                <p className="text-muted-foreground text-sm">Primer mes gratis, sin tarjeta de credito.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="businessName">Nombre del negocio</FieldLabel>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Ej: Salon Maria"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      required
                    />
                  </Field>
                  
                  <Field>
                    <FieldLabel htmlFor="whatsapp">Numero de WhatsApp</FieldLabel>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="Ej: 300 123 4567"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      required
                    />
                  </Field>
                  
                  <Field>
                    <FieldLabel htmlFor="city">Ciudad</FieldLabel>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Ej: Bogota"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </Field>
                </FieldGroup>
                
                <Button type="submit" size="lg" className="w-full bg-[#0F6E56] hover:bg-[#0d5f49] text-white rounded-full font-semibold">
                  Quiero mi asistente gratis
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  Sin tarjeta de credito. Configuracion en 24 horas.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
