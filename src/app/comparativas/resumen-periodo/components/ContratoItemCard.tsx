// app/dashboard/components/DashboardContractsTable.tsx

import { DashboardContract } from "../model/dashboard.model";
import "./dashboard-table.css";

interface Props {
    contratos: DashboardContract[];
}

interface Props {
    contratos: DashboardContract[];
}

export const DashboardContractsTable = ({ contratos }: Props) => {
    return (
        <div>
    
            <div className="contracts-table-wrapper">
                <table className="contracts-table">

                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Estatus</th>
                            <th>Nombre</th>
                            <th>RFC</th>
                            <th>Servicio</th>
                            <th className="center">Crédito</th>
                            <th className="center">ID Contrato</th>
                            <th className="center">Cuotas</th>
                            <th className="center">Aplicados</th>
                            <th className="center">Quincenal</th>
                            <th className="center">Total</th>
                            <th className="center">Nuevo Saldo</th>
                            <th className="center">ID Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contratos.map((contrato) => (
                            <tr key={contrato.contractId}>
                                <td className="bold">{contrato.discountKey}</td>
                                <td>
                                    <span className="tag tag-blue">{contrato.contractStatus.contractStatusDesc}</span>
                                </td>
                                <td className="cell-ellipsis">{contrato.user.name}</td>
                                <td>{contrato.user.rfc}</td>
                                <td>{contrato.lenderService.serviceType.serviceTypeDesc}</td>
                                <td className="center">{contrato.creditId}</td>
                                <td className="center">{contrato.contractId}</td>
                                <td className="center">{contrato.installments}</td>
                                <td className="center">{contrato.discountsAplied}</td>
                                <td className="center">${contrato.biweeklyDiscount.toFixed(2)}</td>
                                <td className="center">${contrato.amount.toFixed(2)}</td>
                                <td className="center">${contrato.newBalance.toFixed(2)}</td>
                                <td className="center">{contrato.user.userId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};