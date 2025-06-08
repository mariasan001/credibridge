import { LenderSearchResponse } from "../model/lender_search_model"
import "./LaborInfoCard.css"

interface Props {
  data: LenderSearchResponse
}

export function LaborInfoCard({ data }: Props) {
  const { user } = data

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Sin registro"
    const fecha = new Date(dateStr)
    return fecha.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="labor-info-card">
      <h4>Datos Laborales</h4>
      <div className="grid">
        <div>
          <span>Número del empleado</span>
          <strong>{user.userId}</strong>
        </div>
        <div>
          <span>Dependencia</span>
          <strong>{user.workUnit?.desc || "Sin registro"}</strong>
        </div>
        <div>
          <span>Nómina</span>
          <strong>Gobierno Estado de México</strong>
        </div>
        <div>
          <span>Puesto Actual</span>
          <strong className="puesto">{user.jobCode?.desc || "Sin registro"}</strong>
        </div>
        <div>
          <span>Institución</span>
          <strong>{user.bank ? `${user.bank.id} – ${user.bank.desc}` : "Sin registro"}</strong>
        </div>
        <div>
          <span>Situación</span>
          <strong className="status-label">{user.positionStatus?.desc}</strong>
        </div>
        <div>
          <span>Fecha de ingreso</span>
          <strong>{formatDate(user.occupationDate)}</strong>
        </div>
        <div className="status-label">
          <div>
            <span>Cuenta</span>
            <strong>{user.idSs || "Sin registro"}</strong>
          </div>
          <button className="verificar-btn">verificar</button>
        </div>
      </div>
    </div>
  )
}
