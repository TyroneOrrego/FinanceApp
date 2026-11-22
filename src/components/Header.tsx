import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpFromLine,
  BookOpen,
  Check,
  ChevronDown,
  Download,
  Eye,
  EyeOff,
  HelpCircle,
  MoreVertical,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { CurrencyCode, Language } from '../types'
import { CURRENCIES } from '../lib/kakeibo'
import { formatShortMonthLabel } from '../lib/date'
import { TRANSLATIONS } from '../lib/i18n'

interface HeaderProps {
  month: string
  currency: CurrencyCode
  lang: Language
  privacyMode: boolean
  onPrevMonth: () => void
  onNextMonth: () => void
  onTogglePrivacy: () => void
  onChangeCurrency: (c: CurrencyCode) => void
  onChangeLang: (l: Language) => void
  onOpenGuide: () => void
  onExportCsv: () => void
  onExportJson: () => void
  onImportJson: (file?: File) => void
  onLoadSamples?: () => void
  onClearSamples?: () => void
}

export function Header({
  month,
  currency,
  lang,
  privacyMode,
  onPrevMonth,
  onNextMonth,
  onTogglePrivacy,
  onChangeCurrency,
  onChangeLang,
  onOpenGuide,
  onExportCsv,
  onExportJson,
  onImportJson,
  onLoadSamples,
  onClearSamples,
}: HeaderProps) {
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)

  const t = TRANSLATIONS[lang]
  const shortMonthLabel = formatShortMonthLabel(month, lang)

  // Outside click listener for tools dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setIsToolsOpen(false)
      }
    }
    if (isToolsOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isToolsOpen])

  return (
    <header className="ledger-header">
      {/* Brand Identity */}
      <div className="ledger-brand">
        <div className="brand-logo-badge">
          <span className="kanji-mark">家</span>
        </div>
        <div>
          <h1>
            Kakeibo <small>家計簿</small>
          </h1>
          <p>{t.brand.subtitle}</p>
        </div>
      </div>

      <div className="ledger-header-tools">
        {/* Month Navigator */}
        <div className="ledger-month">
          <button
            type="button"
            aria-label="Previous month"
            onClick={onPrevMonth}
            title={lang === 'es' ? 'Mes anterior' : 'Previous month'}
          >
            <ArrowLeft size={15} />
          </button>
          <span className="month-display">{shortMonthLabel}</span>
          <button
            type="button"
            aria-label="Next month"
            onClick={onNextMonth}
            title={lang === 'es' ? 'Mes siguiente' : 'Next month'}
          >
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Privacy Mode Toggle */}
        <button
          type="button"
          aria-label={privacyMode ? 'Show amounts' : 'Hide amounts'}
          title={
            lang === 'es'
              ? privacyMode
                ? 'Mostrar cifras'
                : 'Modo Privacidad (Ocultar cifras)'
              : privacyMode
              ? 'Show amounts'
              : 'Privacy Mode (Blur amounts)'
          }
          onClick={onTogglePrivacy}
          className={`btn-privacy-toggle ${privacyMode ? 'active' : ''}`}
        >
          {privacyMode ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>

        {/* Language Switcher */}
        <div className="lang-toggle" title={t.header.langSelect}>
          <button
            type="button"
            className={lang === 'es' ? 'active' : ''}
            onClick={() => onChangeLang('es')}
          >
            ES
          </button>
          <button
            type="button"
            className={lang === 'en' ? 'active' : ''}
            onClick={() => onChangeLang('en')}
          >
            EN
          </button>
        </div>

        {/* Currency Dropdown */}
        <div className="currency-selector">
          <select
            value={currency}
            onChange={(e) => onChangeCurrency(e.target.value as CurrencyCode)}
            aria-label={t.header.currencySelect}
            title={t.header.currencySelect}
          >
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Unified Tools Dropdown Menu */}
        <div className="tools-dropdown-container" ref={toolsRef}>
          <button
            type="button"
            onClick={() => setIsToolsOpen((prev) => !prev)}
            className={`btn-tools-trigger ${isToolsOpen ? 'open' : ''}`}
            title={t.header.toolsMenu}
            aria-label={t.header.toolsMenu}
            aria-expanded={isToolsOpen}
          >
            <SlidersHorizontal size={15} />
            <ChevronDown size={12} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
          </button>

          {isToolsOpen && (
            <div className="tools-dropdown-menu" role="menu">
              <div className="tools-menu-header">
                <span>{t.header.toolsMenu}</span>
              </div>

              {/* Guide */}
              <button
                type="button"
                className="tools-menu-item"
                onClick={() => {
                  setIsToolsOpen(false)
                  onOpenGuide()
                }}
              >
                <HelpCircle size={15} className="text-forest" />
                <div>
                  <strong>{t.header.guide}</strong>
                  <small>{lang === 'es' ? 'Historia y los 4 pilares' : 'History & 4 pillars'}</small>
                </div>
              </button>

              <div className="tools-menu-divider" />

              {/* CSV Export */}
              <button
                type="button"
                className="tools-menu-item"
                onClick={() => {
                  setIsToolsOpen(false)
                  onExportCsv()
                }}
              >
                <Download size={15} />
                <div>
                  <strong>{t.header.exportCsv}</strong>
                  <small>{lang === 'es' ? 'Descargar tabla para Excel' : 'Download for spreadsheets'}</small>
                </div>
              </button>

              {/* Backup JSON */}
              <button
                type="button"
                className="tools-menu-item"
                onClick={() => {
                  setIsToolsOpen(false)
                  onExportJson()
                }}
              >
                <ArrowDownToLine size={15} />
                <div>
                  <strong>{t.header.backupJson}</strong>
                  <small>{lang === 'es' ? 'Guardar copia de seguridad' : 'Save full backup copy'}</small>
                </div>
              </button>

              {/* Restore JSON */}
              <button
                type="button"
                className="tools-menu-item"
                onClick={() => {
                  setIsToolsOpen(false)
                  fileRef.current?.click()
                }}
              >
                <ArrowUpFromLine size={15} />
                <div>
                  <strong>{t.header.restoreJson}</strong>
                  <small>{lang === 'es' ? 'Recuperar desde archivo JSON' : 'Import from backup file'}</small>
                </div>
              </button>

              {onLoadSamples && (
                <>
                  <div className="tools-menu-divider" />
                  <button
                    type="button"
                    className="tools-menu-item"
                    onClick={() => {
                      setIsToolsOpen(false)
                      onLoadSamples()
                    }}
                  >
                    <RotateCcw size={15} />
                    <div>
                      <strong>{t.header.loadSamples}</strong>
                      <small>{lang === 'es' ? 'Recargar movimientos demo' : 'Reload sample data'}</small>
                    </div>
                  </button>
                </>
              )}

              {onClearSamples && (
                <button
                  type="button"
                  className="tools-menu-item tools-item-danger"
                  onClick={() => {
                    setIsToolsOpen(false)
                    onClearSamples()
                  }}
                >
                  <Trash2 size={15} />
                  <div>
                    <strong>{t.header.clearSamples}</strong>
                    <small>{lang === 'es' ? 'Remover entradas de ejemplo' : 'Remove sample records'}</small>
                  </div>
                </button>
              )}
            </div>
          )}

          <input
            ref={fileRef}
            className="visually-hidden"
            type="file"
            accept="application/json,.json"
            onChange={(e) => {
              onImportJson(e.target.files?.[0])
              if (fileRef.current) fileRef.current.value = ''
            }}
          />
        </div>
      </div>
    </header>
  )
}
