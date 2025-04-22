"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export const ResumenPeriodoSkeleton = () => {
  return (
    <div className="resumen-wrapper">
      {/* Header */}
      <div className="header-resumen">
        <div>
          <Skeleton width={260} height={24} />
          <Skeleton width={300} height={16} style={{ marginTop: 8 }} />
        </div>
        <Skeleton width={180} height={36} />
      </div>

      {/* Filtros */}
      <div className="filtros-periodo">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="filtro-item">
            <Skeleton width={"60%"} height={12} />
            <Skeleton height={36} />
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="tabla-resumen">
        <div className="tabla-resumen__scroll">
          <table>
            <thead>
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i}>
                    <Skeleton width={120} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {[...Array(6)].map((_, colIdx) => (
                    <td key={colIdx}>
                      <Skeleton height={20} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
