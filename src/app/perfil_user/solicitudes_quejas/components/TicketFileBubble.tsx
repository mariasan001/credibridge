import React from "react";
import "./TicketFileBubble.css";
import { TicketFileModel } from "../model/TicketFileModel";
/** para esta seccion existn tipoos documento 
 *  no se puede ver pero si descargar ahora el  diseño cambia dependiendo
 * el tipo de archivco como el colro d epdg, exce , imange  doc dpeend al arcxhico 
 * asi cmo cuando llega a waht sap o en un cha esed diseño limpio  qyuuer alfogo asi paera esa seccion ahora
 si se oc ucuparan iconos recurda que estmao ocuopandoo 
 
 */
interface Props {
  file: TicketFileModel;
}

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910";

export const TicketFileBubble: React.FC<Props> = ({ file }) => {
  return (
    <div className="file-bubble">
      <div className="file-meta">
        <strong>{file.filename}</strong>
        <span>{new Date(file.uploadDate).toLocaleString()}</span>
      </div>
      <div className="file-actions">
        <a
          href={`${apiBase}/api/tickets/view/${file.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="file-link"
        >
          🔍 Ver
        </a>
        <a
          href={`${apiBase}/api/tickets/download/${file.id}`}
          className="file-link"
        >
          📎 Descargar
        </a>
      </div>
    </div>
  );
};