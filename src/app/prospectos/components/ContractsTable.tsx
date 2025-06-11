import { Contract } from "../models/Contract";
import { getTagColorByService, getTagColorByStatus } from "../utils/tagHelpers";
import "./ContractRow.css";

interface Props {
  contracts: Contract[];
  onChangeStatus: (contract: Contract) => void;
}

export const ContractsTable = ({ contracts, onChangeStatus }: Props) => {
  return (
    <table className="contracts-table">
      <thead>
        <tr>
          <th>Num. Servidor</th>
          <th>Nombre</th>
          <th>RFC</th>
          <th>Saldo solicitado</th>
          <th>Descuentos</th>
          <th>Plazos</th>
          <th>Tipo de servicio</th>
          <th>Estatus</th>
          <th>Fecha de solicitud</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map(contract => (
          <tr key={contract.id}>
            <td>{contract.userId}</td>
            <td>{contract.nombre}</td>
            <td>{contract.rfc}</td>
            <td>${contract.amount}</td>
            <td>{contract.biweeklyDiscount}</td>
            <td>{contract.installments}</td>
            <td>
              <span className={`tag ${getTagColorByService(contract.typeService)}`}>
                {contract.typeService}
              </span>
            </td>
            <td>
              {["reserva", "pendiente"].some(e =>
                contract.contractStatusDesc.toLowerCase().includes(e)
              ) ? (
                <button
                  className={`tag ${getTagColorByStatus(contract.contractStatusDesc)} cursor-pointer`}
                  onClick={() => onChangeStatus(contract)}
                >
                  {contract.contractStatusDesc}
                </button>
              ) : (
                <span className={`tag ${getTagColorByStatus(contract.contractStatusDesc)}`}>
                  {contract.contractStatusDesc}
                </span>
              )}
            </td>
            <td>{new Date(contract.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
