"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Accessibility, Check, Contrast, Eye, Link2, Minus, Plus, RotateCcw, X } from "lucide-react"

type Settings = {
  textScale: number
  highContrast: boolean
  darkMode: boolean
  readableFont: boolean
  linkHighlight: boolean
  extraSpacing: boolean
}

const DEFAULT_SETTINGS: Settings = {
  textScale: 100,
  highContrast: false,
  darkMode: false,
  readableFont: false,
  linkHighlight: false,
  extraSpacing: false,
}

const STORAGE_KEY = "replai-accessibility-settings"

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) })
    } catch {}
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--a11y-text-scale", `${settings.textScale / 100}`)
    root.classList.toggle("a11y-high-contrast", settings.highContrast)
    root.classList.toggle("a11y-dark-mode", settings.darkMode)
    root.classList.toggle("a11y-readable-font", settings.readableFont)
    root.classList.toggle("a11y-link-highlight", settings.linkHighlight)
    root.classList.toggle("a11y-extra-spacing", settings.extraSpacing)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {}
  }, [settings])

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  function reset() {
    setSettings(DEFAULT_SETTINGS)
  }

  return (
    <div className="a11y-widget">
      {open ? (
        <section id="a11y-panel" className="a11y-panel" aria-label="Opciones de accesibilidad">
          <div className="a11y-panel-header">
            <h2>Accesibilidad</h2>
            <button type="button" className="a11y-icon-button" onClick={() => setOpen(false)} aria-label="Cerrar opciones de accesibilidad">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="a11y-control-group" aria-labelledby="a11y-text-label">
            <span id="a11y-text-label" className="a11y-control-label">Tamaño del texto</span>
            <div className="a11y-stepper">
              <button type="button" className="a11y-icon-button" onClick={() => update("textScale", Math.max(85, settings.textScale - 10))} aria-label="Reducir tamaño del texto" disabled={settings.textScale === 85}>
                <Minus size={16} aria-hidden="true" />
              </button>
              <span aria-live="polite">{settings.textScale}%</span>
              <button type="button" className="a11y-icon-button" onClick={() => update("textScale", Math.min(130, settings.textScale + 10))} aria-label="Aumentar tamaño del texto" disabled={settings.textScale === 130}>
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          <Toggle checked={settings.highContrast} onChange={(value) => update("highContrast", value)} icon={<Contrast size={17} aria-hidden="true" />} label="Alto contraste" />
          <Toggle checked={settings.darkMode} onChange={(value) => update("darkMode", value)} icon={<Eye size={17} aria-hidden="true" />} label="Modo oscuro" />
          <Toggle checked={settings.readableFont} onChange={(value) => update("readableFont", value)} icon={<span aria-hidden="true">Aa</span>} label="Fuente legible" />
          <Toggle checked={settings.extraSpacing} onChange={(value) => update("extraSpacing", value)} icon={<span aria-hidden="true">↔</span>} label="Más espaciado" />
          <Toggle checked={settings.linkHighlight} onChange={(value) => update("linkHighlight", value)} icon={<Link2 size={17} aria-hidden="true" />} label="Resaltar enlaces" />

          <button type="button" className="a11y-reset-button" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" />
            Restablecer
          </button>
        </section>
      ) : null}
      <button type="button" className="a11y-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="a11y-panel" aria-label="Abrir opciones de accesibilidad">
        <Accessibility size={23} aria-hidden="true" />
        <span>Accesibilidad</span>
      </button>
    </div>
  )
}

function Toggle({ checked, onChange, icon, label }: { checked: boolean; onChange: (value: boolean) => void; icon: ReactNode; label: string }) {
  return (
    <label className="a11y-toggle">
      <span className="a11y-toggle-label">{icon}{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="a11y-switch" aria-hidden="true"><span>{checked ? <Check size={12} /> : null}</span></span>
    </label>
  )
}