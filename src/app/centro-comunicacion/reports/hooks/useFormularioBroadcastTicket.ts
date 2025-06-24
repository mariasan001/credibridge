// hooks/useFormularioBroadcastTicket.ts
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { sendBroadcastTicket } from "../service/ticket_service";
import { fetchTicketTypes, TicketType } from "../service/ticket_type_service";
import { fetchLenders } from "../service/lender_service";
import { fetchClarificationTypes } from "../service/clarification_type_service";
import { ClarificationType } from "../model/ClarificationType";
import { TicketBroadcastPayload } from "../model/TicketBroadcastPayload";
import { FormDataState } from "../model/form.types";

export const useFormularioBroadcastTicket = () => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [clarificationTypes, setClarificationTypes] = useState<
    ClarificationType[]
  >([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataState>({
    userId: user?.userId || "",
    subject: "",
    description: "",
    ticketTypeId: "",
    clarificationType: "",
    initialMessage: "",
    participantUserIds: [],
  });

  useEffect(() => {
    fetchTicketTypes()
      .then(setTicketTypes)
      .catch(() => toast.error("Error al obtener tipos de ticket"));
    fetchLenders()
      .then(setLenders)
      .catch(() => toast.error("Error al obtener financieras"));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "ticketTypeId") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        clarificationType: "",
      }));
      const selectedType = ticketTypes.find((t) => t.id === parseInt(value));
      if (selectedType?.ticketTypeDesc.toLowerCase() === "solicitud") {
        fetchClarificationTypes()
          .then(setClarificationTypes)
          .catch(() => toast.error("Error al obtener tipos de solicitud"));
      } else {
        setClarificationTypes([]);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSelectLenders = (selected: any) => {
    if (Array.isArray(selected)) {
      const ids = selected.map((s) => s.value);
      setFormData((prev) => ({ ...prev, participantUserIds: ids }));
    } else if (selected) {
      setFormData((prev) => ({
        ...prev,
        participantUserIds: [selected.value],
      }));
    } else {
      setFormData((prev) => ({ ...prev, participantUserIds: [] }));
    }
  };

  const handleSubmit = async () => {
    const parsedTicketTypeId = parseInt(formData.ticketTypeId);
    const clarification = parseInt(formData.clarificationType);

    if (isNaN(parsedTicketTypeId)) {
      toast.error("Selecciona un tipo de reporte válido");
      return;
    }

    const payload: TicketBroadcastPayload = {
      data: {
        userId: user?.userId || "",
        subject: formData.subject,
        description: formData.description,
        ticketTypeId: parsedTicketTypeId,
        clarification_type: isNaN(clarification) ? 0 : clarification,
        initialMessage: formData.initialMessage,
        participantUserIds: formData.participantUserIds.map(String),
      },
      file: file || undefined,
    };

    try {
      setLoading(true);

      console.log("Payload enviado:", payload);
      const response = await sendBroadcastTicket(payload);

      console.log("Respuesta del servidor:", response);

      toast.success("Reporte enviado correctamente");
    } catch (error: any) {
      console.error("Error al enviar el reporte:", error);
      toast.error(error?.response?.data?.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };
  return {
    inputRef,
    ticketTypes,
    clarificationTypes,
    lenders,
    file,
    loading,
    formData,
    setFormData,
    handleChange,
    handleFileChange,
    handleSelectLenders,
    handleSubmit,
    setFile,
  };
};
