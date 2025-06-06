import "./ChatInput.css";

interface Props {
  mensaje: string;
  setMensaje: (msg: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export const ChatInput = ({ mensaje, setMensaje, onSend, disabled }: Props) => {
  const handleSend = () => {
    if (!mensaje.trim()) return;
    onSend();
  };

  return (
    <div className="chat-input-footer">
      <input
        type="text"
        value={mensaje}
        placeholder="Escribe un mensaje..."
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>Enviar</button>
    </div>
  );
};
