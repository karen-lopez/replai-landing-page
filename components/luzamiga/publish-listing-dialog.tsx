"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CATEGORIES, type CategoryId } from "./categories"
import { CheckCircle2, Instagram, Loader2, MapPin, Phone, Search, ShieldCheck } from "lucide-react"
import { useT } from "./i18n/language-provider"
import { enqueueItem } from "./offline/queue"

type BusinessLocation = { lat: number; lng: number; address: string; city: string }

interface BusinessSearchResult {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  phone: string | null
}

/** Código fijo para esta primera versión: no se envía SMS real todavía. */
const DEMO_VERIFICATION_CODE = "202628"

/** Quita todo lo que no sea dígito y, si trae indicativo 57, lo separa. */
function toLocalDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  return digits.startsWith("57") && digits.length > 10 ? digits.slice(2) : digits
}

/** En Colombia los celulares tienen 10 dígitos y empiezan por 3. Los fijos
 * (incluido el prefijo nacional +57 6XX que reemplazó los indicativos
 * regionales) no pueden recibir SMS de verificación. */
function isColombianMobile(localDigits: string): boolean {
  return /^3\d{9}$/.test(localDigits)
}

/** Un tag de OSM puede traer varios teléfonos separados por ";" — nos
 * quedamos con el primero que sea un celular colombiano válido. */
function extractMobile(raw: string | null): string | null {
  if (!raw) return null
  for (const part of raw.split(/[;,/]/)) {
    const digits = toLocalDigits(part.trim())
    if (isColombianMobile(digits)) return `+57 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  return null
}

/** R1 de la demo: OpenStreetMap casi nunca tiene el celular de negocios
 * pequeños, así que simulamos que sí lo encontramos para poder probar el
 * flujo de verificación. El número es estable por negocio (mismo id -> mismo
 * número), no se guarda como contacto real. */
function simulateMobileFor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  const tail = String(hash % 1_000_000_000).padStart(9, "0")
  return `+57 3${tail.slice(0, 2)} ${tail.slice(2, 5)} ${tail.slice(5, 9)}`
}

function getPosition(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("geolocation-unsupported"))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => reject(new Error("geolocation-denied")),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 },
    )
  })
}

async function reverseGeocode(coords: { lat: number; lng: number }): Promise<BusinessLocation> {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(coords.lat),
    lon: String(coords.lng),
    "accept-language": "es",
  })
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`)
  if (!response.ok) throw new Error("reverse-geocode-failed")
  const data = await response.json()
  const address = data.address ?? {}
  return {
    ...coords,
    address: data.display_name ?? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`,
    city: address.city ?? address.town ?? address.municipality ?? address.village ?? "",
  }
}

/** Busca negocios/lugares por nombre en Colombia usando el catálogo abierto de OpenStreetMap. */
async function searchBusinesses(query: string): Promise<BusinessSearchResult[]> {
  const params = new URLSearchParams({
    format: "jsonv2",
    q: query,
    countrycodes: "co",
    addressdetails: "1",
    extratags: "1",
    limit: "6",
  })
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`)
  if (!response.ok) throw new Error("business-search-failed")
  const data = await response.json()
  return (data as Array<Record<string, any>>).map((result) => {
    const address = result.address ?? {}
    const extratags = result.extratags ?? {}
    return {
      id: String(result.place_id),
      name: result.namedetails?.name ?? result.display_name.split(",")[0],
      address: result.display_name,
      city: address.city ?? address.town ?? address.municipality ?? address.village ?? "",
      lat: Number(result.lat),
      lng: Number(result.lon),
      phone: extratags.phone ?? extratags["contact:phone"] ?? null,
    }
  })
}

