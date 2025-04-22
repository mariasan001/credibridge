// components/buscar-servidor/BuscarServidorSkeleton.tsx
'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const BuscarServidorSkeleton = () => {
  return (
    <section className="search-container">
      <div className="search-header-top">
        <div className="search-header-texts">
          <Skeleton width={260} height={30} />
          <Skeleton width={450} height={18} />
        </div>
        <Skeleton width={160} height={38} />
      </div>

      <div className="search-header__row" style={{ marginTop: '1rem' }}>
        <Skeleton width={300} height={38} />
        <Skeleton width={500} height={38} />
      </div>

      <div className="search-cards-grid" style={{ marginTop: '2rem' }}>
        {[...Array(3)].map((_, i) => (
          <div className="info-card" key={i}>
            <Skeleton height={200} />
          </div>
        ))}
      </div>

      <div className="contract-section-row" style={{ marginTop: '2rem', display: 'flex', gap: 'var(--spacing-lg)' }}>
        <div style={{ flex: '1' }}>
          <Skeleton height={160} />
        </div>
        <div style={{ flex: '2' }}>
          <Skeleton height={300} />
        </div>
      </div>
    </section>
  )
}
