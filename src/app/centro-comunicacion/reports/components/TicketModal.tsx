"use client";

import "./ticket-modal.css";
import { useEffect, useRef, useState } from "react";
import { ReportTicket } from "../model/reportTicket.model";
import { respondTicket } from "@/app/perfil_user/solicitudes_quejas/service/toketResponService";
import { useAuth } from "@/context/AuthContext";
import { Paperclip, Upload } from "lucide-react";
import { TicketFileModel } from "@/app/perfil_user/solicitudes_quejas/model/TicketFileModel";
import { uploadTicketFile } from "@/app/perfil_user/solicitudes_quejas/service/ticketFileUploadService";
import { getTicketFiles } from "@/app/perfil_user/solicitudes_quejas/service/ticketFilesService";
import { TicketFileBubble } from "@/app/perfil_user/solicitudes_quejas/components/TicketFileBubble";

interface Props {
  ticket: ReportTicket;
  onClose: () => void;
}

export const TicketModal = ({ ticket, onClose }: Props) => {
  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([...ticket.messageDtos]);
  const [files, setFiles] = useState<TicketFileModel[]>([]);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const payload = {
        ticketId: ticket.id,
        senderId: user?.userId || "sin-usuario",
        message,
        isInternal: true,
      };

      await respondTicket(payload);

      setLocalMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          senderId: payload.senderId,
          content: payload.message,
          sentAt: new Date().toISOString(),
        },
      ]);

      setMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) return;
    try {
      await uploadTicketFile(ticket.id, fileToUpload);
      const updatedFiles = await getTicketFiles(ticket.id);
      setFiles(updatedFiles);
      setFileToUpload(null);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const result = await getTicketFiles(ticket.id);
      setFiles(result);
    };
    fetchFiles();
  }, [ticket.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages, files]);

  const sortedMessages = [...localMessages].sort(
    (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
  );

  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
        <header className="ticket-header">
          <div className="ticket-title">
            <h3>Conversación del ticket</h3>
            <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
              {ticket.status}
            </span>
          </div>

          <div className="ticket-avatar-top">
            <div className="avatar">
              {ticket.participants[0]?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
          </div>

          <button className="close-button" onClick={onClose} title="Cerrar">
            ✕
          </button>
        </header>

        <section className="ticket-body">
          <main className="conversation">
            <div className="messages">
              {sortedMessages.map((m) => (
                <div key={m.id} className="message">
                  <div className="avatar small">
                    {m.senderId.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="bubble-group">
                    <div className="bubble">{m.content}</div>
                    <small className="timestamp">
                      {new Date(m.sentAt).toLocaleString("es-MX")}
                    </small>
                  </div>
                </div>
              ))}
              {files.map((f) => (
                <TicketFileBubble key={f.id} file={f} />
              ))}

              <div ref={messagesEndRef} />
            </div>

            <form className="message-input" onSubmit={handleSubmit}>
              <label className="upload-button" title="Subir archivo">
                <div className="upload-icon-wrapper">
                  <Upload size={18} className="upload-icon" />
                 
                </div>
                <input
                  type="file"
                  onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
                  style={{ display: "none" }}
                />
              </label>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Enviar</button>
            </form>

            {fileToUpload && (
              <div className="file-preview">
                <div className="file-info">
                  <i className="fas fa-paperclip"></i>
                  <span className="file-name">{fileToUpload.name}</span>
                </div>
                <button
                  type="button"
                  className="upload-btn"
                  onClick={handleFileUpload}
                >
                  Subir archivo
                </button>
              </div>
            )}
          </main>
        </section>
      </div>
    </div>
  );
};