interface PublishListingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PublishListingDialog({ open, onOpenChange }: PublishListingDialogProps) {
  const { t } = useT()
  const [selected, setSelected] = useState<CategoryId>("reopening")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [queued, setQueued] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locating, setLocating] = useState(false)

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [businessPosition, setBusinessPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [contact, setContact] = useState("")
  const [instagram, setInstagram] = useState("")
  const [details, setDetails] = useState("")

  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<BusinessSearchResult[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  const [ownerPhone, setOwnerPhone] = useState<string | null>(null)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationError, setVerificationError] = useState<string | null>(null)

  const needsVerification = Boolean(ownerPhone) && !phoneVerified

  function resetForm() {
    setSubmitted(false)
    setQueued(false)
    setName("")
    setLocation("")
    setAddress("")
    setBusinessPosition(null)
    setContact("")
    setInstagram("")
    setDetails("")
    setError(null)
    setSearchQuery("")
    setSearchResults([])
    setSearchError(null)
    setOwnerPhone(null)
    setPhoneVerified(false)
    setVerificationCode("")
    setVerificationError(null)
  }

  async function handleSearch() {
    const query = searchQuery.trim()
    if (!query) return
    setSearching(true)
    setSearchError(null)
    try {
      const results = await searchBusinesses(query)
      setSearchResults(results)
      if (!results.length) setSearchError("No encontramos negocios con ese nombre. Intenta con otra búsqueda.")
    } catch {
      setSearchError("No pudimos buscar en este momento. Inténtalo de nuevo.")
    } finally {
      setSearching(false)
    }
  }

  function selectBusiness(result: BusinessSearchResult) {
    setName(result.name)
    setAddress(result.address)
    setBusinessPosition({ lat: result.lat, lng: result.lng })
    if (result.city) setLocation(result.city)
    setSearchResults([])
    setSearchQuery(result.name)

    // Usamos el celular real si OSM trae uno válido; si no (lo más común:
    // no hay dato, o es un fijo), simulamos uno para esta demo. En ambos
    // casos pedimos verificación por código — no se autocompleta "Contacto".
    const phoneForVerification = extractMobile(result.phone) ?? simulateMobileFor(result.id)
    setOwnerPhone(phoneForVerification)
    setPhoneVerified(false)
    setVerificationCode("")
    setVerificationError(null)
  }

  function handleVerifyCode() {
    if (verificationCode.trim() === DEMO_VERIFICATION_CODE) {
      setPhoneVerified(true)
      setVerificationError(null)
    } else {
      setVerificationError("Código incorrecto. Revisa el mensaje que te enviamos e inténtalo de nuevo.")
    }
  }

  async function locateBusiness() {
    setLocating(true)
    setError(null)
    try {
      const resolved = await reverseGeocode(await getPosition())
      setBusinessPosition({ lat: resolved.lat, lng: resolved.lng })
      setAddress(resolved.address)
      if (resolved.city) setLocation(resolved.city)
      setOwnerPhone(null)
      setPhoneVerified(false)
      return resolved
    } catch {
      setError("No pudimos reconocer tu ubicación. Activa el permiso de ubicación e inténtalo de nuevo.")
      throw new Error("location-required")
    } finally {
      setLocating(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (needsVerification) {
      setError("Verifica el número de contacto del negocio antes de publicar.")
      return
    }
    setSending(true)
    setError(null)
    setQueued(false)

    let resolved: BusinessLocation
    try {
      resolved = businessPosition
        ? { ...businessPosition, address, city: location.trim() }
        : await locateBusiness()
    } catch {
      setSending(false)
      return
    }
    const payload = {
      kind: "help",
      category: selected,
      title: `${CATEGORIES.find((c) => c.id === selected)?.label}: ${name}`.slice(0, 120),
      description: details.trim(),
      author: name.trim(),
      contact: contact.trim(),
      instagram: instagram.trim(),
      city: resolved.city || location.trim(),
      address: resolved.address,
      lat: resolved.lat,
      lng: resolved.lng,
    }

    try {
      const res = await fetch("/api/luzamiga/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.status === 401) {
        setError(t("offer.needAccountBody"))
        setSending(false)
        return
      }
      if (!res.ok) throw new Error("bad response")
      setSubmitted(true)
    } catch {
      await enqueueItem(payload)
      setQueued(true)
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) resetForm()
      }}
    >
      <DialogContent
        className="max-h-[85vh] overflow-y-auto sm:max-w-2xl"
        style={{ backgroundColor: "#FFFDF8", borderColor: "#EAD9B8" }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "#3D3020" }}>Publicar mi negocio</DialogTitle>
          <DialogDescription style={{ color: "#6B5B45" }}>
            Publica tu reapertura, un evento o una promoción y ayuda a reactivar la economía de tu comunidad.
          </DialogDescription>
        </DialogHeader>

        {/* Category chooser */}
        <div className="grid gap-3 sm:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isActive = selected === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelected(cat.id)}
                aria-pressed={isActive}
                className="flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-all"
                style={{
                  borderColor: isActive ? cat.color : "#EEE1C9",
                  backgroundColor: isActive ? cat.tint : "#FFFFFF",
                  boxShadow: isActive ? `0 8px 24px -12px ${cat.color}` : "none",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: cat.tint, color: cat.color }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold" style={{ color: "#3D3020" }}>
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12" style={{ color: "#D97706" }} aria-hidden="true" />
            <h3 className="text-xl font-semibold" style={{ color: "#3D3020" }}>
              ¡Gracias por reactivar el comercio!
            </h3>
            <p className="max-w-md" style={{ color: "#6B5B45" }}>
              {queued
                ? "Estás sin conexión: tu publicación se enviará automáticamente cuando vuelva la señal."
                : "Tu publicación fue recibida y ya aparece en el mapa y en la sección de comercios."}
            </p>
            <Button
              variant="outline"
              className="rounded-full"
              style={{ borderColor: "#E4C79A", color: "#8A6D3B" }}
              onClick={resetForm}
            >
              Publicar de nuevo
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="offer-name" style={{ color: "#4A3B2A" }}>
                Nombre de tu negocio
              </Label>
              <Input
                id="offer-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Panadería La Espiga"
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="offer-location" style={{ color: "#4A3B2A" }}>
                  Ubicación
                </Label>
                <Input
                  id="offer-location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ciudad o municipio"
                  className="rounded-xl"
                  style={{ borderColor: "#EEE1C9" }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="offer-contact" style={{ color: "#4A3B2A" }}>
                  Contacto
                </Label>
                <Input
                  id="offer-contact"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="WhatsApp, teléfono o correo"
                  className="rounded-xl"
                  style={{ borderColor: "#EEE1C9" }}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="offer-instagram" style={{ color: "#4A3B2A" }}>
                Instagram{" "}
                <span className="font-normal" style={{ color: "#8A7659" }}>
                  (opcional)
                </span>
              </Label>
              <div className="relative">
                <Instagram className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7659]" aria-hidden="true" />
                <Input
                  id="offer-instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="tunegocio"
                  className="rounded-xl pl-9"
                  style={{ borderColor: "#EEE1C9" }}
                />
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl border border-[#EAD9B8] bg-[#FFFDF8] p-4">
              <div>
                <Label style={{ color: "#4A3B2A" }}>Ubicación exacta del negocio</Label>
                <p className="mt-1 text-sm text-[#8A7659]">
                  Busca tu negocio para autocompletar sus datos, o usa tu ubicación actual.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7659]" aria-hidden="true" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSearch()
                      }
                    }}
                    placeholder="Busca el nombre de tu negocio"
                    className="rounded-xl pl-9"
                    style={{ borderColor: "#EEE1C9" }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSearch}
                  disabled={searching || !searchQuery.trim()}
                  className="shrink-0 rounded-full border-[#D4B27A] text-[#8A6D3B]"
                >
                  {searching ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Buscar"}
                </Button>
              </div>

              {searchError ? (
                <p role="alert" className="text-sm" style={{ color: "#B4231F" }}>
                  {searchError}
                </p>
              ) : null}

              {searchResults.length > 0 ? (
                <ul className="grid gap-1.5 rounded-xl border border-[#EEE1C9] bg-white p-1.5">
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <button
                        type="button"
                        onClick={() => selectBusiness(result)}
                        className="flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition hover:bg-[#FBF1E1]"
                      >
                        <span className="text-sm font-semibold" style={{ color: "#3D3020" }}>
                          {result.name}
                        </span>
                        <span className="text-xs" style={{ color: "#8A7659" }}>
                          {result.address}
                        </span>
                        <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium" style={{ color: "#2E9E5B" }}>
                          <Phone className="h-3 w-3" aria-hidden="true" />
                          Te pediremos verificar el celular del negocio
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex items-center gap-3 text-xs" style={{ color: "#8A7659" }}>
                <span className="h-px flex-1" style={{ backgroundColor: "#EEE1C9" }} />
                o
                <span className="h-px flex-1" style={{ backgroundColor: "#EEE1C9" }} />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={locateBusiness}
                disabled={locating}
                className="w-fit rounded-full border-[#D4B27A] text-[#8A6D3B]"
              >
                {locating ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <MapPin className="h-4 w-4" aria-hidden="true" />}
                {locating ? "Reconociendo..." : "Usar mi ubicación actual"}
              </Button>

              {address ? (
                <p className="flex items-start gap-2 text-sm text-[#4A4030]" role="status">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2E9E5B]" aria-hidden="true" />
                  <span><strong>Dirección reconocida:</strong> {address}</span>
                </p>
              ) : null}

              {ownerPhone ? (
                <div
                  className="grid gap-3 rounded-xl border p-3"
                  style={{ borderColor: phoneVerified ? "#BFE3CC" : "#E4C79A", backgroundColor: phoneVerified ? "#EAF7EE" : "#FFF8EC" }}
                >
                  {phoneVerified ? (
                    <p className="flex items-center gap-2 text-sm font-medium" style={{ color: "#1F7A44" }}>
                      <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Número verificado. Ya puedes publicar.
                    </p>
                  ) : (
                    <>
                      <p className="flex items-start gap-2 text-sm" style={{ color: "#4A4030" }}>
                        <Phone className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#C77F16" }} aria-hidden="true" />
                        <span>
                          Encontramos un número de contacto para este negocio ({ownerPhone}). Te enviamos un código de
                          verificación por SMS: ingrésalo para confirmar que eres la persona propietaria.
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Input
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="Código de verificación"
                          inputMode="numeric"
                          maxLength={6}
                          className="w-40 rounded-xl"
                          style={{ borderColor: "#EEE1C9" }}
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyCode}
                          disabled={!verificationCode.trim()}
                          className="rounded-full text-white"
                          style={{ backgroundColor: "#C77F16" }}
                        >
                          Verificar
                        </Button>
                      </div>
                      {verificationError ? (
                        <p role="alert" className="text-sm" style={{ color: "#B4231F" }}>
                          {verificationError}
                        </p>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="offer-details" style={{ color: "#4A3B2A" }}>
                ¿Qué quieres publicar?{" "}
                <span className="font-normal" style={{ color: "#8A7659" }}>
                  (etiqueta: {CATEGORIES.find((c) => c.id === selected)?.label})
                </span>
              </Label>
              <Textarea
                id="offer-details"
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Cuéntanos sobre tu reapertura, evento o promoción."
                className="rounded-xl"
                style={{ borderColor: "#EEE1C9" }}
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-lg px-4 py-2 text-sm" style={{ background: "#FCE4E4", color: "#B4231F" }}>
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={sending || needsVerification}
              className="justify-self-start rounded-full px-8 py-6 text-base font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#D97706" }}
            >
              {sending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Publicando…
                </span>
              ) : needsVerification ? (
                "Verifica el número para publicar"
              ) : (
                "Publicar ofrecimiento"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
