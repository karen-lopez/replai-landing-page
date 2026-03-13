"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Maria G.",
    business: "Salon de belleza",
    city: "Pereira",
    quote: "Antes perdia clientes porque no podia responder mientras atendia. Ahora Replai responde por mi y yo solo agendo las citas.",
    initials: "MG"
  },
  {
    name: "Carlos M.",
    business: "Clinica dental",
    city: "Medellin",
    quote: "El resumen diario me ayuda a entender que preguntan mis pacientes. He mejorado mi comunicacion gracias a eso.",
    initials: "CM"
  },
  {
    name: "Andrea L.",
    business: "Restaurante",
    city: "Bogota",
    quote: "Mis clientes preguntan por el menu y horarios a todas horas. Replai les responde incluso a medianoche. Increible.",
    initials: "AL"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.business}, {testimonial.city}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
