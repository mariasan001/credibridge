import { IncidenciasPorInstitucion } from "../model/ranking-dashboard.model";
import "./IncidenciasPorInstitucionSection.css";

interface Props {
  data: IncidenciasPorInstitucion[];
}

export default function IncidenciasPorInstitucionSection({ data }: Props) {
  const maxValor = Math.max(...data.map((d) => d.incidencias7d));

  const capitalizar = (texto: string) =>
    texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

  return (
    <section className="simple-ranking-card">
      <div className="ranking-header">
        <h3>Incidencias por Institución</h3>
        <select>
          <option>7 días</option>
          <option>30 días</option>
        </select>
      </div>

      <ul className="ranking-list">
        {data.map((item, index) => {
          const porcentaje = (item.incidencias7d / maxValor) * 100;
          const isTop = item.incidencias7d === maxValor;

          return (
            <li key={index} className="ranking-item">
              <div className="ranking-label">
                <span>{capitalizar(item.institucion)}</span>
                <span className="ranking-count">{item.incidencias7d}</span>
              </div>
              <div className="ranking-bar">
                <div
                  className={`ranking-fill ${isTop ? "top" : ""}`}
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
