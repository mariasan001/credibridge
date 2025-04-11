// components/dashboard/InicioSkeleton.tsx
import Skeleton from 'react-loading-skeleton'

export const InicioSkeleton = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-header">
          <Skeleton width={200} height={28} />
          <Skeleton width={320} height={20} />
        </div>

        <div className="summary-cards-container">
          {Array(4).fill(0).map((_, idx) => (
            <div className="summary-card" key={idx}>
              <Skeleton width={60} height={30} />
              <Skeleton width={`80%`} />
            </div>
          ))}
        </div>

        <div className="ranking-chart">
          <Skeleton height={260} />
        </div>
      </div>

      <aside className="dashboard-news">
        <h3 className="news-title"><Skeleton width={160} /></h3>
        {[...Array(2)].map((_, i) => (
          <div className="news-card" key={i}>
            <Skeleton width={90} height={14} />
            <Skeleton width={60} height={16} style={{ marginBottom: 8 }} />
            <Skeleton count={3} />
          </div>
        ))}
      </aside>
    </div>
  )
}
