import type { Metadata, Viewport } from "next"
import { LuzAmigaShell } from "@/components/luzamiga/luzamiga-shell"
import { LuzAmigaHero } from "@/components/luzamiga/hero"
import { NationalMap } from "@/components/luzamiga/map/national-map"
import { UserReportSection } from "@/components/luzamiga/reports/user-report-section"
import { LuzAmigaCommerce } from "@/components/luzamiga/commerce"
import { LuzAmigaEvents } from "@/components/luzamiga/events"
import { LuzAmigaFooter } from "@/components/luzamiga/footer"

export const metadata: Metadata = {
  title: "Luz Amiga — Reactivación del comercio tras el terremoto en Colombia",
  description:
    "Un espacio para reactivar el comercio tras el terremoto en Colombia: reaperturas, eventos y promociones de los negocios locales. Mapa en tiempo real y disponible sin conexión.",
  manifest: "/luzamiga/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#FBF1E1",
}

export default function LuzAmigaPage() {
  return (
    <LuzAmigaShell>
      <main style={{ backgroundColor: "#FBF5EB" }}>
        <LuzAmigaHero />
        <NationalMap />
        <UserReportSection />
        <LuzAmigaCommerce />
        <LuzAmigaEvents />
        <LuzAmigaFooter />
      </main>
    </LuzAmigaShell>
  )
}
