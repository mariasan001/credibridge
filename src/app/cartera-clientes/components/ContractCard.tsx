import { Eye } from "lucide-react"

import "./ContractRow.css"
import { ClientPortfolioContract } from "../model/contract_model"

interface Props {
  contract: ClientPortfolioContract
}

function capitalize(text: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function ContractRow({ contract }: Props) {
  return (
    <tr className="contract-row">
      <td>{contract.contractId}</td>
      <td>{capitalize(contract.serverFullName)}</td>
      <td>{contract.rfc}</td>
      <td className="bold">
        {contract.amount.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN"
        })}
      </td>
      <td>
        ${contract.biweeklyDiscount}
      </td>
      <td>
        <span className="tag green">{capitalize(contract.service)}</span>
      </td>
      <td>
        <span className={`tag ${contract.status.toLowerCase() === "adeudo" ? "red" : "green"}`}>
          {capitalize(contract.status)}
        </span>
      </td>
      <td>
        {contract.startDate
          ? new Date(contract.startDate).toLocaleDateString("es-MX")
          : "N/A"}
      </td>
      <td><Eye className="icon-view" /></td>
    </tr>
  )
}
