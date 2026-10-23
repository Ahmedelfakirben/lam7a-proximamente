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
  fb: string
  wa: string
  portalBtn: string
  portalDesc: string
  dir: 'ltr' | 'rtl'
}> = {
  es: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title1: 'Sitio en ',
    title2: 'construcción',
    sub: 'Estamos preparando algo especial. Pronto estaremos en línea. Mientras tanto, encuéntranos en nuestras redes.',
    ig: 'Seguir en Instagram',
    fb: 'Facebook',
    wa: 'Contactar con Afaf',
    portalBtn: 'Espace Privé • Acceso Clientes',
    portalDesc: '¿Tienes una sesión con nosotros? Introduce tu PIN para seleccionar tus fotos.',
    dir: 'ltr',
  },
  en: {
    label: "Haute Photographie d'Auteur • Tetuán",
    title1: 'Site under ',
    title2: 'construction',
    sub: 'We are preparing something special. We will be online soon. In the meantime, find us on our social networks.',
    ig: 'Follow on Instagram',
    fb: 'Facebook',
    wa: 'Contact Afaf',
    portalBtn: 'Client Suite • Private Access',
    portalDesc: 'Do you have an active session? Enter your PIN to view and select your photos.',
    dir: 'ltr',
  },
  fr: {
    label: "Haute Photographie d'Auteur • Tétouan",
    title1: 'Site en ',
    title2: 'construction',
    sub: 'Nous préparons quelque chose de spécial. Bientôt en ligne. En attendant, retrouvez-nous sur nos réseaux.',
    ig: 'Suivre sur Instagram',
    fb: 'Facebook',
    wa: 'Contacter Afaf',
    portalBtn: 'Espace Privé • Accès Client',
    portalDesc: 'Vous avez une séance avec nous ? Entrez votre code PIN pour choisir vos photos.',
    dir: 'ltr',
  },
  ar: {
    label: 'هوت فوتوغرافي • تطوان',
    title1: 'الموقع قيد ',
    title2: 'الإنشاء',
    sub: 'نحن نحضّر شيئاً مميزاً. سنكون متاحين قريباً. في غضون ذلك، تابعونا على وسائل التواصل الاجتماعي.',
    ig: 'تابعونا على إنستغرام',
    fb: 'فيسبوك',
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
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between items-center text-[#fbfaf8] select-none p-4 sm:p-6"
      dir={current.dir}
    >
      {/* ── 1. FONDO CON EFECTO CINEMATOGRÁFICO ── */}
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

      {/* ── 3. TOPBAR: SELECTOR DE IDIOMA & ENLACE ESPACE PRIVÉ ── */}
      <header className="relative z-20 w-full max-w-5xl flex justify-between items-center px-2 pt-2 sm:pt-4">
        {/* Acceso Directo al Portal de Clientes */}
        <Link
          href="/portal"
          className="cs-topbar-portal-btn"
          title="Acceso directo al portal de clientes"
        >
          <i className="fa-solid fa-lock text-[11px]" />
          <span>{current.portalBtn}</span>
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
      </header>

      {/* ── 4. CONTENIDO CENTRAL ── */}
      <main className="relative z-10 my-auto text-center flex flex-col items-center w-full max-w-2xl px-4 py-4">
        {/* Logo SVG */}
        <div className="mb-4 sm:mb-6">
          <LamhaLogo color="#fbfaf8" className="h-14 sm:h-20 w-auto drop-shadow-[0_0_24px_rgba(198,159,104,0.3)] hover:scale-105 transition-transform" />
        </div>

        {/* Separador */}
        <div className="flex items-center gap-3 w-48 mb-5 opacity-60">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C69F68] to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C69F68]" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C69F68] to-transparent" />
        </div>

        {/* Etiqueta */}
        <p className="text-[0.68rem] tracking-[0.32em] uppercase text-[#C69F68] font-semibold mb-2 sm:mb-3">
          {current.label}
        </p>

        {/* Titular */}
        <h1 className="font-serif text-3xl sm:text-5xl text-[#fbfaf8] mb-3 leading-tight">
          {current.title1}
          <em className="italic text-[#C69F68] font-serif not-italic">
            {current.title2}
          </em>
        </h1>

        {/* Subtítulo */}
        <p className="text-xs sm:text-sm text-[#fbfaf8]/75 font-serif leading-relaxed mb-6 max-w-lg">
          {current.sub}
        </p>

        {/* Tarjeta destacada de Acceso a la Suite de Cliente (Ultra-Luxury Editorial VIP Badge) */}
        <div className="cs-portal-card">
          <div className="cs-portal-card-inner">
            <div className="cs-portal-info-wrap">
              <div className="cs-portal-icon-box">
                <i className="fa-solid fa-key" />
              </div>
              <div className="cs-portal-text-box">
                <h3 className="cs-portal-card-title">
                  <span>{current.portalBtn}</span>
                </h3>
                <p className="cs-portal-card-desc">
                  {current.portalDesc}
                </p>
              </div>
            </div>

            <Link
              href="/portal"
              className="cs-portal-btn-action"
            >
              <span>Acceder</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>
        </div>

        {/* Botones de Redes Sociales (Instagram + Facebook + WhatsApp) */}
        <div className="cs-social-row">
          <a
            href="https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-social-btn cs-social-btn-ig"
          >
            <i className="fa-brands fa-instagram text-sm" />
            <span>{current.ig}</span>
          </a>

          <a
            href="https://www.facebook.com/lam7a.studios"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-social-btn cs-social-btn-fb"
          >
            <i className="fa-brands fa-facebook-f text-sm text-[#1877F2]" />
            <span>{current.fb}</span>
          </a>

          <a
            href="https://wa.me/212762517478"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-social-btn cs-social-btn-wa"
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

