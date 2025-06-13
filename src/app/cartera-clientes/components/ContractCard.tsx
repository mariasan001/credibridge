"use client";

import { Eye } from "lucide-react";
import "./ContractRow.css";
import { ClientPortfolioContract } from "../model/contract_model";
import { useRouter } from "next/navigation";

interface Props {
  contract: ClientPortfolioContract;
  onView?: (contractId: number) => void;
}

function capitalize(text: string) {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getServiceTagClass(service: string) {
  const s = service.toLowerCase();
  if (s.includes("préstamo")) return "green";
  if (s.includes("seguro")) return "blue";
  return "gray";
}

export function ContractRow({ contract, onView }: Props) {
  const router = useRouter();

  const handleViewClick = () => {
    if (onView) {
      onView(contract.contractId);
    } else {
      // ✅ Guardar datos en localStorage
      localStorage.setItem("selectedContractId", contract.contractId.toString());
      localStorage.setItem("selectedContractStatus", contract.status); // ← guardar estatus real

      router.push("/amortizacion"); // sin ID en la URL
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
        <Eye className="icon-view" onClick={handleViewClick} />
      </td>
    </tr>
  );
}
