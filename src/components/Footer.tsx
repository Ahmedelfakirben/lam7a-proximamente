'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { t, isRTL } = useLanguage()

  return (
    <footer className="luxury-footer" id="footer" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container footer-content-grid">

        {/* 1. Brand Column */}
        <div className="footer-col-brand">
          <Link href="#hero" title="Lamha Studios">
            <svg viewBox="100 400 750 300" className="footer-svg-logo" aria-label="Lamha Studios Logo">
              <path d="M805.99,486.53c-.82,1.83-3.51,1.4-3.8-.58-4.38-31.31-23.1-39.11-23.1-39.11-15.71.09,61.92,158.43-10.37,158.43-26.61,0-23.93-9.1-28.57-9.27-4.64-.19-1.44,21.08-6.96,18.55-8.83-4.05-41.53-29.06-45.68-26.41-4.69,3.01-10.35,18.92-38.72,18.92-34.78-1.31-27.42-35.48-25.92-47.03,4.98-3.74,8.5-6.84,10.93-9.19.37,12.24,3.76,26.96,21.84,26.96,32.08.3,46.58-50.29,66.63-50.29,27.46.32,9.81,44.71,41.65,44.71,0,0,20.56.89,21.01-7.57,1.8-33.81-46.2-120.95-10.28-143.77,3.67-2.33,8.47-2,11.72.88,11.55,10.24,30.47,40.26,19.61,64.77Z" />
              <path d="M615.34,560.8l.03.04c-18.99,12.47-73.99,49.65-176.24,49.65-130.47,0-125.84-48.73-121.22-64.15,4.64-15.42,23.44-39.79,19.44-44.73-4.02-4.94-17.58-7.1-17.58-7.1,0,0-10.18,25.3-16.04,25.6-5.86.32-22.52-10.18-30.54-10.18s6.18-28.07,10.18-28.68c4.02-.62,22.52,11.1,26.22,9.26,3.7-1.86,13.56-26.84,17.88-26.84s28.38,12.34,28.38,15.42-26.22,53.67-25.3,63.55c.94,9.86,16.66,50.63,133.88,38.59,144.04-16.96,175.81-63.58,175.81-63.58l-125.14,13.2c-2.53.22-4.36-2.38-3.31-4.69l9.4-23.78c.49-1.05,1.47-1.79,2.62-1.93,14.76-1.83,113.34-13.82,135.62-12.14,2.48.19,4.35,2.3,4.25,4.78-1.09,24.45-21.95,39.87-28.17,50.13,0,0-.01.03-.04.07-.52.73-5.04,6.94-20.13,17.5Z" />
            </svg>
          </Link>
          <h4 className="footer-brand-name">LAMHA STUDIOS</h4>
          <span className="footer-brand-by">STUDIOS BY AFAF EL ARIBI</span>
          <p className="footer-summary">
            {t('ft_summary')}
          </p>
        </div>

        {/* 2. Navigation Column */}
        <div className="footer-col-nav">
          <h5>{t('ft_nav_title')}</h5>
          <a href="#filosofia">{t('nav_filosofia')}</a>
          <a href="#portfolio">{t('nav_colecciones')}</a>
          <a href="#tematicas">{t('nav_tematicas')}</a>
          <a href="#before-after">{t('nav_color')}</a>
          <a href="#proceso">{t('nav_proceso')}</a>
        </div>

        {/* 3. Clients Column */}
        <div className="footer-col-nav">
          <h5>{t('ft_cli_title')}</h5>
          <Link href="/portal">{t('nav_espace_prive')}</Link>
          <a href="#contacto">Consulta de Fechas</a>
          <Link href="/proximamente">Coming Soon</Link>
        </div>

        {/* 4. Contact & Atelier Column */}
        <div className="footer-col-contact">
          <h5>{t('ft_contact_title')}</h5>
          <p className="footer-address">
            <i className="fa-solid fa-location-dot" /> Bojarah, Yedi Mavi, Tetouan, Morocco
          </p>
          <p className="footer-phones">
            <i className="fa-solid fa-phone" /> <a href="tel:0539702927">0539702927</a> / <a href="tel:0762517478">0762517478</a>
          </p>
          <p className="footer-email">
            <i className="fa-solid fa-envelope" /> <a href="mailto:Lamha@afafelaribi.com">Lamha@afafelaribi.com</a>
          </p>
          <div className="stay-tuned-badge">STAY TUNED • كونو بالقرب</div>
          <div className="social-links-row">
            <a href="https://www.instagram.com/Lamhastudios" target="_blank" rel="noopener noreferrer" className="social-circle" title="Instagram @Lamhastudios">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="https://www.instagram.com/Lamhastudios" target="_blank" rel="noopener noreferrer" className="social-circle" title="Pinterest">
              <i className="fa-brands fa-pinterest-p" />
            </a>
            <a href="https://wa.me/212762517478" target="_blank" rel="noopener noreferrer" className="social-circle" title="WhatsApp (+212) 0762517478">
              <i className="fa-brands fa-whatsapp" />
            </a>
          </div>
        </div>

      </div>

      <div className="container footer-subline">
        <span>{t('ft_rights')}</span>
        <span>{t('ft_subtitle')}</span>
      </div>
    </footer>
  )
}
