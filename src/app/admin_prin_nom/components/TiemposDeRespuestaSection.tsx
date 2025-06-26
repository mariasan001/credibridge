import { memo } from "react";
import { TiempoRespuesta } from "../model/ranking-dashboard.model";
import "./TiemposDeRespuestaSection.css";
import { getEtiquetaColor } from "../utils/tags";
import { capitalize } from "../utils/text";

interface Props {
  data: TiempoRespuesta[];
}

const TiemposDeRespuestaSection = memo(function TiemposDeRespuestaSection({ data }: Props) {
  return (
    <section className="ranking-card-tiempo">
      <div className="ranking-card-header-tiempo">
        <h3>Tiempo de Respuesta</h3>
      </div>
      <div className="tabla-scroll">
        <table className="tabla-respuesta">
          <thead>
            <tr>
              <th>Tiempo de Respuesta</th>
              <th>Institución</th>
              <th>Solicitudes</th>
              <th>Expedidas</th>
              <th>Activas</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <span className={`etiqueta ${getEtiquetaColor(item.tiempoRespuesat)}`}>
                    {item.tiempoRespuesat} días
                  </span>
                </td>
                <td>{capitalize(item.financiera)}</td>
                <td>{item.solicitudes ?? 0}</td>
                <td>{item.quejas ?? 0}</td>
                <td>{item.activas ?? 0}</td>
                <td>{item.total ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});

export default TiemposDeRespuestaSection;
