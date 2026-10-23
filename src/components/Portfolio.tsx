'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { supabase } from '@/lib/supabase'

interface PortfolioItem {
  id: string
  category: string
  img: string
  genre: string
  title: string
  brief: string
}

// Fallback items in case no dynamic photos have been uploaded yet
const FALLBACK_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    category: 'bodas',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    genre: 'Mariage Royal',
    title: 'Célébration Palais Mirage',
    brief: 'Reportage haute couture capturant l’élégance intemporelle et les lumières dorées.',
  },
  {
    id: '2',
    category: 'retratos',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    genre: 'Portrait Éditorial',
    title: 'Série Noir & Lumière',
    brief: 'Jeux d’ombres et contrastes cinématographiques en studio privé.',
  },
  {
    id: '3',
    category: 'bodas',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    genre: 'Cérémonie Pure',
    title: 'L’Échange des Vœux',
    brief: 'Émotion brute et instant suspendu dans les jardins de la Palmeraie.',
  },
  {
    id: '4',
    category: 'intimos',
    img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85',
    genre: 'Moments Intimes',
    title: 'Douceur & Sérénité',
    brief: 'Une atmosphère feutrée célébrant la délicatesse des gestes authentiques.',
  },
]

interface DbCategory {
  id: string
  slug: string
  name: string
  name_fr?: string | null
  name_en?: string | null
  name_ar?: string | null
  display_order: number
}

interface DbMedia {
  id: string
  category_id: string
  subcategory_id?: string | null
  image_url: string
  title?: string | null
  title_fr?: string | null
  title_en?: string | null
  title_ar?: string | null
  description?: string | null
  categories?: DbCategory
}

export function Portfolio() {
  const { t, lang, isRTL } = useLanguage()
  const [filter, setFilter] = useState<string>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null)

  // Supabase dynamic state
  const [dbCategories, setDbCategories] = useState<DbCategory[]>([])
  const [dynamicItems, setDynamicItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadPortfolioData() {
      try {
        // 1. Fetch active categories
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (catError) throw catError

        // 2. Fetch category photos with category details
        const { data: mediaData, error: mediaError } = await supabase
          .from('category_media')
          .select('*, categories(*)')
          .order('display_order', { ascending: true })

        if (mediaError) throw mediaError

        if (isMounted) {
          if (catData && catData.length > 0) {
            setDbCategories(catData)
          }

          if (mediaData && mediaData.length > 0) {
            // Map into PortfolioItem structure
            const mapped: PortfolioItem[] = mediaData.map((m: any) => {
              const cat = m.categories
              const catSlug = cat ? cat.slug : 'general'

              // Localized category name
              const genreName = lang === 'FR' && cat?.name_fr ? cat.name_fr
                : lang === 'EN' && cat?.name_en ? cat.name_en
                : lang === 'AR' && cat?.name_ar ? cat.name_ar
                : cat?.name || 'Lamha Portfolio'

              // Localized title
              const photoTitle = lang === 'FR' && m.title_fr ? m.title_fr
                : lang === 'EN' && m.title_en ? m.title_en
                : lang === 'AR' && m.title_ar ? m.title_ar
                : m.title || genreName

              return {
                id: m.id,
                category: catSlug,
                img: m.image_url,
                genre: genreName,
                title: photoTitle,
                brief: m.description || '',
              }
            })

            setDynamicItems(mapped)
          }
        }
      } catch (err) {
        console.warn('Portfolio Supabase load note (using fallback):', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadPortfolioData()

    return () => {
      isMounted = false
    }
  }, [lang])

  // Determine active item list: use Supabase items if available, otherwise fallback
  const itemsToDisplay = useMemo(() => {
    return dynamicItems.length > 0 ? dynamicItems : FALLBACK_ITEMS
  }, [dynamicItems])

  // Filter items
  const filteredItems = useMemo(() => {
    if (filter === 'all') return itemsToDisplay
    return itemsToDisplay.filter((item) => item.category === filter)
  }, [itemsToDisplay, filter])

  // Dynamic filter buttons
  const filterCategories = useMemo(() => {
    if (dynamicItems.length > 0 && dbCategories.length > 0) {
      return dbCategories.filter(cat => 
        dynamicItems.some(item => item.category === cat.slug)
      )
    }
    return null
  }, [dynamicItems, dbCategories])

  return (
    <section className="luxury-section portfolio-section" id="portfolio">
      <div className="container">

        <div className="portfolio-head-wrap reveal-on-scroll" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="section-tag-gold">
            <span>{t('port_tag')}</span>
            <span className="arabic-tag">الأعمال المختارة</span>
          </div>
          <h2 className="editorial-heading-lg">{t('port_heading')}</h2>
          <p className="portfolio-lead">{t('port_lead')}</p>

          <div className="portfolio-filters-bar flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              className={`folio-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {t('filter_all')}
            </button>

            {filterCategories ? (
              filterCategories.map((cat) => {
                const label = lang === 'FR' && cat.name_fr ? cat.name_fr
                  : lang === 'EN' && cat.name_en ? cat.name_en
                  : lang === 'AR' && cat.name_ar ? cat.name_ar
                  : cat.name

                return (
                  <button
                    key={cat.slug}
                    type="button"
                    className={`folio-filter-btn ${filter === cat.slug ? 'active' : ''}`}
                    onClick={() => setFilter(cat.slug)}
                  >
                    {label}
                  </button>
                )
              })
            ) : (
              <>
                <button
                  type="button"
                  className={`folio-filter-btn ${filter === 'bodas' ? 'active' : ''}`}
                  onClick={() => setFilter('bodas')}
                >
                  {t('filter_bodas')}
                </button>
                <button
                  type="button"
                  className={`folio-filter-btn ${filter === 'retratos' ? 'active' : ''}`}
                  onClick={() => setFilter('retratos')}
                >
                  {t('filter_retratos')}
                </button>
                <button
                  type="button"
                  className={`folio-filter-btn ${filter === 'intimos' ? 'active' : ''}`}
                  onClick={() => setFilter('intimos')}
                >
                  {t('filter_intimos')}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="portfolio-exhibition-grid" id="portfolioGrid" dir={isRTL ? 'rtl' : 'ltr'}>
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="folio-exhibit-card reveal-on-scroll cursor-pointer"
              onClick={() => setSelectedPhoto(item)}
            >
              <div className="exhibit-img-wrap" style={{ position: 'relative' }}>
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="exhibit-hover-veil">
                  <span className="veil-btn">
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                    <span>{t('view_reportage')}</span>
                  </span>
                </div>
              </div>
              <div className="exhibit-meta">
                <span className="exhibit-genre">{item.genre}</span>
                <h3 className="exhibit-title">{item.title}</h3>
                {item.brief && <p className="exhibit-brief">{item.brief}</p>}
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[99999] bg-[#080706]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 end-6 text-[#fbfaf8] hover:text-[#C69F68] text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition-colors z-10 cursor-pointer"
            aria-label="Cerrar vista previa"
          >
            <i className="fa-solid fa-xmark" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] max-h-[75vh] flex items-center justify-center rounded-lg overflow-hidden border border-[#C69F68]/30 shadow-2xl bg-black/40">
              <Image
                src={selectedPhoto.img}
                alt={selectedPhoto.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center mt-4 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#C69F68] block mb-1">
                {selectedPhoto.genre}
              </span>
              <h4 className="font-title text-xl text-[#fbfaf8]">
                {selectedPhoto.title}
              </h4>
              {selectedPhoto.brief && (
                <p className="text-xs text-[#a89f91] mt-1">
                  {selectedPhoto.brief}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
