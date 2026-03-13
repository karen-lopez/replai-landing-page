"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$49.900",
    currency: "COP/mes",
    features: [
      "1 numero de WhatsApp",
      "Hasta 500 conversaciones/mes",
      "Configuracion de preguntas frecuentes incluida",
      "Resumen diario"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: "$119.900",
    currency: "COP/mes",
    features: [
      "Hasta 5 numeros de WhatsApp",
      "Conversaciones ilimitadas",
      "Soporte prioritario",
      "Respuestas personalizadas del bot"
    ],
    popular: true
  }
]

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Planes simples y transparentes
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 ${plan.popular ? 'border-primary shadow-xl' : 'border-border'}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Mas popular
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.currency}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : 'bg-accent hover:bg-accent/90 text-accent-foreground'}`}
                  variant="default"
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {plan.popular ? 'Suscribirse' : 'Empezar mes gratis'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-center text-muted-foreground mt-10 max-w-lg mx-auto">
          Primer mes gratis para los primeros 5 negocios. Sin tarjeta de credito. Configuracion en 24 horas.
        </p>
      </div>
    </section>
  )
}
