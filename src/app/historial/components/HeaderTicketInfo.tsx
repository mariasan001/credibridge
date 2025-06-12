interface Props {
  tipo: string;
  status: string;
  financiera: string;
}

export default function HeaderTicketInfo({ tipo, status, financiera }: Props) {
  return (
    <div className="modal-top-title">
      <p>
        Solicitud de {tipo} —{" "}
        <span className={`estado-${status.toLowerCase()}`}>{status}</span>
      </p>
      <h3>{financiera}</h3>
    </div>
  );
}
