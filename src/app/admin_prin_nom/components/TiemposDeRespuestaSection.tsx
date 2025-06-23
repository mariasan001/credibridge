import { TiempoRespuesta } from "../model/ranking-dashboard.model";
import "./TiemposDeRespuestaSection.css";

interface Props {
  data: TiempoRespuesta[];
}

export default function TiemposDeRespuestaSection({ data }: Props) {
  const getEtiquetaColor = (dias: number) => {
    if (dias <= 2) return "etiqueta-verde";
    if (dias <= 6) return "etiqueta-amarilla";
    return "etiqueta-roja";
  };

  const capitalizar = (texto: string) =>
    texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

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
                <td>{capitalizar(item.financiera)}</td>
                <td>{item.solicitudes}</td>
                <td>{item.quejas}</td>
                <td>{item.activas}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
