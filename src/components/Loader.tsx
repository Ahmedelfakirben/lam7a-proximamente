'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete?: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const isCompletedRef = useRef(false)

  useEffect(() => {
    if (isCompletedRef.current) return

    const finish = () => {
      if (isCompletedRef.current) return
      isCompletedRef.current = true
      const loader = document.getElementById('lmhLoader')
      if (loader) {
        loader.style.opacity = '0'
        loader.style.pointerEvents = 'none'
        setTimeout(() => {
          if (loader) loader.style.display = 'none'
        }, 400)
      }
      onComplete?.()
    }

    // Safety fallback
    const safety = setTimeout(finish, 5000)

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safety)
        finish()
      },
    })

    tl
      // 1. Fotograma dorado aparece desde el centro (scale + opacity)
      .to('#ldrFrame', {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: 'power2.out',
        transformOrigin: 'center center',
      })
      // 2. Logo hace fade in dentro del fotograma
      .to('#ldrLogoSVG', {
        opacity: 1,
        duration: 0.75,
        ease: 'power2.out',
      }, '-=0.1')
      // 3. Tagline aparece suavemente
      .to('#ldrTagline', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.25')
      // 4. Pausa cinematográfica
      .to({}, { duration: 0.75 })
      // 5. Logo y tagline se desvanecen
      .to('#ldrLogoSVG, #ldrTagline', {
        opacity: 0,
        duration: 0.28,
        ease: 'power1.in',
      })
      // 6. El fotograma se expande hasta llenar la pantalla
      .to('#ldrFrame', {
        width: '220vw',
        height: '220vh',
        borderColor: 'rgba(198, 159, 104, 0)',
        duration: 0.72,
        ease: 'power3.inOut',
        transformOrigin: 'center center',
      }, '-=0.05')
      // 7. El fondo negro del loader desaparece
      .to('#lmhLoader', {
        opacity: 0,
        duration: 0.38,
        ease: 'power2.in',
      }, '-=0.28')

    return () => {
      clearTimeout(safety)
      tl.kill()
    }
  }, [onComplete])

  return (
    <>
      <style>{`
        #lmhLoader {
          position: fixed !important;
          inset: 0 !important;
          z-index: 999999 !important;
          background: #080706 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          pointer-events: all !important;
          overflow: hidden !important;
        }
        #ldrFrame {
          width: 380px !important;
          height: 220px !important;
          border: 1px solid rgba(198, 159, 104, 0.7) !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          opacity: 0;
          flex-shrink: 0;
          box-shadow: 0 0 80px rgba(198, 159, 104, 0.04), inset 0 0 80px rgba(198, 159, 104, 0.02) !important;
        }
        .ldr-fc {
          position: absolute !important;
          width: 14px !important;
          height: 14px !important;
          border-color: rgba(198, 159, 104, 0.95) !important;
          border-style: solid !important;
        }
        .ldr-fc-tl { top: -1px !important; left: -1px !important; border-width: 2px 0 0 2px !important; }
        .ldr-fc-tr { top: -1px !important; right: -1px !important; border-width: 2px 2px 0 0 !important; }
        .ldr-fc-bl { bottom: -1px !important; left: -1px !important; border-width: 0 0 2px 2px !important; }
        .ldr-fc-br { bottom: -1px !important; right: -1px !important; border-width: 0 2px 2px 0 !important; }
        #ldrLogoSVG {
          width: 120px !important;
          height: auto !important;
          fill: #fbfaf8 !important;
          opacity: 0;
          filter: drop-shadow(0 0 16px rgba(198, 159, 104, 0.18)) !important;
        }
        #ldrTagline {
          font-family: var(--font-primary), 'Outfit', sans-serif !important;
          font-size: 0.54rem !important;
          letter-spacing: 0.46em !important;
          color: rgba(198, 159, 104, 0.65) !important;
          text-transform: uppercase !important;
          margin-top: 14px !important;
          opacity: 0;
        }
      `}</style>

      <div id="lmhLoader" role="status" aria-label="Cargando Lamha Studios">
        <div id="ldrFrame">
          <div className="ldr-fc ldr-fc-tl" />
          <div className="ldr-fc ldr-fc-tr" />
          <div className="ldr-fc ldr-fc-bl" />
          <div className="ldr-fc ldr-fc-br" />

          {/* Logo SVG */}
          <svg id="ldrLogoSVG" viewBox="100 400 750 300" aria-hidden="true">
            <path d="M805.99,486.53c-.82,1.83-3.51,1.4-3.8-.58-4.38-31.31-23.1-39.11-23.1-39.11-15.71.09,61.92,158.43-10.37,158.43-26.61,0-23.93-9.1-28.57-9.27-4.64-.19-1.44,21.08-6.96,18.55-8.83-4.05-41.53-29.06-45.68-26.41-4.69,3.01-10.35,18.92-38.72,18.92-34.78-1.31-27.42-35.48-25.92-47.03,4.98-3.74,8.5-6.84,10.93-9.19.37,12.24,3.76,26.96,21.84,26.96,32.08.3,46.58-50.29,66.63-50.29,27.46.32,9.81,44.71,41.65,44.71,0,0,20.56.89,21.01-7.57,1.8-33.81-46.2-120.95-10.28-143.77,3.67-2.33,8.47-2,11.72.88,11.55,10.24,30.47,40.26,19.61,64.77Z" />
            <path d="M615.34,560.8l.03.04c-18.99,12.47-73.99,49.65-176.24,49.65-130.47,0-125.84-48.73-121.22-64.15,4.64-15.42,23.44-39.79,19.44-44.73-4.02-4.94-17.58-7.1-17.58-7.1,0,0-10.18,25.3-16.04,25.6-5.86.32-22.52-10.18-30.54-10.18s6.18-28.07,10.18-28.68c4.02-.62,22.52,11.1,26.22,9.26,3.7-1.86,13.56-26.84,17.88-26.84s28.38,12.34,28.38,15.42-26.22,53.67-25.3,63.55c.94,9.86,16.66,50.63,133.88,38.59,144.04-16.96,175.81-63.58,175.81-63.58l-125.14,13.2c-2.53.22-4.36-2.38-3.31-4.69l9.4-23.78c.49-1.05,1.47-1.79,2.62-1.93,14.76-1.83,113.34-13.82,135.62-12.14,2.48.19,4.35,2.3,4.25,4.78-1.09,24.45-21.95,39.87-28.17,50.13,0,0-.01.03-.04.07-.52.73-5.04,6.94-20.13,17.5Z" />
          </svg>

          {/* Tagline */}
          <span id="ldrTagline">STUDIOS BY AFAF EL ARIBI</span>
        </div>
      </div>
    </>
  )
}
