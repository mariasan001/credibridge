"use client";

import { capitalizeWords } from "@/app/prospectos/utils/capitalize";
import { ContractAdmin } from "../model/ticket.model";
import "./ContractsAdminTable.css";

interface Props {
  contracts: ContractAdmin[];
}

// 🔧 Función para normalizar texto a clase CSS (p. ej. "En Proceso" → "en-proceso")
function normalizeClass(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/\s+/g, "-"); // reemplaza espacios por guiones
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
          {contracts.map((c) => (
            <tr key={c.contractId}>
              <td>{c.userId}</td>
              <td>{capitalizeWords(c.lenderName)}</td>
              <td>{capitalizeWords(c.nombre)}</td>
              <td>
                <span
                  className={`badge estatus ${normalizeClass(
                    c.contractStatusDesc
                  )}`}
                >
                  {(c.contractStatusDesc)}
                </span>
              </td>
              <td>
                <span
                  className={`badge servicio ${normalizeClass(
                    c.typeService || "otro"
                  )}`}
                >
                  {(c.typeService || "Otro")}
                </span>
              </td>
              <td>{c.installments}</td>
              <td>${c.biweeklyDiscount.toFixed(2)}</td>
              <td>
                ${c.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
