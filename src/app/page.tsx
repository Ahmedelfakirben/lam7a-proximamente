'use client'

import { useState } from 'react'
import Link from 'next/link'

type Lang = 'es' | 'en' | 'fr' | 'ar'

const CONTENT: Record<Lang, {
  label: string
  title: [string, string]
  sub: string
  ig: string
  portal: string
  code: string
  name: string
  dir: 'ltr' | 'rtl'
}> = {
  es: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title: ['Sitio en ', 'construcción'],
    sub: 'Estamos preparando algo especial. Estaremos en línea muy pronto.<br/>Mientras tanto, encuéntranos en Instagram.',
    ig: 'Seguir en Instagram',
    portal: 'Espace Privé • Acceso Clientes',
    code: 'ES',
    name: 'Español',
    dir: 'ltr',
  },
  en: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title: ['Site under ', 'construction'],
    sub: 'We are preparing something special. We will be online very soon.<br/>In the meantime, find us on Instagram.',
    ig: 'Follow on Instagram',
    portal: 'Client Suite • Private Access',
    code: 'EN',
    name: 'English',
    dir: 'ltr',
  },
  fr: {
    label: "Haute Photographie d'Auteur • Tétouan",
    title: ['Site en ', 'construction'],
    sub: 'Nous préparons quelque chose de spécial. Bientôt en ligne.<br/>En attendant, retrouvez-nous sur Instagram.',
    ig: 'Suivre sur Instagram',
    portal: 'Espace Privé • Accès Client',
    code: 'FR',
    name: 'Français',
    dir: 'ltr',
  },
  ar: {
    label: 'هوت فوتوغرافي • تطوان',
    title: ['الموقع قيد ', 'الإنشاء'],
    sub: 'نحن نحضّر شيئاً مميزاً. سنكون متاحين قريباً.<br/>في غضون ذلك، تجدوننا على إنستغرام.',
    ig: 'تابعونا على إنستغرام',
    portal: 'الجناح الخاص • دخول العملاء',
    code: 'AR',
    name: 'العربية',
    dir: 'rtl',
  },
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('es')
  const [langOpen, setLangOpen] = useState(false)
  const current = CONTENT[lang]

  return (
    <div className={`cs-body-root ${current.dir === 'rtl' ? 'cs-ar-text' : ''}`} dir={current.dir}>
      {/* ── Background Layer (Idéntico a lamha-proximamente) ── */}
      <div className="cs-bg-wrapper" aria-hidden="true">
        <div className="cs-bg" />
        <div className="cs-overlay" />
        <div className="cs-glow-orb cs-glow-orb-1" />
        <div className="cs-glow-orb cs-glow-orb-2" />
      </div>

      {/* ── Language Switcher Dropdown (Idéntico a lamha-proximamente) ── */}
      <div className="cs-lang-drop">
        <button
          className="cs-lang-drop-btn"
          onClick={() => setLangOpen(!langOpen)}
          aria-label="Cambiar idioma"
        >
          <i className="fa-solid fa-globe globe" />
          <span>{current.code}</span>
          <i className={`fa-solid fa-chevron-down chevron ${langOpen ? 'rotate-180' : ''}`} />
        </button>

        {langOpen && (
          <div className="cs-lang-drop-menu">
            {(['es', 'en', 'fr', 'ar'] as Lang[]).map((l) => (
              <button
                key={l}
                className={`cs-lang-option ${l === lang ? 'active' : ''}`}
                onClick={() => {
                  setLang(l)
                  setLangOpen(false)
                }}
              >
                <span>{CONTENT[l].name}</span>
                <span className="lang-code">{CONTENT[l].code}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Central Card Content (1:1 con lamha-proximamente) ── */}
      <main className="cs-main-card" role="main">
        {/* Logo SVG Oficial con filtro dorado de autor */}
        <div className="cs-logo-container">
          <svg viewBox="100 400 750 300" className="cs-logo-svg" aria-label="Lamha Studios Logo">
            <path d="M805.99,486.53c-.82,1.83-3.51,1.4-3.8-.58-4.38-31.31-23.1-39.11-23.1-39.11-15.71.09,61.92,158.43-10.37,158.43-26.61,0-23.93-9.1-28.57-9.27-4.64-.19-1.44,21.08-6.96,18.55-8.83-4.05-41.53-29.06-45.68-26.41-4.69,3.01-10.35,18.92-38.72,18.92-34.78-1.31-27.42-35.48-25.92-47.03,4.98-3.74,8.5-6.84,10.93-9.19.37,12.24,3.76,26.96,21.84,26.96,32.08.3,46.58-50.29,66.63-50.29,27.46.32,9.81,44.71,41.65,44.71,0,0,20.56.89,21.01-7.57,1.8-33.81-46.2-120.95-10.28-143.77,3.67-2.33,8.47-2,11.72.88,11.55,10.24,30.47,40.26,19.61,64.77Z" />
            <path d="M615.34,560.8l.03.04c-18.99,12.47-73.99,49.65-176.24,49.65-130.47,0-125.84-48.73-121.22-64.15,4.64-15.42,23.44-39.79,19.44-44.73-4.02-4.94-17.58-7.1-17.58-7.1,0,0-10.18,25.3-16.04,25.6-5.86.32-22.52-10.18-30.54-10.18s6.18-28.07,10.18-28.68c4.02-.62,22.52,11.1,26.22,9.26,3.7-1.86,13.56-26.84,17.88-26.84s28.38,12.34,28.38,15.42-26.22,53.67-25.3,63.55c.94,9.86,16.66,50.63,133.88,38.59,144.04-16.96,175.81-63.58,175.81-63.58l-125.14,13.2c-2.53.22-4.36-2.38-3.31-4.69l9.4-23.78c.49-1.05,1.47-1.79,2.62-1.93,14.76-1.83,113.34-13.82,135.62-12.14,2.48.19,4.35,2.3,4.25,4.78-1.09,24.45-21.95,39.87-28.17,50.13,0,0-.01.03-.04.07-.52.73-5.04,6.94-20.13,17.5Z" />
          </svg>
        </div>

        {/* Separador Dorado */}
        <div className="cs-sep" aria-hidden="true">
          <div className="cs-sep-line" />
          <div className="cs-sep-dot" />
          <div className="cs-sep-line" />
        </div>

        {/* Etiqueta */}
        <p className="cs-label">{current.label}</p>

        {/* Titular */}
        <h1 className="cs-h1">
          {current.title[0]}
          <em>{current.title[1]}</em>
        </h1>

        {/* Subtítulo */}
        <p
          className="cs-sub"
          dangerouslySetInnerHTML={{ __html: current.sub }}
        />

        {/* Grupo de Acciones: Botón Instagram Original + Botón Acceso Portal Cliente */}
        <div className="cs-cta-group">
          {/* 1. Botón de Instagram (Original de lamha-proximamente) */}
          <a
            href="https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-btn-action cs-btn-ig"
          >
            <i className="fa-brands fa-instagram" />
            <span>{current.ig}</span>
          </a>

          {/* 2. Botón de Acceso Portal Cliente (Añadido elegantemente con estilo de autor) */}
          <Link
            href="/portal"
            className="cs-btn-action cs-btn-portal"
            title="Acceso al Espace Privé de Clientes"
          >
            <i className="fa-solid fa-key" />
            <span>{current.portal}</span>
          </Link>
        </div>
      </main>

      {/* ── Footer (Idéntico a lamha-proximamente) ── */}
      <footer className="cs-footer">
        <p>© 2026 <span>Lamha Studios</span> by Afaf El Aribi • Tetuán, Maroc</p>
      </footer>
    </div>
  )
}


