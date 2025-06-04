// simulacion/components/formularioSolicitudSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SimuladorCreditoSkeleton = () => {
  return (
    <div className="simulador-contenedor">
      <div className="simulador-form1">
        <div className="simulador-form">
          <h2 className="simulador-title">
            <Skeleton width={180} />
          </h2>

          <label className="simulador-label">
            <Skeleton width={150} height={14} />
            <Skeleton height={36} />
          </label>

          <label className="simulador-label">
            <Skeleton width={150} height={14} />
            <Skeleton height={24} />
            <Skeleton width={90} />
          </label>

          <label className="simulador-label">
            <Skeleton width={150} height={14} />
            <Skeleton height={36} />
            <Skeleton width={120} />
          </label>

          <div style={{ marginTop: "20px" }}>
            <Skeleton height={42} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};
