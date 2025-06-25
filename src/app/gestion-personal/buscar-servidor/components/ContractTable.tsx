import { useState } from "react"
import { LenderSearchResponse } from "../model/lender_search_model"
import { Usuario } from "@/model/usuario.models"
import { HandCoins, ShieldCheck, HelpCircle } from "lucide-react"
import { ContratoModal } from "./ContratoModal"
import { DetalleContratoModal } from "./DetalleContratoModal"
import "./ContractTable.css"
import { formatCurrency, formatDate } from "../utils/formatters"

interface Props {
  data: LenderSearchResponse
  usuarioActual: Usuario
}

export function ContractTable({ data, usuarioActual }: Props) {
  const [mostrarTabla, setMostrarTabla] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false)
  const [contratoSeleccionado, setContratoSeleccionado] = useState<any | null>(null)

  const contracts = data.contracts

  const getIcon = (type: string) => {
    const tipoClase = type.toLowerCase()
    switch (tipoClase) {
      case "préstamo": return <HandCoins size={18} className={tipoClase} />
      case "seguro": return <ShieldCheck size={18} className={tipoClase} />
      default: return <HelpCircle size={18} className="otro" />
    }
  }

  const handleCompraDeudaClick = () => {
    const contrato = contracts[0]
    setContratoSeleccionado(contrato)
    setMostrarModal(true)
  }

  const handleModalClose = (exito?: boolean) => {
    setMostrarModal(false)
    setContratoSeleccionado(null)
    if (exito) setMostrarTabla(true)
  }

  const handleDetalleModalClose = (exito?: boolean) => {
    setMostrarModalDetalle(false)
    setContratoSeleccionado(null)
    if (exito) setMostrarTabla(true)
  }

  const handleRowClick = (contrato: any) => {
    setContratoSeleccionado(contrato)
    setMostrarModalDetalle(true)
  }

  return (
    <div className="contract-table-container">
      {/* Modal de Compra de Deuda (inicial) */}
      {mostrarModal && contratoSeleccionado && (
        <ContratoModal
          contrato={contratoSeleccionado}
          usuarioActual={usuarioActual}
          onClose={handleModalClose}
        />
      )}

      {/* Modal Detalle de Contrato (clic en cualquier fila) */}
      {mostrarModalDetalle && contratoSeleccionado && (
        <DetalleContratoModal
          contrato={contratoSeleccionado}
          onClose={handleDetalleModalClose}
        />
      )}

      {/* Botón inicial */}
      {!mostrarTabla && (
        <div className="overlay-inside">
          <button className="btn-compra-deuda" onClick={handleCompraDeudaClick}>
            Compra de deuda
          </button>
        </div>
      )}

      {/* Tabla */}
      <div className={`table-blur-wrapper ${!mostrarTabla ? "blurred" : ""}`}>
        <h4>Detalle de Contratos</h4>
        <table className="contract-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Financiera</th>
              <th>Estatus</th>
              <th>Folio</th>
              <th>Plazos</th>
              <th>Descuento Quincenal</th>
              <th>Monto</th>
              <th>Tasa Efectiva</th>
              <th>Tasa Anual</th>
              <th>Último Pago</th>
              <th>Monto Último Pago</th>
              <th>Próximo Pago</th>
              <th>Monto Próximo Pago</th>
              <th>Saldo Anterior</th>
              <th>Nuevo Saldo</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => {
              const tipo = c.lenderService?.serviceType?.serviceTypeDesc || "N/A"
              const financiera = c.lender?.lenderName || "N/A"
              const estatus = c.contractStatus?.contractStatusDesc || "N/A"

              return (
                <tr
                  key={c.contractId}
                  className="clickable-row"
                  onClick={() => handleRowClick(c)}
                >
                  <td className="icon-cell">{getIcon(tipo)} {tipo}</td>
                  <td>{financiera}</td>
                  <td><span className={`estatus ${estatus.toLowerCase()}`}>{estatus}</span></td>
                  <td>{c.contractId}</td>
                  <td>{c.installments}</td>
                  <td>{formatCurrency(c.biweeklyDiscount)}</td>
                  <td>{formatCurrency(c.amount)}</td>
                  <td>{c.effectiveRate ?? "N/A"}%</td>
                  <td>{c.anualRate ?? "N/A"}%</td>
                  <td>{formatDate(c.lastPayment?.date || null)}</td>
                  <td>{formatCurrency(c.lastPayment?.amount || null)}</td>
                  <td>{formatDate(c.nextPayment?.date || null)}</td>
                  <td>{formatCurrency(c.nextPayment?.amount || null)}</td>
                  <td>{formatCurrency(c.lastBalance)}</td>
                  <td>{formatCurrency(c.newBalance)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
