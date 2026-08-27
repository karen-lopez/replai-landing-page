import type { Metadata, Viewport } from "next"
import { LuzAmigaHero } from "@/components/luzamiga/hero"
import { LuzAmigaOfferHelp } from "@/components/luzamiga/offer-help"
import { LuzAmigaFindHelp } from "@/components/luzamiga/find-help"
import { LuzAmigaEvents } from "@/components/luzamiga/events"
import { LuzAmigaFooter } from "@/components/luzamiga/footer"

export const metadata: Metadata = {
  title: "Luz Amiga — Apoyo comunitario para el terremoto en Colombia",
  description:
    "Un espacio de Replai para ofrecer y encontrar ayuda tras el terremoto en Colombia: insumos, búsqueda de personas, servicios de salud y eventos para sanar juntos.",
}

export const viewport: Viewport = {
  themeColor: "#FBF5EB",
}

export default function LuzAmigaPage() {
  return (
    <main style={{ backgroundColor: "#FBF5EB" }}>
      <LuzAmigaHero />
      <LuzAmigaOfferHelp />
      <LuzAmigaFindHelp />
      <LuzAmigaEvents />
      <LuzAmigaFooter />
    </main>
  )
}
