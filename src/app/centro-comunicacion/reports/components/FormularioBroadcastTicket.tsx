"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CloudUpload } from "lucide-react";
import "./FormularioBroadcastTicket.css";
import { useFormularioBroadcastTicket } from "../hooks/useFormularioBroadcastTicket";

const animatedComponents = makeAnimated();

export default function FormularioBroadcastTicket() {
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
    setFile
  } = useFormularioBroadcastTicket();

  const lenderOptions = lenders.map((l) => ({ value: l.id, label: l.lenderName }));
  const selectedType = ticketTypes.find(t => t.id === parseInt(formData.ticketTypeId));

  return (
    <div className="formulario-broadcast-container">
      <div className="formulario-card">
        <h3 className="titulo">Creacion de Reporte </h3>

        <select name="ticketTypeId" onChange={handleChange} value={formData.ticketTypeId}>
          <option value="">Selecciona tipo de reporte</option>
          {ticketTypes
            .filter(type => type.ticketTypeDesc.trim().toUpperCase() !== "COMUNICACION")
            .map(type => (
              <option key={type.id} value={type.id}>
                {type.ticketTypeDesc}
              </option>
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
        <Select
          options={lenderOptions}
          components={animatedComponents}
          onChange={handleSelectLenders}
          value={lenderOptions.find(opt => formData.participantUserIds.includes(opt.value))}
          placeholder="Selecciona una institución"
        />

        <label>Asunto</label>
        <input
          type="text"
          name="subject"
          placeholder="Asunto del reporte"
          value={formData.subject}
          onChange={handleChange}
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
