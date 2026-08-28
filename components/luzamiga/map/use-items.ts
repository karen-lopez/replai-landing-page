"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { MapItem } from "@/lib/luzamiga/types"

const POLL_MS = 10_000
const CACHE_KEY = "luzamiga_items_cache"

interface UseItemsResult {
  items: MapItem[]
  serverTime: number | null
  online: boolean
  refresh: () => void
}

/** Carga los ítems, refresca cada 10s y cachea la última respuesta para modo offline. */
export function useItems(): UseItemsResult {
  const [items, setItems] = useState<MapItem[]>([])
  const [serverTime, setServerTime] = useState<number | null>(null)
  const [online, setOnline] = useState(true)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/luzamiga/items", { cache: "no-store" })
      if (!res.ok) throw new Error("bad response")
      const data = await res.json()
      setItems(data.items)
      setServerTime(data.serverTime)
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(data.items))
      } catch {}
    } catch {
      // offline o error: usa cache si aún no hay datos
      setItems((prev) => {
        if (prev.length) return prev
        try {
          const cached = window.localStorage.getItem(CACHE_KEY)
          if (cached) return JSON.parse(cached) as MapItem[]
        } catch {}
        return prev
      })
    }
  }, [])

  useEffect(() => {
    fetchItems()
    timer.current = setInterval(fetchItems, POLL_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [fetchItems])

  useEffect(() => {
    const goOnline = () => {
      setOnline(true)
      fetchItems()
    }
    const goOffline = () => setOnline(false)
    setOnline(navigator.onLine)
    window.addEventListener("online", goOnline)
    window.addEventListener("offline", goOffline)
    return () => {
      window.removeEventListener("online", goOnline)
      window.removeEventListener("offline", goOffline)
    }
  }, [fetchItems])

  return { items, serverTime, online, refresh: fetchItems }
}
