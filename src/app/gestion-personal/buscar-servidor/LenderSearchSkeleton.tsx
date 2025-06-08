import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./LenderSearchSkeleton.css"

export function LenderSearchSkeleton() {
  return (
    <div className="lender-skeleton-container">
      {/* Cabecera */}
      <div className="lender-skeleton-header">
        <div className="card"><Skeleton circle width={80} height={80} /><Skeleton width={120} height={16} /><Skeleton width={80} /></div>
        <div className="card"><Skeleton count={6} height={14} style={{ marginBottom: 10 }} /></div>
        <div className="card"><Skeleton count={6} height={14} style={{ marginBottom: 10 }} /></div>
      </div>

      {/* Resumen descuentos */}
      <div className="lender-skeleton-bottom">
        <div className="limit-box"><Skeleton height={120} /></div>
        <div className="contract-table-box">
          <Skeleton height={24} width={180} style={{ marginBottom: 8 }} />
          <Skeleton height={36} count={6} />
        </div>
      </div>
    </div>
  )
}
