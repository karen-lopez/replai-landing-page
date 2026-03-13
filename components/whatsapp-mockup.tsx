"use client"

import { Check, CheckCheck } from "lucide-react"

export function WhatsAppMockup() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-[#075E54] rounded-t-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-semibold text-sm">
          R
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-sm">Replai Asistente</p>
          <p className="text-white/70 text-xs">en linea</p>
        </div>
      </div>
      
      <div className="bg-[#ECE5DD] p-4 space-y-2 min-h-[320px]">
        {/* Customer message */}
        <div className="flex justify-start">
          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[#303030] text-sm">Hola! Quiero saber los precios del corte de cabello y si tienen disponibilidad para hoy</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-[#667781]">10:32 a.m.</span>
            </div>
          </div>
        </div>

        {/* Bot response 1 */}
        <div className="flex justify-end">
          <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[#303030] text-sm">Hola! Gracias por escribirnos. Nuestros precios son:</p>
            <p className="text-[#303030] text-sm mt-1">- Corte de cabello: $25.000</p>
            <p className="text-[#303030] text-sm">- Corte + barba: $35.000</p>
            <p className="text-[#303030] text-sm">- Corte infantil: $18.000</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-[#667781]">10:32 a.m.</span>
              <CheckCheck className="w-4 h-4 text-[#53BDEB]" />
            </div>
          </div>
        </div>

        {/* Bot response 2 */}
        <div className="flex justify-end">
          <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[#303030] text-sm">Hoy tenemos disponibilidad a las 2:00 p.m. y 4:30 p.m. Te gustaria agendar?</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-[#667781]">10:32 a.m.</span>
              <CheckCheck className="w-4 h-4 text-[#53BDEB]" />
            </div>
          </div>
        </div>

        {/* Customer response */}
        <div className="flex justify-start">
          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[#303030] text-sm">Perfecto! A las 4:30 por favor</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-[#667781]">10:33 a.m.</span>
            </div>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex justify-end">
          <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-4 py-3 shadow-sm">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#F0F0F0] rounded-b-2xl px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2">
          <p className="text-[#667781] text-sm">Escribe un mensaje</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
            <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
