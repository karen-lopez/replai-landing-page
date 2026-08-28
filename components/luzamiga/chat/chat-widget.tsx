"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { MessageCircle, X, Send, Sun } from "lucide-react"

type Message = {
  role: "user" | "bot"
  text: string
}

const WELCOME: Message = {
  role: "bot",
  text: "👋 ¡Hola! Soy el asistente de Luz Amiga. Pregúntame por zonas seguras, vías bloqueadas, riesgo de derrumbe, o reaperturas, eventos y promociones de comercios.",
}

const FALLBACK: Message = {
  role: "bot",
  text: "No tengo esa información todavía. Prueba preguntando por una ciudad o un tema puntual (por ejemplo: \"¿qué reaperturas hay en Pereira?\").",
}

/**
 * Chat flotante que responde preguntas citando únicamente datos reales de
 * Luz Amiga (FAQ + reportes/comercios en vivo), vía el bot de WhatsApp
 * corriendo en Cloud Run — sin pasar por WhatsApp.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const question = input.trim()
    if (!question || loading) return

    setMessages((current) => [...current, { role: "user", text: question }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/luzamiga/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      })
      const data = await res.json()

      if (!res.ok || !data.found || !data.answer) {
        setMessages((current) => [...current, FALLBACK])
      } else {
        setMessages((current) => [...current, { role: "bot", text: data.answer }])
      }
    } catch {
      setMessages((current) => [
        ...current,
        { role: "bot", text: "Hubo un problema para conectar con el asistente. Intenta de nuevo en un momento." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-[1000] flex flex-col items-start gap-3">
      {open ? (
        <section
          aria-label="Chat del asistente Luz Amiga"
          className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border shadow-xl"
          style={{ borderColor: "#E4C79A", backgroundColor: "#FBF5EB" }}
        >
          <header
            className="flex items-center justify-between gap-2 px-4 py-3"
            style={{ backgroundColor: "#D97706", color: "white" }}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Sun className="h-4 w-4" aria-hidden="true" />
              Asistente Luz Amiga
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="rounded-full p-1 hover:bg-white/20"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { backgroundColor: "#D97706", color: "white" }
                      : { backgroundColor: "#FDEBCF", color: "#3D3020" }
                  }
                >
                  {msg.text}
                </p>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <p className="rounded-2xl px-3 py-2 text-sm" style={{ backgroundColor: "#FDEBCF", color: "#8A6D3B" }}>
                  Escribiendo…
                </p>
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t p-2" style={{ borderColor: "#EEE1C9" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              className="flex-1 rounded-full border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "#E4C79A" }}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar pregunta"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-50"
              style={{ backgroundColor: "#D97706" }}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar chat de Luz Amiga" : "Abrir chat de Luz Amiga"}
        className="flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white shadow-lg"
        style={{ backgroundColor: "#D97706" }}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Pregúntale a Luz Amiga</span>
      </button>
    </div>
  )
}
