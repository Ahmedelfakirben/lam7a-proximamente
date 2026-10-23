'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

interface BoxSet {
  id: string
  number: string
  icon: string
  img: string
  titleKey: 'box1_title' | 'box2_title' | 'box3_title' | 'box4_title' | 'box5_title' | 'box6_title' | 'box7_title' | 'box8_title' | 'box9_title'
  descKey: 'box1_desc' | 'box2_desc' | 'box3_desc' | 'box4_desc' | 'box5_desc' | 'box6_desc' | 'box7_desc' | 'box8_desc' | 'box9_desc'
}

const BOXES: BoxSet[] = [
  {
    id: 'box-1',
    number: 'BOX 01',
    icon: 'fa-wand-magic-sparkles',
    img: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box1_title',
    descKey: 'box1_desc',
  },
  {
    id: 'box-2',
    number: 'BOX 02',
    icon: 'fa-user-graduate',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box2_title',
    descKey: 'box2_desc',
  },
  {
    id: 'box-3',
    number: 'BOX 03',
    icon: 'fa-compass',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box3_title',
    descKey: 'box3_desc',
  },
  {
    id: 'box-4',
    number: 'BOX 04',
    icon: 'fa-archway',
    img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box4_title',
    descKey: 'box4_desc',
  },
  {
    id: 'box-5',
    number: 'BOX 05',
    icon: 'fa-baby',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box5_title',
    descKey: 'box5_desc',
  },
  {
    id: 'box-6',
    number: 'BOX 06',
    icon: 'fa-crown',
    img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box6_title',
    descKey: 'box6_desc',
  },
  {
    id: 'box-7',
    number: 'BOX 07',
    icon: 'fa-user-astronaut',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box7_title',
    descKey: 'box7_desc',
  },
  {
    id: 'box-8',
    number: 'BOX 08',
    icon: 'fa-moon',
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box8_title',
    descKey: 'box8_desc',
  },
  {
    id: 'box-9',
    number: 'BOX 09',
    icon: 'fa-candy-cane',
    img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=800&q=85',
    titleKey: 'box9_title',
    descKey: 'box9_desc',
  },
]

export function Escenarios() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="luxury-section theme-boxes-section" id="tematicas">
      <div className="container">

        <div className="section-center-head reveal-on-scroll" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="section-tag-gold">
            <span>{t('theme_tag')}</span>
            <span className="arabic-tag">الديكورات الخاصة</span>
          </div>
          <h2 className="editorial-heading-lg" style={{ color: '#FAF9F7' }}>
            {t('theme_heading')}
          </h2>
          <p className="section-lead-center" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {t('theme_lead')}
          </p>
        </div>

        <div className="theme-boxes-grid" dir={isRTL ? 'rtl' : 'ltr'}>
          {BOXES.map((box) => (
            <article key={box.id} className="theme-box-card reveal-on-scroll">
              <div className="theme-box-img-wrap" style={{ position: 'relative' }}>
                <span className="theme-box-number-badge">{box.number}</span>
                <div className="theme-box-icon-badge">
                  <i className={`fa-solid ${box.icon}`} />
                </div>
                <Image
                  src={box.img}
                  alt={t(box.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="theme-box-content">
                <div className="theme-box-header">
                  <h3>{t(box.titleKey)}</h3>
                  <p className="theme-box-desc">{t(box.descKey)}</p>
                </div>

                <div className="theme-box-footer">
                  <a href="#contacto" className="btn-theme-reserve">
                    <span>{t('btn_reserve_set')}</span>
                    <i className={`fa-solid ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}`} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
