'use client'

import { useLanguage } from '@/context/LanguageContext'

interface Step {
  num: string
  icon: string
  titleKey: 'step1_title' | 'step2_title' | 'step3_title' | 'step4_title'
  descKey: 'step1_desc' | 'step2_desc' | 'step3_desc' | 'step4_desc'
}

const STEPS: Step[] = [
  { num: '01', icon: 'fa-comments', titleKey: 'step1_title', descKey: 'step1_desc' },
  { num: '02', icon: 'fa-camera-retro', titleKey: 'step2_title', descKey: 'step2_desc' },
  { num: '03', icon: 'fa-gem', titleKey: 'step3_title', descKey: 'step3_desc' },
  { num: '04', icon: 'fa-box-archive', titleKey: 'step4_title', descKey: 'step4_desc' },
]

export function Protocolo() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="luxury-section process-section" id="proceso">
      <div className="container" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="section-tag-gold reveal-on-scroll">
          <span>{t('proc_tag')}</span>
          <span className="arabic-tag">مسار الرحلة</span>
        </div>

        <h2 className="editorial-heading-lg reveal-on-scroll">
          {t('proc_heading')}
        </h2>

        <div className="process-steps-grid">
          {STEPS.map((step) => (
            <div key={step.num} className="process-card reveal-on-scroll">
              <span className="step-num">{step.num}</span>
              <div className="step-icon-wrap">
                <i className={`fa-solid ${step.icon}`} />
              </div>
              <h3 className="step-title">{t(step.titleKey)}</h3>
              <p className="step-desc">{t(step.descKey)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
