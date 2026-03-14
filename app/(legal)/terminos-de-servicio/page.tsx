import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terminos de Servicio — Replai",
  description: "Lee los terminos y condiciones que rigen el uso del servicio Replai en Colombia.",
}

export default function TerminosDeServicio() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-3xl font-extrabold text-[#1B3A5C] mb-2">Terminos de Servicio</h1>
      <p className="text-muted-foreground text-sm mb-10">Ultima actualizacion: marzo de 2026</p>

      <Section title="1. Aceptacion de los terminos">
        <p>
          Al acceder o usar el servicio Replai, usted acepta quedar vinculado por estos Terminos de Servicio y por nuestra Politica de Privacidad. Si no esta de acuerdo con alguno de estos terminos, no debe usar el servicio. Estos terminos constituyen un acuerdo legalmente vinculante entre usted (el "Cliente") y Replai (el "Proveedor").
        </p>
      </Section>

      <Section title="2. Descripcion del servicio">
        <p>
          Replai es un asistente virtual para WhatsApp Business que permite a negocios responder mensajes de forma automatica las 24 horas del dia, los 7 dias de la semana. El servicio incluye:
        </p>
        <ul>
          <li>Configuracion del asistente con la informacion del negocio del Cliente.</li>
          <li>Respuestas automaticas a preguntas frecuentes de los clientes del negocio.</li>
          <li>Deteccion y notificacion de solicitudes de citas.</li>
          <li>Envio de un resumen diario de actividad al numero de WhatsApp del Cliente.</li>
        </ul>
        <p>
          Las funcionalidades especificas disponibles dependen del plan contratado (Starter o Pro).
        </p>
      </Section>

      <Section title="3. Registro y cuenta">
        <p>
          Para usar el servicio, el Cliente debe proporcionar informacion veraz, actualizada y completa. El Cliente es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que se realicen bajo su cuenta. Replai no sera responsable por perdidas derivadas del uso no autorizado de la cuenta del Cliente.
        </p>
      </Section>

      <Section title="4. Planes, precios y facturacion">
        <ul>
          <li><strong>Plan Starter:</strong> con un valor de $69.900 COP/mes por un numero de WhatsApp con hasta 500 conversaciones mensuales.</li>
          <li><strong>Plan Pro:</strong> con un valor de $119.900 COP/mes por hasta 5 numeros de WhatsApp con conversaciones ilimitadas y soporte prioritario.</li>
        </ul>
        <p>
          Los precios estan expresados en pesos colombianos (COP) e incluyen IVA cuando aplique segun la normativa tributaria vigente. Replai se reserva el derecho de modificar los precios con un aviso previo de al menos treinta (30) dias calendario al Cliente.
        </p>
        <p>
          El pago es mensual y debe realizarse de forma anticipada al periodo de servicio. El incumplimiento en el pago podra derivar en la suspension del servicio.
        </p>
      </Section>

      <Section title="5. Oferta de lanzamiento — Primer mes gratis">
        <p>
          Durante la fase de lanzamiento, Replai ofrece el primer mes del Plan Starter sin costo para un maximo de cinco (5) negocios seleccionados. Esta oferta esta sujeta a disponibilidad, no es acumulable con otras promociones y aplica exclusivamente al Plan Starter. Al finalizar el mes gratuito, el servicio se renovara automaticamente al precio regular salvo que el Cliente lo cancele antes del vencimiento.
        </p>
      </Section>

      <Section title="6. Uso aceptable">
        <p>El Cliente se compromete a no usar el servicio Replai para:</p>
        <ul>
          <li>Enviar mensajes no solicitados (spam) o contenido fraudulento.</li>
          <li>Actividades ilegales o que violen las politicas de uso de WhatsApp Business.</li>
          <li>Suplantar la identidad de terceros.</li>
          <li>Distribuir contenido difamatorio, obsceno o que vulnere derechos de terceros.</li>
          <li>Intentar acceder sin autorizacion a sistemas o datos de Replai o de otros usuarios.</li>
        </ul>
        <p>
          El incumplimiento de estas condiciones puede derivar en la suspension inmediata del servicio sin derecho a reembolso.
        </p>
      </Section>

      <Section title="7. Propiedad intelectual">
        <p>
          Todo el software, diseno, logotipos, marca y contenido de Replai son propiedad exclusiva del Proveedor y estan protegidos por las leyes de propiedad intelectual de Colombia. El Cliente recibe una licencia de uso limitada, no exclusiva e intransferible para usar el servicio durante la vigencia del contrato. Esta licencia no implica ninguna transferencia de propiedad.
        </p>
      </Section>

      <Section title="8. Limitacion de responsabilidad">
        <p>
          Replai no garantiza que el servicio sera ininterrumpido, libre de errores o completamente seguro. En ningun caso la responsabilidad total de Replai frente al Cliente superara el valor pagado por el servicio en los ultimos tres (3) meses calendario.
        </p>
        <p>
          Replai no sera responsable por danos indirectos, incidentales, especiales o consecuentes, incluyendo perdida de ingresos, clientes o datos, derivados del uso o la imposibilidad de uso del servicio.
        </p>
      </Section>

      <Section title="9. Confidencialidad">
        <p>
          Ambas partes se comprometen a mantener en estricta confidencialidad la informacion que, con ocasion de la prestacion del servicio, sea calificada como confidencial o que por su naturaleza deba entenderse como tal. Esta obligacion se mantendra vigente por un periodo de dos (2) anos tras la terminacion del contrato.
        </p>
      </Section>

      <Section title="10. Vigencia y terminacion">
        <p>
          El contrato tiene vigencia mensual y se renueva automaticamente salvo que cualquiera de las partes notifique su intencion de no renovarlo con al menos cinco (5) dias de anticipacion al vencimiento del periodo en curso.
        </p>
        <p>
          Replai puede dar por terminado el servicio de forma inmediata y sin responsabilidad en caso de incumplimiento grave de estos terminos por parte del Cliente.
        </p>
      </Section>

      <Section title="11. Ley aplicable y jurisdiccion">
        <p>
          Estos Terminos de Servicio se rigen por las leyes de la Republica de Colombia. Para la resolucion de cualquier controversia derivada de su interpretacion o ejecucion, las partes se someten a la jurisdiccion de los jueces y tribunales competentes de la ciudad de Bogota D.C., Colombia, renunciando a cualquier otro fuero que pudiera corresponderles.
        </p>
      </Section>

      <Section title="12. Modificaciones">
        <p>
          Replai se reserva el derecho de modificar estos Terminos en cualquier momento. Los cambios se publicaran en esta pagina con al menos quince (15) dias de anticipacion a su entrada en vigor. El uso continuado del servicio despues de dicha fecha constituye aceptacion de los nuevos terminos.
        </p>
      </Section>

      <Section title="13. Contacto">
        <p>
          Para cualquier consulta relacionada con estos Terminos de Servicio, escribanos al WP{" "}
          <a href="https://wa.me/573192411201" target="_blank" rel="noopener noreferrer" className="text-[#0F6E56] hover:underline">
            +573192411201
          </a>.
        </p>
      </Section>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">{title}</h2>
      <div className="text-[#1a1a1a]/80 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  )
}
