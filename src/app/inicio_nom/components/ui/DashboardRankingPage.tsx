import { useEffect, useState } from "react";
import { ContractsDashboardResponse } from "../../model/contractsDashboard.model";
import { getContractsDashboard } from "../../service/contractsDashboard.service";

export default function DashboardRankingPage() {
  const [data, setData] = useState<ContractsDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContractsDashboard()
      .then((res) => setData(res))
      .catch((err) => console.error("Error al obtener dashboard:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
  <div>
  <h2>Dashboard Contratos</h2>

  <h3>Préstamos por Financiera</h3>
  <table>
    <thead>
      <tr>
        <th>Financiera</th>
        <th>Cantidad</th>
      </tr>
    </thead>
    <tbody>
      {data?.prestamosPorFinanciera.map((item, index) => (
        <tr key={index}>
          <td>{item.financiera}</td>
          <td>{item.cantidadPrestamo.toLocaleString("es-MX")}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <h3>📅 Contratos por Mes</h3>
  <table>
    <thead>
      <tr>
        <th>Mes</th>
        <th>Estatus</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {data?.contratosPorMes.map((item, index) => (
        <tr key={index}>
          <td>{item.mes}</td>
          <td>{item.estatus}</td>
          <td>{item.total.toLocaleString("es-MX")}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <h3>😠 Quejas Abiertas por Financiera</h3>
  <table>
    <thead>
      <tr>
        <th>Financiera</th>
        <th>Quejas Abiertas</th>
      </tr>
    </thead>
    <tbody>
      {data?.quejasAbiertasPorFinanciera.map((item, index) => (
        <tr key={index}>
          <td>{item.financiera}</td>
          <td>{item.quejasAbiertas}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
