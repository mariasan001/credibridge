"use client";

import "./VistaMensajesFija.css";
import { useEffect, useRef, useState } from "react";
import { respondTicket } from "@/app/perfil_user/solicitudes_quejas/service/toketResponService";
import { useAuth } from "@/context/AuthContext";
import { Upload } from "lucide-react";
import { uploadTicketFile } from "@/app/perfil_user/solicitudes_quejas/service/ticketFileUploadService";
import { getTicketFiles } from "@/app/perfil_user/solicitudes_quejas/service/ticketFilesService";
import { TicketFileBubble } from "@/app/perfil_user/solicitudes_quejas/components/TicketFileBubble";
import { ReportTicket } from "../model/reportTicket.model";

interface Props {
    ticket: ReportTicket; // ahora recibe el objeto completo
}

export default function VistaMensajesFijaExtendida({ ticket }: Props) {
    const [message, setMessage] = useState("");
    const [localMessages, setLocalMessages] = useState(ticket.messageDtos || []);
    const [files, setFiles] = useState<any[]>([]);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const { user } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const fileData = await getTicketFiles(ticket.ticket.ticketId);
                setFiles(fileData);
            } catch (error) {
                console.error("Error al obtener archivos", error);
            }
        };
        fetchFiles();
    }, [ticket.ticket.ticketId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const payload = {
                ticketId: ticket.ticket.ticketId,
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
            console.error("Error al enviar mensaje", error);
        }
    };

    const handleFileUpload = async () => {
        if (!fileToUpload) return;
        try {
            await uploadTicketFile(ticket.ticket.ticketId, fileToUpload);
            const updatedFiles = await getTicketFiles(ticket.ticket.ticketId);
            setFiles(updatedFiles);
            setFileToUpload(null);
        } catch (error) {
            console.error("Error al subir archivo", error);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [localMessages, files]);

    const sortedMessages = [...localMessages].sort(
        (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );

    return (
        <div className="vista-mensajes-fija-extendida">
            <header className="ticket-header">
                <div className="ticket-title">
                    <h3>Conversación del ticket </h3>
                    <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                        {ticket.status}
                    </span>
                </div>
            </header>

            <div className="messages">
                {sortedMessages.map((m) => {
                    const isCurrentUser = m.senderId === user?.userId;
                    const alignment = isCurrentUser ? "right" : "left";

                    return (
                        <div key={m.id} className={`message ${alignment}`}>
                            {!isCurrentUser && (
                                <div className="avatar small">
                                    {m.senderId?.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div className="bubble-group">
                                <div className="bubble">{m.content}</div>
                                <small className="timestamp">
                                    {new Date(m.sentAt).toLocaleString("es-MX")}
                                </small>
                            </div>
                            {isCurrentUser && (
                                <div className="avatar small">
                                    {m.senderId?.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>
                    );
                })}

                {files.map((f) => (
                    <TicketFileBubble key={f.id} file={f} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="message-input" onSubmit={handleSubmit}>
                <label className="upload-button" title="Subir archivo">
                    <Upload size={18} />
                    <input
                        type="file"
                        onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
                        hidden
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
                    <span>{fileToUpload.name}</span>
                    <button onClick={handleFileUpload}>Subir</button>
                </div>
            )}
        </div>
    );
}
