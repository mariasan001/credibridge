import { api } from "@/lib/apis";

export const fetchContracts = (statusId: number, page: number) => {
  return api.get("/api/contracts/active", {
    params: {
      statusId,
      "pageable.page": page,
      "pageable.size": 10,
    },
  });
};

export const updateContractStatus = (contractId: number, newStatusId: number) => {
  return api.put("/api/lender/contracts/update-status", {
    contractId,
    newStatusId,
  });
};
