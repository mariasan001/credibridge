
import { TicketMessage } from "../model/ticket_detail_model";
import { capitalizarNombre, formatearFechaHora } from "./ticket_helpers";

interface Props {
  msg: TicketMessage;
}

export default function MensajeBubble({ msg }: Props) {
  const clase = msg.roles.includes("USER") ? "usuario" : "financiera";

  return (
    <div className={`comentario-burbuja ${clase}`}>
      <div className="comentario-header">
        <strong>{capitalizarNombre(msg.senderName)}</strong>
        <span className="comentario-fecha">{formatearFechaHora(msg.sendDate)}</span>
      </div>
      <p className="comentario-texto">{msg.content}</p>
    </div>
  );
}
