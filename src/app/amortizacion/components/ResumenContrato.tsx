import "./ResumenContrato.css";

interface Props {
  installments: number;
  discountsAplied: number;
  amount: number;
  newBalance: number;
  estatus: string; // viene de contract.status (ej: "Corriente")
}

export default function ResumenContrato({
  installments,
  discountsAplied,
  amount,
  newBalance,
  estatus,
}: Props) {
  const cuotaText = `${discountsAplied}/${installments}`;
  const estatusLower = estatus.trim().toLowerCase();

  return (
    <div className="resumen-grid-contrato">
      <div className="resumen-card-contrato">
        <p className="label-contrato">CUOTA</p>
        <p className="valor bold-contrato">{cuotaText}</p>
      </div>

      <div className="resumen-card-contrato">
        <p className="label-contrato">VALOR SOLICITADO</p>
        <p className="valor-contrato">
          ${amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="resumen-card-contrato">
        <p className="label-contrato">VALOR RECUPERADO</p>
        <p className="valor-contrato">
          ${newBalance.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className={`resumen-card-contrato estatus-card ${estatusLower === "corriente" ? "verde" : "rojo"}`}>
        <p className="label-contrato">ESTATUS</p>
        <p className="valor bold-contrato">{estatus}</p>
      </div>
    </div>
  );
}
