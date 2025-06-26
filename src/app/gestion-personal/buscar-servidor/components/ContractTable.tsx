import { useState, useMemo } from "react"
import { LenderSearchResponse } from "../model/lender_search_model"
import { Usuario } from "@/model/usuario.models"
import { ContratoModal } from "./ContratoModal"
import { DetalleContratoModal } from "./DetalleContratoModal"
import styles from "./ContractTable.module.css"
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

  const contracts = useMemo(() => data.contracts, [data])

  const rolesRestringidos = [1, 2]
  const tieneRolRestringido = usuarioActual.roles.some(rol => rolesRestringidos.includes(rol.id))

  const handleCompraDeudaClick = () => {
    const contrato = contracts[0]
    setContratoSeleccionado(contrato)
    setMostrarModal(true)
  }

  function getTipoClase(tipo: string) {
    const tipoNormalizado = tipo.toLowerCase()
    switch (tipoNormalizado) {
      case "préstamo": return styles.prestamo
      case "seguro": return styles.seguro
      case "producto": return styles.producto
      default: return styles.otro
    }
  }

  function getEstatusClase(estatus: string) {
    const key = estatus.toLowerCase().replace(/\s/g, "")
    return styles[key] || styles.otro
  }

  function capitalizar(texto: string) {
    if (!texto) return ""
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
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
    if (tieneRolRestringido) return
    setContratoSeleccionado(contrato)
    setMostrarModalDetalle(true)
  }

  return (
    <div className={styles.contractTableContainer}>
      {mostrarModal && contratoSeleccionado && (
        <ContratoModal contrato={contratoSeleccionado} usuarioActual={usuarioActual} onClose={handleModalClose} />
      )}
      {mostrarModalDetalle && contratoSeleccionado && (
        <DetalleContratoModal contrato={contratoSeleccionado} onClose={handleDetalleModalClose} />
      )}

      {!mostrarTabla && !tieneRolRestringido && (
        <div className={styles.overlayInside}>
          <button className={styles.btnCompraDeuda} onClick={handleCompraDeudaClick}>
            Compra de deuda
          </button>
        </div>
      )}

      <div className={`${styles.tableBlurWrapper} ${(!mostrarTabla && !tieneRolRestringido) ? styles.blurred : ""}`}>

        <h4>Detalle de Contratos</h4>
        <div className={styles.tableScrollWrapper}>
          <table className={styles.contractTable}>
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
                    className={tieneRolRestringido ? "" : styles.clickableRow}
                    onClick={() => handleRowClick(c)}
                  >
                    <td>
                      <span className={`${styles.tipoBadge} ${getTipoClase(tipo)}`}>
                        {capitalizar(tipo)}
                      </span>
                    </td>
                    <td>{financiera}</td>
                    <td>
                      <span className={`${styles.estatusBadge} ${getEstatusClase(estatus)}`}>
                        {capitalizar(estatus)}
                      </span>
                    </td>
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
    </div>
  )
}
