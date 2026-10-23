'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────────────
   Section — Envoltorio para secciones de la página
   Incluye reveal automático preparado para GSAP/ScrollTrigger
   Props:
     id         → ancla de navegación
     className  → clases adicionales Tailwind
     dir        → 'ltr' | 'rtl' (soporte árabe)
     eyebrow    → texto pequeño encima del título
     title      → h2 con Aref Ruqaa
     children   → contenido de la sección
───────────────────────────────────────────────────── */
interface SectionProps {
  id?: string
  className?: string
  dir?: 'ltr' | 'rtl'
  eyebrow?: string
  title?: ReactNode
  titleClassName?: string
  children?: ReactNode
  as?: 'section' | 'div' | 'article'
}

export function Section({
  id,
  className = '',
  dir = 'ltr',
  eyebrow,
  title,
  titleClassName = '',
  children,
  as: Tag = 'section',
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <Tag
      ref={sectionRef as any}
      id={id}
      dir={dir}
      className={`py-24 px-6 md:px-12 gsap-reveal ${className}`}
    >
      {/* Eyebrow + Title */}
      {(eyebrow || title) && (
        <div className="mb-14 text-center">
          {eyebrow && (
            <p className="text-gold text-[0.65rem] tracking-[0.36em] uppercase font-body mb-4">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              className={`font-title text-noir text-[clamp(2rem,4vw,3.2rem)] leading-tight gsap-reveal ${titleClassName}`}
            >
              {title}
            </h2>
          )}
          <div className="sep-gold max-w-[120px] mx-auto mt-6 opacity-30" aria-hidden="true" />
        </div>
      )}

      {children}
    </Tag>
  )
}
