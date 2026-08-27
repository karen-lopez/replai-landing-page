"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sun } from "lucide-react"

export function LuzAmigaHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#FBF5EB" }}>
      {/* Soft warm glow, not a filler blob but a gentle light source */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #FBBF24 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-7">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
              style={{ backgroundColor: "#FDEBCF", color: "#B45309" }}
            >
              <Sun className="h-4 w-4" aria-hidden="true" />
              Luz Amiga
            </div>

            <h1
              className="text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl"
              style={{ color: "#3D3020" }}
            >
              Juntos encontramos{" "}
              <span style={{ color: "#D97706" }}>la luz</span> después del temblor
            </h1>

            <p className="max-w-xl text-lg leading-relaxed md:text-xl" style={{ color: "#6B5B45" }}>
              Un espacio hecho con cariño para las comunidades afectadas por el terremoto en Colombia. Aquí puedes ofrecer
              tu ayuda o encontrar apoyo: insumos, búsqueda de personas, servicios de salud y momentos para sanar juntos.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base font-semibold text-white shadow-md transition-colors"
                style={{ backgroundColor: "#D97706" }}
                onClick={() => document.getElementById("ofrecer-ayuda")?.scrollIntoView({ behavior: "smooth" })}
              >
                Quiero ofrecer ayuda
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border px-8 py-6 text-base font-semibold"
                style={{ borderColor: "#E4C79A", color: "#8A6D3B", backgroundColor: "transparent" }}
                onClick={() => document.getElementById("encontrar-ayuda")?.scrollIntoView({ behavior: "smooth" })}
              >
                Necesito ayuda
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="overflow-hidden rounded-3xl shadow-xl ring-1"
              style={{ boxShadow: "0 20px 60px -20px rgba(180, 83, 9, 0.35)", ["--tw-ring-color" as string]: "#F1DCB8" }}
            >
              <Image
                src="/luzamiga/hero-community.png"
                alt="Ilustración cálida de una comunidad colombiana ayudándose entre sí tras el terremoto"
                width={720}
                height={720}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
