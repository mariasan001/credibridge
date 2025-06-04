import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./movimento.css"; 

export const ServicioActivoSkeleton = () => {
  return (
    <div className="servicio-card">
      <div className="servicio-header">
        <div className="servicio-icons">
          <Skeleton width={18} height={18} circle />
          <Skeleton width={18} height={18} circle />
        </div>

        <h3 className="servicio-tipo">
          <Skeleton width={120} height={24} />
        </h3>
        <p className="servicio-otorgante">
          <Skeleton width={220} />
        </p>

        <div className="servicio-monto">
          <div className="monto-grande">
            <Skeleton width={160} height={36} />
          </div>
          <p className="fecha-inicio">
            <Skeleton width={180} />
          </p>
        </div>

        <div className="servicio-plazos">
          <Skeleton width={200} height={32} />
        </div>
      </div>

      <div className="servicio-historial">
        <h4><Skeleton width={100} /></h4>

        <div className="descuento">
          <span><Skeleton width={140} /></span>
          <span><Skeleton width={80} /></span>
          <strong><Skeleton width={80} /></strong>
        </div>

        <div className="descuento">
          <span><Skeleton width={140} /></span>
          <span><Skeleton width={80} /></span>
          <strong><Skeleton width={80} /></strong>
        </div>
      </div>
    </div>
  );
};
