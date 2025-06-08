import { LenderSearchResponse } from "../model/lender_search_model"
import "./ContractTable.css"
import { HandCoins, ShieldCheck, HelpCircle } from "lucide-react"

interface Props {
  data: LenderSearchResponse
}

export function ContractTable({ data }: Props) {
  const contracts = data.contracts

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "préstamo":
        return <HandCoins size={18} />
      case "seguro":
        return <ShieldCheck size={18} />
      default:
        return <HelpCircle size={18} />
    }
  }

  return (
    <div className="contract-table">
      <h4>Descuentos Activos</h4>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Estatus</th>
            <th>Último pago</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => {
            const tipo = c.lenderService?.serviceType?.serviceTypeDesc || "N/A"
            const financiera = c.lender?.lenderName || "N/A"
            const estatus = c.contractStatus?.contractStatusDesc || "N/A"
            const fecha = c.lastPayment?.date
              ? new Date(c.lastPayment.date).toLocaleDateString("es-MX")
              : "Sin fecha"
            const monto = c.lastPayment?.amount?.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
              minimumFractionDigits: 2
            }) || "$0.00"

            return (
              <tr key={c.contractId}>
                <td className="contract-type">
                  <div className="icon-wrapper">{getIcon(tipo)}</div>
                  <div className="contract-info">
                    <div className="title">{tipo}</div>
                    <div className="desc">{financiera}</div>
                  </div>
                </td>
                <td>
                  <span className={`estatus ${estatus.toLowerCase()}`}>
                    {estatus}
                  </span>
                </td>
                <td>{fecha}</td>
                <td>{monto}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
