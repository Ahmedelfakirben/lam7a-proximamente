'use client'

import { useState } from 'react'
import { Loader } from '@/components/Loader'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Filosofia } from '@/components/Filosofia'
import { Portfolio } from '@/components/Portfolio'
import { Escenarios } from '@/components/Escenarios'
import { BeforeAfter } from '@/components/BeforeAfter'
import { InstagramFeed } from '@/components/InstagramFeed'
import { Protocolo } from '@/components/Protocolo'
import { SuitePrivadaInvitation } from '@/components/SuitePrivadaInvitation'
import { Contacto } from '@/components/Contacto'
import { Footer } from '@/components/Footer'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useLanguage } from '@/context/LanguageContext'

export default function FullSitePage() {
  const [loaderDone, setLoaderDone] = useState(false)
  const { lang, isRTL } = useLanguage()

  // Inicializar Lenis + GSAP ScrollTrigger ÚNICAMENTE tras completar el loader
  useSmoothScroll(loaderDone)

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} lang={lang.toLowerCase()} className="min-h-screen bg-[#161616]">
      {/* ══ 1. LOADER "FILM FRAME" ══ */}
      {!loaderDone && (
        <Loader onComplete={() => setLoaderDone(true)} />
      )}

      {/* ══ 2. HEADER SIMÉTRICO TRIPARTITO CON MENÚ MOBILE ══ */}
      <Navbar />

      {/* ══ 3. CONTENIDO PRINCIPAL ══ */}
      <main>
        <Hero />
        <Filosofia />
        <Portfolio />
        <Escenarios />
        <BeforeAfter />
        <InstagramFeed />
        <Protocolo />
        <SuitePrivadaInvitation />
        <Contacto />
      </main>

      {/* ══ 4. FOOTER MONUMENTAL ══ */}
      <Footer />
    </div>
  )
}
