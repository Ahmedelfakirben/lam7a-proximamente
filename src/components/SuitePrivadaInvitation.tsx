'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export function SuitePrivadaInvitation() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="luxury-section client-invitation-section" id="suite-privada">
      <div className="container">
        <div className="invitation-panel reveal-on-scroll">

          {/* Fondos multicapa */}
          <div className="invitation-backdrop-image" />
          <div className="invitation-ambient-glow" />
          <div className="invitation-noise-overlay" />
          <div className="invitation-gold-frame">
            <span className="frame-corner top-left" />
            <span className="frame-corner top-right" />
            <span className="frame-corner bottom-left" />
            <span className="frame-corner bottom-right" />
          </div>

          <div className="invitation-grid-layout" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Columna Izquierda: Mensaje y Pilares */}
            <div className="invitation-text-side">
              <div className="section-tag-gold">
                <span>{t('priv_tag')}</span>
                <span className="arabic-tag">الجناح الخاص</span>
              </div>

              <h2 className="invitation-title">{t('priv_title')}</h2>

              <div className="invitation-subtitle-line">
                <span className="arabic-subtext">تخليد ذكرياتك في لمحة</span>
                <span className="subtext-divider">•</span>
                <span className="latin-subtext">L’élégance discrète du sur-mesure</span>
              </div>

              <p className="invitation-desc">
                {t('priv_desc')}
              </p>

              {/* Grid de 4 pilares de exclusividad */}
              <div className="invitation-pillars-grid">
                <div className="inv-pillar-card">
                  <div className="pillar-icon"><i className="fa-solid fa-key" /></div>
                  <div className="pillar-info">
                    <h4>{t('priv_feat1_title')}</h4>
                    <p>{t('priv_feat1')}</p>
                  </div>
                </div>

                <div className="inv-pillar-card">
                  <div className="pillar-icon"><i className="fa-solid fa-wand-magic-sparkles" /></div>
                  <div className="pillar-info">
                    <h4>{t('priv_feat2_title')}</h4>
                    <p>{t('priv_feat2')}</p>
                  </div>
                </div>

                <div className="inv-pillar-card">
                  <div className="pillar-icon"><i className="fa-solid fa-clock-rotate-left" /></div>
                  <div className="pillar-info">
                    <h4>{t('priv_feat3_title')}</h4>
                    <p>{t('priv_feat3')}</p>
                  </div>
                </div>

                <div className="inv-pillar-card">
                  <div className="pillar-icon"><i className="fa-solid fa-cloud-arrow-down" /></div>
                  <div className="pillar-info">
                    <h4>{t('priv_feat4_title')}</h4>
                    <p>{t('priv_feat4')}</p>
                  </div>
                </div>
              </div>

              {/* Acciones & Credencial de demostración */}
              <div className="invitation-actions-wrap">
                <Link href="/portal" className="btn-luxury-primary btn-portal-enter" title="Acceder a la Suite de Cliente">
                  <i className="fa-solid fa-arrow-right-to-bracket" />
                  <span>{t('priv_btn')}</span>
                </Link>
                <div className="portal-demo-pill">
                  <span className="live-dot-green" />
                  <span>Demo Activa: <strong>Leyla & Karim (#LMH-8942)</strong></span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Mockup Interactivo Flotante */}
            <div className="invitation-preview-side">
              <Link href="/portal" className="suite-mockup-card" title="Explorar demo de Espace Privé">
                <div className="mockup-glass-shine" />

                <div className="mockup-header">
                  <div className="mockup-brand-row">
                    <span className="mockup-tag">ESPACE PRIVÉ DU CLIENT</span>
                    <span className="mockup-session-badge"><i className="fa-solid fa-circle-check" /> Activo</span>
                  </div>
                  <h3 className="mockup-client-title">Leyla & Karim</h3>
                  <div className="mockup-meta-row">
                    <span><i className="fa-solid fa-location-dot" /> Palais Namaskar, Marrakech</span>
                    <span><i className="fa-solid fa-film" /> #LMH-8942</span>
                  </div>
                </div>

                <div className="mockup-progress-box">
                  <div className="progress-labels">
                    <span className="progress-txt">Cupo de Libro en Piel</span>
                    <span className="progress-val"><strong>20</strong> / 20 seleccionadas</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="mockup-photo-mosaic">
                  <div className="mosaic-item selected">
                    <Image
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
                      alt="Velo y luz"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <span className="mosaic-check"><i className="fa-solid fa-check" /></span>
                    <span className="mosaic-pill">Portada</span>
                  </div>

                  <div className="mosaic-item selected">
                    <Image
                      src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=400&q=80"
                      alt="Alianzas en lino"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <span className="mosaic-check"><i className="fa-solid fa-check" /></span>
                  </div>

                  <div className="mosaic-item selected">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                      alt="Retrato editorial"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <span className="mosaic-check"><i className="fa-solid fa-check" /></span>
                    <span className="mosaic-pill">Retoque</span>
                  </div>

                  <div className="mosaic-item selected">
                    <Image
                      src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80"
                      alt="Ceremonia"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <span className="mosaic-check"><i className="fa-solid fa-check" /></span>
                  </div>
                </div>

                <div className="mockup-footer">
                  <span className="mockup-cta-hint">
                    <i className="fa-solid fa-arrow-up-right-from-square" /> Explorar Suite Interactiva en Vivo
                  </span>
                  <span className="mockup-code">PIN: 8942</span>
                </div>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
