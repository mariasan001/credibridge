"use client";

import { useEffect, useRef, useState } from "react";


import { useAuth } from "@/context/AuthContext";
import { ChatInputBar } from "@/app/perfil_user/solicitudes_quejas/components/ChatInput";
import { respondTicket } from "@/app/perfil_user/solicitudes_quejas/service/toketResponService";

import HeaderTicketInfo from "./HeaderTicketInfo";
import MensajeBubble from "./MensajeBubble";
import { TicketFileBubble } from "@/app/perfil_user/solicitudes_quejas/components/TicketFileBubble";

import "./DetalleModal.css";
import { TicketDetailModel } from "@/app/perfil_user/solicitudes_quejas/model/TicketDetailModel";
import { TicketFileModel } from "@/app/perfil_user/solicitudes_quejas/model/TicketFileModel";
import { getTicketDetail } from "@/app/perfil_user/solicitudes_quejas/service/ticketDetailService";
import { getTicketFiles } from "@/app/perfil_user/solicitudes_quejas/service/ticketFilesService";

interface Props {
  ticketId: number;
  onClose: () => void;
}

// Extendemos temporalmente el modelo con archivos
type TicketConArchivos = TicketDetailModel & { files: TicketFileModel[] };

export default function DetalleModal({ ticketId, onClose }: Props) {
  const { user } = useAuth();
  const [ticket, setTicket] = useState<TicketConArchivos | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cargar ticket cuando cambie el ID
  useEffect(() => {
    cargarTicket();
  }, [ticketId]);

  // Auto-scroll al fondo cada vez que cambia el contenido
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket]);

  const cargarTicket = async () => {
    try {
      setLoading(true);
      const [detalle, archivos] = await Promise.all([
        getTicketDetail(ticketId),
        getTicketFiles(ticketId),
      ]);
      setTicket({ ...detalle, files: archivos });
    } catch (err) {
      console.error("❌ Error al cargar ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const enviarMensaje = async () => {
    if (!mensaje.trim() || !user) return;

    try {
      await respondTicket({
        ticketId,
        senderId: user.userId,
        message: mensaje.trim(),
        isInternal: false,
      });
      setMensaje("");
      await cargarTicket();
    } catch (err) {
      console.error("❌ Error al enviar mensaje:", err);
    }
  };

  if (loading || !ticket) {
    return (
      <div className="modal-overlay">
        <div className="modal-container1">
          <p>Cargando conversación...</p>
        </div>
      </div>
    );
  }
  const itemsConversacion = [
    ...(ticket.messages?.map(msg => ({ tipo: "mensaje" as const, data: msg })) || []),
    ...(ticket.files?.map(file => ({ tipo: "archivo" as const, data: file })) || []),
  ].sort((a, b) => {
    const fechaA =
      a.tipo === "mensaje"
        ? new Date(a.data.sendDate).getTime()
        : new Date(a.data.uploadDate).getTime();

    const fechaB =
      b.tipo === "mensaje"
        ? new Date(b.data.sendDate).getTime()
        : new Date(b.data.uploadDate).getTime();

    return fechaA - fechaB;
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container1">
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <HeaderTicketInfo
            tipo={ticket.clarificationType || ticket.ticketType}
            status={ticket.status}
            financiera={ticket.lenderName}
          />
          <div className="modal-section comentarios-container" ref={scrollRef}>
            <h4>Comentarios</h4>
            {itemsConversacion.length ? (
              itemsConversacion.map((item, i) => (
                <div key={i} className="comentario-item">
                  {item.tipo === "mensaje" ? (
                    <MensajeBubble msg={item.data} />
                  ) : (
                    <TicketFileBubble file={item.data} />
                  )}
                </div>
              ))
            ) : (
              <p>Sin comentarios aún.</p>
            )}
          </div>



          <ChatInputBar
            ticketId={ticket.ticketId}
            mensaje={mensaje}
            setMensaje={setMensaje}
            onSend={enviarMensaje}
            onUploadSuccess={cargarTicket}
          />
        </div>
      </div>
    </div>
  );
}
