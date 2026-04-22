export function LeadFormSection() {
  return (
    <section id="lead-form" className="py-20 md:py-28 bg-[#F4F7FB]">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#1B3A5C]/10 text-center">
            <p className="text-[#0F6E56] font-semibold uppercase tracking-widest text-sm mb-3">Empieza hoy</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1B3A5C] md:text-4xl mb-3 text-balance">
              Listo para no perder mas clientes?
            </h2>
            <p className="text-muted-foreground text-sm mb-8">Agenda una demo de 15 minutos y te mostramos cómo funciona con tu negocio.</p>

            <a
              href="https://wa.me/573192411201?text=Hola,%20quiero%20saber%20m%C3%A1s%20sobre%20Replai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#0F6E56] hover:bg-[#0d5f49] text-white rounded-full font-semibold text-base px-8 py-4 transition-colors shadow-lg"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hablar con Replai por WhatsApp
            </a>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Sin compromiso. Te respondemos el mismo día.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
