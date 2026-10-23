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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ES')

  useEffect(() => {
    const saved = localStorage.getItem('lamha_lang') as Lang | null
    if (saved && ['ES', 'EN', 'FR', 'AR'].includes(saved)) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('lamha_lang', newLang)
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
