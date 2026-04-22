"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "$89.900",
    currency: "COP/mes",
    features: [
      "1 número de WhatsApp",
      "Hasta 150 conversaciones/mes",
      "Configuración de preguntas frecuentes incluida",
      "Resumen diario por WhatsApp"
    ],
    popular: false
  },
  {
    name: "Estándar",
    price: "$149.900",
    currency: "COP/mes",
    features: [
      "1 número de WhatsApp",
      "Hasta 350 conversaciones/mes",
      "Configuración de preguntas frecuentes incluida",
      "Resumen diario por WhatsApp",
      "Soporte prioritario"
    ],
    popular: true
  },
  {
    name: "Pro",
    price: "$229.900",
    currency: "COP/mes",
    features: [
      "Hasta 5 números de WhatsApp",
      "Hasta 600 conversaciones/mes",
      "Configuración de preguntas frecuentes incluida",
      "Resumen diario por WhatsApp",
      "Soporte prioritario",
      "Respuestas personalizadas del bot"
    ],
    popular: false
  }
]

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#0F6E56] font-semibold uppercase tracking-widest text-sm mb-3">Precios</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1B3A5C] md:text-4xl text-balance">
            Planes simples y transparentes
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto pt-4">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1B3A5C] text-white border-0 shadow-md z-10">
                  Más popular
                </Badge>
              )}
              <Card
                className={`relative border-2 overflow-hidden h-full ${plan.popular ? 'border-[#1B3A5C] shadow-2xl' : 'border-[#1B3A5C]/15 shadow-sm'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B3A5C] to-[#0F6E56]" />
                )}
              <CardHeader className="text-center pb-2 pt-8">
                <CardTitle className="text-xl font-extrabold text-[#1B3A5C]">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-[#1B3A5C]">{plan.price}</span>
                  <span className="text-muted-foreground ml-2 text-sm">{plan.currency}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0F6E56]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#0F6E56]" />
                      </div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-[#0F6E56] hover:bg-[#0d5f49] text-white rounded-full font-semibold"
                  asChild
                >
                  <a href="https://wa.me/573192411201?text=Hola,%20quiero%20agendar%20una%20demo%20de%20Replai" target="_blank" rel="noopener noreferrer">
                    Agendar demo
                  </a>
                </Button>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-10 max-w-lg mx-auto text-sm">
          Sin contratos. Configuración en 24 horas. Cancela cuando quieras.
        </p>
      </div>
    </section>
  )
}
