import { useEffect, useState } from 'react'
import { CurrencyCode, Language, UserSettings } from '../types'
import { SETTINGS_KEY } from '../lib/kakeibo'
import { safeStorage } from '../lib/storage'

const DEFAULT_SETTINGS: UserSettings = {
  currency: 'COP',
  lang: 'es',
  privacyMode: false,
}

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() =>
    safeStorage.get<UserSettings>(SETTINGS_KEY, DEFAULT_SETTINGS)
  )

  useEffect(() => {
    safeStorage.set(SETTINGS_KEY, settings)
    document.documentElement.lang = settings.lang
  }, [settings])

  const setCurrency = (currency: CurrencyCode) => {
    setSettings((prev) => ({ ...prev, currency }))
  }

  const setLang = (lang: Language) => {
    setSettings((prev) => ({ ...prev, lang }))
  }

  const togglePrivacyMode = () => {
    setSettings((prev) => ({ ...prev, privacyMode: !prev.privacyMode }))
  }

  return {
    currency: settings.currency,
    lang: settings.lang,
    privacyMode: settings.privacyMode,
    setCurrency,
    setLang,
    togglePrivacyMode,
  }
}
