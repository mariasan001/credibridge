"use client";

import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { sendBroadcastTicket } from "../service/ticket_service";
import { TicketBroadcastPayload } from "../model/TicketBroadcastPayload";
import { fetchTicketTypes, TicketType } from "../service/ticket_type_service";
import { FormDataState } from "../model/form.types";
import { fetchLenders } from "../service/lender_service";
import { fetchClarificationTypes } from "../service/clarification_type_service";
import { ClarificationType } from "../model/ClarificationType";
import { CloudUpload } from "lucide-react";
import "./FormularioBroadcastTicket.css";

const animatedComponents = makeAnimated();

export default function FormularioBroadcastTicket() {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [clarificationTypes, setClarificationTypes] = useState<ClarificationType[]>([]);
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
    fetchTicketTypes().then(setTicketTypes).catch(() => toast.error("Error al obtener tipos de ticket"));
    fetchLenders().then(setLenders).catch(() => toast.error("Error al obtener financieras"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "ticketTypeId") {
      setFormData((prev) => ({ ...prev, [name]: value, clarificationType: "" }));
      const selectedType = ticketTypes.find(t => t.id === parseInt(value));
      if (selectedType?.ticketTypeDesc.toLowerCase() === "solicitud") {
        fetchClarificationTypes().then(setClarificationTypes).catch(() => toast.error("Error al obtener tipos de solicitud"));
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
    const ids = selected.map((s: any) => s.value);
    setFormData((prev) => ({ ...prev, participantUserIds: ids }));
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
      await sendBroadcastTicket(payload);
      toast.success("Reporte enviado correctamente");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const lenderOptions = lenders.map((l) => ({ value: l.id, label: l.lenderName }));
  const selectedType = ticketTypes.find(t => t.id === parseInt(formData.ticketTypeId));

  return (
    <div className="formulario-broadcast-container">
      <div className="formulario-card">
        <h3 className="titulo">Creacion de Reporte </h3>

        <select name="ticketTypeId" onChange={handleChange} value={formData.ticketTypeId}>
          <option value="">Selecciona tipo de reporte</option>
          {ticketTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.ticketTypeDesc}</option>
          ))}
        </select>

        {selectedType?.ticketTypeDesc.toLowerCase() === "solicitud" && (
          <>
            <label>Selecciona tipo de solicitud</label>
            <select name="clarificationType" onChange={handleChange} value={formData.clarificationType}>
              <option value="">Selecciona una opción</option>
              {clarificationTypes.filter(c => c.id >= 4).map((clarif) => (
                <option key={clarif.id} value={clarif.id}>{clarif.clarificationTypeDesc}</option>
              ))}
            </select>
          </>
        )}

        <label>Institución</label>
        <Select
          isMulti
          options={lenderOptions}
          components={animatedComponents}
          onChange={handleSelectLenders}
          value={lenderOptions.filter(opt => formData.participantUserIds.includes(opt.value))}
          placeholder="Selecciona instituciones"
        />

        <label>Agregar Contenido del mensaje</label>
        <textarea
          name="initialMessage"
          placeholder="Escribe aquí tu mensaje..."
          onChange={handleChange}
        />

        {file && (
          <div className="file-info">
            <span>{file.name}</span>
            <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        )}

        <div
          className="dropzone"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) setFile(droppedFile);
          }}
        >
          <CloudUpload size={40} />
          <p>Arrastra y suelta un archivo aquí o haz clic para subir</p>
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden-input"
          />
        </div>

        <div className="acciones">
          <button className="btn-primario" onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </div>
      </div>
    </div>
  );
}
