'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export function BeforeAfter() {
  const { t, isRTL } = useLanguage()
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.min(Math.max((x / rect.width) * 100, 2), 98)
    setSliderPos(percent)
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX)
    }
    const onMouseUp = () => {
      isDragging.current = false
    }
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) handleMove(e.touches[0].clientX)
    }
    const onTouchEnd = () => {
      isDragging.current = false
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [handleMove])

  return (
    <section className="luxury-section before-after-section" id="before-after">
      <div className="container">

        <div className="section-center-head reveal-on-scroll" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="section-tag-gold">
            <span>{t('ba_tag')}</span>
            <span className="arabic-tag">فن المعالجة</span>
          </div>
          <h2 className="editorial-heading-lg">{t('ba_heading')}</h2>
          <p className="section-lead-center">{t('ba_lead')}</p>
        </div>

        <div className="split-slider-wrapper reveal-on-scroll">
          <div
            ref={containerRef}
            className="split-slider-container"
            onMouseDown={() => (isDragging.current = true)}
            onTouchStart={() => (isDragging.current = true)}
            style={{ cursor: 'ew-resize', position: 'relative' }}
          >
            {/* 1. Capa Antes (RAW) */}
            <div className="slide-img img-before" style={{ position: 'absolute', inset: 0 }}>
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=70"
                alt="Archivo RAW original"
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
                style={{ filter: 'contrast(0.9) brightness(1.05) saturate(0.65)' }}
                priority
              />
              <span className="slider-badge badge-left">{t('ba_badge_before')}</span>
            </div>

            {/* 2. Capa Después (Signature) */}
            <div
              className="slide-img img-after"
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=95"
                alt="Revelado de autor Lamha"
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
                style={{ filter: 'contrast(1.1) brightness(0.98) saturate(1.25)' }}
                priority
              />
              <span className="slider-badge badge-right">{t('ba_badge_after')}</span>
            </div>

            {/* 3. Manija Divisora */}
            <div
              className="slider-handle"
              style={{ left: `${sliderPos}%`, pointerEvents: 'none' }}
            >
              <div className="handle-line" />
              <div className="handle-circle">
                <i className="fa-solid fa-chevron-left" />
                <i className="fa-solid fa-chevron-right" />
              </div>
              <div className="handle-line" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
