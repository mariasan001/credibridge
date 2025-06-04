import { Eye, AlertCircle } from "lucide-react";
import { ContractModel } from "../model/ContractModel";
import { useDetectarTipoServicio } from "../hooks/useDetectarTipoServicio";
import "./movimento.css";

interface ServicioActivoProps {
  contrato: ContractModel;
}

export const ServicioActivoCard = ({ contrato }: ServicioActivoProps) => {
  const { tipo, colorClase } = useDetectarTipoServicio(contrato);

  const otorgante = contrato.lender?.lenderName || "Institución no disponible";
  const esPrestamo = tipo === "Préstamo";

  const monto = esPrestamo
    ? contrato.newBalance || 0
    : contrato.biweeklyDiscount || contrato.amount || 0;

  const fechaInicio = "1 Ene 2024";
  const proximoDescuento = contrato.nextPayment?.date || "Sin fecha";
  const montoProximo = contrato.nextPayment?.amount || 0;
  const ultimoDescuento = contrato.lastPayment?.date || null;
  const montoUltimo = contrato.lastPayment?.amount || null;

  return (
    <div className="servicio-card">
      <div className="servicio-header">
        <div className="servicio-icons">
          <Eye size={18} className="icono" />
          <AlertCircle size={18} className="icono" />
        </div>

        <h3 className="servicio-tipo">{tipo}</h3>
        <p className="servicio-otorgante">Otorgado por: {otorgante}</p>

        <div className={`servicio-monto ${colorClase}`}>
          <div className="monto-grande">
            <span className="monto-principal">
              ${Math.floor(monto).toLocaleString("es-MX")}
            </span>
            <span className="monto-centavos">
              .{(monto % 1).toFixed(2).split(".")[1]} mx
            </span>
          </div>

          {!esPrestamo && (
            <p className="fecha-inicio">Servicio activo desde el {fechaInicio}</p>
          )}
        </div>
      {esPrestamo && (
        <div className="info-prestamo">
          <div className="ficha-prestamo">
            <span className="ficha-label">Préstamo de</span>
            <span className="ficha-valor">
              ${contrato.amount.toLocaleString("es-MX")}
            </span>
          </div>

          {contrato.installments && (
            <div className="ficha-prestamo">
              <span className="ficha-label">Plazos pagados</span>
              <span className="ficha-valor">
                {contrato.discountsAplied} / {contrato.installments}
              </span>
            </div>
          )}
        </div>
      )}
      </div>

      <div className="servicio-historial">
        <h4>Historial</h4>

        <div className="descuento">
          <span className="descuento-label verde">Próximo descuento</span>
          <span>{proximoDescuento}</span>
          <strong>${montoProximo.toFixed(2)}</strong>
        </div>

        <div className="descuento gris">
          <span className="descuento-label">Último descuento</span>
          {ultimoDescuento ? (
            <>
              <span>{ultimoDescuento}</span>
              <strong>${montoUltimo?.toFixed(2)}</strong>
            </>
          ) : (
            <span>No se ha registrado ningún descuento aún</span>
          )}
        </div>
      </div>
    </div>
  );
};
