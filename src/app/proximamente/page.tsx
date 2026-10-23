'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LamhaLogo } from '@/components/LamhaLogo'

type Lang = 'es' | 'en' | 'fr' | 'ar'

const CONTENT: Record<Lang, {
  label: string
  title1: string
  title2: string
  sub: string
  ig: string
  wa: string
  dir: 'ltr' | 'rtl'
}> = {
  es: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title1: 'Sitio en ',
    title2: 'construcción',
    sub: 'Estamos preparando algo especial. Pronto estaremos en línea. Mientras tanto, encuéntranos en Instagram.',
    ig: 'Seguir en Instagram',
    wa: 'Contactar con Afaf',
    dir: 'ltr',
  },
  en: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title1: 'Site under ',
    title2: 'construction',
    sub: 'We are preparing something special. We will be online soon. In the meantime, find us on Instagram.',
    ig: 'Follow on Instagram',
    wa: 'Contact Afaf',
    dir: 'ltr',
  },
  fr: {
    label: "Haute Photographie d'Auteur • Tétouan",
    title1: 'Site en ',
    title2: 'construction',
    sub: 'Nous préparons quelque chose de spécial. Bientôt en ligne. En attendant, retrouvez-nous sur Instagram.',
    ig: 'Suivre sur Instagram',
    wa: 'Contacter Afaf',
    dir: 'ltr',
  },
  ar: {
    label: 'هوت فوتوغرافي • تطوان',
    title1: 'الموقع قيد ',
    title2: 'الإنشاء',
    sub: 'نحن نحضّر شيئاً مميزاً. سنكون متاحين قريباً. في غضون ذلك، تجدوننا على إنستغرام.',
    ig: 'تابعونا على إنستغرام',
    wa: 'تواصل مع عفاف',
    dir: 'rtl',
  },
}

export default function ProximamentePage() {
  const [lang, setLang] = useState<Lang>('es')
  const [langOpen, setLangOpen] = useState(false)
  const current = CONTENT[lang]

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between items-center text-[#fbfaf8] select-none p-6"
      dir={current.dir}
    >
      {/* ── 1. FONDO CON EFECTO RESPIRACIÓN ── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src="/assets/lamha-coming-soon-bg.jpg"
          alt="Lamha Studios Coming Soon Background"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 animate-pulse duration-[8000ms]"
        />
      </div>

      {/* ── 2. OVERLAY CINEMATOGRÁFICO OSCURO ── */}
      <div className="fixed inset-0 z-[1] bg-[#100c0a]/85 backdrop-blur-[2px]" />

      {/* ── 3. SELECTOR DE IDIOMA TOPBAR ── */}
      <div className="relative z-20 w-full max-w-5xl flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#fbfaf8]/70 hover:text-[#C69F68] transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" />
          <span>Volver al Sitio</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#C69F68]/20 border border-[#C69F68]/40 text-xs tracking-wider uppercase text-[#fbfaf8] transition-all backdrop-blur-md"
          >
            <i className="fa-solid fa-globe text-[#C69F68]" />
            <span>{lang.toUpperCase()}</span>
            <i className={`fa-solid fa-chevron-down text-[0.6rem] transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          {langOpen && (
            <div className="absolute top-full mt-2 end-0 w-32 rounded-xl bg-[#161514]/95 border border-[#C69F68]/30 shadow-2xl py-1 overflow-hidden z-30">
              {(['es', 'en', 'fr', 'ar'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l)
                    setLangOpen(false)
                  }}
                  className={`w-full text-start px-3 py-1.5 text-xs transition-colors ${
                    l === lang ? 'text-[#C69F68] font-semibold bg-white/5' : 'text-[#fbfaf8]/70 hover:text-white'
                  }`}
                >
                  {{ es: 'Español', en: 'English', fr: 'Français', ar: 'العربية' }[l]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 4. CONTENIDO CENTRAL ── */}
      <main className="relative z-10 my-auto text-center flex flex-col items-center max-w-xl px-4">
        {/* Logo SVG */}
        <Link href="/" className="mb-6">
          <LamhaLogo color="#fbfaf8" className="h-16 md:h-20 w-auto drop-shadow-[0_0_24px_rgba(198,159,104,0.3)] hover:scale-105 transition-transform" />
        </Link>

        {/* Separador */}
        <div className="flex items-center gap-3 w-48 mb-6 opacity-60">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C69F68] to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C69F68]" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C69F68] to-transparent" />
        </div>

        {/* Etiqueta */}
        <p className="text-[0.68rem] tracking-[0.32em] uppercase text-[#C69F68] font-semibold mb-3">
          {current.label}
        </p>

        {/* Titular */}
        <h1 className="font-serif text-3xl sm:text-5xl text-[#fbfaf8] mb-4 leading-tight">
          {current.title1}
          <em className="italic text-[#C69F68] font-serif not-italic">
            {current.title2}
          </em>
        </h1>

        {/* Subtítulo */}
        <p className="text-xs sm:text-sm text-[#fbfaf8]/70 font-serif leading-relaxed mb-8 max-w-md">
          {current.sub}
        </p>

        {/* Botones de acción */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          <a
            href="https://www.instagram.com/Lamhastudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#C69F68] to-[#564031] text-white font-semibold text-xs tracking-wider uppercase shadow-xl hover:scale-105 transition-transform"
          >
            <i className="fa-brands fa-instagram text-sm" />
            <span>{current.ig}</span>
          </a>

          <a
            href="https://wa.me/212762517478"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-[#C69F68]/20 border border-[#C69F68]/40 text-[#fbfaf8] text-xs tracking-wider uppercase backdrop-blur-md hover:border-[#C69F68] transition-all"
          >
            <i className="fa-brands fa-whatsapp text-sm text-emerald-400" />
            <span>{current.wa}</span>
          </a>
        </div>
      </main>

      {/* ── 5. FOOTER ── */}
      <footer className="relative z-10 text-center text-[0.62rem] tracking-[0.2em] text-[#fbfaf8]/40 uppercase font-body py-2">
        <p>© 2026 <span className="text-[#C69F68]">Lamha Studios</span> by Afaf El Aribi • Tetuán, Maroc</p>
      </footer>
    </div>
  )
}
