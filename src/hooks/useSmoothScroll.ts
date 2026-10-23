'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * useSmoothScroll
 * Wait for loader to complete before initializing Lenis smooth scrolling
 * and activates GSAP ScrollTrigger animations for reveal elements.
 */
export function useSmoothScroll(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Connect Lenis to GSAP ticker
    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    // Setup reveal animations for all elements with .gsap-reveal, .reveal-on-scroll, etc.
    const ctx = gsap.context(() => {
      // 1. Reveal items with stagger or fade-up
      const revealElements = document.querySelectorAll('.reveal-on-scroll, .gsap-reveal')
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // 2. Parallax images
      const parallaxImages = document.querySelectorAll('.parallax-img')
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          { y: -25 },
          {
            y: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })

      // Refresh ScrollTrigger once everything is mounted
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    })

    return () => {
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(onTick)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [enabled])
}
