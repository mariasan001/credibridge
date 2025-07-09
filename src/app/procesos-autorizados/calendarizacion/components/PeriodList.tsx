// PeriodList.tsx
import { Period } from "../models/types/period";
import "./PeriodList.css";

export const PeriodList = ({ periods, loading }: { periods: Period[]; loading: boolean }) => {
  if (loading) return <p className="loading">⏳ Cargando periodos...</p>;

  return (
    <div className="period-list">
      <h2 className="list-title">📅 Lista de Periodos Registrados</h2>
      <div className="period-scroll-wrapper">
        <div className="period-cards-horizontal">
          {periods.map((p, index) => (
            <div key={index} className="period-card">
              <div className="period-header">
                <span className="period-label">Periodo:</span>
                <span className="period-value">{p.period} / {p.year}</span>
              </div>
              <div className="period-dates">
                <span className="date-range">{formatDate(p.startDate)} ➜ {formatDate(p.endDate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
