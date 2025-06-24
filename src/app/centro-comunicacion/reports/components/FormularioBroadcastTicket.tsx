"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CloudUpload } from "lucide-react";
import "./FormularioBroadcastTicket.css";
import { useFormularioBroadcastTicket } from "../hooks/useFormularioBroadcastTicket";

const animatedComponents = makeAnimated();

interface Props {
  modoComunicacion?: boolean; // ✅ Prop para activar modo de Comunicado
}

export default function FormularioBroadcastTicket({ modoComunicacion = false }: Props) {
  const {
    inputRef,
    ticketTypes,
    clarificationTypes,
    lenders,
    file,
    loading,
    formData,
    handleChange,
    handleFileChange,
    handleSelectLenders,
    handleSubmit,
    setFile,
  } = useFormularioBroadcastTicket();

  const lenderOptions = lenders.map((l) => ({
    value: l.id,
    label: l.lenderName,
  }));

  const selectedType = ticketTypes.find(
    (t) => t.id === parseInt(formData.ticketTypeId)
  );

  const isComunicacion =
    selectedType?.ticketTypeDesc.toUpperCase() === "COMUNICACION";

  return (
    <div className="formulario-broadcast-container">
      <div className="formulario-card">
        <h3 className="titulo">
          {modoComunicacion ? "Enviar Comunicado" : "Creación de Reporte"}
        </h3>

        {/* Tipo de Reporte */}
        <label>Tipo de Reporte</label>
        <select
          name="ticketTypeId"
          onChange={handleChange}
          value={formData.ticketTypeId}
        >
          <option value="">Selecciona tipo de reporte</option>
          {ticketTypes
            .filter((type) =>
              modoComunicacion
                ? type.ticketTypeDesc.trim().toUpperCase() === "COMUNICACION"
                : type.ticketTypeDesc.trim().toUpperCase() !== "COMUNICACION"
            )
            .map((type) => (
              <option key={type.id} value={type.id}>
                {type.ticketTypeDesc}
              </option>
            ))}
        </select>

        {/* Tipo de solicitud solo si aplica */}
        {selectedType?.ticketTypeDesc.toLowerCase() === "solicitud" && (
          <>
            <label>Tipo de Solicitud</label>
            <select
              name="clarificationType"
              onChange={handleChange}
              value={formData.clarificationType}
            >
              <option value="">Selecciona una opción</option>
              {clarificationTypes
                .filter((c) => c.id >= 4)
                .map((clarif) => (
                  <option key={clarif.id} value={clarif.id}>
                    {clarif.clarificationTypeDesc}
                  </option>
                ))}
            </select>
          </>
        )}

        {/* Instituciones */}
        <label>Institución</label>
        <Select
          options={lenderOptions}
          components={animatedComponents}
          isMulti={isComunicacion}
          onChange={handleSelectLenders}
          value={
            isComunicacion
              ? lenderOptions.filter((opt) =>
                  formData.participantUserIds.includes(opt.value)
                )
              : lenderOptions.find((opt) =>
                  formData.participantUserIds.includes(opt.value)
                ) || null
          }
          placeholder="Selecciona una institución"
        />

        {/* Asunto */}
        <label>Asunto</label>
        <input
          type="text"
          name="subject"
          placeholder="Asunto del reporte"
          value={formData.subject}
          onChange={handleChange}
        />

        {/* Mensaje */}
        <label>Contenido del mensaje</label>
        <textarea
          name="initialMessage"
          placeholder="Escribe aquí tu mensaje..."
          onChange={handleChange}
        />

        {/* Archivo */}
        {file && (
          <div className="file-info">
            <span>{file.name}</span>
            <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        )}

        {/* Dropzone para subir archivo */}
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

        {/* Botón */}
        <div className="acciones">
          <button
            className="btn-primario"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Enviando..."
              : modoComunicacion
              ? "Enviar Comunicado"
              : "Enviar Reporte"}
          </button>
        </div>
      </div>
    </div>
  );
}
