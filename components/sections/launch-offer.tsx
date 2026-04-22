export function LaunchOfferSection() {
  return (
    <section className="py-20 md:py-28 bg-[#1B3A5C] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#0F6E56]/15 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#0F6E56]/10 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="grid gap-12 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Left column - first stat */}
          <div className="text-center md:text-left">
            <p className="text-6xl md:text-7xl font-extrabold text-[#4ECBA5] mb-4">78%</p>
            <p className="text-xl md:text-2xl text-white font-semibold mb-2">
              de los mensajes llegan fuera del horario de atención
            </p>
            <p className="text-white/50 text-sm">
              Dato promedio en negocios locales Colombia
            </p>
          </div>

          {/* Right column - second stat */}
          <div className="text-center md:text-left">
            <p className="text-6xl md:text-7xl font-extrabold text-[#4ECBA5] mb-4">3 min</p>
            <p className="text-xl md:text-2xl text-white font-semibold mb-2">
              es el tiempo máximo que un cliente espera antes de escribirle a la competencia
            </p>
            <p className="text-white/50 text-sm">
              Comportamiento típico en WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
