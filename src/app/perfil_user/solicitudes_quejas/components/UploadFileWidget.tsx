import React, { useRef, useState } from "react";
import "./UploadFileWidget.css";
import { uploadTicketFile } from "../service/ticketFileUploadService";

interface Props {
  ticketId: number;
  onUploadSuccess: () => void;
}

export const UploadFileWidget: React.FC<Props> = ({ ticketId, onUploadSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadTicketFile(ticketId, file);
      onUploadSuccess(); // refresca el ticket (ej. fetchDetail)
    } catch (err) {
      console.error("❌ Error al subir archivo:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
// esta seccion es part del envio dde pdf 
  return (
    <div className="upload-widget">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".pdf,.jpg,.png,.doc,.docx" // puedes modificar
      />
      <button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
        {uploading ? "Subiendo..." : "📎 Adjuntar archivo"}
      </button>
    </div>
  );
};


