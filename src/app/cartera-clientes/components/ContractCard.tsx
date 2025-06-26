"use client";

import { memo } from "react";
import { Eye } from "lucide-react";
import "./ContractRow.css";
import { ClientPortfolioContract } from "../model/contract_model";
import { useRouter } from "next/navigation";
import { capitalize } from "../utils/text";
import { getServiceTagClass } from "../utils/tags";

interface Props {
  contract: ClientPortfolioContract;
  onView?: (contractId: number) => void;
}

export const ContractRow = memo(function ContractRow({ contract, onView }: Props) {
  const router = useRouter();

  const handleViewClick = () => {
    if (!contract.contractId || !contract.status) return;

    if (onView) {
      onView(contract.contractId);
    } else {
      const selectedContract = {
        id: contract.contractId,
        status: contract.status,
      };
      localStorage.setItem("selectedContract", JSON.stringify(selectedContract));
      router.push("/amortizacion");
    }
  };

  return (
    <tr className="contract-row">
      <td>{contract.contractId}</td>
      <td>{capitalize(contract.serverFullName)}</td>
      <td>{contract.rfc}</td>

      <td className="bold">
        {contract.amount.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        })}
      </td>

      <td className="bold">
        {contract.biweeklyDiscount.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        })}
      </td>

      <td>
        <span className={`tag ${getServiceTagClass(contract.service)}`}>
          {capitalize(contract.service)}
        </span>
      </td>

      <td>
        <span
          className={`tag ${contract.status.toLowerCase() === "adeudo" ? "red" : "green"}`}
        >
          {capitalize(contract.status)}
        </span>
      </td>

      <td>
        {contract.startDate
          ? new Date(contract.startDate).toLocaleDateString("es-MX")
          : "N/A"}
      </td>

      <td>
        <Eye
          className="icon-view"
          onClick={handleViewClick}
      
          aria-label="Ver detalle del contrato"
          role="button"
          tabIndex={0}
        />
      </td>
    </tr>
  );
});
