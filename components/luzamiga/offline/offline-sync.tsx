"use client"

import { useEffect, useState } from "react"
import { CloudUpload } from "lucide-react"
import { flushQueue, getPending } from "./queue"
import { useT } from "../i18n/language-provider"

/**
 * Registra el service worker (scope /luzamiga), sincroniza la cola de reportes
 * pendientes al recuperar conexión y muestra un aviso flotante de sincronización.
 */
export function OfflineSync() {
  const { t } = useT()
  const [syncing, setSyncing] = useState(false)
  const [justSynced, setJustSynced] = useState(0)

  useEffect(() => {
    // Registrar el service worker limitado a /luzamiga.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/luzamiga/sw.js", { scope: "/luzamiga/" }).catch(() => {})
    }

    let cancelled = false

    async function trySync() {
      const pending = await getPending()
      if (cancelled || pending.length === 0) return
      setSyncing(true)
      const sent = await flushQueue()
      if (cancelled) return
      setSyncing(false)
      if (sent > 0) {
        setJustSynced(sent)
        window.setTimeout(() => setJustSynced(0), 4000)
      }
    }

    // Intento inicial + al reconectar.
    if (navigator.onLine) void trySync()
    window.addEventListener("online", trySync)
    return () => {
      cancelled = true
      window.removeEventListener("online", trySync)
    }
  }, [])

  if (!syncing && justSynced === 0) return null

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg"
      style={{ backgroundColor: "#FBEFD6", color: "#8A6D3B" }}
    >
      <CloudUpload className="h-4 w-4" aria-hidden="true" />
      {syncing ? t("offline.syncing") : t("offline.synced").replace("{count}", String(justSynced))}
    </div>
  )
}
