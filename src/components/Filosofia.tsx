'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export function Filosofia() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="luxury-section manifest-section" id="filosofia">
      <div className="container">
        <div className="manifesto-grid" dir={isRTL ? 'rtl' : 'ltr'}>

          {/* Columna de Imágenes */}
          <div className="manifesto-imagery-col reveal-on-scroll">
            <div className="image-frame-luxury portrait-tall" style={{ position: 'relative' }}>
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85"
                alt="Retrato editorial Lamha"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="parallax-img object-cover"
              />
              <div className="frame-tag">PORTRAIT D&apos;AUTEUR</div>
            </div>

            <div className="image-frame-luxury secondary-floating" style={{ position: 'relative' }}>
              <Image
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85"
                alt="Alianzas y lino"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Columna de Texto */}
          <div className="manifesto-text-col reveal-on-scroll">
            <div className="section-tag-gold">
              <span>{t('manifest_tag')}</span>
              <span className="arabic-tag">تخليد ذكرياتك في لمحة</span>
            </div>

            <h2 className="editorial-heading">
              {t('manifest_quote')}
            </h2>

            <div className="manifesto-prose">
              <p>{t('manifest_p1')}</p>
              <p>{t('manifest_p2')}</p>
            </div>

            <div className="curator-signature-block">
              <div className="author-details">
                <span className="author-name">Afaf Elaribi</span>
                <span className="author-role">{t('manifest_role')}</span>
              </div>
              <span className="arabic-calligraphy">عفاف العريبي</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
