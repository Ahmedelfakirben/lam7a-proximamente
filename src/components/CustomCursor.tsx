'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on devices with fine pointer (mouse)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let isHovering = false
    let isVisible = false
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const onMouseLeave = () => {
      isVisible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest('a, button, input, textarea, select, [role="button"], .interactive')
      isHovering = !!interactive
    }

    const render = () => {
      // Smooth lerp for ring
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      const scale = isHovering ? 1.6 : 1
      const borderColor = isHovering ? 'rgba(198, 159, 104, 0.95)' : 'rgba(198, 159, 104, 0.5)'
      const bg = isHovering ? 'rgba(198, 159, 104, 0.08)' : 'transparent'

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`
      ring.style.borderColor = borderColor
      ring.style.backgroundColor = bg

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', checkHover, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', checkHover)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] w-2 h-2 rounded-full bg-[#C69F68] opacity-0 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] w-9 h-9 rounded-full border border-[#C69F68]/50 opacity-0 transition-all duration-300"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  )
}
