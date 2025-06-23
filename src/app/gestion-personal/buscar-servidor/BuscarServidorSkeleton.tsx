import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./BuscarServidorSkeleton.css";

export default function BuscarServidorSkeleton() {
  return (
    <div className="buscar-servidor-skeleton">
      <div className="buscar-header">
        <Skeleton width={280} height={24} />
        <Skeleton width={400} height={16} />
      </div>

      <div className="buscar-form">
        <Skeleton height={44} width={"100%"} />
      </div>

      <div className="buscar-resultado">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div className="buscar-card-skeleton" key={idx}>
            <Skeleton width={180} height={18} />
            <Skeleton width={`60%`} height={12} style={{ marginTop: 8 }} />
            <Skeleton width={`40%`} height={12} style={{ marginTop: 4 }} />
            <Skeleton width={`80%`} height={12} style={{ marginTop: 4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
