import { api } from "@/lib/apis";


export const uploadTicketFile = async (ticketId: number, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/api/tickets/${ticketId}/files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
