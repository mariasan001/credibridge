import "./DetalleContrato.css";
import { ContractDetail } from "../model/amortization_model";
import { capitalizeWords } from "@/app/prospectos/utils/capitalize";

interface Props {
  contrato: ContractDetail;
}

export default function DetalleContrato({ contrato }: Props) {
  const user = contrato.user;
  const lender = contrato.lender;
  const lenderService = contrato.lenderService;

  return (
    <div className="detalle-contrato">
      <section>
        <h4>Empleado</h4>
        <div className="info-row">
          <span>Nº de Empleado:</span> <strong>{user?.userId}</strong>
        </div>
        <div className="info-row">
          <span>RFC:</span> <strong>{user?.rfc}</strong>
        </div>
        <div className="info-row">
          <span>Nombre:</span> <strong> {capitalizeWords(user?.name)}</strong>
        </div>
      </section>

      <hr />

      <section>
        <h4>Institución</h4>
        <div className="info-row">
          <span>Institución:</span> { capitalizeWords(lender?.lenderName)}
        </div>
        <div className="info-row">
          <span>Representante:</span> {capitalizeWords(  lender?.lenderDesc ?? "N/A") }
        </div>
        <div className="info-row">
          <span>Teléfono:</span> {lender?.lenderPhone ?? "N/A"}
        </div>
        <div className="info-row">
          <span>Correo:</span> {lender?.lenderEmail ?? "N/A"}
        </div>
      </section>

      <hr />

      <section>
        <h4>Datos del contrato</h4>
        <div className="info-row">
          <span>Código Institución:</span>{ capitalizeWords(lender?.lenderName)}
        </div>
        <div className="info-row">
          <span>Clave de descuento:</span> {contrato.discountKey}
        </div>
        <div className="info-row">
          <span>Modalidad:</span> {lenderService?.serviceType?.serviceTypeDesc ?? "N/A"}
        </div>
        <div className="info-row">
          <span>Fecha:</span> {new Date(contrato.startDate).toLocaleDateString("es-MX")}
        </div>
        <div className="info-row">
          <span>Plazo:</span> {contrato.installments} de = ${contrato.biweeklyDiscount}
        </div>
        <div className="info-row">
          <span>Valor Liberado:</span> ${contrato.amount.toLocaleString("es-MX")}
        </div>
        <div className="info-row">
          <span>Plazo de Gracia:</span> 0 / segunda quincena
        </div>
        <div className="info-row">
          <span>Contrato instalado por compra deuda:</span> No
        </div>
        <div className="info-row">
          <span>Folio de Crédito:</span> {contrato.creditId}
        </div>
      </section>
    </div>
  );
}
