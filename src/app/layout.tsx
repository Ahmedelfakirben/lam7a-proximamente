import type { Metadata } from 'next'
import { Outfit, IBM_Plex_Serif, IBM_Plex_Sans_Arabic, Aref_Ruqaa } from 'next/font/google'
import './globals.css'
import './original-styles.css'
import './portal.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { CustomCursor } from '@/components/CustomCursor'
import { CameraPreloader } from '@/components/CameraPreloader'

/* ── Google Fonts ───────────────────────────────── */
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

const ibmSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-serif',
  display: 'swap',
})

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500'],
  variable: '--font-ibm-arabic',
  display: 'swap',
})

const arefRuqaa = Aref_Ruqaa({
  subsets: ['latin', 'arabic'],
  weight: ['400', '700'],
  variable: '--font-aref-ruqaa',
  display: 'swap',
})

/* ── SEO Metadata ───────────────────────────────── */
export const metadata: Metadata = {
  title: 'Lamha Studios by Afaf Elaribi — Haute Photographie d\'Auteur',
  description:
    'Estudio de alta fotografía, dirección de arte y retratos en Tetuán. Dirección artística por Afaf Elaribi. STUDIOS BY AFAF EL ARIBI.',
  keywords: ['fotografía', 'photographie', 'Tetuán', 'Lamha Studios', 'Afaf Elaribi', 'bodas', 'retratos', 'fine art'],
  icons: {
    icon: '/assets/logo/logo-dark.svg',
    apple: '/assets/logo/logo-black-clean.png',
  },
  openGraph: {
    title: 'Lamha Studios — Haute Photographie d\'Auteur',
    description: 'تخليد ذكرياتك في لمحة • L’élégance simplement.',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      dir="ltr"
      className={`${outfit.variable} ${ibmSerif.variable} ${ibmArabic.variable} ${arefRuqaa.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="luxury-experience public-web bg-[#161616] text-[#fbfaf8] font-body overflow-x-hidden antialiased selection:bg-[#C69F68]/30 selection:text-[#fbfaf8]">
        <LanguageProvider>
          <CameraPreloader />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
