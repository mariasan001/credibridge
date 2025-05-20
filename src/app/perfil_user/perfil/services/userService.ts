import { api } from "@/lib/apis";

interface UpdateContactPayload {
  email: string;
  phone: string;
}

export const updateUserContact = async (
  userId: string,
  data: UpdateContactPayload
) => {
  try {
    const response = await api.put(`/api/users/${userId}/contact`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar contacto del usuario:", error);
    throw error;
  }
};
