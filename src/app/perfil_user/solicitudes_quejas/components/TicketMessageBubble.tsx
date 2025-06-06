import "./TicketMessageBubble.css";

interface Props {
  sender: string;
  content: string;
  isUser: boolean;
  date: string;
}

export const TicketMessageBubble = ({ sender, content, isUser, date }: Props) => {
  return (
    <div className={`ticket-message-wrapper ${isUser ? "user" : "admin"}`}>
      <div className="ticket-avatar">
        <div className="avatar-circle">{sender?.charAt(0).toUpperCase()}</div>
      </div>

      <div className="ticket-bubble-container">
        <div className="ticket-bubble">
          <div className="ticket-content">{content}</div>
        </div>
        <span className="ticket-time">
          {new Date(date).toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
