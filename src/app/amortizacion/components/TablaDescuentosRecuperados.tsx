import "./TablaDescuentosRecuperados.css";
import { ActualPayment } from "../model/amortization_model";

interface Props {
  descuentos: ActualPayment[];
}

export default function TablaDescuentosRecuperados({ descuentos }: Props) {
  return (
    <div className="tabla-scroll">
      <div className="tabla-descuentos-wrapper">
        <div className="tabla-descuentos-header">
          <h4>Descuentos Recuperados</h4>
          <button title="Descargar" className="icon-btn-descargar">⬇</button>
        </div>

        <div className="tabla-descuentos-scroll">
          <table className="tabla-descuentos">
            <thead>
              <tr>
                <th>Nomina</th>
                <th>Periodo</th>
                <th>Clave</th>
                <th>Estatus</th>
                <th>Valor desc</th>
              </tr>
            </thead>
            <tbody>
              {descuentos.map((desc, index) => (
                <tr key={`${desc.creditId}-${index}`}>
                  <td>Gobierno Estado de México</td>
                  <td>{desc.period}</td>
                  <td>{desc.creditId}</td>
                  <td>{getEstatus(desc)}</td>
                  <td>
                    {desc.paymentAmount > 0
                      ? `$${desc.paymentAmount.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
}

// Lógica para mostrar el estatus de forma legible
function getEstatus(desc: ActualPayment) {
  return desc.paymentAmount > 0 ? "Cuota decontada" : "Cheque cancelado";
}
