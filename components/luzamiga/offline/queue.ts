"use client"

/**
 * Cola de reportes/publicaciones sin conexión, persistida en IndexedDB.
 * Cuando vuelve la conexión, se reintenta el POST a /api/luzamiga/items.
 */
const DB_NAME = "luzamiga-offline"
const STORE = "pending-items"
const DB_VERSION = 1

export interface PendingItem {
  id: string
  payload: Record<string, unknown>
  createdAt: number
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function enqueueItem(payload: Record<string, unknown>): Promise<void> {
  const db = await openDB()
  const item: PendingItem = {
    id: `pending-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    payload,
    createdAt: Date.now(),
  }
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite")
    tx.objectStore(STORE).put(item)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export async function getPending(): Promise<PendingItem[]> {
  const db = await openDB()
  const result = await new Promise<PendingItem[]>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly")
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = () => resolve(req.result as PendingItem[])
    req.onerror = () => reject(req.error)
  })
  db.close()
  return result
}

async function removePending(id: string): Promise<void> {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite")
    tx.objectStore(STORE).delete(id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

/** Intenta enviar todos los pendientes. Devuelve cuántos se sincronizaron. */
export async function flushQueue(): Promise<number> {
  const pending = await getPending()
  let synced = 0
  for (const item of pending) {
    try {
      const res = await fetch("/api/luzamiga/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item.payload),
      })
      if (res.ok) {
        await removePending(item.id)
        synced += 1
      }
    } catch {
      // sigue sin conexión; se reintenta luego
      break
    }
  }
  return synced
}
