'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const SLIDES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=90',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=2000&q=90',
]

export function Hero() {
  const { t, isRTL } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const scrollToFilosofia = () => {
    const el = document.getElementById('filosofia')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="luxury-hero" id="hero">
      {/* 1. Contenedor de diapositivas */}
      <div className="hero-slides-container">
        {SLIDES.map((url, idx) => (
          <div
            key={url}
            className={`hero-slide-item ${idx === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${url}')` }}
          />
        ))}
      </div>

      {/* 2. Capas cinemáticas */}
      <div className="hero-vignette-overlay" />
      <div className="hero-noise-layer" />
      <div className="hero-museum-frame" />

      {/* 3. Centro editorial */}
      <div className="hero-center-editorial">
        <h1 className="hero-headline">
          <span className="hl-sub" style={{ fontFamily: 'var(--font-primary)' }}>
            {t('hero_sub')}
          </span>
          <span className="hl-main">
            {t('hero_main')}
          </span>
        </h1>

        <p className="hero-lede">
          {t('hero_lede')}
        </p>

        <div className="hero-action-row">
          <a href="#portfolio" className="btn-luxury-primary">
            <span>{t('hero_btn')}</span>
            <i className={`fa-solid ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}`} />
          </a>
        </div>
      </div>

      {/* 4. Barra inferior del hero */}
      <div className="hero-bottom-bar">
        <div className="meta-col text-right">
          <span className="meta-lbl">{t('hero_atelier')}</span>
          <span className="meta-val">{t('hero_author')}</span>
        </div>
        <div className="hero-scroll-indicator" onClick={scrollToFilosofia}>
          <span className="scroll-txt">{t('hero_explore')}</span>
          <div className="scroll-needle" />
        </div>
      </div>
    </section>
  )
}
