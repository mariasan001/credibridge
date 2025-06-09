import { useEffect, useState } from "react"

import "./ResumenCards.css"
import { fetchClientPortfolioSummary } from "../service/client_portfolio_summary_service"

export function ResumenCards() {
  const [summary, setSummary] = useState({
    totalServidores: 0,
    valorSolicitado: 0,
    saldoDisponible: 0,
    contratosCorrientes: 0,
    contratosConAdeudo: 0
  })

  useEffect(() => {
    fetchClientPortfolioSummary().then(data => setSummary(data))
  }, [])

  return (
    <div className="resumen-cards">
      <div className="card neutral">
        <span>Total de servidores públicos</span>
        <strong>{summary.totalServidores.toLocaleString("es-MX")}</strong>
      </div>
      <div className="card neutral">
        <span>Valor solicitado</span>
        <strong>${summary.valorSolicitado.toLocaleString("es-MX")}</strong>
      </div>
      <div className="card neutral">
        <span>Saldo disponible</span>
        <strong>${summary.saldoDisponible.toLocaleString("es-MX")}</strong>
      </div>
      <div className="card green">
        <span>Contratos corrientes</span>
        <strong>{summary.contratosCorrientes.toLocaleString("es-MX")}</strong>
      </div>
      <div className="card red">
        <span>Contratos con adeudo</span>
        <strong>{summary.contratosConAdeudo.toLocaleString("es-MX")}</strong>
      </div>
    </div>
  )
}
