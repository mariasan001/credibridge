import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DashboardSkeleton.css";

export default function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">
      <div className="header-skeleton">
        <Skeleton width={240} height={24} />
        <Skeleton width={400} height={16} />
      </div>

      <div className="cards-skeleton">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div className="card-skeleton" key={idx}>
            <Skeleton height={18} width={80} />
            <Skeleton height={30} width={40} style={{ marginTop: 8 }} />
            <Skeleton height={14} width={100} style={{ marginTop: 8 }} />
          </div>
        ))}
      </div>

      <div className="bottom-skeleton">
        <div className="chart-skeleton">
          <Skeleton height={240} />
        </div>

        <div className="list-skeleton">
          <div className="list-header">
            <Skeleton width={180} height={20} />
            <Skeleton width={90} height={30} />
          </div>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div className="list-item-skeleton" key={idx}>
              <Skeleton width={`100%`} height={12} />
              <Skeleton width={`${60 + Math.random() * 30}%`} height={6} style={{ marginTop: 8 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
