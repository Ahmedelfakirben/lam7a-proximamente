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
  portalBtn: string
  portalDesc: string
  dir: 'ltr' | 'rtl'
}> = {
  es: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title1: 'Sitio en ',
    title2: 'construcción',
    sub: 'Estamos preparando algo especial. Pronto estaremos en línea. Mientras tanto, encuéntranos en Instagram.',
    ig: 'Seguir en Instagram',
    wa: 'Contactar con Afaf',
    portalBtn: 'Espace Privé • Acceso Clientes',
    portalDesc: '¿Tienes una sesión con nosotros? Introduce tu PIN para seleccionar tus fotos.',
    dir: 'ltr',
  },
  en: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title1: 'Site under ',
    title2: 'construction',
    sub: 'We are preparing something special. We will be online soon. In the meantime, find us on Instagram.',
    ig: 'Follow on Instagram',
    wa: 'Contact Afaf',
    portalBtn: 'Client Suite • Private Access',
    portalDesc: 'Do you have an active session? Enter your PIN to view and select your photos.',
    dir: 'ltr',
  },
  fr: {
    label: "Haute Photographie d'Auteur • Tétouan",
    title1: 'Site en ',
    title2: 'construction',
    sub: 'Nous préparons quelque chose de spécial. Bientôt en ligne. En attendant, retrouvez-nous sur Instagram.',
    ig: 'Suivre sur Instagram',
    wa: 'Contacter Afaf',
    portalBtn: 'Espace Privé • Accès Client',
    portalDesc: 'Vous avez une séance avec nous ? Entrez votre code PIN pour choisir vos photos.',
    dir: 'ltr',
  },
  ar: {
    label: 'هوت فوتوغرافي • تطوان',
    title1: 'الموقع قيد ',
    title2: 'الإنشاء',
    sub: 'نحن نحضّر شيئاً مميزاً. سنكون متاحين قريباً. في غضون ذلك، تجدوننا على إنستغرام.',
    ig: 'تابعونا على إنستغرام',
    wa: 'تواصل مع عفاف',
    portalBtn: 'الجناح الخاص • دخول العملاء',
    portalDesc: 'هل لديك جلسة تصوير معنا؟ أدخل رقمك السري لاختيار صورك.',
    dir: 'rtl',
  },
}

export default function HomePage() {
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

      {/* ── 3. SELECTOR DE IDIOMA & ENLACE ESPACE PRIVÉ TOPBAR ── */}
      <div className="relative z-20 w-full max-w-5xl flex justify-between items-center">
        {/* Acceso Directo al Portal de Clientes */}
        <Link
          href="/portal"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C69F68]/15 hover:bg-[#C69F68]/30 border border-[#C69F68]/50 text-xs tracking-wider uppercase text-[#C69F68] transition-all backdrop-blur-md shadow-lg shadow-[#C69F68]/10"
        >
          <i className="fa-solid fa-key text-xs" />
          <span className="font-semibold">{current.portalBtn}</span>
        </Link>

        {/* Dropdown Idioma */}
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
        <div className="mb-6">
          <LamhaLogo color="#fbfaf8" className="h-16 md:h-20 w-auto drop-shadow-[0_0_24px_rgba(198,159,104,0.3)] hover:scale-105 transition-transform" />
        </div>

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
        <p className="text-xs sm:text-sm text-[#fbfaf8]/70 font-serif leading-relaxed mb-6 max-w-md">
          {current.sub}
        </p>

        {/* Tarjeta destacada de Acceso a la Suite de Cliente */}
        <div className="w-full max-w-md p-4 mb-6 rounded-2xl bg-[#161311]/80 border border-[#C69F68]/30 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-start">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#fbfaf8] flex items-center gap-1.5">
              <i className="fa-solid fa-lock text-[#C69F68] text-xs" />
              <span>{current.portalBtn}</span>
            </p>
            <p className="text-[11px] text-[#8c7a6b] mt-0.5 leading-snug">
              {current.portalDesc}
            </p>
          </div>
          <Link
            href="/portal"
            className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C69F68] to-[#dfba85] text-[#0b0a09] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all text-center"
          >
            Acceder
          </Link>
        </div>

        {/* Botones de acción (Instagram + WhatsApp) */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          <a
            href="https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6"
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
