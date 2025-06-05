// components/chat/TicketMessageBubble.tsx
import "./TicketMessageBubble.css";

interface Props {
  sender: string;
  content: string;
  isUser: boolean;
  date: string;
}

export const TicketMessageBubble = ({ sender, content, isUser, date }: Props) => {
  return (
    <div className={`ticket-bubble ${isUser ? "user" : "admin"}`}>
      <div className="ticket-meta">
        <span className="ticket-sender">{sender}</span>
        <span className="ticket-date">{new Date(date).toLocaleTimeString("es-MX", { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="ticket-content">{content}</div>
    </div>
  );
};
