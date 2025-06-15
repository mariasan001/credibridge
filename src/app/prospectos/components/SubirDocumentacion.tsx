"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { subirDocumento } from "../services/uploadService";
import { UploadCloud } from "lucide-react";
import "./SubirDocumentacion.css";
import { updateContractStatus } from "../services/contractService";

interface Props {
  onVolver: () => void;   // ← Volver a vista anterior (detalle)
  onClose: () => void;    // ❌ Cerrar modal completamente
  contractId: number;
}

export default function SubirDocumentacion({ onVolver, onClose, contractId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

const handleUpload = async () => {
  if (!file) {
    toast.error("Selecciona un archivo antes de subir.");
    return;
  }

  try {
    setLoading(true);
    await subirDocumento(contractId, file);
    await updateContractStatus(contractId, 2);

    toast.success("Archivo subido y estatus actualizado");

    setFile(null);
    setFileName(null);

    onClose(); // 👈 Cierra el modal (no solo cambia vista)
  } catch (error) {
    toast.error("Error al subir el archivo o actualizar estatus");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="upload-modal-container">
      <p className="upload-subtitle">Contrato #{contractId}</p>

      <div
        className="upload-dropzone large"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-placeholder">
          <UploadCloud size={38} />
          <p>
            {fileName ? (
              <strong>{fileName}</strong>
            ) : (
              <>
                Arrastra un archivo aquí o{" "}
                <span className="upload-link">elige archivo</span>
              </>
            )}
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden-input"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png,.xlsx,.xls"
        />
      </div>

      <p className="upload-note">
        Formatos permitidos: PDF, JPG, PNG, XLS, XLSX. Tamaño máximo: 25MB.
      </p>

      <div className="upload-hint-box">
        <p className="hint-title">⚠️ Consideraciones importantes:</p>
        <ul className="upload-checklist">
          <li>Verifica que los datos coincidan con el solicitante.</li>
          <li>Evita archivos borrosos o alterados.</li>
          <li>Confirma que todos los documentos estén completos y firmados.</li>
          <li>Reporta cualquier irregularidad antes de continuar.</li>
        </ul>
      </div>

      <div className="modal-actions">
        <button className="btn outline" onClick={onVolver}>
          ← Volver
        </button>
        <button
          className="btn primary"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Subiendo..." : "Subir archivo"}
        </button>
      </div>
    </div>
  );
}
