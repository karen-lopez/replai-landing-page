import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de Privacidad — Replai",
  description: "Conoce como Replai recopila, usa y protege tu informacion personal conforme a la Ley 1581 de 2012 de Colombia.",
}

export default function PoliticaDePrivacidad() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-3xl font-extrabold text-[#1B3A5C] mb-2">Politica de Privacidad</h1>
      <p className="text-muted-foreground text-sm mb-10">Ultima actualizacion: marzo de 2026</p>

      <Section title="1. Responsable del tratamiento">
        <p>
          <strong>Replai</strong> (en adelante, "la empresa", "nosotros" o "Replai") es responsable del tratamiento de los datos personales recopilados a traves de este sitio web y de los servicios que ofrece. Para cualquier consulta relacionada con el manejo de su informacion personal puede contactarnos en <a href="mailto:hola@replai.co" className="text-[#0F6E56] hover:underline">hola@replai.co</a>.
        </p>
      </Section>

      <Section title="2. Marco legal">
        <p>
          Esta politica se rige por la <strong>Ley 1581 de 2012</strong> (Ley de Proteccion de Datos Personales de Colombia), el <strong>Decreto 1377 de 2013</strong> y demas normas concordantes que regulan el habeas data y la proteccion de informacion personal en la Republica de Colombia.
        </p>
      </Section>

      <Section title="3. Datos que recopilamos">
        <p>Recopilamos unicamente la informacion estrictamente necesaria para prestar nuestro servicio:</p>
        <ul>
          <li><strong>Datos de contacto:</strong> nombre del negocio, numero de WhatsApp y ciudad, proporcionados voluntariamente al usar nuestro formulario de contacto o boton de WhatsApp.</li>
          <li><strong>Datos de uso:</strong> informacion tecnica anonima sobre la interaccion con el sitio web (paginas visitadas, tiempo de sesion, dispositivo), recopilada a traves de herramientas de analitica como Vercel Analytics.</li>
          <li><strong>Mensajes de WhatsApp:</strong> los mensajes que sus clientes envian al numero de WhatsApp vinculado al servicio Replai, con el unico fin de generar respuestas automaticas y resumenes diarios.</li>
        </ul>
      </Section>

      <Section title="4. Finalidad del tratamiento">
        <p>Sus datos personales son tratados exclusivamente para:</p>
        <ul>
          <li>Contactarle para configurar y activar el servicio Replai.</li>
          <li>Prestar el servicio de asistente automatico de WhatsApp contratado.</li>
          <li>Enviarle resumenes diarios de actividad de su negocio.</li>
          <li>Mejorar el funcionamiento y la experiencia de uso del servicio.</li>
          <li>Cumplir con obligaciones legales vigentes en Colombia.</li>
        </ul>
        <p>No utilizamos sus datos para ninguna finalidad diferente a las descritas sin su autorizacion previa.</p>
      </Section>

      <Section title="5. Autorizacion del titular">
        <p>
          Al enviar su informacion a traves del boton de WhatsApp o cualquier otro medio de contacto disponible en este sitio, usted otorga su consentimiento expreso e informado para que Replai trate sus datos personales conforme a lo establecido en esta politica, de acuerdo con el articulo 9 de la Ley 1581 de 2012.
        </p>
      </Section>

      <Section title="6. Transferencia y transmision de datos">
        <p>
          Replai no vende, cede ni comercializa sus datos personales a terceros. Unicamente podria compartirlos con proveedores tecnicos que participan en la prestacion del servicio (como plataformas de mensajeria y alojamiento en la nube), quienes estan obligados a tratar dicha informacion con los mismos estandares de confidencialidad y seguridad que aplicamos internamente.
        </p>
      </Section>

      <Section title="7. Tiempo de conservacion">
        <p>
          Conservamos sus datos personales durante el tiempo en que exista una relacion comercial activa y, una vez terminada esta, por el periodo que exijan las obligaciones legales o contables aplicables, que en Colombia no podra ser inferior a cinco (5) anos salvo disposicion legal en contrario.
        </p>
      </Section>

      <Section title="8. Derechos del titular">
        <p>Como titular de sus datos personales, usted tiene derecho a:</p>
        <ul>
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>Solicitar prueba de la autorizacion otorgada.</li>
          <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
          <li>Revocar la autorizacion y/o solicitar la supresion de sus datos.</li>
          <li>Acceder gratuitamente a sus datos personales.</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, escribanos a <a href="mailto:hola@replai.co" className="text-[#0F6E56] hover:underline">hola@replai.co</a> indicando su solicitud. Responderemos en un plazo maximo de diez (10) dias habiles.
        </p>
      </Section>

      <Section title="9. Medidas de seguridad">
        <p>
          Replai implementa medidas tecnicas, administrativas y organizativas adecuadas para proteger sus datos personales contra acceso no autorizado, perdida, alteracion o destruccion. Sin embargo, ningun sistema de transmision por internet es completamente seguro, por lo que no podemos garantizar la seguridad absoluta de la informacion.
        </p>
      </Section>

      <Section title="10. Cambios a esta politica">
        <p>
          Podemos actualizar esta politica en cualquier momento. Cuando lo hagamos, publicaremos la nueva version en esta pagina con la fecha de actualizacion. Si los cambios son sustanciales, lo notificaremos por los canales de contacto disponibles.
        </p>
      </Section>

      <Section title="11. Contacto">
        <p>
          Para cualquier duda, solicitud o comentario relacionado con esta politica de privacidad, escribanos a: <a href="mailto:hola@replai.co" className="text-[#0F6E56] hover:underline">hola@replai.co</a>.
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
