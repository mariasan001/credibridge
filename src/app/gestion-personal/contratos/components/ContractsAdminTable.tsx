"use client";

import { capitalizeWords } from "@/app/prospectos/utils/capitalize";
import { ContractAdmin } from "../model/ticket.model";
import "./ContractsAdminTable.css";
import { memo } from "react";

interface Props {
  contracts: ContractAdmin[];
}

// 🔧 Normaliza texto para usar como clase CSS
function normalizeClass(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function ContractsAdminTableComponent({ contracts }: Props) {
  if (contracts.length === 0) {
    return <p className="no-data-msg">No hay contratos que mostrar.</p>;
  }

  return (
    <div className="contracts-admin-table overflow-auto">
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
          {contracts.map((c) => (
            <tr key={c.contractId}>
              <td>{c.userId}</td>
              <td>{capitalizeWords(c.lenderName)}</td>
              <td>{capitalizeWords(c.nombre)}</td>
              <td>
                <span className={`badge estatus ${normalizeClass(c.contractStatusDesc)}`}>
                  {c.contractStatusDesc}
                </span>
              </td>
              <td>
                <span className={`badge servicio ${normalizeClass(c.typeService || "otro")}`}>
                  {c.typeService || "Otro"}
                </span>
              </td>
              <td>{c.installments}</td>
              <td className="text-end">${c.biweeklyDiscount.toFixed(2)}</td>
              <td className="text-end">
                ${c.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ContractsAdminTable = memo(ContractsAdminTableComponent);
export default ContractsAdminTable;
