import "./TablaAmortizacion.css";
import { SimulatedPayment } from "../model/amortization_model";

interface Props {
  pagos: SimulatedPayment[];
  cuota: number;
  totalCuotas: number;
  frecuenciaPago: string;
  tasaIVA: number;
  tasaAnual: number;
}
/**

 */
export default function TablaAmortizacion({
  pagos,
  cuota,
  totalCuotas,
  frecuenciaPago,
  tasaIVA,
  tasaAnual
}: Props) {
  return (
    <div className="tabla-amortizacion-wrapper">
      <div className="tabla-header">
        <p>Tabla de amortización - <strong>Saldos insolutos</strong> (sin pro)</p>
        <span className="cuotas-info">
          <strong>{pagos.length}</strong> Quotas de <strong>{totalCuotas}</strong>
        </span>
      </div>



      <div className="tabla-scroll">
        <table className="tabla-amortizacion">
          <thead>
            <tr>
              <th>Quota</th>
              <th>Saldo insoluto</th>
              <th>Amortización</th>
              <th>Intereses</th>
              <th>IVA</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago, index) => (
              <tr key={index} className={index === pagos.length - 1 ? "ultima-cuota" : ""}>
                
                <td>{pago.installmentNumber}</td>
                <td>${pago.outstandingBalance.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
                <td>${pago.amortization.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
                <td>${pago.interest.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
                <td>${pago.iva.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
                <td>${pago.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
