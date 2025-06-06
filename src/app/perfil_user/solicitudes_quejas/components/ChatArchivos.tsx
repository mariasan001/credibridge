import React, { useEffect, useState } from "react";

import { TicketFileBubble } from "./TicketFileBubble";
import { TicketFileModel } from "../model/TicketFileModel";
import { getTicketFiles } from "../service/ticketFilesService";

interface Props {
  ticketId: number;
}

export const ChatArchivos: React.FC<Props> = ({ ticketId }) => {
  const [archivos, setArchivos] = useState<TicketFileModel[]>([]);

  useEffect(() => {
    const cargarArchivos = async () => {
      try {
        const data = await getTicketFiles(ticketId);
        setArchivos(data);
      } catch (error) {
        console.error("Error al cargar archivos del ticket:", error);
      }
    };

    cargarArchivos();
  }, [ticketId]);

  return (
    <div>
      {archivos.map((file) => (
        <TicketFileBubble key={file.id} file={file} />
      ))}
    </div>
  );
};