import { memo } from "react";
import { ResumenDashboard } from "../model/ranking-dashboard.model";
import "./ResumenSection.css";
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Props {
  resumen: ResumenDashboard;
}

const ResumenSection = memo(function ResumenSection({ resumen }: Props) {
  const cards = [
    {
      label: "Total",
      value: resumen.totalIncidencias,
      icon: <AlertCircle size={24} />,
      diff: "+5",
      description: "Total de incidencias registradas",
    },
    {
      label: "Activas",
      value: resumen.activas,
      icon: <Clock size={24} />,
      diff: "+2",
      description: "Incidencias en seguimiento",
    },
    {
      label: "Expiradas",
      value: resumen.expiradas,
      icon: <TrendingUp size={24} />,
      diff: "-1",
      description: "No resueltas a tiempo",
    },
    {
      label: "Atendidas",
      value: resumen.atendidas,
      icon: <CheckCircle size={24} />,
      diff: "+4",
      description: "Incidencias resueltas",
    },
  ];

  return (
    <section className="resumen-section">
      <div className="resumen-grid">
        {cards.map((card) => (
          <div className="resumen-card" key={card.label}>
            <div className="resumen-card-header">
              <span className="resumen-icon">{card.icon}</span>
              <span className="resumen-label">{card.label}</span>
            </div>
            <div className="resumen-number">
              {card.value}
              <span className={`resumen-diff ${card.diff.startsWith("+") ? "up" : "down"}`}>
                {card.diff}
              </span>
            </div>
            <div className="resumen-description">{card.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default ResumenSection;
