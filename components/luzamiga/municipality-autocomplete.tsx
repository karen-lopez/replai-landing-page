"use client"

import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"

function normalize(value: string) {
  return value.toLocaleLowerCase("es").normalize("NFD").replace(/[̀-ͯ]/g, "")
}

interface MunicipalityAutocompleteProps {
  id: string
  value: string
  onChange: (value: string) => void
  municipalities: string[]
  placeholder: string
  onEnter?: () => void
}

/**
 * Combobox propio en vez de <input list> + <datalist>: el datalist nativo
 * se renderiza con el tema del sistema operativo (a veces oscuro) y puede
 * abrirse hacia un lado, sin forma de controlarlo por CSS.
 */
export function MunicipalityAutocomplete({
  id,
  value,
  onChange,
  municipalities,
  placeholder,
  onEnter,
}: MunicipalityAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const normalizedValue = normalize(value.trim())
  const suggestions = normalizedValue
    ? municipalities.filter((name) => normalize(name).includes(normalizedValue)).slice(0, 8)
    : []

  return (
    <div ref={containerRef} className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7659]"
        aria-hidden="true"
      />
      <input
        id={id}
        role="combobox"
        aria-expanded={open && suggestions.length > 0}
        aria-autocomplete="list"
        autoComplete="off"
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setOpen(false)
            onEnter?.()
          }
          if (event.key === "Escape") setOpen(false)
        }}
        placeholder={placeholder}
        className="h-11 w-full rounded-full border bg-white pl-11 pr-11 text-sm text-[#3A2E1A] outline-none transition focus:ring-2 focus:ring-[#4A7C59]"
        style={{ borderColor: "#E4C79A" }}
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange("")
            setOpen(false)
          }}
          className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#8A7659] hover:bg-[#F1E4CC]"
          aria-label="Limpiar"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
      {open && suggestions.length > 0 ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-y-auto rounded-xl border bg-white p-1 shadow-lg"
          style={{ borderColor: "#E4C79A" }}
        >
          {suggestions.map((name) => (
            <li key={name}>
              <button
                type="button"
                role="option"
                onClick={() => {
                  onChange(name)
                  setOpen(false)
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[#3A2E1A] hover:bg-[#F6ECD8]"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
