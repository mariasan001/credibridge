import { LenderSearchResponse } from "../model/lender_search_model"
import "./PersonalInfoCard.css"

interface Props {
  data: LenderSearchResponse
}

export function PersonalInfoCard({ data }: Props) {
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
    <div className="personal-info-card">
      <h4>Datos Personales</h4>
      <div className="grid">
        <div>
          <span>Género</span><strong>{ "Sin registro"}</strong>
        </div>
        <div>
          <span>Fecha de Nacimiento</span><strong>{}</strong>
        </div>
        <div>
          <span>Número Telefónico</span><strong>{user.phone || "Sin registro"}</strong>
        </div>
        <div>
          <span>Estado Civil</span><strong>{ "Sin registro"}</strong>
        </div>
        <div>
          <span>CURP</span><strong>{user.curp}</strong>
        </div>
        <div>
          <span>RFC</span><strong>{user.rfc}</strong>
        </div>
        <div>
          <span>Madre:</span><strong>Sin Registro</strong>
        </div>
        <div>
          <span>Padre:</span><strong>Sin Registro</strong>
        </div>
      </div>
    </div>
  )
}
