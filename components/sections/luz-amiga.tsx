import Link from "next/link"
import { HeartHandshake, ArrowRight } from "lucide-react"

export function LuzAmigaSection() {
  return (
    <section
      id="luz-amiga"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#FBF3E4" }}
      aria-labelledby="luz-amiga-heading"
    >
      <div className="container mx-auto px-4">
        <div
          className="max-w-3xl mx-auto rounded-3xl border p-8 md:p-12 text-center shadow-sm"
          style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-6"
            style={{ backgroundColor: "#FBEFD6", color: "#9A5E10" }}
          >
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            Una iniciativa comunitaria
          </span>

          <h2
            id="luz-amiga-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-balance"
            style={{ color: "#5C3A0E" }}
          >
            Luz Amiga — Apoyo para nuestra comunidad
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed mb-8 text-pretty max-w-xl mx-auto"
            style={{ color: "#7A5C33" }}
          >
            Un espacio gratuito para las personas afectadas por el terremoto en Pereira.
            Aquí puedes ofrecer ayuda o encontrarla: insumos, búsqueda de personas y mascotas,
            servicios de salud y eventos para acompañarnos. Nadie tiene que pasar por esto solo.
          </p>

          <Link
            href="/luzamiga"
            className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-base px-8 py-4 transition-colors shadow-md"
            style={{ backgroundColor: "#C77F16", color: "#FFFFFF" }}
          >
            Ir a Luz Amiga
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
