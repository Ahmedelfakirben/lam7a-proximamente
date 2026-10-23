'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { submitInquiry } from '@/lib/supabase'

export function Contacto() {
  const { t, isRTL } = useLanguage()

  const [formData, setFormData] = useState({
    names: '',
    phone: '',
    category: '',
    date_location: '',
    details: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await submitInquiry(formData)
      setSubmitted(true)
      setFormData({
        names: '',
        phone: '',
        category: '',
        date_location: '',
        details: '',
      })
      setTimeout(() => setSubmitted(false), 7000)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="luxury-section contact-section" id="contacto">
      <div className="container">
        <div className="contact-box-luxury reveal-on-scroll">

          {/* Columna Izquierda: Información Directa */}
          <div className="contact-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="section-tag-gold">
              <span>{t('ct_tag')}</span>
              <span className="arabic-tag">الحجز والاستفسار</span>
            </div>

            <h2 className="editorial-heading">{t('ct_heading')}</h2>

            <p className="contact-p">
              {t('ct_lead')}
            </p>

            <div className="direct-lines">
              <a href="https://wa.me/212762517478" target="_blank" rel="noopener noreferrer" className="direct-link">
                <i className="fa-brands fa-whatsapp" />
                <div>
                  <strong>{t('ct_wa_title')}</strong>
                  <span>{t('ct_wa_sub')} • (+212) 0762517478</span>
                </div>
              </a>

              <a href="https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6" target="_blank" rel="noopener noreferrer" className="direct-link">
                <i className="fa-brands fa-instagram" />
                <div>
                  <strong>Instagram @lam7a.studios</strong>
                  <span>Portafolio en directo y novedades</span>
                </div>
              </a>

              <a href="mailto:Lamha@afafelaribi.com" className="direct-link">
                <i className="fa-regular fa-envelope" />
                <div>
                  <strong>{t('ct_mail_title')}</strong>
                  <span>Lamha@afafelaribi.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="contact-right" dir={isRTL ? 'rtl' : 'ltr'}>
            {submitted && (
              <div
                style={{
                  background: '#ecfdf5',
                  border: '1px solid #10b981',
                  color: '#065f46',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                }}
              >
                <i className="fa-solid fa-circle-check" style={{ marginRight: '8px' }} />
                <span>{t('form_success')}</span>
              </div>
            )}

            <form className="luxury-form" onSubmit={handleSubmit}>
              <div className="form-row-duo">
                <div className="form-field">
                  <label>{t('lbl_names')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('ph_names')}
                    value={formData.names}
                    onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>{t('lbl_phone')}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+212 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-duo">
                <div className="form-field">
                  <label>{t('lbl_type')}</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="" disabled>
                      {t('opt_select')}
                    </option>
                    <option value="event">{t('opt_event')}</option>
                    <option value="newborn">{t('opt_newborn')}</option>
                    <option value="product">{t('opt_product')}</option>
                    <option value="birthday">{t('opt_birthday')}</option>
                    <option value="set_box">{t('opt_set')}</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>{t('lbl_date_loc')}</label>
                  <input
                    type="text"
                    placeholder={t('ph_date_loc')}
                    value={formData.date_location}
                    onChange={(e) => setFormData({ ...formData, date_location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>{t('lbl_details')}</label>
                <textarea
                  rows={4}
                  placeholder={t('ph_details')}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>

              <button type="submit" disabled={submitting} className="btn-luxury-primary full-width">
                <span>{submitting ? 'Enviando...' : t('btn_submit')}</span>
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
