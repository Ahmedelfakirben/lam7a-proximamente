'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Lang, translations, Translations } from '@/lib/i18n'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: keyof Translations) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const VALID_LANGS: Lang[] = ['ES', 'EN', 'FR', 'AR']

function detectDeviceLanguage(): Lang {
  if (typeof window === 'undefined') return 'FR'

  // 1. Verificar si viene forzado en la URL (?lang=fr, ?lang=ar, ?lang=es, ?lang=en)
  try {
    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')?.toUpperCase() as Lang | undefined
    if (urlLang && VALID_LANGS.includes(urlLang)) {
      return urlLang
    }
  } catch {}

  // 2. Verificar preferencia previamente guardada en el dispositivo
  try {
    const saved = localStorage.getItem('lamha_lang')?.toUpperCase() as Lang | null
    if (saved && VALID_LANGS.includes(saved)) {
      return saved
    }
  } catch {}

  // 3. Detectar idioma nativo del teléfono / navegador
  try {
    const browserLangs = navigator.languages || [navigator.language]
    for (const raw of browserLangs) {
      if (!raw) continue
      const lower = raw.toLowerCase()
      if (lower.startsWith('fr')) return 'FR'
      if (lower.startsWith('ar')) return 'AR'
      if (lower.startsWith('es')) return 'ES'
      if (lower.startsWith('en')) return 'EN'
    }
  } catch {}

  // 4. Por defecto en el estudio: Francés
  return 'FR'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('FR')

  useEffect(() => {
    const initialLang = detectDeviceLanguage()
    setLangState(initialLang)
    document.documentElement.lang = initialLang.toLowerCase()
    document.documentElement.dir = initialLang === 'AR' ? 'rtl' : 'ltr'
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    try {
      localStorage.setItem('lamha_lang', newLang)
    } catch {}
    document.documentElement.lang = newLang.toLowerCase()
    document.documentElement.dir = newLang === 'AR' ? 'rtl' : 'ltr'
  }

  const t = (key: keyof Translations): string => {
    const dict = translations[lang] || translations.ES
    return dict[key] || translations.ES[key] || ''
  }

  const isRTL = lang === 'AR'

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
