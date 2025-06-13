import { api } from "@/lib/apis";

export const subirDocumento = async (contractId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await api.post(`/api/contracts/upload-doc?contractId=${contractId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
