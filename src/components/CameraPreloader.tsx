'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

export function CameraPreloader() {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Allow forcing re-run or skipping if already seen in current session
    const hasSeen = sessionStorage.getItem('lmh_preloader_seen')
    if (hasSeen === '1') {
      setIsDone(true)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem('lmh_preloader_seen', '1')
        } catch {}
        setIsDone(true)
      },
    })

    // Counter animation 0% to 100%
    const obj = { val: 0 }
    gsap.to(obj, {
      val: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const el = document.getElementById('progressNum')
        if (el) el.textContent = Math.floor(obj.val) + '%'
      },
    })

    // Target Focus Pulse
    gsap.fromTo(
      '#focusTarget',
      { scale: 1.5, opacity: 0.2 },
      { scale: 1.0, opacity: 1, duration: 1.2, ease: 'back.out(1.8)' }
    )

    // Shutter snap & reveal entrance sequence
    tl.to('#focusText', {
      textContent: 'FOCUSED ✓',
      color: '#C69F68',
      duration: 0.25,
      delay: 1.3,
    })
      // Camera flash effect
      .to('#shutter-flash', { opacity: 0.95, duration: 0.08, ease: 'power4.in' })
      .to('#shutter-flash', { opacity: 0, duration: 0.45, ease: 'power2.out' })
      // Hide preloader
      .to('#preloader', { opacity: 0, duration: 0.5, ease: 'power3.inOut' }, '-=0.4')
  }, [])

  if (isDone) return null

  return (
    <>
      {/* Flash shutter pulse effect on exit */}
      <div
        id="shutter-flash"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#FAF8F5',
          zIndex: 10000,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Camera Viewfinder Photography Preloader */}
      <div
        id="preloader"
        role="status"
        aria-label="Cargando Lamha Studios"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#080605',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Viewfinder Camera Frame HUD */}
        <div
          className="viewfinder-hud"
          style={{
            position: 'absolute',
            inset: '36px',
            pointerEvents: 'none',
            border: '1px solid rgba(198, 159, 104, 0.14)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '18px',
          }}
        >
          <div
            className="camera-specs"
            style={{
              fontFamily: "'JetBrains Mono', monospace, sans-serif",
              fontSize: '0.7rem',
              color: 'rgba(198, 159, 104, 0.7)',
              letterSpacing: '0.15em',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E8C99A' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#D9534F',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'rec-blink 1s ease-in-out infinite alternate',
                  boxShadow: '0 0 8px #D9534F',
                }}
              />
              <span>REC • RAW</span>
            </div>
            <div>4K • 60 FPS</div>
          </div>

          <div
            className="camera-specs"
            style={{
              fontFamily: "'JetBrains Mono', monospace, sans-serif",
              fontSize: '0.7rem',
              color: 'rgba(198, 159, 104, 0.7)',
              letterSpacing: '0.15em',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              textTransform: 'uppercase',
            }}
          >
            <div>1/250s • f/1.4 • ISO 100</div>
            <div>TETUÁN • MA</div>
          </div>

          {/* HUD Corners */}
          <span
            style={{
              position: 'absolute',
              top: '-1px',
              left: '-1px',
              width: '24px',
              height: '24px',
              borderColor: '#C69F68',
              borderStyle: 'solid',
              borderWidth: '2px 0 0 2px',
              opacity: 0.8,
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '-1px',
              right: '-1px',
              width: '24px',
              height: '24px',
              borderColor: '#C69F68',
              borderStyle: 'solid',
              borderWidth: '2px 2px 0 0',
              opacity: 0.8,
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '-1px',
              left: '-1px',
              width: '24px',
              height: '24px',
              borderColor: '#C69F68',
              borderStyle: 'solid',
              borderWidth: '0 0 2px 2px',
              opacity: 0.8,
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '-1px',
              right: '-1px',
              width: '24px',
              height: '24px',
              borderColor: '#C69F68',
              borderStyle: 'solid',
              borderWidth: '0 2px 2px 0',
              opacity: 0.8,
            }}
          />
        </div>

        {/* Minimalist Concentric Camera Lens Rings */}
        <div
          className="lens-wrapper"
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '26px',
          }}
        >
          {/* Ring Outer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(198, 159, 104, 0.28)',
              boxShadow: '0 0 35px rgba(198, 159, 104, 0.15)',
              animation: 'spin-ring 12s linear infinite',
            }}
          />
          {/* Ring Mid */}
          <div
            style={{
              position: 'absolute',
              inset: '16px',
              borderRadius: '50%',
              border: '1px dashed rgba(228, 197, 151, 0.45)',
              animation: 'spin-ring-reverse 8s linear infinite',
            }}
          />
          {/* Ring Inner */}
          <div
            style={{
              position: 'absolute',
              inset: '32px',
              borderRadius: '50%',
              border: '1px solid rgba(198, 159, 104, 0.65)',
              boxShadow: 'inset 0 0 15px rgba(198, 159, 104, 0.25)',
            }}
          />

          {/* Focus Target (+) */}
          <div
            id="focusTarget"
            style={{
              position: 'absolute',
              width: '38px',
              height: '38px',
              border: '1px solid #E8C99A',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(198, 159, 104, 0.5)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '12px',
                height: '1.5px',
                background: '#E8C99A',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '1.5px',
                height: '12px',
                background: '#E8C99A',
              }}
            />
          </div>
        </div>

        {/* Preloader Text & Counter */}
        <div
          className="preloader-status"
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            id="focusText"
            style={{
              fontFamily: "'JetBrains Mono', monospace, sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.35em',
              color: '#E8C99A',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            AUTO FOCUSING...
          </div>
          <div
            style={{
              fontFamily: "var(--font-ibm-serif), 'IBM Plex Serif', Georgia, serif",
              fontSize: '1.15rem',
              letterSpacing: '0.28em',
              color: '#FAF8F5',
              textTransform: 'uppercase',
              fontWeight: 300,
              opacity: 0.92,
            }}
          >
            Lamha Studios
          </div>
          <div
            id="progressNum"
            style={{
              fontFamily: "'JetBrains Mono', monospace, sans-serif",
              fontSize: '0.85rem',
              color: '#C69F68',
              opacity: 0.9,
              marginTop: '4px',
              fontWeight: 600,
            }}
          >
            0%
          </div>
        </div>

        {/* CSS Keyframe Animations */}
        <style jsx global>{`
          @keyframes spin-ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-ring-reverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(-360deg); }
          }
          @keyframes rec-blink {
            from { opacity: 0.25; }
            to { opacity: 1; box-shadow: 0 0 10px #D9534F; }
          }
        `}</style>
      </div>
    </>
  )
}
