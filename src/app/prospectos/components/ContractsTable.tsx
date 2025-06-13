"use client";

import { Contract } from "../models/Contract";
import { getTagColorByService, getTagColorByStatus } from "../utils/tagHelpers";
import { capitalizeFirst, capitalizeWords } from "../utils/capitalize";
import { PlayCircle } from "lucide-react";
import "./ContractRow.css";

interface Props {
  contracts: Contract[];
  onChangeStatus: (contract: Contract) => void;
  isEjecutivo?: boolean;
  onClickEjecutivoStatus?: (contract: Contract) => void;
  onClickProspecto: (contract: Contract) => void;
}

export const ContractsTable = ({
  contracts,
  onChangeStatus,
  isEjecutivo = false,
  onClickEjecutivoStatus,
  onClickProspecto,
}: Props) => {
  return (
    <table className="contracts-table">
      <thead>
        <tr>
          <th>Num. Servidor</th>
          <th>Nombre</th>
          <th>RFC</th>
          <th className="center">Saldo solicitado</th>
          <th className="center">Descuentos</th>
          <th className="center">Plazos</th>
          <th className="center">Tipo de servicio</th>
          <th className="center">Estatus</th>
          <th className="center">Fecha de solicitud</th>
          {isEjecutivo && <th className="center">Opciones</th>}
        </tr>
      </thead>
      <tbody>
        {contracts?.length > 0 ? (
          contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.userId}</td>

              <td className="cell-ellipsis" data-fulltext={capitalizeWords(contract.nombre)}>
                {capitalizeWords(contract.nombre)}
              </td>

              <td className="cell-ellipsis" data-fulltext={contract.rfc}>
                {contract.rfc}
              </td>

              <td className="center">
                {contract.amount != null
                  ? `$${contract.amount.toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} MXN`
                  : "—"}
              </td>

              <td className="center">
                {contract.biweeklyDiscount != null
                  ? `$${contract.biweeklyDiscount.toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} MXN`
                  : "—"}
              </td>

              <td className="center">{contract.installments ?? "—"}</td>

              <td className="center">
                <span className={`tag ${getTagColorByService(contract.typeService)}`}>
                  {capitalizeFirst(contract.typeService)}
                </span>
              </td>

              <td className="center">
                {isEjecutivo ? (
                  <button
                    className={`tag ${getTagColorByStatus(contract.contractStatusDesc)} cursor-pointer`}
                    onClick={() => onClickEjecutivoStatus?.(contract)}
                  >
                    {capitalizeFirst(contract.contractStatusDesc)}
                  </button>
                ) : ["reserva", "pendiente"].some((e) =>
                    contract.contractStatusDesc?.toLowerCase().includes(e)
                  ) ? (
                  <button
                    className={`tag ${getTagColorByStatus(contract.contractStatusDesc)} cursor-pointer`}
                    onClick={() => onChangeStatus(contract)}
                  >
                    {capitalizeFirst(contract.contractStatusDesc)}
                  </button>
                ) : (
                  <span className={`tag ${getTagColorByStatus(contract.contractStatusDesc)}`}>
                    {capitalizeFirst(contract.contractStatusDesc)}
                  </span>
                )}
              </td>

              <td className="center">
                {contract.createdAt
                  ? new Date(contract.createdAt).toLocaleDateString("es-MX")
                  : "—"}
              </td>

              {isEjecutivo && (
                <td className="center">
                  <button
                    className="icon-button"
                    title="Iniciar proceso de contratación"
                    onClick={() => onClickProspecto(contract)}
                  >
                    <PlayCircle size={20} />
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={10} className="center">
              No hay contratos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
