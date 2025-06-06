"use client";

import { useRef, useState } from "react";
import "./ChatInput.css";
import { uploadTicketFile } from "../service/ticketFileUploadService";

interface Props {
  ticketId: number;
  mensaje: string;
  setMensaje: (msg: string) => void;
  onSend: () => void;
  onUploadSuccess: () => void;
  disabled?: boolean;
}

export const ChatInputBar = ({
  ticketId,
  mensaje,
  setMensaje,
  onSend,
  onUploadSuccess,
  disabled,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleSend = () => {
    if (!mensaje.trim()) return;
    onSend();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadTicketFile(ticketId, file);
      onUploadSuccess();
    } catch (err) {
      console.error("❌ Error al subir archivo:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="chat-input-bar">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".pdf,.jpg,.png,.doc,.docx"
      />

      <button
        className="icon-btn"
        title="Adjuntar archivo"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        📎
      </button>

      <input
        type="text"
        value={mensaje}
        placeholder="Escribe un mensaje..."
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
      />

      <button
        className="send-btn"
        onClick={handleSend}
        disabled={disabled || uploading}
      >
        ➤
      </button>
    </div>
  );
};
