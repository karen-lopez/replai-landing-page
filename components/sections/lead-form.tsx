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
    <section id="lead-form" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Gracias por tu interes!
              </h2>
              <p className="text-muted-foreground">
                Te contactaremos por WhatsApp en las proximas 24 horas para configurar tu asistente.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
                  Listo para dejar de perder clientes?
                </h2>
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
                
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Quiero mi asistente gratis
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  Sin tarjeta de credito. Configuracion en 24 horas.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
