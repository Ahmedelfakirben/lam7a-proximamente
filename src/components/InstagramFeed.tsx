'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const INSTA_POSTS = [
  { id: 'p1', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85', url: 'https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6' },
  { id: 'p2', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=85', url: 'https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6' },
  { id: 'p3', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85', url: 'https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6' },
  { id: 'p4', img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=85', url: 'https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6' },
  { id: 'p5', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=85', url: 'https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6' },
  { id: 'p6', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=85', url: 'https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6' },
]

export function InstagramFeed() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="luxury-section instagram-feed-section" id="instagram">
      <div className="container">

        <div className="insta-header-center reveal-on-scroll" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="section-tag-gold">
            <span>{t('insta_tag')}</span>
            <span className="arabic-tag">إنستغرام الرئيسي</span>
          </div>
          <h2 className="editorial-heading-lg">{t('insta_heading')}</h2>
          <p className="section-lead-center">{t('insta_lead')}</p>

          <a
            href="https://www.instagram.com/lam7a.studios?stkn=emJlcGp2ZnBiNDR6"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-account-pill"
          >
            <i className="fa-brands fa-instagram" />
            <span>{t('insta_btn')}</span>
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem', marginInlineStart: '4px' }} />
          </a>
        </div>

        <div className="insta-grid-container reveal-on-scroll">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-card"
              style={{ position: 'relative' }}
            >
              <Image
                src={post.img}
                alt="Instagram @lam7a.studios"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover"
              />
              <div className="insta-card-overlay">
                <i className="fa-brands fa-instagram" />
                <span className="insta-card-tag">{t('insta_card_text')}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
