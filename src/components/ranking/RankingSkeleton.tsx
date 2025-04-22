"use client" // Indica que este componente debe renderizarse en el cliente

// Importa el componente Skeleton para mostrar placeholders mientras se cargan los datos
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css" // Estilos base para los Skeletons

// Componente que muestra la UI en estado de carga
export const RankingSkeleton = () => {
  return (
    <>
      {/* Título principal del ranking */}
      <h1 className="ranking__title">
        <Skeleton width={280} height={32} /> {/* Skeleton con tamaño de título */}
      </h1>

      {/* Subtítulo de introducción */}
      <p className="ranking__subtitle">
        <Skeleton width={340} height={20} /> {/* Skeleton con tamaño de subtítulo */}
      </p>

      {/* === Tarjetas resumen (Total, Expiradas, etc) === */}
      <div className="summary-cards-container">
        {Array(4).fill(null).map((_, i) => (
          <div key={i} style={{ padding: "16px" }}>
            <Skeleton height={60} /> {/* Skeleton rectangular para cada tarjeta */}
          </div>
        ))}
      </div>

      {/* === Gráfico + Tarjeta de incidencias === */}
      <div className="ranking__row">
        {/* Gráfico de líneas */}
        <div className="ranking__main-chart">
          <Skeleton height={260} /> {/* Placeholder de la gráfica */}
        </div>

        {/* Tarjeta lateral de incidencias por institución */}
        <div className="ranking__side-widget">
          <Skeleton height={260} /> {/* Placeholder lateral */}
        </div>
      </div>

      {/* === Tabla + Formulario de reporte === */}
      <div className="ranking__row ranking__bottom-section">
        {/* Tabla de tiempo de respuesta */}
        <div className="ranking__main-chart">
          <Skeleton height={400} /> {/* Placeholder de la tabla */}
        </div>

        {/* Formulario lateral de reporte */}
        <div className="ranking__side-widget">
          <Skeleton height={400} /> {/* Placeholder del formulario */}
        </div>
      </div>
    </>
  )
}
