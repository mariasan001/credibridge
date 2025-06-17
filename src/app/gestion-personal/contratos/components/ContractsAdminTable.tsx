"use client"

import { capitalizeWords } from "@/app/prospectos/utils/capitalize"
import { ContractAdmin } from "../model/ticket.model"
import "./ContractsAdminTable.css"

interface Props {
  contracts: ContractAdmin[]
}

export default function ContractsAdminTable({ contracts }: Props) {
  return (
    <div className="contracts-admin-table">
      <table className="tabla-contratos">
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Financiera</th>
            <th>Nombre</th>
            <th>Estatus</th>
            <th>Servicio</th>
            <th>Plazos</th>
            <th>Descuento</th>
            <th>Monto</th>

          </tr>
        </thead>
        <tbody>
          {contracts.map(c => (
            <tr key={c.contractId}>
              <td>{c.userId}</td>
              <td>{capitalizeWords(c.lenderName)}</td>
              <td>{capitalizeWords(c.nombre)}</td>
              <td>{c.contractStatusDesc}</td>
              <td>{c.typeService}</td>
              <td>{c.installments}</td>
              <td>${c.biweeklyDiscount.toFixed(2)}</td>
              <td>${c.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
